import React, { useState, useEffect, useCallback } from 'react';
import { searchProducts } from '../services/spoonacularService';
import { ProductSummary } from '../types';
import { SearchIcon } from '../components/icons/Icons';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const performSearch = useCallback(async () => {
    setLoading(true);
    const results = await searchProducts(searchTerm);
    setProducts(results);
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch();
  };


  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Product Bundles</h1>
        <p className="text-light-text mt-1">Curated collections of books to accelerate your learning.</p>
      </header>
      
      <form onSubmit={handleSearch} className="sticky top-0 z-10 py-2">
        <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for bundles like 'beginner', 'psychology'..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition"
            />
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
        </div>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-96 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="col-span-full text-center text-light-text py-10">No products found. Try a different search term.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;