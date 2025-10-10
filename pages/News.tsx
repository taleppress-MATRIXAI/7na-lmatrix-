import React, { useState, useEffect } from 'react';
import { fetchTradingNews } from '../services/spoonacularService';
import { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const newsData = await fetchTradingNews();
      setArticles(newsData);
      setLoading(false);
    };
    getNews();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Market News</h1>
        <p className="text-light-text mt-1">Stay updated with the latest news affecting the markets.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-96 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map(article => <NewsCard key={article.id} article={article} />)
          ) : (
            <p className="col-span-full text-center text-light-text py-10">No news articles found at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default News;