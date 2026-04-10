import { Link } from 'react-router-dom';

function BookIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.75 5.25a2.25 2.25 0 0 1 2.25-2.25H10.5a3 3 0 0 1 2.25 1.017A3 3 0 0 1 15 3h3a2.25 2.25 0 0 1 2.25 2.25v12.878a.75.75 0 0 1-1.093.667A4.48 4.48 0 0 0 17.25 18h-2.625a2.625 2.625 0 0 0-1.875.78.75.75 0 0 1-1.06 0A2.625 2.625 0 0 0 9.815 18H7.125a4.48 4.48 0 0 0-1.907.795.75.75 0 0 1-1.093-.667V5.25Zm8.25.878A1.5 1.5 0 0 0 10.5 4.5H6a.75.75 0 0 0-.75.75v11.03c.59-.2 1.22-.28 1.875-.28h2.69c.785 0 1.544.187 2.185.54V6.128Zm1.5 10.412A4.11 4.11 0 0 1 15.685 16h1.565c.655 0 1.286.08 1.875.28V5.25a.75.75 0 0 0-.75-.75H15a1.5 1.5 0 0 0-1.5 1.5V16.54Z" />
    </svg>
  );
}

const visualStyles = {
  login: {
    panel: 'bg-[radial-gradient(circle_at_top,#2d6568_0%,#173842_34%,#10272f_55%,#1b1b2a_100%)]',
    glow: 'bg-[radial-gradient(circle_at_center,rgba(255,224,177,0.16),transparent_55%)]',
  },
  register: {
    panel:
      'bg-[linear-gradient(160deg,rgba(70,39,21,0.92),rgba(40,24,16,0.9)),radial-gradient(circle_at_bottom_left,rgba(252,211,153,0.16),transparent_40%)]',
    glow: 'bg-[radial-gradient(circle_at_bottom_left,rgba(253,206,147,0.12),transparent_50%)]',
  },
  forgot: {
    panel:
      'bg-[linear-gradient(180deg,rgba(235,240,227,0.82),rgba(147,158,150,0.4)),linear-gradient(150deg,#6f786f,#90998f)]',
    glow: 'bg-[radial-gradient(circle_at_center,rgba(240,255,244,0.22),transparent_34%)]',
  },
};

export default function AuthSplitLayout({
  variant = 'login',
  imageSrc,
  imageAlt = 'Library illustration',
  rightBadge,
  title,
  subtitle,
  children,
  footer,
}) {
  const style = visualStyles[variant] ?? visualStyles.login;
  const desktopHeightClass = variant === 'register' ? 'lg:h-[min(120vh,1600px)]' : 'lg:h-[min(88vh,610px)]';

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fff9eb_0%,#fff4d6_44%,#fff8ec_100%)] px-3 py-3 text-brand-ink sm:px-4 sm:py-4 lg:flex lg:items-center lg:justify-center">
      <div className={`mx-auto grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white/70 shadow-[0_24px_60px_rgba(139,114,67,0.14)] ring-1 ring-white/60 backdrop-blur-sm ${desktopHeightClass} lg:grid-cols-[0.88fr_1.12fr]`}>
        <section className={`relative hidden h-full overflow-hidden lg:flex ${style.panel}`}>
          <div className={`absolute inset-0 ${style.glow}`} />
          <div className="relative z-10 h-full w-full p-4">
            <div className="h-full w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              {imageSrc ? (
                <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(255,248,230,0.12),transparent_48%)]" />
              )}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-[linear-gradient(180deg,rgba(255,251,242,0.94),rgba(255,255,255,0.96))] px-5 py-6 sm:px-7 sm:py-7 lg:h-full lg:px-8 lg:py-7 xl:px-10">
          <div className="w-full max-w-[430px]">
            <div className="mb-5 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-plum text-white shadow-lg">
                <BookIcon className="h-5 w-5" />
              </div>
              <div>
                <Link to="/" className="font-display text-lg font-bold text-brand-ink">
                  The Ethereal Library
                </Link>
                <p className="text-xs text-brand-ink/65">Your reading sanctuary</p>
              </div>
            </div>

            {rightBadge ? <div className="mb-4 inline-flex">{rightBadge}</div> : null}

            <header className="max-w-lg">
              <h1 className="font-display text-[2rem] font-extrabold leading-none tracking-tight text-brand-ink sm:text-[2.4rem]">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-brand-ink/72 sm:text-base sm:leading-7">{subtitle}</p>
            </header>

            <div className="mt-6">{children}</div>

            {footer ? <div className="mt-6 text-center text-sm text-brand-ink/74 sm:text-base">{footer}</div> : null}

            <div className="mt-7 border-t border-[#e9dcc0] pt-5 text-center text-xs text-brand-ink/45 sm:text-sm">
              Privacy Policy • Terms of Sanctuary
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
