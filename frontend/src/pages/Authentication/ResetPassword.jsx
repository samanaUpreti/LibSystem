import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authAPI.resetPassword({ token, password: form.password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset. Link may have expired.');
    } finally {
      setLoading(false);
    }
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-brand-black">
        <div className="w-full max-w-sm text-center space-y-6 animate-fade-in">
          <p className="text-5xl">🎉</p>
          <h1 className="text-xl font-semibold">Password reset successful</h1>
          <p className="text-sm text-txt-secondary">Your password has been updated. Sign in with your new password.</p>
          <Link to="/login" className="btn-primary inline-block">Sign In</Link>
        </div>
      </div>
    );
  }

  // No token
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-brand-black">
        <div className="w-full max-w-sm text-center space-y-6 animate-fade-in">
          <p className="text-4xl">🔗</p>
          <h1 className="text-xl font-semibold">No reset token</h1>
          <p className="text-sm text-txt-secondary">Please request a new password reset link.</p>
          <Link to="/forgot-password" className="btn-secondary inline-block text-sm">Request new link</Link>
        </div>
      </div>
    );
  }

  // Reset form
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-black">
      <div className="w-full max-w-sm space-y-8 animate-fade-in">

        <div className="text-center">
          <Link to="/login" className="inline-block">
            <span className="text-brand-red text-3xl">📖</span>
            <p className="font-serif font-bold text-2xl mt-2">
              Novel<span className="text-brand-red">Night</span>
            </p>
          </Link>
          <h1 className="text-xl font-semibold mt-6">Set new password</h1>
          <p className="text-sm text-txt-secondary mt-1">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-brand-red/10 border border-brand-red/30 text-brand-red-hover text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-txt-secondary mb-1.5 block">New Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field"
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div>
            <label className="text-sm text-txt-secondary mb-1.5 block">Confirm New Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="input-field"
              placeholder="Repeat your new password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="text-center text-sm text-txt-secondary">
          <Link to="/login" className="text-brand-gold hover:text-brand-gold-light font-medium">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
