import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthSplitLayout from '../../components/AuthSplitLayout';
import { authAPI } from '../../api';

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#8f825d]" fill="currentColor" aria-hidden="true">
      <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.55-.75 7.51 5.632a.75.75 0 0 0 .9 0L19.95 6H4.05Z" />
    </svg>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devToken, setDevToken] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.forgotPassword({ email });
      setSent(true);
      if (res.data.devToken) setDevToken(res.data.devToken);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthSplitLayout
      variant="forgot"
      imageSrc="/forgotpassword.png"
      imageAlt="Gothic library with glowing window"
      visualEyebrow="Returning Readers"
      visualTitle="The Ethereal Library"
      visualDescription="Even the most seasoned explorers lose their place sometimes. Let&apos;s find your bookmark together."
      quote="The stacks remember you, even when the path back feels foggy."
      title="Lost your bookmark?"
      subtitle={
        sent
          ? "If that email is in our catalog, a reset link is already on its way back to you."
          : "Enter your email address below and we'll send you a link to reset your password and return to your sanctuary."
      }
      footer={
        <p className="text-base">
          Still having trouble?{' '}
          <span className="font-extrabold text-brand-ink">Contact the Librarian</span>
        </p>
      }
    >
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error ? (
            <div className="rounded-[24px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <div>
            <label className="mb-3 block text-lg font-extrabold text-brand-ink">Email Address</label>
            <div className="auth-input bg-white">
              <EmailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@sanctuary.com"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Sending...' : 'Send Reset Link ->'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="rounded-[28px] border border-[#eadfc7] bg-white/75 p-6 shadow-[0_20px_45px_rgba(191,165,111,0.12)]">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-ink/42">Reset Sent</p>
            <p className="mt-4 text-lg leading-8 text-brand-ink/78">
              If an account exists with <span className="font-extrabold text-brand-ink">{email}</span>, you&apos;ll receive a reset link shortly.
            </p>
            {devToken ? (
              <div className="mt-5 rounded-[22px] bg-[#fff3c6] p-4 text-sm text-brand-ink/78">
                <p className="font-bold uppercase tracking-[0.18em] text-brand-ink/55">Dev Mode</p>
                <p className="mt-2 break-all">{devToken}</p>
                <Link to={`/reset-password?token=${devToken}`} className="mt-4 inline-flex rounded-full bg-brand-plum px-5 py-2.5 font-bold text-white">
                  Open reset page
                </Link>
              </div>
            ) : null}
          </div>
          <button
            onClick={() => {
              setSent(false);
              setEmail('');
              setDevToken('');
            }}
            className="auth-ghost-button w-full"
          >
            Try a different email
          </button>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/login" className="text-2xl font-extrabold text-brand-ink/78 transition hover:text-brand-ink">
           Back to Login
        </Link>
      </div>
    </AuthSplitLayout>
  );
}
