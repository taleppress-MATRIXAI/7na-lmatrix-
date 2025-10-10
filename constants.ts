import { HomeIcon, BookOpenIcon, PlayIcon, ChartBarIcon, NewspaperIcon, CalendarIcon, ShoppingCartIcon, SparklesIcon } from './components/icons/Icons';
import { DayOfWeek, TradingConcept } from './types';

export const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/strategies', label: 'Strategies', icon: ChartBarIcon },
  { href: '/courses', label: 'Courses', icon: PlayIcon },
  { href: '/books', label: 'Books', icon: BookOpenIcon },
  { href: '/news', label: 'News', icon: NewspaperIcon },
];

export const MORE_NAV_ITEMS = [
  { href: '/planner', label: 'News Planner', icon: CalendarIcon },
  { href: '/trades-list', label: 'Trades List', icon: ShoppingCartIcon },
  { href: '/products', label: 'Products', icon: SparklesIcon },
  { href: '/assistant', label: 'AI Assistant', icon: SparklesIcon },
];


export const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const TRADING_CONCEPTS: TradingConcept[] = ['PRICE ACTION', 'ICT', 'SK SESTEM', 'SPmodel', 'SMC'];