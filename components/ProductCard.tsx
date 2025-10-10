import React from 'react';
import { ProductSummary } from '../types';
import { BookOpenIcon } from './icons/Icons';

interface ProductCardProps {
  product: ProductSummary;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-dark-text mb-2">{product.title}</h3>
        <p className="text-sm text-light-text flex-grow mb-4">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <BookOpenIcon className="w-4 h-4" />
            <span>{product.includedBooks} Books</span>
          </div>
          <span className="text-lg font-bold text-primary-green">${product.price.toFixed(2)}</span>
        </div>
      </div>
       <div className="p-4 bg-gray-50">
        <button className="w-full bg-accent-orange text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
            View Bundle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;