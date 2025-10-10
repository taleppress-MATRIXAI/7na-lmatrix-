export interface StrategySummary {
  id: number;
  title: string;
  image: string;
  timeframe: string;
  assetClass: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface StrategyRule {
  id: number;
  name: string;
  description: string;
  category: 'Indicator' | 'Price Action' | 'Risk Management' | 'Entry' | 'Exit';
}

export interface ExecutionStep {
  number: number;
  step: string;
}

export interface Strategy extends StrategySummary {
  rules: StrategyRule[];
  executionSteps: {
    name: string;
    steps: ExecutionStep[];
  }[];
  summary: string;
}

export type TradingConcept = 'PRICE ACTION' | 'ICT' | 'SK SESTEM' | 'SPmodel' | 'SMC';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface PlannedTrade {
  id: string; // unique id for each planned item
  day: DayOfWeek;
  concept: TradingConcept;
  strategy: StrategySummary;
}

export interface WatchlistItem {
    id: number;
    name: string;
    original: string;
    assetClass: string;
}

export interface BookSummary {
  id: number;
  title: string;
  author: string;
  image: string;
  tags: string[];
}

export interface ProductSummary {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  includedBooks: number;
  tags: string[];
}

export type SearchResult = (StrategySummary & { type: 'strategy' }) | (BookSummary & { type: 'book' });

export interface NewsEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm (24h)
  impact: 'High' | 'Medium' | 'Low';
  image: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  text: string;
  url: string;
  image: string;
  publish_date: string;
  authors: string[];
}