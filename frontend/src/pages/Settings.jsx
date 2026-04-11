import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// Sidebar icons



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

const sidebarItems = [
  { label: 'Dashboard', icon: IconGrid, route: '/' },
  { label: 'Books', icon: IconBook, route: '/books' },
  { label: 'Issued Books', icon: IconBookmark, route: '/issued-books' },
  { label: 'Return', icon: IconArrowLeft, route: '/return' },
  { label: 'Profile', icon: IconUser, route: '/profile' },
  { label: 'Settings', icon: IconSettings, route: '/settings' },
];
const THEMES = [
  { name: 'Rose & Lilac', desc: 'Active Theme', value: 'rose', color: 'bg-gradient-to-r from-[#f7e3ea] to-[#e7e3f7]' },
  { name: 'Morning Sage', desc: 'Classic Clean', value: 'sage', color: 'bg-[#eaf7f3]' },
  { name: 'Midnight Library', desc: 'Focus Mode', value: 'midnight', color: 'bg-[#23232b]' },
];

export default function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: 'A lover of vintage paperbacks and the scent of jasmine tea. Building a collection of forgotten classics.',
  });

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.username || user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);
  const [theme, setTheme] = useState('rose');
  const [fontFlourish, setFontFlourish] = useState(false);
  const [notifications, setNotifications] = useState({
    collection: false,
    reminders: false,
    mentions: false,
  });

  return (
    <div className="min-h-screen bg-[#fcfaf7] flex">
      <aside className="hidden lg:flex flex-col w-[258px] shrink-0 bg-[#f9f8f5] px-4 py-5 shadow-[18px_0_45px_rgba(240,234,228,0.8)]">
        <div className="flex items-center gap-3 px-2 mt-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f7d8db,#d2adb3)] text-[#7b666b] shadow-sm">
            <IconBook className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-[1.05rem] font-extrabold text-[#715d61]">The Sanctuary</p>
            <p className="text-xs text-[#8f7f7d]">Reading Nook</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 mb-2">
          {sidebarItems.map((item) => {
            const Comp = item.icon;
            const isActive = window.location.pathname === item.route;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (!isActive) navigate(item.route);
                }}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-[1.01rem] font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-[#5f4c52] shadow-[0_10px_24px_rgba(226,218,211,0.7)]'
                    : 'text-[#66575d] hover:bg-white/70'
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
          className="mt-6 flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(90deg,#9b7f87,#efc6c9)] px-6 py-3 font-display text-[1.01rem] font-bold text-white shadow-[0_14px_30px_rgba(198,162,168,0.35)]"
          onClick={() => navigate('/add-book')}
        >
          <span className="text-xl leading-none">+</span>
          <span>Add New Book</span>
        </button>
        <div className="mt-8 space-y-1 text-[1.01rem] text-[#66575d]">
          <button
            type="button"
            className={`flex w-full items-center gap-3 rounded-full px-4 py-2 hover:bg-white/70 ${window.location.pathname === '/settings' ? 'text-[#5f4c52] font-bold' : ''}`}
            onClick={() => { if (window.location.pathname !== '/settings') navigate('/settings'); }}
          >
            <IconSettings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <button type="button" className="flex w-full items-center gap-3 rounded-full px-4 py-2 hover:bg-white/70">
            <IconLogout className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 px-5 py-8 sm:px-7 lg:px-12 flex flex-col gap-8">
        <div className="mb-2 text-xs font-bold text-[#e48a9c] tracking-widest">PREFERENCES</div>
        <h1 className="text-4xl font-extrabold text-[#7b666b] mb-2">Library Settings</h1>
        <p className="text-[#8f7f7d] mb-8">Tailor your digital sanctuary to your heart's desire. Every detail matters in the pursuit of the perfect reading environment.</p>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Card */}
          <div className="flex-1 bg-white rounded-3xl shadow p-8 flex flex-col gap-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="relative">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="avatar" className="w-20 h-20 rounded-full object-cover border-4 border-[#f7e3ea]" />
                <button className="absolute bottom-0 right-0 bg-[#e48a9c] rounded-full p-1 border-2 border-white">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l3.536 3.536a2 2 0 0 0 2.828 0l3.536-3.536a2 2 0 0 0 0-2.828l-3.536-3.536a2 2 0 0 0-2.828 0L9 8.172a2 2 0 0 0 0 2.828Z" /></svg>
                </button>
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg text-[#6b5457] mb-1">{profile.name}</div>
                <div className="text-xs text-[#8f7f7d]">Curator since Autumn 2023</div>
              </div>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <label className="block text-[#bba6b6] text-xs font-bold mb-2">DISPLAY NAME</label>
                <input type="text" className="w-full rounded-full bg-[#f2efea] px-5 py-3 text-base text-[#978b87] outline-none" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div className="flex-1">
                <label className="block text-[#bba6b6] text-xs font-bold mb-2">EMAIL ADDRESS</label>
                <input type="email" className="w-full rounded-full bg-[#f2efea] px-5 py-3 text-base text-[#978b87] outline-none" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-[#bba6b6] text-xs font-bold mb-2">SHORT BIO</label>
              <textarea className="w-full rounded-2xl bg-[#f2efea] px-5 py-3 text-base text-[#978b87] outline-none min-h-[60px]" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
            </div>
          </div>
          {/* Appearance Card */}
          <div className="w-full max-w-xs flex flex-col gap-8">
            <div className="bg-white rounded-3xl shadow p-8 flex flex-col gap-6">
              <div className="font-bold text-[#7b666b] mb-2">Appearance</div>
              <div className="flex flex-col gap-3">
                {THEMES.map(t => (
                  <label key={t.value} className={`flex items-center gap-3 p-2 rounded-2xl cursor-pointer border ${theme === t.value ? 'border-[#e48a9c] bg-[#f7e3ea]/40' : 'border-transparent'}`}>
                    <input type="radio" name="theme" value={t.value} checked={theme === t.value} onChange={() => setTheme(t.value)} className="accent-[#e48a9c]" />
                    <span className="font-semibold text-[#7b666b]">{t.name}</span>
                    <span className="ml-auto text-xs text-[#bba6b6]">{t.desc}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-[#7b666b]">Font Flourishes</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={fontFlourish} onChange={e => setFontFlourish(e.target.checked)} className="accent-[#e48a9c]" />
                  <span className="ml-2 w-10 h-6 bg-[#f2efea] rounded-full relative flex items-center">
                    <span className={`absolute left-1 top-1 w-4 h-4 rounded-full transition ${fontFlourish ? 'bg-[#e48a9c] left-5' : 'bg-[#bba6b6] left-1'}`}></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Notifications & Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-3xl shadow p-8 flex flex-col gap-6">
            <div className="font-bold text-[#7b666b] mb-2">Notifications</div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between">
                <span className="text-[#7b666b]">New Collection Alerts</span>
                <input type="checkbox" checked={notifications.collection} onChange={e => setNotifications({ ...notifications, collection: e.target.checked })} className="accent-[#e48a9c]" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-[#7b666b]">Reading Reminders</span>
                <input type="checkbox" checked={notifications.reminders} onChange={e => setNotifications({ ...notifications, reminders: e.target.checked })} className="accent-[#e48a9c]" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-[#7b666b]">Journal Mentions</span>
                <input type="checkbox" checked={notifications.mentions} onChange={e => setNotifications({ ...notifications, mentions: e.target.checked })} className="accent-[#e48a9c]" />
              </label>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow p-8 flex flex-col gap-6">
            <div className="font-bold text-[#7b666b] mb-2">Privacy</div>
            <div className="flex flex-col gap-4">
              <button className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#f7e3ea]/40 text-[#e48a9c] font-semibold text-base border border-[#f7e3ea]">Library Visibility <span className="ml-auto text-xs text-[#bba6b6]">Public</span></button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#f2efea] text-[#7b666b] font-semibold text-base border border-[#f2efea]">Change Access Code</button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#f2efea] text-[#7b666b] font-semibold text-base border border-[#f2efea]">Export Archives</button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between mt-10">
          <button className="px-8 py-3 rounded-full bg-[#f2efea] text-[#bba6b6] font-bold text-lg">Discard</button>
          <button className="px-8 py-3 rounded-full bg-[#e48a9c] text-white font-bold text-lg shadow hover:bg-[#d46a6a] transition">Save All Changes</button>
        </div>
      </main>
    </div>
  );
}
