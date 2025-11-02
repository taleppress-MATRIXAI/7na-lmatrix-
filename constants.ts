import { HomeIcon, BookOpenIcon, PlayIcon, ChartBarIcon, NewspaperIcon, CalendarIcon, ShoppingCartIcon, SparklesIcon } from './components/icons/Icons';
import { DayOfWeek, AnimeGenre, TradingConcept } from './types';

export const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/anime', label: 'Anime', icon: ChartBarIcon },
  { href: '/courses', label: 'Reviews', icon: PlayIcon },
  { href: '/manga', label: 'Manga', icon: BookOpenIcon },
  { href: '/news', label: 'News', icon: NewspaperIcon },
];

export const MORE_NAV_ITEMS = [
  { href: '/planner', label: 'Watch Schedule', icon: CalendarIcon },
  { href: '/watchlist', label: 'My Watchlist', icon: ShoppingCartIcon },
  { href: '/products', label: 'Merch', icon: SparklesIcon },
  { href: '/assistant', label: 'AI Assistant', icon: SparklesIcon },
];


export const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const ANIME_GENRES: AnimeGenre[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'];
export const TRADING_CONCEPTS: TradingConcept[] = ['PRICE ACTION', 'TREND FOLLOWING', 'MEAN REVERSION', 'BREAKOUT', 'MOMENTUM', 'SCALPING', 'SWING TRADING', 'POSITION TRADING'];