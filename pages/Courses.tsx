import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { searchAllInformation } from '../services/spoonacularService';
import { SearchResult } from '../types';
import StrategyCard from '../components/RecipeCard';
import BookCard from '../components/BookCard';
import { SearchIcon } from '../components/icons/Icons';

const CONTENT_TYPE_FILTERS = ['All', 'Strategies', 'Books'];
const RISK_FILTERS = ['Low', 'Medium', 'High'];

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);
  
  const [contentTypeFilter, setContentTypeFilter] = useState('All');
  const [activeRiskFilters, setActiveRiskFilters] = useState<string[]>([]);

  const performSearch = useCallback(async (query: string) => {
    setLoading(true);
    const data = await searchAllInformation(query);
    setResults(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
        performSearch(searchTerm);
    }, 300); // Debounce search
    return () => clearTimeout(handler);
  }, [searchTerm, performSearch]);

  const handleRiskFilterToggle = (filter: string) => {
    setActiveRiskFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };
  
  const filteredResults = useMemo(() => {
    return results.filter(item => {
      const typeMatch = contentTypeFilter === 'All' || 
                        (contentTypeFilter === 'Strategies' && item.type === 'strategy') ||
                        (contentTypeFilter === 'Books' && item.type === 'book');
      if (!typeMatch) return false;

      if (item.type === 'strategy' && activeRiskFilters.length > 0) {
        return activeRiskFilters.includes(item.riskLevel);
      }
      
      return true;
    });
  }, [results, contentTypeFilter, activeRiskFilters]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Explore Information</h1>
        <p className="text-light-text mt-1">Search for strategies and books in one place.</p>
      </header>
      
      <div className="sticky top-0 z-10 py-2">
        <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for strategies, books, authors..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition"
            />
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <span className="text-sm font-semibold text-gray-700 self-center whitespace-nowrap">Content:</span>
                {CONTENT_TYPE_FILTERS.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setContentTypeFilter(filter)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                            contentTypeFilter === filter
                            ? 'bg-primary-green text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {(contentTypeFilter === 'All' || contentTypeFilter === 'Strategies') && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 mt-2 sm:mt-0">
                    <span className="text-sm font-semibold text-gray-700 self-center whitespace-nowrap">Risk:</span>
                     {RISK_FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => handleRiskFilterToggle(filter)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                                activeRiskFilters.includes(filter) 
                                ? 'bg-accent-orange text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredResults.length > 0 ? (
            filteredResults.map(item => {
              if (item.type === 'strategy') {
                return <StrategyCard key={`strategy-${item.id}`} strategy={item} />;
              }
              if (item.type === 'book') {
                return <BookCard key={`book-${item.id}`} book={item} />;
              }
              return null;
            })
          ) : (
            <p className="col-span-full text-center text-light-text py-10">No results found. Try adjusting your search or filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
