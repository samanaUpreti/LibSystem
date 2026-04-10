import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const [existing] = await db.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email or username already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
      'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
      [email, username, passwordHash]
    );

    const token = jwt.sign(
      { id: result.insertId, email, role: 'reader' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: { id: result.insertId, email, username, role: 'reader', avatar_url: null },
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const [users] = await db.execute(
      'SELECT id, email, username, password_hash, role, avatar_url FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          avatar_url: user.avatar_url,
        },
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET CURRENT USER
router.get('/me', async (req, res) => {
  try {
    // Token is verified by optionalAuth middleware, but this route
    // requires auth — handled at server.js level
    const [header] = req.headers.authorization ? [] : [];
    // We'll rely on the middleware setting req.user
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const [users] = await db.execute(
      'SELECT id, email, username, role, avatar_url, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: users[0] });
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ============================================
// FORGOT PASSWORD
// ============================================

// Generate a simple reset token (in production, use crypto.randomBytes + email service)
function generateResetToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) token += chars.charAt(Math.floor(Math.random() * chars.length));
  return token;
}

// FORGOT PASSWORD — sends reset token
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const [users] = await db.execute(
      'SELECT id, email FROM users WHERE email = ?',
      [email]
    );

    // Always return success to prevent email enumeration
    if (users.length === 0) {
      return res.json({
        success: true,
        message: 'If an account with that email exists, a reset link has been sent.',
      });
    }

    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    // Store token in users table (in production, use a separate password_resets table)
    await db.execute(
      'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
      [token, expiresAt, users[0].id]
    );

    // ========================================================
    // PRODUCTION: Send email with reset link here
    // Example with Nodemailer:
    //
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({
    //   to: email,
    //   subject: 'NovelNight — Password Reset',
    //   html: `<p>Click <a href="https://yourdomain.com/reset-password?token=${token}">here</a> to reset your password. This link expires in 1 hour.</p>`
    // });
    // ========================================================

    // DEVELOPMENT: Return token in response so you can test without email
    res.json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent.',
      // REMOVE THIS IN PRODUCTION:
      devToken: token,
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// RESET PASSWORD — verify token and set new password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ success: false, message: 'Token and new password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const [users] = await db.execute(
      'SELECT id, email, reset_token_expires FROM users WHERE reset_token = ?',
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    const user = users[0];

    // Check expiration
    if (new Date(user.reset_token_expires) < new Date()) {
      await db.execute('UPDATE users SET reset_token = NULL, reset_token_expires = NULL WHERE id = ?', [user.id]);
      return res.status(400).json({ success: false, message: 'Reset token has expired. Please request a new one.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.execute(
      'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
      [passwordHash, user.id]
    );

    res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;