import React, { useState, useEffect, useCallback } from 'react';
import StrategyCard from '../components/RecipeCard';
import BookCard from '../components/BookCard';
import { StrategySummary, BookSummary } from '../types';
import { searchStrategies, getRandomBooks } from '../services/spoonacularService';

const Strategies: React.FC = () => {
  const [strategies, setStrategies] = useState<StrategySummary[]>([]);
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const performSearch = useCallback(async (query: string) => {
    setLoading(true);
    const results = await searchStrategies(query);
    setStrategies(results);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    performSearch('');
    const fetchRandomBooks = async () => {
        const randomBooks = await getRandomBooks(4);
        setBooks(randomBooks);
    };
    fetchRandomBooks();
  }, [performSearch]);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Find a Strategy</h1>
        <p className="text-light-text mt-1">Search for your favorite strategies or discover new ones.</p>
      </header>
      
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for scalping, swing trade, forex..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition"
        />
        <button type="submit" className="bg-primary-green text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Search
        </button>
      </form>
      
      <section>
        <h2 className="text-xl font-bold mb-4">Recommended Books</h2>
         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
      </section>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-72 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {strategies.length > 0 ? (
            strategies.map(strategy => <StrategyCard key={strategy.id} strategy={strategy} />)
          ) : (
            <p className="col-span-full text-center text-light-text">No strategies found. Try another search!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Strategies;