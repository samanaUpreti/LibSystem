import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BOOKS = [
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    image: '/books/pride.png',
    tags: ['Classic', 'Romance', 'Drama'],
  },
  {
    title: 'Caraval',
    author: 'Stephanie Garber',
    image: '/books/caraval.png',
    tags: ['Fantasy', 'Romance', 'Adventure', 'Magic'],
  },
  {
    title: 'Powerless',
    author: 'Lauren Roberts',
    image: '/books/powerless.png',
    tags: ['Romance', 'Fantasy', 'Enemies to Lovers', 'Dystopian'],
  },
  {
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    image: '/books/fourth.png',
    tags: ['Fantasy', 'Romance', 'Dragons', 'Historical', 'Enemies to Lovers'],
  },
  {
    title: 'The Ballad of Songbirds and Snakes',
    author: 'Suzanne Collins',
    image: '/books/ballad.png',
    tags: ['Dystopian', 'Romance', 'Prequel', 'Survival'],
  },
  {
    title: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    image: '/books/court.png',
    tags: ['Fantasy', 'Romance', 'Historical', 'Enemies to Lovers'],
  },
  {
    title: 'The Atlas Six',
    author: 'Olivie Blake',
    image: '/books/atlas.png',
    tags: ['Fantasy', 'Dark', 'Historical', 'Magic'],
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    image: '/books/seven.png',
    tags: ['Historical', 'Romance', 'Drama', 'LGBTQ+'],
  },
  {
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    image: '/books/song.png',
    tags: ['Mythology', 'Romance', 'Tragedy', 'LGBTQ+'],
  },
  {
    title: 'Six of Crows',
    author: 'Leigh Bardugo',
    image: '/books/six.png',
    tags: ['Fantasy', 'Heist', 'Found Family', 'Dark'],
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    image: '/books/hunger.png',
    tags: ['Dystopian', 'Survival', 'Romance', 'Rebellion'],
  },
  {
    title: 'The Cruel Prince',
    author: 'Holly Black',
    image: '/books/cruel.png',
    tags: ['Fantasy', 'Fairy', 'Enemies to Lovers', 'Court'],
  },
  {
    title: 'Red, White & Royal Blue',
    author: 'Casey McQuiston',
    image: '/books/red.png',
    tags: ['Romance', 'LGBTQ+', 'Royalty', 'Enemies to Lovers'],
  },
  {
    title: 'Shatter Me',
    author: 'Tahereh Mafi',
    image: '/books/shatter.png',
    tags: ['Dystopian', 'Romance', 'Supernatural', 'Sci-Fi'],
  },
  {
    title: 'Once Upon a Broken Heart',
    author: 'Stephanie Garber',
    image: '/books/onceupon.png',
    tags: ['Fantasy', 'Romance', 'Fairy Tale'],
  },
  {
    title: 'Reckless',
    author: 'Lauren Roberts',
    image: '/books/reckless.png',
    tags: ['Romance', 'Fantasy', 'Enemies to Lovers', 'Dystopian'],
  },
];

const TAGS = [
  'All Books',
  'Mythology',
  'Romance',
  'Adventure',
  'Fantasy',
  'Historical',
  'Sci-Fi',
  'Drama',
  'Dystopian',
   'Fairy',
];

export default function Books() {
  const [selectedTag, setSelectedTag] = useState('All Books');
  const navigate = useNavigate();
  const filteredBooks = selectedTag === 'All Books'
    ? BOOKS
    : BOOKS.filter(book => book.tags.includes(selectedTag));

  return (
    <div className="px-8 py-8 min-h-screen" style={{ background: '#f5d5e7' }}>
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-5 py-2 rounded-full bg-[#ede5fb] text-[#7b666b] font-semibold text-base hover:bg-[#d6c6f7] transition shadow"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-3xl font-extrabold text-[#7b666b] mb-2">The Archives</h1>
      <p className="text-lg text-[#8f7f7d] mb-6">Wander through our curated collection of ethereal wisdom and whispered stories.</p>
      <div className="flex gap-3 mb-8 flex-wrap">
        {TAGS.map(tag => (
          <button
            key={tag}
            className={`px-5 py-2 rounded-full font-semibold text-base transition-all ${selectedTag === tag ? 'bg-[#bba6b6] text-white' : 'bg-[#f3f0f7] text-[#7b666b] hover:bg-[#e5d8f7]'}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book, idx) => (
          <div
            key={book.title}
            className="rounded-3xl bg-white shadow-lg p-4 flex flex-col items-center border-2 border-[#f3f0f7] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#e5d8f7] cursor-pointer"
          >
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-[#f7f5fa] flex items-center justify-center">
              <img src={book.image} alt={book.title} className="object-cover h-full w-full" />
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="font-bold text-lg text-[#6b5457] text-center">{book.title}</div>
              <div className="text-sm text-[#8f7f7d] mb-2 text-center">By {book.author}</div>
              <div className="flex gap-2 mb-3 flex-wrap justify-center">
                {book.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold bg-[#f3f0f7] text-[#7b666b] border border-[#e5d8f7]">{tag}</span>
                ))}
              </div>
              <button
                className="w-full py-2 rounded-full bg-[#ede5fb] text-[#7b666b] font-semibold text-base hover:bg-[#d6c6f7] transition"
                onClick={() => navigate('/issued-books')}
              >
                Issue Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { BOOKS };
