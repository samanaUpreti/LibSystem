import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { BOOKS } from './Books';

function IconBook({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.75 5.25A2.25 2.25 0 0 1 6 3h4.5a3 3 0 0 1 2.25 1.017A3 3 0 0 1 15 3h3a2.25 2.25 0 0 1 2.25 2.25v12.878a.75.75 0 0 1-1.093.667A4.48 4.48 0 0 0 17.25 18h-2.625a2.625 2.625 0 0 0-1.875.78.75.75 0 0 1-1.06 0A2.625 2.625 0 0 0 9.815 18H7.125a4.48 4.48 0 0 0-1.907.795.75.75 0 0 1-1.093-.667V5.25Z" />
    </svg>
  );
}

function IconGrid({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.5 4.5h6v6h-6v-6Zm9 0h6v6h-6v-6Zm-9 9h6v6h-6v-6Zm9 0h6v6h-6v-6Z" />
    </svg>
  );
}

function IconBookmark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.75 3.75A2.25 2.25 0 0 0 4.5 6v13.125a.375.375 0 0 0 .6.3L12 14.25l6.9 5.175a.375.375 0 0 0 .6-.3V6a2.25 2.25 0 0 0-2.25-2.25h-10.5Z" />
    </svg>
  );
}

function IconArrowLeft({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10.28 5.47a.75.75 0 0 1 0 1.06L5.81 11h12.44a.75.75 0 0 1 0 1.5H5.81l4.47 4.47a.75.75 0 1 1-1.06 1.06l-5.75-5.75a.75.75 0 0 1 0-1.06l5.75-5.75a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

function IconUser({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 12a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25Zm-7.5 7.125A6.375 6.375 0 0 1 10.875 12.75h2.25A6.375 6.375 0 0 1 19.5 19.125a.375.375 0 0 1-.375.375H4.875a.375.375 0 0 1-.375-.375Z" />
    </svg>
  );
}

function IconBell({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.25A4.5 4.5 0 0 0 7.5 6.75v2.16c0 .715-.214 1.414-.615 2.006L5.43 13.05a1.5 1.5 0 0 0 1.242 2.325h10.656a1.5 1.5 0 0 0 1.242-2.325l-1.455-2.134A3.58 3.58 0 0 1 16.5 8.91V6.75A4.5 4.5 0 0 0 12 2.25Zm0 19.5a2.625 2.625 0 0 0 2.474-1.75H9.526A2.625 2.625 0 0 0 12 21.75Z" />
    </svg>
  );
}

function IconHeart({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21s-6.716-4.315-9.192-8.162C.734 9.6 2.18 5.25 6.417 5.25c2.06 0 3.252 1.027 4.083 2.212.831-1.185 2.023-2.212 4.083-2.212 4.237 0 5.683 4.35 3.609 7.588C18.716 16.685 12 21 12 21Z" />
    </svg>
  );
}

function IconSettings({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M11.49 2.2a.75.75 0 0 1 1.02 0l1.01.928a2.25 2.25 0 0 0 2.17.473l1.338-.41a.75.75 0 0 1 .883.51l.405 1.322a2.25 2.25 0 0 0 1.54 1.54l1.322.405a.75.75 0 0 1 .51.883l-.41 1.338a2.25 2.25 0 0 0 .473 2.17l.928 1.01a.75.75 0 0 1 0 1.02l-.928 1.01a2.25 2.25 0 0 0-.473 2.17l.41 1.338a.75.75 0 0 1-.51.883l-1.322.405a2.25 2.25 0 0 0-1.54 1.54l-.405 1.322a.75.75 0 0 1-.883.51l-1.338-.41a2.25 2.25 0 0 0-2.17.473l-1.01.928a.75.75 0 0 1-1.02 0l-1.01-.928a2.25 2.25 0 0 0-2.17-.473l-1.338.41a.75.75 0 0 1-.883-.51l-.405-1.322a2.25 2.25 0 0 0-1.54-1.54l-1.322-.405a.75.75 0 0 1-.51-.883l.41-1.338a2.25 2.25 0 0 0-.473-2.17l-.928-1.01a.75.75 0 0 1 0-1.02l.928-1.01a2.25 2.25 0 0 0 .473-2.17l-.41-1.338a.75.75 0 0 1 .51-.883l1.322-.405a2.25 2.25 0 0 0 1.54-1.54l.405-1.322a.75.75 0 0 1 .883-.51l1.338.41a2.25 2.25 0 0 0 2.17-.473l1.01-.928ZM12 15.75A3.75 3.75 0 1 0 12 8.25a3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
    </svg>
  );
}

function IconLogout({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.75 3A2.25 2.25 0 0 1 18 5.25v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v13.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 1 1.5 0v3A2.25 2.25 0 0 1 15.75 21h-7.5A2.25 2.25 0 0 1 6 18.75V5.25A2.25 2.25 0 0 1 8.25 3h7.5Z" />
      <path d="M18.53 7.97a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H11.25a.75.75 0 0 1 0-1.5h9.5l-2.22-2.22a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

function IconSearch({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.243 11.999l3.254 3.254a.75.75 0 1 0 1.06-1.06l-3.253-3.255A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
    </svg>
  );
}

const sidebarItems = [
  { label: 'Dashboard', icon: IconGrid, route: '/' },
  { label: 'Books', icon: IconBook, route: '/books' },
  { label: 'Issued Books', icon: IconBookmark, route: '/issued-books' },
  { label: 'Return', icon: IconArrowLeft, route: '/return' },
  { label: 'Profile', icon: IconUser, route: '/profile' },
];

const statCards = [
  { label: 'Books Collected', value: '1,284', note: '↗ 12 added this month', icon: IconBook, bg: 'bg-[#ede5fb]' },
  { label: 'Books Issued', value: '24', note: '◔ 3 due this week', icon: IconHeart, bg: 'bg-[#f8e8eb]' },
  { label: 'Returned Books', value: '156', note: '◉ 100% on-time rate', icon: IconGrid, bg: 'bg-[#e5f1fb]' },
];

const readingNow = [
  { title: 'Twisted Love', author: 'Ana Huang', progress: 65, image: '/books/twistedlove.png' },
  { title: 'Twisted Hate', author: 'Ana Huang', progress: 12, image: '/books/twistedhate.png' },
  { title: 'Twisted Games', author: 'Ana Huang', progress: 88, image: '/books/twistedgames.png' },
  { title: 'Twisted Lies', author: 'Ana Huang', progress: 42, image: '/books/twistedlies.png' },
];

const activity = [
  { icon: IconArrowLeft, title: 'Returned "Midnight Library"', time: '2 HOURS AGO', tint: 'bg-[#f8d6df]' },
  { icon: IconHeart, title: 'Liked "A Court of Thorns"', time: 'YESTERDAY', tint: 'bg-[#eadbff]' },
  { icon: IconGrid, title: 'Added "Circe" to shelf', time: '3 DAYS AGO', tint: 'bg-[#d9ecff]' },
];


export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef();
  const [search, setSearch] = useState("");

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfile]);

  // Filter currently reading books by search (for dashboard section)
  const filteredReadingNow = readingNow.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Global search: filter all books from BOOKS
  const [showDropdown, setShowDropdown] = useState(false);
  const filteredAllBooks = search.trim()
    ? BOOKS.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  function handleSearchSelect(book) {
    setShowDropdown(false);
    setSearch("");
    navigate(`/books/${book.title.toLowerCase().replace(/\s+/g, '-')}`);
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#4f3d42]">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="hidden w-[258px] shrink-0 flex-col bg-[#f9f8f5] px-4 py-5 shadow-[18px_0_45px_rgba(240,234,228,0.8)] lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f7d8db,#d2adb3)] text-[#7b666b] shadow-sm">
              <IconBook className="h-7 w-7" />
            </div>
            <div>
              <p className="font-display text-[1.15rem] font-extrabold text-[#715d61]">The Sanctuary</p>
              <p className="text-sm text-[#8f7f7d]">Reading Nook</p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            {sidebarItems.map((item) => {
              const Comp = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.route && navigate(item.route)}
                  className={`flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold transition ${
                    window.location.pathname === item.route ? 'bg-white text-[#5f4c52] shadow-[0_10px_24px_rgba(226,218,211,0.7)]' : 'text-[#66575d] hover:bg-white/70'
                  }`}
                >
                  <Comp className="h-5 w-5 text-[#6c5b60]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            className="mt-auto flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(90deg,#9b7f87,#efc6c9)] px-6 py-4 font-display text-[1.05rem] font-bold text-white shadow-[0_14px_30px_rgba(198,162,168,0.35)]"
          >
            <span className="text-2xl leading-none">+</span>
            <span>Add New Book</span>
          </button>

          <div className="mt-10 space-y-1 text-[1.02rem] text-[#66575d]">
            <button type="button" className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70">
              <IconSettings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70">
              <IconLogout className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 px-5 py-5 sm:px-7 lg:px-8">
          <header className="flex items-center justify-between gap-4 border-b border-[#efe9e1] pb-4">
            <div className="flex max-w-[455px] flex-1 items-center gap-3 rounded-full bg-[#f2efea] px-5 py-3 text-[#978b87] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] relative">
              <IconSearch className="h-5 w-5" />
              <input
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setShowDropdown(e.target.value.trim().length > 0);
                }}
                onFocus={() => setShowDropdown(search.trim().length > 0)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
                placeholder="Search all books..."
                className="bg-transparent outline-none flex-1 text-base text-[#978b87] placeholder-[#b8aeb2]"
                autoComplete="off"
              />
              {showDropdown && filteredAllBooks.length > 0 && (
                <div className="absolute left-0 top-12 z-20 w-full bg-white rounded-2xl shadow-lg border border-[#f3e6e6] max-h-72 overflow-y-auto animate-fade-in">
                  {filteredAllBooks.map((book) => (
                    <button
                      key={book.title}
                      type="button"
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#f7e8f3] text-left border-b border-[#f3e6e6] last:border-b-0"
                      onMouseDown={() => handleSearchSelect(book)}
                    >
                      <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded-lg border border-[#f3e6e6]" />
                      <div>
                        <div className="font-semibold text-[#6b5457]">{book.title}</div>
                        <div className="text-xs text-[#8f7f7d]">{book.author}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-5 text-[#735d61] relative">
              <IconBell className="h-5 w-5" />
              <IconHeart className="h-5 w-5" />
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f3d3d7,#efc2c8)] ring-2 ring-[#f7e8e3] focus:outline-none"
                onClick={() => setShowProfile((v) => !v)}
                aria-label="Open profile"
                type="button"
              >
                <span className="text-sm font-bold text-[#7a5f68]">{user?.username?.slice(0, 1)?.toUpperCase() || 'R'}</span>
              </button>
              {showProfile && (
                <div ref={profileRef} className="absolute right-0 top-14 z-50 w-64 rounded-2xl bg-white shadow-xl border border-[#f3e6e6] p-6 flex flex-col items-center animate-fade-in">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f3d3d7,#efc2c8)] ring-2 ring-[#f7e8e3] mb-3">
                    <span className="text-2xl font-bold text-[#7a5f68]">{user?.username?.slice(0, 1)?.toUpperCase() || 'R'}</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-[#6b5457]">{user?.username}</div>
                    <div className="text-sm text-[#8f7f7d] mb-2">{user?.email}</div>
                  </div>
                  <button
                    className="mt-4 w-full rounded-xl bg-[#f3d3d7] text-[#7a5f68] font-semibold py-2 hover:bg-[#efc2c8] transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          <section className="mt-8 space-y-8">
            <div className="rounded-[42px] bg-[linear-gradient(135deg,#f7eeee,#faf5ef)] px-8 py-10 shadow-[0_18px_42px_rgba(232,223,216,0.6)]">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-[760px]">
                  <h1 className="font-display text-[3rem] font-extrabold leading-none tracking-tight text-[#6b5457] sm:text-[4rem]">
                    Welcome back, Reader💖
                  </h1>
                  <p className="mt-5 max-w-[760px] text-[1.15rem] leading-10 text-[#62575a] sm:text-[1.25rem]">
                    Your sanctuary awaits. You&apos;ve read for <span className="font-extrabold">12 hours</span> this week. Pick up right where you left off in your literary journey.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="relative h-[170px] w-[240px]">
                    <div className="absolute bottom-0 right-0 h-8 w-full rounded-b-[28px] bg-[#d8d0cf]" />
                    <div className="absolute bottom-[8px] left-[28px] h-[150px] w-[95px] rounded-t-[42px] rounded-b-[14px] bg-[#cfc7c6]" />
                    <div className="absolute bottom-[8px] left-[122px] h-[150px] w-[95px] rounded-t-[42px] rounded-b-[14px] bg-[#ddd6d5]" />
                    <div className="absolute bottom-[28px] left-[108px] h-[24px] w-[48px] rounded-full bg-[#d4cccb]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-7 md:grid-cols-3">
              {statCards.map((card) => {
                const Comp = card.icon;
                return (
                  <article key={card.label} className={`rounded-[36px] ${card.bg} p-8 shadow-[0_14px_34px_rgba(235,226,220,0.55)]`}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#6a5a60] shadow-sm">
                      <Comp className="h-6 w-6" />
                    </div>
                    <p className="mt-5 text-[1.15rem] font-semibold text-[#44393d]">{card.label}</p>
                    <p className="mt-2 text-[3.2rem] font-black tracking-tight text-[#222022]">{card.value}</p>
                    <p className="mt-6 text-sm font-semibold text-[#665960]">{card.note}</p>
                  </article>
                );
              })}
            </div>

            <section>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="font-display text-[2rem] font-bold text-[#6b575d]">Currently Reading</h2>
                <button
                  type="button"
                  className="text-base font-semibold text-[#6b575d] hover:underline"
                  onClick={() => navigate('/books')}
                >
                  View Library
                </button>
              </div>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                {filteredReadingNow.map((book, index) => (
                  <article key={book.title}>
                    <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_38px_rgba(228,219,212,0.6)]">
                      <img
                        src={book.image}
                        alt={book.title}
                        className={`w-full object-cover h-[385px] ${index === 3 ? 'object-right' : ''}`}
                      />
                    </div>
                    <h3 className="mt-5 text-[1.65rem] font-extrabold leading-tight text-[#1f1d1e]">{book.title}</h3>
                    <p className="mt-1 text-[1.08rem] text-[#6c6265]">{book.author}</p>
                    <div className="mt-4 h-2 rounded-full bg-[#e5ddf0]">
                      <div className="h-full rounded-full bg-[#6b5b84]" style={{ width: `${book.progress}%` }} />
                    </div>
                    <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#534764]">
                      {book.progress}% Completed
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <div className="grid gap-7 xl:grid-cols-[1.05fr_0.95fr]">
              <section className="rounded-[34px] bg-[#faf8f4] p-8 shadow-[0_14px_34px_rgba(235,226,220,0.5)]">
                <h2 className="font-display text-[2rem] font-bold text-[#6b575d]">Weekly Inspiration</h2>
                <div className="mt-7 flex flex-col gap-6 sm:flex-row">
                  <div className="w-full max-w-[150px] overflow-hidden rounded-[18px] bg-black shadow-[0_14px_30px_rgba(184,173,161,0.35)]">
                    <img src="/forgotpassword.png" alt="Weekly inspiration" className="h-[220px] w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-flex rounded-full bg-[#d8ebff] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#56708a]">
                      Editor&apos;s Pick
                    </span>
                    <h3 className="mt-5 font-display text-[2rem] font-bold leading-tight text-[#211f20]">The Art of Stillness</h3>
                    <p className="mt-4 text-lg leading-8 text-[#63585d]">
                      A gentle guide to finding quiet in a noisy world. Perfect for your Sunday morning reading session.
                    </p>
                    <button type="button" className="mt-7 text-xl font-semibold text-[#6b575d] hover:underline">
                      Add to Wishlist {'->'}
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-[34px] bg-[#faf8f4] p-8 shadow-[0_14px_34px_rgba(235,226,220,0.5)]">
                <h2 className="font-display text-[2rem] font-bold text-[#6b575d]">Recent Activity</h2>
                <div className="mt-8 space-y-7">
                  {activity.map((item) => {
                    const Comp = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-[#6d5860] ${item.tint}`}>
                          <Comp className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[1.08rem] font-semibold text-[#262123]">{item.title}</p>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-[#8b7b7a]">{item.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
