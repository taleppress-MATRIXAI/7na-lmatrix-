import React from 'react';
import { BookSummary } from '../types';
import { HeartIcon } from './icons/Icons';

interface BookCardProps {
  book: BookSummary;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:scale-110 transition-all">
            <HeartIcon className="w-5 h-5"/>
        </button>
      </div>
      <div className="p-3">
         <h3 className="font-bold text-dark-text truncate">{book.title}</h3>
         <p className="text-sm text-light-text">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
