import React from 'react';
import { NewsArticle } from '../types';
import { CalendarIcon } from './icons/Icons';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formattedDate = new Date(article.publish_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group flex flex-col">
      <div className="relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-dark-text mb-2 group-hover:text-primary-green transition-colors">{article.title}</h3>
        <p className="text-sm text-light-text flex-grow mb-4 line-clamp-3">{article.text}</p>
        <div className="flex items-center text-xs text-gray-500 mt-auto">
          <CalendarIcon className="w-4 h-4 mr-1.5" />
          <span>{formattedDate}</span>
          <span className="mx-1.5">•</span>
          <span>{article.authors.join(', ')}</span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;