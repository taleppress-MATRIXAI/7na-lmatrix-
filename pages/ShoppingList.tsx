
import React from 'react';
import { usePlanner } from '../hooks/usePlanner';
import { WatchlistItem } from '../types';

const TradesList: React.FC = () => {
  const { tradesList } = usePlanner();

  const groupedList = tradesList.reduce((acc, item) => {
    const assetClass = item.assetClass || 'Other';
    if (!acc[assetClass]) {
      acc[assetClass] = [];
    }
    acc[assetClass].push(item);
    return acc;
  }, {} as Record<string, WatchlistItem[]>);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Trades List</h1>
        <p className="text-light-text mt-1">A watchlist generated from your planned strategies.</p>
      </header>

      {tradesList.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-light-text">Your trades list is empty.</p>
            <p className="text-sm text-gray-400">Add some strategies to your planner to get started!</p>
        </div>
      ) : (
        <div className="space-y-6">
            {Object.entries(groupedList).map(([assetClass, items]) => (
                <div key={assetClass} className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">{assetClass}</h2>
                    <ul className="space-y-3">
                        {items.map(item => (
                            <li key={item.id} className="flex items-center">
                                <input id={`item-${item.id}`} type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary-green focus:ring-primary-green" />
                                <label htmlFor={`item-${item.id}`} className="ml-3 text-dark-text peer-checked:line-through peer-checked:text-light-text">{item.original}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TradesList;
