
import React from 'react';
import { Link } from 'react-router-dom';
import { StrategySummary } from '../types';
import { ClockIcon, ShieldCheckIcon } from './icons/Icons';

interface StrategyCardProps {
  strategy: StrategySummary;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy }) => {
  const riskColor = {
    Low: 'text-primary-green',
    Medium: 'text-yellow-500',
    High: 'text-red-500',
  };

  return (
    <Link to={`/strategy/${strategy.id}`} className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={strategy.image}
          alt={strategy.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white text-lg font-bold">{strategy.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center text-light-text text-sm">
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{strategy.timeframe}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ShieldCheckIcon className={`w-4 h-4 ${riskColor[strategy.riskLevel]}`} />
            <span className={riskColor[strategy.riskLevel]}>{strategy.riskLevel} Risk</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StrategyCard;
