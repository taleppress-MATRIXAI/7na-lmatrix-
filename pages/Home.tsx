import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { BookSummary } from '../types';
import { getRandomBooks } from '../services/spoonacularService';
import { ChartBarIcon, BookOpenIcon, SparklesIcon, CalendarIcon } from '../components/icons/Icons';

const Home: React.FC = () => {
  const [recentBooks, setRecentBooks] = useState<BookSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const books = await getRandomBooks(4);
      setRecentBooks(books);
      setLoading(false);
    };
    fetchBooks();
  }, []);
  
  const actionButtons = [
    { label: 'Strategy', icon: ChartBarIcon, to: '/strategies' },
    { label: 'Book', icon: BookOpenIcon, to: '/books' },
    { label: 'Products', icon: SparklesIcon, to: '/products' },
    { label: 'Strategy Planning', icon: CalendarIcon, to: '/planner' },
  ];

  return (
    <div className="space-y-8">
      <section>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actionButtons.map(item => (
              <Link key={item.label} to={item.to} className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                <item.icon className="w-8 h-8 text-primary-green mb-2"/>
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recent book</h2>
        {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse"></div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        )}
      </section>
    </div>
  );
};

export default Home;