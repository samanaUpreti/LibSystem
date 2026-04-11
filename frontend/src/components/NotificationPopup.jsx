import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

const notifications = [
  {
    icon: (
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f7e3ea] text-[#e48a9c]">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/></svg>
      </span>
    ),
    title: 'New book added',
    desc: "'The Midnight Circus' has been added to your Enchanted Realism collection.",
    time: '2 mins ago',
    bg: 'bg-white',
  },
  {
    icon: (
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ede5fb] text-[#a48ae4]">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4l3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    ),
    title: 'Due date approaching',
    desc: "'Ocean at the End of the Lane' is due for return in 2 days.",
    time: '1 hour ago',
    bg: 'bg-[#f7f7fa]',
  },
  {
    icon: (
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e3f0fa] text-[#7bb0e7]">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4l3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    ),
    title: 'Favorite author update',
    desc: 'Neil Gaiman just released a new curated reading list for Autumn.',
    time: '4 hours ago',
    bg: 'bg-[#e3f0fa]',
  },
  {
    icon: (
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f7e3ea] text-[#e48a9c]">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/></svg>
      </span>
    ),
    title: 'Curation liked',
    desc: "Your 'Rainy Day Reads' curation was saved by 12 other dreamers.",
    time: 'Yesterday',
    bg: 'bg-white',
  },
];

export default function NotificationPopup({ open, onClose, onViewAll }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[360px] max-w-full rounded-3xl bg-white/80 shadow-2xl p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-lg text-[#7b666b]">Whispers of the Sanctuary</span>
          <button className="text-xs text-[#bba6b6] font-bold hover:underline" onClick={onClose}>Clear all</button>
        </div>
        <div className="space-y-4 max-h-[340px] overflow-y-auto pb-2">
          {notifications.map((n, i) => (
            <div key={i} className={`flex gap-3 rounded-2xl p-4 ${n.bg} shadow-sm items-start`}>
              {n.icon}
              <div className="flex-1">
                <div className="font-bold text-[#6b5457] text-sm mb-1">{n.title}</div>
                <div className="text-xs text-[#8f7f7d] mb-1">{n.desc}</div>
                <div className="text-[10px] text-[#bba6b6] font-semibold uppercase tracking-wider">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Removed 'View All Notifications' button as requested */}
      </div>
    </div>,
    document.body
  );
}
