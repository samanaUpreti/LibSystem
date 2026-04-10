import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthSplitLayout from '../../components/AuthSplitLayout';
import { useAuth } from '../../context/AuthContext';

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.55-.75 7.51 5.632a.75.75 0 0 0 .9 0L19.95 6H4.05Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M7.5 8.25V7.5a4.5 4.5 0 1 1 9 0v.75h.75A2.25 2.25 0 0 1 19.5 10.5v8.25A2.25 2.25 0 0 1 17.25 21H6.75A2.25 2.25 0 0 1 4.5 18.75V10.5a2.25 2.25 0 0 1 2.25-2.25h.75Zm7.5 0V7.5a3 3 0 1 0-6 0v.75h6Z" clipRule="evenodd" />
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path d="M12 5.25c-5.018 0-8.694 4.09-9.75 6.75 1.056 2.66 4.732 6.75 9.75 6.75s8.694-4.09 9.75-6.75c-1.056-2.66-4.732-6.75-9.75-6.75Zm0 11.25a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l2.07 2.07C2.927 6.89 1.753 8.63 1.25 10c1.056 2.66 4.732 6.75 9.75 6.75 1.9 0 3.622-.49 5.115-1.26l3.355 3.355a.75.75 0 1 0 1.06-1.06L3.53 2.47Zm8.794 8.794 1.602 1.602a1.5 1.5 0 0 1-1.602-1.602ZM9.88 8.819 8.246 7.185A4.48 4.48 0 0 1 12 5.25c5.018 0 8.694 4.09 9.75 6.75-.365.921-1.047 2.043-2.021 3.11l-1.584-1.584c.763-.78 1.323-1.583 1.605-2.276-.947-1.887-3.87-4.5-7.75-4.5-.77 0-1.477.103-2.12.319Z" />
    </svg>
  );
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthSplitLayout
      variant="login"
      imageSrc="/loginpage.png"
      imageAlt="Reader in a magical library"
      title={<>Welcome back,<br />Bookworm!</>}
      subtitle="Step back into your digital sanctuary."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-lg font-extrabold text-brand-ink">Email Address</label>
          </div>
          <div className="auth-input">
            <EmailIcon />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="luna.lovegood@hogwarts.edu"
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <label className="text-lg font-extrabold text-brand-ink">Password</label>
            <Link to="/forgot-password" className="text-base font-semibold text-brand-ink/70 transition hover:text-brand-ink">
              Forgot Password?
            </Link>
          </div>
          <div className="auth-input">
            <LockIcon />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="transition hover:scale-105">
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <button
            type="button"
            onClick={() => setRemember((value) => !value)}
            className="flex items-center gap-3 text-base font-semibold text-brand-ink/82"
          >
            <span className={`auth-checkbox flex items-center justify-center ${remember ? 'bg-[#f7ebbe]' : ''}`}>
              {remember ? <span className="h-2.5 w-2.5 rounded-full bg-brand-plum" /> : null}
            </span>
            Remember my nook
          </button>
          <span className="text-2xl text-[#eadcf5]">*</span>
        </div>

        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Logging in...' : 'Login ->'}
        </button>

        <p className="text-center text-sm font-semibold text-brand-ink/75 sm:text-base">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-extrabold text-brand-ink underline-offset-4 hover:underline">
            Register
          </Link>
        </p>

        <div className="pt-5">
          <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.25em] text-brand-ink/38">
            <div className="h-px flex-1 bg-[#eadfca]" />
            <span>Or enter via</span>
            <div className="h-px flex-1 bg-[#eadfca]" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button type="button" className="auth-ghost-button">
              Google
            </button>
            <button type="button" className="auth-ghost-button">
              Apple
            </button>
          </div>
        </div>

        <div className="rounded-[26px] bg-[#fff0b8]/70 px-5 py-4 text-sm leading-7 text-brand-ink/70 shadow-[0_18px_40px_rgba(224,196,117,0.16)]">
          Need help entering the stacks? Use the demo account: <span className="font-bold">reader@novelnight.com</span> / <span className="font-bold">password123</span>
        </div>
      </form>
    </AuthSplitLayout>
  );
}
