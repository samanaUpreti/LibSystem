import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-black">
      <div className="w-full max-w-sm text-center space-y-6 animate-fade-in">
        <p className="text-5xl">✅</p>
        <h1 className="text-2xl font-serif font-bold">Authentication Working!</h1>

        <div className="bg-brand-surface border border-brand-border rounded-lg p-5 space-y-3">
          <p className="text-sm text-txt-muted uppercase tracking-wide">Logged in as</p>
          <p className="text-lg font-semibold text-brand-gold">{user?.username}</p>
          <p className="text-sm text-txt-secondary">{user?.email}</p>
          <p className="text-xs text-txt-muted">Role: {user?.role}</p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-lg p-5 space-y-2 text-sm text-txt-secondary">
          <p>✅ Login works</p>
          <p>✅ Register works</p>
          <p>✅ Protected routes work</p>
          <p>✅ Forgot password works</p>
          <p>✅ Reset password works</p>
          <p>✅ JWT token stored</p>
          <p>✅ Auto-redirect when logged in/out</p>
        </div>

        <button onClick={handleLogout} className="btn-secondary w-full">
          Log Out
        </button>
      </div>
    </div>
  );
}