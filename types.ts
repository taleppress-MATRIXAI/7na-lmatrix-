export interface AnimeSummary {
  id: number;
  title: string;
  image: string;
  episodes: number;
  genre: string;
  rating: number;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
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

export type AnimeGenre = 'Action' | 'Adventure' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Slice of Life';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface PlannedWatch {
  id: string;
  day: DayOfWeek;
  genre: AnimeGenre;
  anime: AnimeSummary;
}

export interface WatchlistItem {
    id: number;
    name: string;
    original: string;
    genre: string;
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

export type SearchResult = (AnimeSummary & { type: 'anime' }) | (MangaSummary & { type: 'manga' });

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