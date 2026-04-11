import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function IconBook({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.75 5.25A2.25 2.25 0 0 1 6 3h4.5a3 3 0 0 1 2.25 1.017A3 3 0 0 1 15 3h3a2.25 2.25 0 0 1 2.25 2.25v12.878a.75.75 0 0 1-1.093.667A4.48 4.48 0 0 0 17.25 18h-2.625a2.625 2.625 0 0 0-1.875.78.75.75 0 0 1-1.06 0A2.625 2.625 0 0 0 9.815 18H7.125a4.48 4.48 0 0 0-1.907.795.75.75 0 0 1-1.093-.667V5.25Z" />
    </svg>
  );
}

const ISSUED_BOOKS = [
  {
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    image: '/books/nightcircus.png',
    dueDate: 'Oct 24, 2023',
    status: 'On Time',
  },
  {
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer',
    image: '/books/braiding.png',
    dueDate: 'Oct 12, 2023',
    status: 'Overdue',
  },
  {
    title: 'The Starless Sea',
    author: 'Erin Morgenstern',
    image: '/books/starless.png',
    dueDate: 'Nov 05, 2023',
    status: 'On Time',
  },
  {
    title: 'Circe',
    author: 'Madeline Miller',
    image: '/books/circe.png',
    dueDate: 'Nov 12, 2023',
    status: 'On Time',
  },
];

export default function IssuedBooks() {
  const navigate = useNavigate();
  const currentlyReading = 4;
  const overdueNotices = 1;

  return (
    <div className="flex min-h-screen bg-[#fcfaf7]">
      <aside className="hidden lg:flex flex-col w-[258px] shrink-0 bg-[#f9f8f5] px-4 py-5 shadow-[18px_0_45px_rgba(240,234,228,0.8)]">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f7d8db,#d2adb3)] text-[#7b666b] shadow-sm">
            <IconBook className="h-7 w-7" />
          </div>
          <div>
            <p className="font-display text-[1.15rem] font-extrabold text-[#715d61]">The Sanctuary</p>
            <p className="text-sm text-[#8f7f7d]">Reading Nook</p>
          </div>
        </div>
        <nav className="space-y-2 mb-10">
          <button
            className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition"
            onClick={() => navigate('/')}
          >
            Dashboard
          </button>
          <button
            className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition"
            onClick={() => navigate('/books')}
          >
            Books
          </button>
          <button
            className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left bg-white text-[#5f4c52] shadow-[0_10px_24px_rgba(226,218,211,0.7)] font-semibold transition"
            disabled
          >
            Issued Books
          </button>
          <button
            className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition"
            onClick={() => navigate('/return')}
          >
            Return
          </button>
          <button
            className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition"
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>
        </nav>
        <button className="mt-auto flex items-center justify-center gap-3 rounded-full bg-[#e3eafd] px-6 py-4 font-display text-[1.05rem] font-bold text-[#5d6b7b] shadow-[0_14px_30px_rgba(198,162,168,0.15)] mb-8">+ Add New Book</button>
        <div className="mt-10 space-y-1 text-[1.02rem] text-[#66575d]">
          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70">Settings</button>
          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70">Logout</button>
        </div>
      </aside>
      <main className="flex-1 px-5 py-8 sm:px-7 lg:px-12">
        <h1 className="text-4xl font-extrabold text-[#7b666b] mb-2">Issued Books</h1>
        <p className="text-lg text-[#8f7f7d] mb-8">Keep track of your current literary journeys. Remember to return them to the sanctuary for others to discover.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-3xl bg-white p-7 flex flex-col items-center shadow">
            <div className="text-3xl font-extrabold text-[#7b666b] mb-2">{currentlyReading.toString().padStart(2, '0')}</div>
            <div className="text-sm text-[#8f7f7d]">Currently Reading</div>
            <div className="mt-2 text-xs text-[#bba6b6]">2 books due this week</div>
          </div>
          <div className="rounded-3xl bg-[#eaf2fa] p-7 flex flex-col items-center shadow relative">
            <div className="text-3xl font-extrabold text-[#7b666b] mb-2">{overdueNotices.toString().padStart(2, '0')}</div>
            <div className="text-sm text-[#8f7f7d]">Overdue Notices <span className="text-red-500">!</span></div>
            <div className="mt-2 text-xs text-[#bba6b6]">Return soon to avoid fines</div>
          </div>
          <div className="rounded-3xl bg-white p-7 flex flex-col items-center shadow">
            <img src="/bookshelf.png" alt="Library Rules" className="w-16 h-16 mb-2 rounded-xl object-cover" />
            <div className="text-xs text-[#7b666b] text-center">Please handle all books with love. Keep them away from tea spills and direct sunlight.</div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[#7b666b] text-base font-bold">
                  <th className="pb-4">BOOK TITLE</th>
                  <th className="pb-4">AUTHOR</th>
                  <th className="pb-4">DUE DATE</th>
                  <th className="pb-4">STATUS</th>
                  <th className="pb-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {ISSUED_BOOKS.map((book, idx) => (
                  <tr key={book.title} className="border-t border-[#f3f0f7]">
                    <td className="py-4 flex items-center gap-4">
                      <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded-lg border border-[#f3f0f7]" />
                      <span className="font-semibold text-[#6b5457]">{book.title}</span>
                    </td>
                    <td className="py-4 text-[#8f7f7d]">{book.author}</td>
                    <td className="py-4 text-[#8f7f7d]">{book.dueDate}</td>
                    <td className="py-4">
                      {book.status === 'On Time' && <span className="px-4 py-1 rounded-full bg-[#eaf2fa] text-[#7b666b] text-xs font-bold">On Time</span>}
                      {book.status === 'Overdue' && <span className="px-4 py-1 rounded-full bg-[#ffeaea] text-[#d46a6a] text-xs font-bold">Overdue</span>}
                    </td>
                    <td className="py-4">
                      <button className="px-5 py-2 rounded-full bg-[#eaf2fa] text-[#5d6b7b] font-semibold text-base hover:bg-[#d6e6f7] transition">Return Book</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-3xl bg-[#eaf2fa] p-7 flex flex-col items-center shadow">
            <div className="font-bold text-[#7b666b] mb-2">Upcoming Renewals</div>
            <div className="text-sm text-[#8f7f7d] text-center">You can extend your borrow time for 'The Starless Sea' starting tomorrow.</div>
          </div>
          <div className="rounded-3xl bg-[#eaf2fa] p-7 flex flex-col items-center shadow">
            <div className="font-bold text-[#7b666b] mb-2">Library Fine Balance</div>
            <div className="text-sm text-[#8f7f7d] text-center">Your current balance is $0.00. Thank you for being a responsible reader!</div>
          </div>
        </div>
      </main>
    </div>
  );
}
