import React, { useState, useEffect, useCallback } from 'react';
import BookCard from '../components/BookCard';
import { BookSummary } from '../types';
import { searchBooks } from '../services/spoonacularService';
import { SearchIcon } from '../components/icons/Icons';

const BOOK_FILTERS = ['Low Risk', 'High Risk', 'Good Strategy'];

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const performSearch = useCallback(async () => {
    setLoading(true);
    const results = await searchBooks(searchTerm, activeFilters);
    setBooks(results);
    setLoading(false);
  }, [searchTerm, activeFilters]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);
  
  const handleFilterToggle = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Trading Books</h1>
        <p className="text-light-text mt-1">Expand your knowledge with curated trading literature.</p>
      </header>
      
      <div className="sticky top-0 z-10 py-2">
        <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition"
            />
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
        </div>
         <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
            {BOOK_FILTERS.map(filter => (
                <button
                    key={filter}
                    onClick={() => handleFilterToggle(filter)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                        activeFilters.includes(filter) 
                        ? 'bg-primary-green text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-60 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.length > 0 ? (
            books.map(book => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="col-span-full text-center text-light-text py-10">No books found. Try adjusting your search or filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;