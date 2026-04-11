import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Classic Literature',
  'Fantasy',
  'Romance',
  'Science Fiction',
  'Mystery',
  'Non-Fiction',
  'Young Adult',
  'Other',
];

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const navigate = useNavigate();

  function handleCoverChange(e) {
    const file = e.target.files[0];
    setCover(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setCoverPreview(null);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCoverChange({ target: { files: e.dataTransfer.files } });
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here you would send the new book data to your backend or state
    // For now, just go back to books page
    navigate('/books');
  }

  return (
    <div className="flex min-h-screen bg-[#fcfaf7]">
      <aside className="hidden lg:flex flex-col w-[258px] shrink-0 bg-[#f9f8f5] px-4 py-5 shadow-[18px_0_45px_rgba(240,234,228,0.8)]">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f7d8db,#d2adb3)] text-[#7b666b] shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true"><path d="M3.75 5.25A2.25 2.25 0 0 1 6 3h4.5a3 3 0 0 1 2.25 1.017A3 3 0 0 1 15 3h3a2.25 2.25 0 0 1 2.25 2.25v12.878a.75.75 0 0 1-1.093.667A4.48 4.48 0 0 0 17.25 18h-2.625a2.625 2.625 0 0 0-1.875.78.75.75 0 0 1-1.06 0A2.625 2.625 0 0 0 9.815 18H7.125a4.48 4.48 0 0 0-1.907.795.75.75 0 0 1-1.093-.667V5.25Z" /></svg>
          </div>
          <div>
            <p className="font-display text-[1.15rem] font-extrabold text-[#715d61]">The Sanctuary</p>
            <p className="text-sm text-[#8f7f7d]">Reading Nook</p>
          </div>
        </div>
        <nav className="space-y-2 mb-10">
          <button className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition" onClick={() => navigate('/')}>Dashboard</button>
          <button className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left bg-white text-[#5f4c52] shadow-[0_10px_24px_rgba(226,218,211,0.7)] font-semibold transition" disabled>Books</button>
          <button className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition" onClick={() => navigate('/issued-books')}>Issued Books</button>
          <button className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition" onClick={() => navigate('/return')}>Return</button>
          <button className="flex w-full items-center gap-4 rounded-full px-5 py-3.5 text-left text-[1.02rem] font-semibold text-[#66575d] hover:bg-white/70 transition" onClick={() => navigate('/profile')}>Profile</button>
        </nav>
        <button className="mt-auto flex items-center justify-center gap-3 rounded-full bg-[#bba6b6] px-6 py-4 font-display text-[1.05rem] font-bold text-white shadow-[0_14px_30px_rgba(198,162,168,0.35)] mb-8" disabled>+ Add New Book</button>
        <div className="mt-10 space-y-1 text-[1.02rem] text-[#66575d]">
          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70">Settings</button>
          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 hover:bg-white/70">Logout</button>
        </div>
      </aside>
      <main className="flex-1 px-5 py-8 sm:px-7 lg:px-12 flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold text-[#7b666b] mb-2">Edit Sanctuary Piece</h1>
        <p className="text-lg text-[#8f7f7d] mb-8">Curate your digital library with care and soft precision.</p>
        <div className="flex flex-col lg:flex-row gap-8">
          <form className="flex-1 bg-white rounded-3xl shadow p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#bba6b6] text-xs font-bold mb-2">BOOK TITLE</label>
              <input type="text" className="w-full rounded-full bg-[#f2efea] px-5 py-3 text-base text-[#978b87] placeholder-[#b8aeb2] outline-none" placeholder="Enter title of the work..." value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[#bba6b6] text-xs font-bold mb-2">AUTHOR</label>
                <input type="text" className="w-full rounded-full bg-[#f2efea] px-5 py-3 text-base text-[#978b87] placeholder-[#b8aeb2] outline-none" placeholder="Full name..." value={author} onChange={e => setAuthor(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-[#bba6b6] text-xs font-bold mb-2">CATEGORY</label>
                <select className="w-full rounded-full bg-[#f2efea] px-5 py-3 text-base text-[#978b87] outline-none" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#bba6b6] text-xs font-bold mb-2">DESCRIPTION</label>
              <textarea className="w-full rounded-2xl bg-[#f2efea] px-5 py-3 text-base text-[#978b87] placeholder-[#b8aeb2] outline-none min-h-[100px]" placeholder="Tell the story of this book's essence..." value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <button type="submit" className="mt-4 px-8 py-3 rounded-full bg-[#7b666b] text-white font-bold text-lg shadow hover:bg-[#5f4c52] transition self-end">Save Book</button>
          </form>
          <div className="flex flex-col gap-8 w-full max-w-xs">
            <div className="bg-white rounded-3xl shadow p-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#f5d5e7] flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-[#bba6b6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" /></svg>
              </div>
              <label className="block text-[#bba6b6] text-xs font-bold mb-2">Upload Cover Art</label>
              <div
                className="w-full h-32 rounded-2xl bg-[#f2efea] flex flex-col items-center justify-center border-2 border-dashed border-[#bba6b6] cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('cover-upload').click()}
              >
                {coverPreview ? (
                  <img src={coverPreview} alt="Preview" className="h-28 object-contain" />
                ) : (
                  <span className="text-[#bba6b6] text-xs">Drag and drop high-resolution book cover.<br />Supports JPG, PNG, or TIFF</span>
                )}
                <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
              </div>
            </div>
            <div className="bg-[#eaf2fa] rounded-3xl shadow p-6">
              <div className="font-bold text-[#7b666b] mb-2 text-sm">QUICK GUIDE</div>
              <ul className="text-xs text-[#8f7f7d] list-disc pl-4 space-y-1">
                <li>Use high-quality imagery for better aesthetics.</li>
                <li>Categories help users find books by mood.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
