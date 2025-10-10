
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { PlannedTrade, StrategySummary, WatchlistItem, DayOfWeek, TradingConcept } from '../types';

interface PlannerContextType {
  plannedTrades: PlannedTrade[];
  addStrategyToPlanner: (strategy: StrategySummary, day: DayOfWeek, concept: TradingConcept) => void;
  removeTradeFromPlanner: (tradeId: string) => void;
  getTradesForDay: (day: DayOfWeek) => PlannedTrade[];
  tradesList: WatchlistItem[];
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plannedTrades, setPlannedTrades] = useState<PlannedTrade[]>(() => {
    try {
      const item = window.localStorage.getItem('plannedTrades');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  
  const [tradesList, setTradesList] = useState<WatchlistItem[]>([]);

  const generateTradesList = useCallback(() => {
    const newTradesList: WatchlistItem[] = [];
    const addedAssets = new Set<string>();

    plannedTrades.forEach(({ strategy }) => {
        const dummyAsset: WatchlistItem = {
            id: strategy.id,
            name: `${strategy.assetClass} Asset for ${strategy.title.split(' ')[0]}`,
            original: `Monitor ${strategy.assetClass} market for ${strategy.title}`,
            assetClass: strategy.assetClass,
        };

        if (!addedAssets.has(dummyAsset.name.toLowerCase())) {
            newTradesList.push(dummyAsset);
            addedAssets.add(dummyAsset.name.toLowerCase());
        }
    });
    setTradesList(newTradesList);
  }, [plannedTrades]);


  useEffect(() => {
    try {
      window.localStorage.setItem('plannedTrades', JSON.stringify(plannedTrades));
      generateTradesList();
    } catch (error) {
      console.error(error);
    }
  }, [plannedTrades, generateTradesList]);
  
  const addStrategyToPlanner = useCallback((strategy: StrategySummary, day: DayOfWeek, concept: TradingConcept) => {
    const newTrade: PlannedTrade = {
        id: `${day}-${concept}-${strategy.id}-${Date.now()}`,
        day,
        concept,
        strategy,
    };
    setPlannedTrades(prev => [...prev, newTrade]);
  }, []);

  const removeTradeFromPlanner = useCallback((tradeId: string) => {
    setPlannedTrades(prev => prev.filter(trade => trade.id !== tradeId));
  }, []);
  
  const getTradesForDay = useCallback((day: DayOfWeek) => {
    return plannedTrades.filter(trade => trade.day === day);
  }, [plannedTrades]);

  return (
    <PlannerContext.Provider value={{ plannedTrades, addStrategyToPlanner, removeTradeFromPlanner, getTradesForDay, tradesList }}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = (): PlannerContextType => {
  const context = useContext(PlannerContext);
  if (context === undefined) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
