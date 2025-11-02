export interface AnimeSummary {
  id: number;
  title: string;
  image: string;
  episodes: number;
  genre: string;
  rating: number;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
}

export interface StrategySummary {
  id: number;
  title: string;
  image: string;
  timeframe: string;
  assetClass: string;
  rating: number;
  riskLevel: string;
}

export interface BookSummary {
  id: number;
  title: string;
  author: string;
  image: string;
  tags: string[];
}

export interface Character {
  id: number;
  name: string;
  description: string;
  role: 'Main' | 'Supporting' | 'Antagonist';
}

export interface Episode {
  number: number;
  title: string;
  duration: string;
}

export interface Anime extends AnimeSummary {
  characters: Character[];
  episodeList: Episode[];
  synopsis: string;
  year: number;
  studio: string;
}

export interface Rule {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface ExecutionStep {
  number: number;
  step: string;
}

export interface Strategy extends StrategySummary {
  rules?: Rule[];
  executionSteps?: { steps: ExecutionStep[] }[];
  summary?: string;
}

export type AnimeGenre = 'Action' | 'Adventure' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Slice of Life';

export type TradingConcept = 'PRICE ACTION' | 'TREND FOLLOWING' | 'MEAN REVERSION' | 'BREAKOUT' | 'MOMENTUM' | 'SCALPING' | 'SWING TRADING' | 'POSITION TRADING';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface PlannedWatch {
  id: string;
  day: DayOfWeek;
  genre: AnimeGenre;
  anime: AnimeSummary;
}

export interface PlannedTrade {
  id: string;
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

export interface MangaSummary {
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
  includedItems: number;
  tags: string[];
}

export type SearchResult = (AnimeSummary & { type: 'anime' }) | (MangaSummary & { type: 'manga' }) | (StrategySummary & { type: 'strategy' }) | (BookSummary & { type: 'book' });

export interface NewsEvent {
  id: string;
  title: string;
  date: string;
  time: string;
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