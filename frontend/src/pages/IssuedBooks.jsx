import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationPopup from '../components/NotificationPopup';
import FavoritesOverlay from '../components/FavoritesOverlay';

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
    image: '/books/night.png',
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [issuedBooks, setIssuedBooks] = useState(ISSUED_BOOKS);
  const [returnMessage, setReturnMessage] = useState('');
  const returnMessageTimeoutRef = useRef(null);

  const currentlyReading = issuedBooks.length;
  const overdueNotices = useMemo(
    () => issuedBooks.filter((book) => book.status === 'Overdue').length,
    [issuedBooks]
  );

  function handleReturnBook(title) {
    const returnedBook = issuedBooks.find((book) => book.title === title);
    if (!returnedBook) return;

    setIssuedBooks((currentBooks) => currentBooks.filter((book) => book.title !== title));
    setReturnMessage(`"${title}" was returned successfully.`);

    window.clearTimeout(returnMessageTimeoutRef.current);
    returnMessageTimeoutRef.current = window.setTimeout(() => {
      setReturnMessage('');
    }, 2500);
  }

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
        <button
          className="mt-auto flex items-center justify-center gap-3 rounded-full bg-[#e3eafd] px-6 py-4 font-display text-[1.05rem] font-bold text-[#5d6b7b] shadow-[0_14px_30px_rgba(198,162,168,0.15)] mb-8"
          onClick={() => navigate('/add-book')}
        >
          + Add New Book
        </button>
        <div className="mt-10 space-y-1 text-[1.02rem] text-[#66575d]">
          <button type="button" className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70" onClick={() => navigate('/settings')}>Settings</button>
          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70">Logout</button>
        </div>
      </aside>
      <main className="flex-1 px-5 py-8 sm:px-7 lg:px-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-extrabold text-[#7b666b]">Issued Books</h1>
          <div className="flex gap-3">
            <button
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#f7e3ea] hover:bg-[#f3d3d7] transition shadow"
              onClick={() => setShowNotifications(true)}
              aria-label="Show notifications"
            >
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" className="text-[#e48a9c]"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16Z" fill="currentColor"/></svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e48a9c] text-white text-xs rounded-full flex items-center justify-center font-bold">4</span>
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ede5fb] hover:bg-[#e3f0fa] transition shadow text-[#a48ae4] text-2xl font-bold"
              onClick={() => setShowFavorites(true)}
              aria-label="Show favorites overlay"
            >
              ♥
            </button>
          </div>
        </div>
        <NotificationPopup open={showNotifications} onClose={() => setShowNotifications(false)} />
        <FavoritesOverlay open={showFavorites} onClose={() => setShowFavorites(false)} />
        <p className="text-lg text-[#8f7f7d] mb-8">Keep track of your current literary journeys. Remember to return them to the sanctuary for others to discover.</p>
        {returnMessage && (
          <div className="mb-6 rounded-2xl bg-[#eef7eb] px-5 py-4 text-sm font-semibold text-[#51724d] shadow">
            {returnMessage}
          </div>
        )}
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
            <img src="books/bookshelf.png" alt="Library Rules" className="w-16 h-16 mb-2 rounded-xl object-cover" />
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
                {issuedBooks.map((book) => (
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
                      <button
                        className="px-5 py-2 rounded-full bg-[#eaf2fa] text-[#5d6b7b] font-semibold text-base hover:bg-[#d6e6f7] transition"
                        onClick={() => handleReturnBook(book.title)}
                      >
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {issuedBooks.length === 0 && (
            <div className="pt-6 text-center text-[#8f7f7d]">
              All issued books have been returned.
            </div>
          )}
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
