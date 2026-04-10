import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthSplitLayout from '../../components/AuthSplitLayout';
import { authAPI } from '../../api';

function BookBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M3.75 5.25A2.25 2.25 0 0 1 6 3h4.5a3 3 0 0 1 2.25 1.017A3 3 0 0 1 15 3h3a2.25 2.25 0 0 1 2.25 2.25v12.878a.75.75 0 0 1-1.093.667A4.48 4.48 0 0 0 17.25 18h-2.625a2.625 2.625 0 0 0-1.875.78.75.75 0 0 1-1.06 0A2.625 2.625 0 0 0 9.815 18H7.125a4.48 4.48 0 0 0-1.907.795.75.75 0 0 1-1.093-.667V5.25Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M7.5 8.25V7.5a4.5 4.5 0 1 1 9 0v.75h.75A2.25 2.25 0 0 1 19.5 10.5v8.25A2.25 2.25 0 0 1 17.25 21H6.75A2.25 2.25 0 0 1 4.5 18.75V10.5a2.25 2.25 0 0 1 2.25-2.25h.75Zm7.5 0V7.5a3 3 0 1 0-6 0v.75h6Z" clipRule="evenodd" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path d="M12 5.25A6.75 6.75 0 0 0 5.25 12H3.81l2.72 2.72a.75.75 0 0 0 1.06 0L10.31 12H8.25A3.75 3.75 0 1 1 12 15.75a.75.75 0 0 0 0 1.5A5.25 5.25 0 1 0 6.75 12 .75.75 0 0 0 8.25 12 3.75 3.75 0 1 1 12 8.25a.75.75 0 0 0 0-1.5Z" />
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#b0a37f]" fill="currentColor" aria-hidden="true">
      <path d="M12 5.25c-5.018 0-8.694 4.09-9.75 6.75 1.056 2.66 4.732 6.75 9.75 6.75s8.694-4.09 9.75-6.75c-1.056-2.66-4.732-6.75-9.75-6.75Zm0 11.25a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#b0a37f]" fill="currentColor" aria-hidden="true">
      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l2.07 2.07C2.927 6.89 1.753 8.63 1.25 10c1.056 2.66 4.732 6.75 9.75 6.75 1.9 0 3.622-.49 5.115-1.26l3.355 3.355a.75.75 0 1 0 1.06-1.06L3.53 2.47Zm8.794 8.794 1.602 1.602a1.5 1.5 0 0 1-1.602-1.602ZM9.88 8.819 8.246 7.185A4.48 4.48 0 0 1 12 5.25c5.018 0 8.694 4.09 9.75 6.75-.365.921-1.047 2.043-2.021 3.11l-1.584-1.584c.763-.78 1.323-1.583 1.605-2.276-.947-1.887-3.87-4.5-7.75-4.5-.77 0-1.477.103-2.12.319Z" />
    </svg>
  );
}

function RequirementPill({ active, children }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] ${
        active ? 'bg-[#e4f2f6] text-[#35586d]' : 'bg-[#fbf2ca] text-[#6e6132]'
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
          active ? 'border-[#6f8da0] bg-[#6f8da0] text-white' : 'border-[#8f7d40] text-[#8f7d40]'
        }`}
      >
        {active ? '✓' : '○'}
      </span>
      {children}
    </div>
  );
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  if (success) {
    return (
      <AuthSplitLayout
        variant="login"
        imageSrc="/resetpassword.png"
        imageAlt="Open book illustration"
        title="Password Reset Complete"
        subtitle="Your new password is ready. Return to the library and sign in with your fresh credentials."
        footer={
          <Link to="/login" className="font-extrabold text-brand-ink underline-offset-4 hover:underline">
            Return to Login
          </Link>
        }
      >
        <div className="rounded-[28px] border border-[#eadfc7] bg-white/75 p-6 text-center shadow-[0_20px_45px_rgba(191,165,111,0.12)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f1e9] text-2xl text-[#486b58]">
            ✓
          </div>
          <p className="mt-4 text-lg font-bold text-brand-ink">Sanctuary restored.</p>
          <p className="mt-3 text-brand-ink/72">
            Your password has been updated successfully.
          </p>
          <Link to="/login" className="auth-button mt-6">
            Sign In 
          </Link>
        </div>
      </AuthSplitLayout>
    );
  }

  if (!token) {
    return (
      <AuthSplitLayout
        variant="forgot"
        imageSrc="/resetpassword.png"
        imageAlt="Open book illustration"
        title="Reset Link Missing"
        subtitle="This reset page needs a valid token. Request a new password reset link to continue."
      >
        <div className="rounded-[28px] border border-[#eadfc7] bg-white/75 p-6 text-center shadow-[0_20px_45px_rgba(191,165,111,0.12)]">
          <p className="text-lg font-bold text-brand-ink">No reset token found.</p>
          <p className="mt-3 text-brand-ink/72">
            Please request a new password reset email and try again.
          </p>
          <Link to="/forgot-password" className="auth-button mt-6">
            Request New Link 
          </Link>
        </div>
      </AuthSplitLayout>
    );
  }

  const hasMinLength = form.password.length >= 8;
  const hasSymbol = /[^A-Za-z0-9]/.test(form.password);

  return (
    <AuthSplitLayout
      variant="login"
      imageSrc="/resetpassword.png"
      imageAlt="Open book illustration"
      rightBadge={
        <div className="inline-flex items-center gap-3 rounded-full bg-[#f6efe7] px-4 py-3 text-[#7b2a43] shadow-[0_10px_30px_rgba(218,193,170,0.25)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7c697a] text-white">
            <BookBadgeIcon />
          </span>
          <span className="font-display text-2xl font-extrabold italic">The Ethereal Library</span>
        </div>
      }
      title="Reset Your Password"
      subtitle="Create a strong, new key for your sanctuary."
      footer={
        <div className="space-y-5">
          <Link to="/login" className="inline-flex items-center gap-2 font-semibold text-brand-ink/78 hover:text-brand-ink">
            {/* <span>{'<>'}</span> */}
            <span>Return to Library Login</span>
          </Link>
          <div className="flex items-center justify-center gap-5 text-xl text-brand-ink/30">
            <span>◐</span>
            <span>📖</span>
            <span>⌁</span>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? (
          <div className="rounded-[22px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className="mb-3 block text-lg font-extrabold text-brand-ink">New Password</label>
          <div className="auth-input bg-white shadow-[0_8px_24px_rgba(191,165,111,0.1)]">
            <LockIcon />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter new password"
              required
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="transition hover:scale-105">
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-lg font-extrabold text-brand-ink">Confirm Password</label>
          <div className="auth-input bg-white shadow-[0_8px_24px_rgba(191,165,111,0.1)]">
            <ResetIcon />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Confirm password"
              required
            />
            <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="transition hover:scale-105">
              <EyeIcon open={showConfirmPassword} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <RequirementPill active={hasMinLength}>8+ Characters</RequirementPill>
          <RequirementPill active={hasSymbol}>1 Symbol</RequirementPill>
        </div>

        <button type="submit" disabled={loading} className="auth-button mt-2">
          {loading ? 'Resetting...' : 'Reset Password ->'}
        </button>
      </form>
    </AuthSplitLayout>
  );
}
