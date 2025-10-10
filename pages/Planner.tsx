import React, { useState, useEffect, useMemo } from 'react';
import { getNewsEvents } from '../services/spoonacularService';
import { NewsEvent } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/icons/Icons';

const impactColors = {
  High: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
  Low: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
};

const NewsPlanner: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const events = await getNewsEvents(currentYear, currentMonth + 1);
      setNewsEvents(events);
      setLoading(false);
    };
    fetchNews();
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const grid: any[] = [];
    for (let i = 0; i < startDayIndex; i++) {
      grid.push({ key: `pad-start-${i}`, isPadding: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const eventsForDay = newsEvents.filter(e => e.date === dateStr);
      grid.push({ key: `day-${day}`, day, events: eventsForDay, isToday: new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString() });
    }

    const remainingCells = (7 - (grid.length % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
        grid.push({ key: `pad-end-${i}`, isPadding: true });
    }

    return grid;
  }, [currentMonth, currentYear, newsEvents]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">News Planner</h1>
        <p className="text-light-text mt-1">Stay ahead of market-moving events.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-center">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-sm text-light-text mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        {loading ? (
             <div className="flex justify-center items-center h-96">
                <div className="w-12 h-12 border-4 border-primary-green border-dashed rounded-full animate-spin"></div>
             </div>
        ) : (
            <div className="grid grid-cols-7 gap-1">
            {calendarGrid.map(cell => {
                if (cell.isPadding) {
                return <div key={cell.key} className="h-24 md:h-40 rounded-lg bg-gray-50/50"></div>;
                }
                const dayHasHighImpact = cell.events.some((e: NewsEvent) => e.impact === 'High');
                return (
                <div key={cell.key} className={`h-24 md:h-40 p-1.5 rounded-lg border-2 ${cell.isToday ? 'border-primary-green' : 'border-transparent'} transition-colors duration-300 ${dayHasHighImpact ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <div className={`font-semibold text-xs md:text-sm ${cell.isToday ? 'text-primary-green' : 'text-dark-text'}`}>{cell.day}</div>
                    <div className="space-y-1 mt-1 overflow-y-auto max-h-[85px] md:max-h-[130px] pr-1">
                    {cell.events?.map((event: NewsEvent) => (
                        <div key={event.id} className={`p-1 rounded-md text-left text-xs border-l-4 ${impactColors[event.impact].border} ${impactColors[event.impact].bg}`}>
                            <div className={`font-bold truncate ${impactColors[event.impact].text}`}>{event.title}</div>
                            <div className="hidden md:block text-light-text">{event.time}</div>
                        </div>
                    ))}
                    </div>
                </div>
                );
            })}
            </div>
        )}
      </div>
       <div className="text-center text-sm text-light-text mt-4">
        <p>A calendar view that displays key market news like FOMC, NFP, and CPI.</p>
       </div>
    </div>
  );
};

export default NewsPlanner;
