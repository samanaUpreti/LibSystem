import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Example fallback data for badges, preferences, stats, and reading info
  const badges = user?.badges || ["Gold Reader", "Bloomfield Nook"];
  const preferences = user?.preferences || ["Classical Poetry", "Magical Realism", "Historical Romance", "+ 4 more"];
  const stats = user?.stats || { booksRead: 124, collections: 12, pagesMonthly: "3.2k", goals: 14 };
  const currentlyReading = user?.currentlyReading || {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    image: "/books/secretgarden.png",
    progress: 65,
  };
  const moods = user?.moods || [
    { label: "Whimsical", tag: "PRIMARY" },
    { label: "Melancholy", tag: "SOON" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#4f3d42] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl rounded-[36px] bg-white shadow-[0_10px_32px_rgba(232,223,216,0.18)] p-8 flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <img
            src={user?.avatar || "/profile-avatar.png"}
            alt="Profile avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-[#ede5fb] shadow"
          />
          <span className="absolute bottom-2 right-2 bg-[#ede5fb] text-[#7b6b8a] rounded-full px-2 py-1 text-xs font-bold shadow">{badges[0]}</span>
        </div>
        <h1 className="font-display text-2xl font-extrabold text-[#6b5457]">{user?.username || "User"}</h1>
        <div className="text-[#8f7f7d] text-sm mb-2">{user?.email || "user@email.com"}</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {badges.map((badge, i) => (
            <span key={badge + i} className={`bg-[${i%2===0?'#ede5fb':'#e5f6fa'}] text-[#7b6b8a] text-xs font-bold px-3 py-1 rounded-full`}>{badge}</span>
          ))}
        </div>
        <div className="w-full flex flex-wrap gap-2 justify-center mb-4">
          {preferences.map((pref, i) => (
            <span key={pref + i} className={`bg-[${i%2===0?'#fbe5e5':'#ede5fb'}] text-[#b85c6b] text-xs font-bold px-3 py-1 rounded-full`}>{pref}</span>
          ))}
        </div>
        <button className="mt-2 mb-6 px-6 py-2 rounded-full bg-[#6b5b84] text-white font-bold shadow hover:bg-[#5a4a6c] transition" onClick={() => navigate('/edit-profile')}>
          Edit Profile
        </button>
        <div className="w-full flex justify-between border-t border-[#f3e6e6] pt-6 mt-4">
          <div className="flex flex-col items-center">
            <div className="font-extrabold text-xl text-[#6b5457]">{stats.booksRead}</div>
            <div className="text-xs text-[#8f7f7d] font-bold">BOOKS READ</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-extrabold text-xl text-[#6b5457]">{stats.collections}</div>
            <div className="text-xs text-[#8f7f7d] font-bold">COLLECTIONS</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-extrabold text-xl text-[#6b5457]">{stats.pagesMonthly}</div>
            <div className="text-xs text-[#8f7f7d] font-bold">PAGES MONTHLY</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-extrabold text-xl text-[#6b5457]">{stats.goals}</div>
            <div className="text-xs text-[#8f7f7d] font-bold">CURRENT GOALS</div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-[28px] bg-white shadow-[0_8px_24px_rgba(232,223,216,0.12)] p-6 flex flex-col">
          <div className="font-bold text-[#6b5457] mb-2">Currently Reading</div>
          <div className="flex items-center gap-4">
            <img src={currentlyReading.image} alt={currentlyReading.title} className="w-16 h-24 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="font-semibold text-[#4f3d42] text-base mb-1">{currentlyReading.title}</div>
              <div className="text-xs text-[#8f7f7d] mb-2">{currentlyReading.author}</div>
              <div className="w-full h-2 rounded-full bg-[#e5ddf0]">
                <div className="h-full rounded-full bg-[#6b5b84]" style={{ width: `${currentlyReading.progress}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] bg-white shadow-[0_8px_24px_rgba(232,223,216,0.12)] p-6 flex flex-col">
          <div className="font-bold text-[#6b5457] mb-2">Reading Mood</div>
          {moods.map((mood, i) => (
            <div key={mood.label + i} className="mb-2 flex gap-2 items-center">
              <span className="font-semibold text-[#6b5457]">{mood.label}</span>
              <span className={`rounded-full ${mood.tag === 'PRIMARY' ? 'bg-[#ede5fb]' : 'bg-[#e5eafc]'} text-[#7b6b8a] text-[10px] font-bold px-2 py-0.5 ml-1`}>{mood.tag}</span>
            </div>
          ))}
          <div className="text-xs text-[#8f7f7d] mt-2">Your mood profile helps us suggest books that match your current emotional state.</div>
        </div>
      </div>
    </div>
  );
}
