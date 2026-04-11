import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';

const MOODS = ["Whimsical", "Cozy", "Mysterious", "Melancholy"];

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [mood, setMood] = useState(user?.primaryMood || MOODS[0]);
  const [avatar, setAvatar] = useState(user?.avatar || "/profile-avatar.png");
  const [saving, setSaving] = useState(false);

  function handleAvatarChange(e) {
    // For demo: just preview, not upload
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // Send update to backend
      const res = await authAPI.updateProfile({
        username: displayName,
        email,
        bio,
        primaryMood: mood,
        avatar,
      });
      if (res.data && res.data.data) {
        updateUser(res.data.data);
      }
      setSaving(false);
      navigate("/profile");
    } catch (err) {
      setSaving(false);
      alert("Failed to save profile. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfaf7] px-2 py-10">
      <h1 className="text-2xl font-extrabold font-display text-[#6b5457] mb-2">Personalize Your Nook</h1>
      <p className="text-[#8f7f7d] mb-7">Update your presence in the digital library</p>
      <form onSubmit={handleSave} className="w-full max-w-md bg-white rounded-[32px] shadow-[0_10px_32px_rgba(232,223,216,0.18)] p-8 flex flex-col items-center">
        <label className="relative mb-4 cursor-pointer group">
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-[#ede5fb] shadow" />
          <span className="block text-xs text-[#8f7f7d] mt-2">Change Avatar</span>
          <span className="block text-[10px] text-[#b3a6a2]">Soft / focus images recommended</span>
        </label>
        <div className="w-full mb-4">
          <label className="block text-xs font-bold text-[#b3a6a2] mb-1">DISPLAY NAME</label>
          <input type="text" className="w-full rounded-xl bg-[#f2efea] px-4 py-2 text-[#6b5457] font-semibold outline-none" value={displayName} onChange={e => setDisplayName(e.target.value)} />
        </div>
        <div className="w-full mb-4">
          <label className="block text-xs font-bold text-[#b3a6a2] mb-1">EMAIL ADDRESS</label>
          <input type="email" className="w-full rounded-xl bg-[#f2efea] px-4 py-2 text-[#6b5457] font-semibold outline-none" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="w-full mb-4">
          <label className="block text-xs font-bold text-[#b3a6a2] mb-1">READING BIO</label>
          <textarea className="w-full rounded-xl bg-[#f2efea] px-4 py-2 text-[#6b5457] font-semibold outline-none min-h-[60px]" value={bio} onChange={e => setBio(e.target.value)} />
        </div>
        <div className="w-full mb-6">
          <label className="block text-xs font-bold text-[#b3a6a2] mb-2">PRIMARY READING MOOD</label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map(m => (
              <button
                type="button"
                key={m}
                className={`px-3 py-1 rounded-full font-bold text-xs border transition ${mood === m ? 'bg-[#ede5fb] text-[#7b6b8a] border-[#cfa6b6]' : 'bg-[#f2efea] text-[#b3a6a2] border-transparent'}`}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full gap-3 mt-2">
          <button type="submit" disabled={saving} className="flex-1 rounded-full bg-gradient-to-r from-[#cfa6b6] to-[#ede5fb] text-white font-bold py-3 shadow transition hover:from-[#b98ca2] hover:to-[#e2d6f3] disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="flex-1 rounded-full bg-[#f2efea] text-[#b3a6a2] font-bold py-3 shadow transition hover:bg-[#ede5fb]" onClick={() => navigate('/profile')}>
            Cancel
          </button>
        </div>
      </form>
      <div className="text-xs text-[#b3a6a2] mt-8 italic text-center max-w-md mx-auto">“We are all a little bit of every book we’ve ever read.”</div>
    </div>
  );
}
