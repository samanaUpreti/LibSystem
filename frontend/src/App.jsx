import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import Home from './pages/Home';
import Books from './pages/Books';
import IssuedBooks from './pages/IssuedBooks';
import AddBook from './pages/AddBook';
import Settings from './pages/Settings';
import NotificationPopup from './components/NotificationPopup';
import ReturnBooks from './pages/ReturnBooks';
import Profile from './pages/Profile';
import EditProfile from "./pages/EditProfile";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-txt-secondary">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" /> : children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-black text-txt-primary font-sans">
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
        <Route path="/return" element={<ReturnBooks />} />
        <Route path="/issued-books" element={<ProtectedRoute><IssuedBooks /></ProtectedRoute>} />
        <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/NotificationPopup" element={<NotificationPopup />} />
      </Routes>
    </div>
  );
}
