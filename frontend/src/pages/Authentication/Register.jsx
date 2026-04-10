import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthSplitLayout from '../../components/AuthSplitLayout';
import { useAuth } from '../../context/AuthContext';

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path d="M12 12a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25Zm-7.5 7.125A6.375 6.375 0 0 1 10.875 12.75h2.25A6.375 6.375 0 0 1 19.5 19.125a.375.375 0 0 1-.375.375H4.875a.375.375 0 0 1-.375-.375Z" />
    </svg>
  );
}

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

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agreed) {
      setError('Please agree to the community guidelines');
      return;
    }

    setLoading(true);
    try {
      await register(form.email, form.username, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthSplitLayout
      variant="register"
      imageSrc="/registerpage.png"
      imageAlt="Warm library reading nook"
      visualEyebrow="The Ethereal Library"
      visualTitle="Your Digital Sanctuary"
      visualDescription="Escape into curated stories, peaceful corners, and shelves that remember your taste."
      quote="Join a reading ritual designed for curious minds and quiet wonder."
      title={<>Join our Reading<br />Sanctuary</>}
      subtitle="Create your account to start your journey."
      rightBadge={
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blush text-3xl text-brand-ink/70 shadow-[0_10px_30px_rgba(243,216,221,0.55)]">
          <span aria-hidden="true">♥</span>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className="mb-3 block text-lg font-extrabold text-brand-ink">Full Name</label>
          <div className="auth-input">
            <UserIcon />
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Evelyn Archer"
              required
              minLength={3}
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-lg font-extrabold text-brand-ink">Email Address</label>
          <div className="auth-input">
            <EmailIcon />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="evelyn@library.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-lg font-extrabold text-brand-ink">Password</label>
          <div className="auth-input">
            <LockIcon />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
              required
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setAgreed((value) => !value)}
          className="flex items-center gap-4 pt-1 text-lg font-semibold text-brand-ink/82"
        >
          <span className={`auth-checkbox flex items-center justify-center ${agreed ? 'bg-[#fff1bf]' : ''}`}>
            {agreed ? <span className="h-2.5 w-2.5 rounded-full bg-brand-plum" /> : null}
          </span>
          <span>
            I agree to the <span className="font-extrabold">Community Guidelines</span>
          </span>
        </button>

        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Creating account...' : 'Sign Up ->'}
        </button>

        <p className="pb-1 text-center text-sm font-semibold text-brand-ink/75 sm:text-base">
          Already have an account?{' '}
          <Link to="/login" className="font-extrabold text-brand-ink underline-offset-4 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
