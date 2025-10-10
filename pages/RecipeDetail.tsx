
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStrategyInformation } from '../services/spoonacularService';
import { Strategy, DayOfWeek, TradingConcept } from '../types';
import { ChevronLeftIcon, ClockIcon, ShieldCheckIcon } from '../components/icons/Icons';
import { usePlanner } from '../hooks/usePlanner';
import { DAYS_OF_WEEK, TRADING_CONCEPTS } from '../constants';

const StrategyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [loading, setLoading] = useState(true);
  const { addStrategyToPlanner } = usePlanner();
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedConcept, setSelectedConcept] = useState<TradingConcept>('PRICE ACTION');

  useEffect(() => {
    const fetchStrategy = async () => {
      if (id) {
        setLoading(true);
        const data = await getStrategyInformation(parseInt(id, 10));
        setStrategy(data);
        setLoading(false);
      }
    };
    fetchStrategy();
  }, [id]);
  
  const handleAddToPlanner = () => {
    if (strategy) {
      addStrategyToPlanner(strategy, selectedDay, selectedConcept);
      setShowPlannerModal(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-primary-green border-dashed rounded-full animate-spin"></div>
    </div>
  );
  if (!strategy) return <div>Strategy not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-primary-green font-semibold mb-4">
        <ChevronLeftIcon className="w-5 h-5" />
        <span>Back to Strategies</span>
      </button>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={strategy.image} alt={strategy.title} className="w-full h-64 md:h-96 object-cover" />
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{strategy.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: strategy.summary || '' }} className="text-light-text mb-6"></div>

          <div className="flex items-center space-x-6 mb-8 text-center">
             <div className="flex items-center space-x-2">
                <ClockIcon className="w-6 h-6 text-primary-green"/>
                <div>
                    <div className="font-bold">{strategy.timeframe}</div>
                    <div className="text-sm text-light-text">Timeframe</div>
                </div>
            </div>
             <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-6 h-6 text-accent-orange"/>
                <div>
                    <div className="font-bold">{strategy.riskLevel}</div>
                    <div className="text-sm text-light-text">Risk Level</div>
                </div>
            </div>
             <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>
                <div>
                    <div className="font-bold">{strategy.assetClass}</div>
                    <div className="text-sm text-light-text">Asset Class</div>
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <button onClick={() => setShowPlannerModal(true)} className="w-full bg-primary-green text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
              Add to Trading Plan
            </button>
            <Link to={`/trade/${strategy.id}`} state={{ strategy }} className="w-full text-center bg-accent-orange text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
              Execute Strategy
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Rules & Indicators</h2>
              <ul className="space-y-3">
                {strategy.rules?.map(rule => (
                  <li key={rule.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-dark-text">{rule.name} <span className="text-xs bg-blue-100 text-blue-800 font-medium ml-2 px-2 py-0.5 rounded-full">{rule.category}</span></div>
                    <p className="text-sm text-light-text">{rule.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Execution Steps</h2>
              <ol className="space-y-4">
                {strategy.executionSteps?.[0]?.steps.map(step => (
                  <li key={step.number} className="flex">
                    <span className="bg-primary-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">{step.number}</span>
                    <p className="pt-1">{step.step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      {showPlannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-xl font-bold mb-4">Add to Trading Plan</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
                        <select id="day" value={selectedDay} onChange={e => setSelectedDay(e.target.value as DayOfWeek)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-green focus:border-primary-green sm:text-sm rounded-md">
                            {DAYS_OF_WEEK.map(day => <option key={day}>{day}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="concept" className="block text-sm font-medium text-gray-700">Trading Concept</label>
                        <select id="concept" value={selectedConcept} onChange={e => setSelectedConcept(e.target.value as TradingConcept)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-green focus:border-primary-green sm:text-sm rounded-md">
                            {TRADING_CONCEPTS.map(concept => <option key={concept}>{concept}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setShowPlannerModal(false)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleAddToPlanner} className="bg-primary-green text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">Add</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default StrategyDetail;
