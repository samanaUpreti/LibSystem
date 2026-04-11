import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sidebarItems } from './Home';

const issuedBooks = [
  {
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    borrowedOn: 'Oct 12, 2023',
    due: '2 days',
    status: 'Due in 2 days',
    image: '/books/night.png',
    tags: ['Whimsical', 'Atmospheric'],
    canReturn: true,
    highlight: true,
  },
  {
    title: 'Circe',
    author: 'Madeline Miller',
    due: '1 week',
    status: 'Due in 1 week',
    image: '/books/circe.png',
    canReturn: true,
  },
  {
    title: 'Normal People',
    author: 'Sally Rooney',
    due: 'Overdue 1 day',
    status: '1 OVERDUE DAY',
    image: '/books/normal.png',
    canReturn: true,
    overdue: true,
  },
  {
    title: 'A Gentle Reminder',
    author: 'Bianca Sparacino',
    due: 'Oct 30',
    status: 'DUE OCT 30',
    image: '/books/gentle.png',
    canReturn: true,
  },
];

const recentRestorations = [
  {
    text: 'You returned "Little Women" to the sanctuary.',
    date: '2 days ago',
    condition: 'Pristine',
  },
  {
    text: 'You returned "The Great Gatsby" to the sanctuary.',
    date: '1 week ago',
    condition: 'Good',
  },
];

export default function ReturnBooks() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  function handleReturn(book) {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#4f3d42] flex">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex w-[258px] shrink-0 flex-col bg-[#f9f8f5] px-4 py-5 shadow-[18px_0_45px_rgba(240,234,228,0.8)]">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f7d8db,#d2adb3)] text-[#7b666b] shadow-sm">
            {/* Book Icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true"><path d="M3.75 5.25A2.25 2.25 0 0 1 6 3h4.5a3 3 0 0 1 2.25 1.017A3 3 0 0 1 15 3h3a2.25 2.25 0 0 1 2.25 2.25v12.878a.75.75 0 0 1-1.093.667A4.48 4.48 0 0 0 17.25 18h-2.625a2.625 2.625 0 0 0-1.875.78.75.75 0 0 1-1.06 0A2.625 2.625 0 0 0 9.815 18H7.125a4.48 4.48 0 0 0-1.907.795.75.75 0 0 1-1.093-.667V5.25Z" /></svg>
          </div>
          <div>
            <p className="font-display text-[1.15rem] font-extrabold text-[#715d61]">The Sanctuary</p>
            <p className="text-sm text-[#8f7f7d]">Reading Nook</p>
          </div>
        </div>
        <nav className="space-y-2 mb-10">
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
      </aside>
      <main className="flex-1 px-5 py-8 md:px-12 lg:px-16">
        <div className="mb-7">
          <div className="text-xs text-[#b3a6a2] font-semibold mb-2">Collections {'>'} Return Books</div>
          <h1 className="font-display text-[2.5rem] font-extrabold text-[#6b5457]">Issued Treasures</h1>
          <p className="mt-2 text-[#7c6a6a]">Ready to share these stories with the next reader? Browse your currently issued books and return them to the sanctuary.</p>
        </div>
        <div className="flex flex-wrap gap-6 items-start mb-10">
          <div className="flex-1 min-w-[320px] max-w-[520px]">
            <div className="rounded-[32px] bg-white p-7 shadow-[0_10px_32px_rgba(232,223,216,0.18)] mb-6">
              <div className="flex gap-5 items-center">
                <img src={issuedBooks[0].image} alt={issuedBooks[0].title} className="w-32 h-44 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    {issuedBooks[0].tags?.map(tag => (
                      <span key={tag} className="bg-[#ede5fb] text-[#7b6b8a] text-xs font-bold px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h2 className="font-bold text-xl text-[#4f3d42] mb-1">{issuedBooks[0].title}</h2>
                  <div className="text-[#8f7f7d] text-sm mb-2">by {issuedBooks[0].author}</div>
                  <div className="text-xs text-[#b3a6a2] mb-3">Borrowed on {issuedBooks[0].borrowedOn}</div>
                  <button className="flex items-center gap-2 rounded-full bg-[#cfa6b6] px-6 py-2.5 text-white font-bold shadow hover:bg-[#b98ca2] transition" onClick={() => handleReturn(issuedBooks[0])}>
                    Return Book
                  </button>
                  <div className="mt-3 flex gap-2">
                    <span className="bg-[#fbe5e5] text-[#b85c6b] text-xs font-bold px-3 py-1 rounded-full">{issuedBooks[0].status}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {issuedBooks.slice(1).map((book, idx) => (
                <div key={book.title} className="flex-1 rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(232,223,216,0.12)] flex flex-col items-center">
                  <img src={book.image} alt={book.title} className="w-20 h-28 rounded-lg object-cover mb-2" />
                  <div className="font-semibold text-[#4f3d42] text-base mb-1 text-center">{book.title}</div>
                  <div className="text-xs text-[#8f7f7d] mb-2 text-center">{book.author}</div>
                  <button className="rounded-full bg-[#f2e6e6] px-4 py-1.5 text-[#b85c6b] font-bold text-xs shadow hover:bg-[#e7d3d3] transition mb-2" onClick={() => handleReturn(book)}>
                    Return
                  </button>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-[#b85c6b]">{book.status}</div>
                </div>
              ))}
            </div>
            {showSuccess && (
              <div className="mt-6 flex items-center gap-3 rounded-full bg-[#f8e8eb] px-5 py-3 text-[#b85c6b] font-bold shadow animate-fade-in">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="#b85c6b" strokeWidth="2"><circle cx="12" cy="12" r="10" stroke="#b85c6b" strokeWidth="2" /><path d="M7 13l3 3 7-7" stroke="#b85c6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Return Successful! Your sanctuary has been updated.
              </div>
            )}
          </div>
          <div className="rounded-[32px] bg-white p-7 shadow-[0_10px_32px_rgba(232,223,216,0.18)] min-w-[260px] max-w-[320px] flex flex-col items-center">
            <div className="font-bold text-[#6b5457] mb-2">4 BOOKS TO RETURN</div>
            <button className="rounded-full bg-[#ede5fb] px-5 py-2 text-[#7b6b8a] font-bold text-sm shadow hover:bg-[#e2d6f3] transition">Books to Return</button>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-[#6b5457] text-lg">Recent Restorations</div>
            <button className="text-xs text-[#b3a6a2] font-bold hover:underline">View Full Journal</button>
          </div>
          <div className="space-y-4">
            {recentRestorations.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_4px_16px_rgba(232,223,216,0.10)]">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#e5eafc] text-[#7b6b8a] font-bold">{idx + 1}</div>
                <div className="flex-1">
                  <div className="text-[#4f3d42] font-semibold text-sm">{item.text}</div>
                  <div className="text-xs text-[#b3a6a2]">{item.date} • Condition: {item.condition}</div>
                </div>
                <span className="rounded-full bg-[#ede5fb] text-[#7b6b8a] text-[10px] font-bold px-3 py-1">HELP</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
