import React from 'react';
import ReactDOM from 'react-dom';

const recentlyFavorited = [
  {
    cover: '/books/shadows-of-bloom.png',
    title: 'Shadows of Bloom',
    author: 'Evelyn Thorne',
  },
  {
    cover: '/books/the-quiet-forest.png',
    title: 'The Quiet Forest',
    author: 'S. J. Marrow',
  },
];

const dreamyCurations = [
  {
    cover: '/books/the-sun-seeker.png',
    title: 'The Sun Seeker',
    tag: 'WHIMSICAL',
    tagColor: 'bg-[#f7e3ea] text-[#e48a9c]',
    author: 'Leo Vane',
  },
  {
    cover: '/books/ancient-echoes.png',
    title: 'Ancient Echoes',
    tag: 'MYSTIC',
    tagColor: 'bg-[#ede5fb] text-[#a48ae4]',
    author: 'Clara Wells',
  },
];

export default function FavoritesOverlay({ open, onClose, onViewAll }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[380px] max-w-full rounded-3xl bg-white shadow-2xl p-6 pt-4 flex flex-col" style={{minHeight:'600px'}}>
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#ede5fb] text-[#a48ae4] hover:bg-[#e3f0fa] text-2xl font-bold">×</button>
        {/* Header */}
        <div className="mb-2">
          <div className="font-bold text-lg text-[#7b666b]">My Wishlist</div>
          <div className="text-xs text-[#bba6b6] font-semibold">7 ITEMS IN YOUR VAULT</div>
        </div>
        {/* Recently Favorited */}
        <div className="mt-4">
          <div className="text-xs font-bold text-[#bba6b6] mb-2">Recently Favorited</div>
          <div className="flex gap-4">
            {recentlyFavorited.map((book, i) => (
              <div key={i} className="bg-[#f7f7fa] rounded-2xl p-3 flex flex-col items-center w-36 relative">
                <img src={book.cover} alt={book.title} className="w-28 h-40 object-cover rounded-xl mb-2" />
                <button className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#e48a9c] shadow">♥</button>
                <div className="font-semibold text-xs text-[#6b5457] text-center mt-1">{book.title}</div>
                <div className="text-[10px] text-[#8f7f7d] text-center">{book.author}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Dreamy Curations */}
        <div className="mt-6">
          <div className="text-xs font-bold text-[#bba6b6] mb-2 flex items-center justify-between">
            Dreamy Curations <span className="text-xs font-normal cursor-pointer hover:underline">SEE ALL</span>
          </div>
          <div className="space-y-3">
            {dreamyCurations.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-sm">
                <img src={c.cover} alt={c.title} className="w-10 h-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-semibold text-xs text-[#6b5457]">{c.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.tagColor}`}>{c.tag}</span>
                    <span className="text-[10px] text-[#bba6b6]">by {c.author}</span>
                  </div>
                </div>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#e48a9c] shadow">♥</button>
              </div>
            ))}
          </div>
        </div>
        {/* Removed 'View Entire Collection' button as requested */}
      </div>
    </div>,
    document.body
  );
}
