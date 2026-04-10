import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { authenticate, optionalAuth } from './middleware/auth.js';
import authRoutes from './routes/auth.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS — allow frontend origin in production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);


// Apply authenticate to /me specifically
app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    // Import db here to avoid circular dependency issues
    const db = (await import('./db.js')).default;
    const [users] = await db.execute(
      'SELECT id, email, username, role, avatar_url, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: users[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 NovelNight API running on http://localhost:${PORT}`);
});