import { Strategy, StrategySummary, BookSummary, ProductSummary, SearchResult, NewsEvent, NewsArticle } from '../types';

const MOCK_STRATEGIES: StrategySummary[] = [
  {
    id: 1,
    title: 'Golden Cross SMA Strategy',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: 'Daily',
    assetClass: 'Stocks',
    riskLevel: 'Medium',
  },
  {
    id: 2,
    title: 'RSI Divergence Scalping',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: '15 Min',
    assetClass: 'Forex',
    riskLevel: 'High',
  },
  {
    id: 3,
    title: 'Support/Resistance Swing Trade',
    image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: '4 Hour',
    assetClass: 'Crypto',
    riskLevel: 'Medium',
  },
  {
    id: 4,
    title: 'MACD Trend Following',
    image: 'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: 'Daily',
    assetClass: 'Stocks',
    riskLevel: 'Low',
  },
    {
    id: 5,
    title: 'Ichimoku Cloud Breakout',
    image: 'https://images.unsplash.com/photo-1639754391392-1b9b5d3a2c8a?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: '1 Hour',
    assetClass: 'Forex',
    riskLevel: 'High',
  },
  {
    id: 6,
    title: 'Bollinger Band Squeeze',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: '4 Hour',
    assetClass: 'Crypto',
    riskLevel: 'Medium',
  },
  {
    id: 7,
    title: 'ICT Silver Bullet',
    image: 'https://images.unsplash.com/photo-1684369176302-3b839a2b2b14?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: '5 Min',
    assetClass: 'Indices',
    riskLevel: 'High',
  },
  {
    id: 8,
    title: 'SP Model Swing',
    image: 'https://images.unsplash.com/photo-1612178537253-bccd437b73ac?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: 'Daily',
    assetClass: 'Indices',
    riskLevel: 'Medium',
  },
];

const MOCK_STRATEGY_DETAILS: { [key: number]: Strategy } = {
  1: {
    id: 1,
    title: 'Golden Cross SMA Strategy',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&h=600&auto=format&fit=crop',
    timeframe: 'Daily',
    assetClass: 'Stocks',
    riskLevel: 'Medium',
    summary: 'A classic long-term trend-following strategy that identifies when a short-term moving average crosses above a long-term moving average, signaling a potential bullish trend.',
    rules: [
      { id: 101, name: '50-Day SMA', description: 'Use a 50-period Simple Moving Average for the short-term trend.', category: 'Indicator' },
      { id: 102, name: '200-Day SMA', description: 'Use a 200-period Simple Moving Average for the long-term trend.', category: 'Indicator' },
      { id: 103, name: 'Golden Cross', description: 'Entry signal is when the 50 SMA crosses above the 200 SMA.', category: 'Entry' },
      { id: 104, name: 'Death Cross', description: 'Exit signal is when the 50 SMA crosses below the 200 SMA.', category: 'Exit' },
      { id: 105, name: 'Stop Loss', description: 'Place a stop loss below the recent swing low or at 2% of capital.', category: 'Risk Management' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Identify a stock and apply the 50-day and 200-day SMAs to the daily chart.' },
        { number: 2, step: 'Wait for a "Golden Cross" event where the 50 SMA decisively crosses over the 200 SMA.' },
        { number: 3, step: 'Enter a long position after the crossover candle closes, confirming the signal.' },
        { number: 4, step: 'Set a stop-loss order below a recent significant price low.' },
        { number: 5, step: 'Hold the position until a "Death Cross" (50 SMA crosses below 200 SMA) occurs as the exit signal.' },
      ]
    }]
  },
  2: {
    ...MOCK_STRATEGIES.find(s => s.id === 2)!,
    summary: 'A short-term scalping strategy that looks for discrepancies between price action and the Relative Strength Index (RSI) to predict potential reversals.',
    rules: [
        { id: 201, name: 'RSI (14)', description: 'Use a 14-period Relative Strength Index.', category: 'Indicator' },
        { id: 202, name: 'Bullish Divergence', description: 'Price makes a lower low, but RSI makes a higher low. Signals potential upside.', category: 'Entry' },
        { id: 203, name: 'Bearish Divergence', description: 'Price makes a higher high, but RSI makes a lower high. Signals potential downside.', category: 'Entry' },
        { id: 204, name: 'Take Profit', description: 'Set a take profit at the next minor support/resistance level.', category: 'Exit' },
        { id: 205, name: 'Stop Loss', description: 'Place a stop loss just beyond the recent price extreme.', category: 'Risk Management' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Monitor price action on a 15-minute chart alongside the 14-period RSI.' },
        { number: 2, step: 'Identify bullish or bearish divergence between price and the RSI.' },
        { number: 3, step: 'Enter a trade in the direction of the expected reversal after a confirmation candle.' },
        { number: 4, step: 'Set a tight stop loss and a take profit target for a quick scalp.' },
      ]
    }]
  },
  3: {
    ...MOCK_STRATEGIES.find(s => s.id === 3)!,
    summary: 'A swing trading strategy that involves identifying key support and resistance levels and trading the bounces or breaks of these levels.',
    rules: [
        { id: 301, name: 'Identify Levels', description: 'Draw horizontal lines at significant price highs (resistance) and lows (support).', category: 'Price Action' },
        { id: 302, name: 'Trade the Bounce', description: 'Enter a long position at support or a short position at resistance.', category: 'Entry' },
        { id: 303, name: 'Trade the Break', description: 'Enter a long position when price breaks above resistance, or short when it breaks below support.', category: 'Entry' },
        { id: 304, name: 'Confirmation', description: 'Wait for a candle to close confirming the bounce or break before entering.', category: 'Entry' },
        { id: 305, name: 'Stop Loss', description: 'Place stop loss on the other side of the support/resistance level.', category: 'Risk Management' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Analyze a 4-hour chart to identify at least two major support and resistance levels.' },
        { number: 2, step: 'Wait for the price to approach one of these key levels.' },
        { number: 3, step: 'Look for price action confirmation (e.g., a pin bar or engulfing candle) for a bounce, or a strong close for a breakout.' },
        { number: 4, step: 'Enter the trade with a stop loss placed logically beyond the level.' },
        { number: 5, step: 'Target the next opposing support or resistance level for taking profit.' },
      ]
    }]
  },
  4: {
    ...MOCK_STRATEGIES.find(s => s.id === 4)!,
    summary: 'A trend-following strategy that uses the Moving Average Convergence Divergence (MACD) indicator to identify the direction and momentum of a trend.',
     rules: [
        { id: 401, name: 'MACD Crossover', description: 'Enter long when the MACD line crosses above the signal line. Enter short when it crosses below.', category: 'Entry' },
        { id: 402, name: 'Zero Line Cross', description: 'A cross above the zero line is bullish; a cross below is bearish. Used for confirmation.', category: 'Indicator' },
        { id: 403, name: 'Trend Confirmation', description: 'Ensure the crossover is aligned with the broader market trend.', category: 'Price Action' },
        { id: 404, name: 'Exit Signal', description: 'Exit the trade on an opposing MACD crossover.', category: 'Exit' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Apply the MACD indicator to a daily chart.' },
        { number: 2, step: 'Wait for the MACD line to cross above the signal line, ideally while both are below the zero line.' },
        { number: 3, step: 'Enter a long position once the crossover is confirmed.' },
        { number: 4, step: 'Hold the position until the MACD line crosses back below the signal line.' },
      ]
    }]
  },
  5: {
    ...MOCK_STRATEGIES.find(s => s.id === 5)!,
    summary: 'This strategy uses the Ichimoku Cloud indicator to identify strong trends. A breakout occurs when the price moves decisively out of the "Kumo" or cloud.',
     rules: [
        { id: 501, name: 'Kumo Breakout', description: 'Enter long when price closes above the cloud. Enter short when price closes below the cloud.', category: 'Entry' },
        { id: 502, name: 'Tenkan/Kijun Cross', description: 'A bullish cross (Tenkan over Kijun) is a secondary buy signal. A bearish cross is a sell signal.', category: 'Indicator' },
        { id: 503, name: 'Chikou Span', description: 'The lagging span should be free from price action for a clear signal (above for buys, below for sells).', category: 'Indicator' },
        { id: 504, name: 'Stop Loss', description: 'Place the stop loss on the other side of the Kumo cloud.', category: 'Risk Management' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Apply the Ichimoku Cloud indicator to a 1-hour chart.' },
        { number: 2, step: 'Wait for the price to break out and close completely above or below the Kumo.' },
        { number: 3, step: 'Confirm the signal with other Ichimoku components (e.g., Tenkan/Kijun cross, Chikou Span location).' },
        { number: 4, step: 'Enter the trade and place a stop loss within the cloud.' },
      ]
    }]
  },
   6: {
    ...MOCK_STRATEGIES.find(s => s.id === 6)!,
    summary: 'A volatility-based strategy where traders look for periods of low volatility (a "squeeze") indicated by narrowing Bollinger Bands, in anticipation of a significant price move.',
     rules: [
        { id: 601, name: 'Identify the Squeeze', description: 'Look for the Bollinger Bands to contract to their narrowest point in recent history.', category: 'Indicator' },
        { id: 602, name: 'Breakout Entry', description: 'Enter a long position when a candle closes above the upper band. Enter short when a candle closes below the lower band.', category: 'Entry' },
        { id: 603, name: 'Volume Confirmation', description: 'The breakout should be accompanied by a surge in trading volume.', category: 'Indicator' },
        { id: 604, name: 'Stop Loss', description: 'Place a stop loss inside the bands, often near the middle band.', category: 'Risk Management' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Apply Bollinger Bands (20, 2) to a 4-hour chart.' },
        { number: 2, step: 'Identify a period where the bands are visibly tightening.' },
        { number: 3, step: 'Wait for a strong candle to close outside of either the upper or lower band.' },
        { number: 4, step: 'Enter a trade in the direction of the breakout.' },
        { number: 5, step: 'Hold the trade as long as the price continues to "walk the band".' },
      ]
    }]
  },
  7: {
    ...MOCK_STRATEGIES.find(s => s.id === 7)!,
    summary: 'A time-based scalping strategy from The Inner Circle Trader (ICT) that targets high-probability setups within specific one-hour windows by capitalizing on liquidity sweeps and market imbalances.',
    rules: [
      { id: 701, name: 'Time Window', description: 'Identify a specific 1-hour "Silver Bullet" session (e.g., 10-11 AM NY Time).', category: 'Price Action' },
      { id: 702, name: 'Liquidity Sweep', description: 'Price must take out a recent, obvious short-term high or low.', category: 'Entry' },
      { id: 703, name: 'Displacement & MSS', description: 'A strong, energetic price move that causes a Market Structure Shift (MSS).', category: 'Price Action' },
      { id: 704, name: 'Fair Value Gap (FVG)', description: 'The displacement must create a 3-candle imbalance, known as a Fair Value Gap.', category: 'Entry' },
      { id: 705, name: 'Stop Loss Placement', description: 'Place stop loss above/below the candle that performed the liquidity sweep.', category: 'Risk Management' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Isolate the specific 1-hour time window on your chart (e.g., 10:00-11:00 AM NY time).' },
        { number: 2, step: 'Wait for price to sweep a nearby pool of liquidity (a recent high or low).' },
        { number: 3, step: 'After the sweep, look for a fast, aggressive move in the opposite direction that breaks a short-term swing point (Market Structure Shift).' },
        { number: 4, step: 'Identify the Fair Value Gap (FVG) created during this aggressive move.' },
        { number: 5, step: 'Enter a trade when price retraces back into the FVG.' },
        { number: 6, step: 'Set your stop loss just beyond the high/low that was initially swept.' },
        { number: 7, step: 'Target an opposing liquidity pool for your take profit.' },
      ]
    }]
  },
  8: {
    ...MOCK_STRATEGIES.find(s => s.id === 8)!,
    summary: 'A swing trading model based on identifying high-probability order blocks on higher timeframes and waiting for price to return to these key institutional levels.',
    rules: [
      { id: 801, name: 'Identify Order Block', description: 'Find a clear, unmitigated bullish or bearish order block on the Daily or 4-Hour chart.', category: 'Price Action' },
      { id: 802, name: 'Liquidity Grab', description: 'Wait for price to engineer liquidity by forming a small high/low, then sweeping it before reaching the order block.', category: 'Entry' },
      { id: 803, name: 'Market Structure Shift', description: 'On a lower timeframe (e.g., 1-Hour), watch for a break of structure confirming a reversal after the order block is hit.', category: 'Price Action' },
      { id: 804, name: 'Target Highs/Lows', description: 'Set take profit at a significant opposing swing high or low where liquidity rests.', category: 'Exit' },
      { id: 805, name: 'Invalidation Level', description: 'Place the stop loss on the other side of the identified order block.', category: 'Risk Management' },
    ],
    executionSteps: [{
      name: '',
      steps: [
        { number: 1, step: 'Scan the Daily chart for a clear, recent order block (the last down-candle before a strong up-move, or vice-versa).' },
        { number: 2, step: 'Mark out the order block and wait for price to return to this level.' },
        { number: 3, step: 'Observe price action as it approaches the order block. Look for signs of liquidity engineering.' },
        { number: 4, step: 'Once price taps into the order block, drop to a lower timeframe (e.g., 1H) to find a Market Structure Shift.' },
        { number: 5, step: 'Enter a trade after the MSS, with a stop loss placed just beyond the order block.' },
        { number: 6, step: 'Target a clear, opposing liquidity pool (an old high or low) for your take profit.' },
      ]
    }]
  },
};

const MOCK_BOOKS: BookSummary[] = [
    { id: 101, title: 'Market Wizards', author: 'Jack D. Schwager', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&h=600&auto=format&fit=crop', tags: ['interviews', 'psychology', 'high risk'] },
    { id: 102, title: 'The Intelligent Investor', author: 'Benjamin Graham', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&h=600&auto=format&fit=crop', tags: ['fundamentals', 'investing', 'low risk'] },
    { id: 103, title: 'Trading in the Zone', author: 'Mark Douglas', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&h=600&auto=format&fit=crop', tags: ['psychology', 'mindset', 'good strategy'] },
    { id: 104, title: 'Reminiscences of a Stock Operator', author: 'Edwin Lefèvre', image: 'https://images.unsplash.com/photo-1541963463532-d682921584e1?q=80&w=800&h=600&auto=format&fit=crop', tags: ['biography', 'history', 'high risk'] },
    { id: 105, title: 'Japanese Candlestick Charting', author: 'Steve Nison', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&h=600&auto=format&fit=crop', tags: ['technical analysis', 'charting', 'good strategy'] },
    { id: 106, title: 'A Random Walk Down Wall Street', author: 'Burton Malkiel', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&h=600&auto=format&fit=crop', tags: ['investing', 'theory', 'low risk'] },
    { id: 107, title: 'Technical Analysis of Financial Markets', author: 'John J. Murphy', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&h=600&auto=format&fit=crop', tags: ['technical analysis', 'education', 'good strategy'] },
    { id: 108, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=800&h=600&auto=format&fit=crop', tags: ['psychology', 'behavioral', 'low risk'] },
];

const MOCK_PRODUCTS: ProductSummary[] = [
    { id: 201, title: 'Beginner Trader Starter Pack', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&h=600&auto=format&fit=crop', description: 'Everything you need to start your trading journey, from fundamentals to your first technical analysis.', price: 49.99, includedBooks: 3, tags: ['beginner', 'fundamentals', 'technical analysis'] },
    { id: 202, title: 'Trading Psychology Masterclass', image: 'https://images.unsplash.com/photo-1554224155-820934def395?q=80&w=800&h=600&auto=format&fit=crop', description: 'Master the mental game of trading. This bundle includes the top books on discipline, mindset, and emotional control.', price: 79.99, includedBooks: 4, tags: ['psychology', 'mindset', 'advanced'] },
    { id: 203, title: 'Technical Analysis Deep Dive', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&h=600&auto=format&fit=crop', description: 'Go beyond the basics with advanced charting techniques, indicators, and pattern recognition.', price: 99.99, includedBooks: 5, tags: ['technical analysis', 'charting', 'advanced'] },
    { id: 204, title: 'Value Investing Essentials', image: 'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=800&h=600&auto=format&fit=crop', description: 'Learn the timeless principles of value investing from the masters. Find undervalued assets for long-term growth.', price: 69.99, includedBooks: 3, tags: ['investing', 'fundamentals', 'low risk'] },
];

// Create some dynamic dates for the current month
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // 1-based month

const MOCK_NEWS_EVENTS: NewsEvent[] = [
  {
    id: 'nfp-1',
    title: 'Non-Farm Payroll',
    date: `${year}-${String(month).padStart(2, '0')}-05`,
    time: '12:30',
    impact: 'High',
    image: 'https://images.unsplash.com/photo-1665686306574-1ace09918530?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cpi-1',
    title: 'CPI Report',
    date: `${year}-${String(month).padStart(2, '0')}-12`,
    time: '12:30',
    impact: 'High',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'fomc-1',
    title: 'FOMC Statement',
    date: `${year}-${String(month).padStart(2, '0')}-18`,
    time: '18:00',
    impact: 'High',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
  },
    {
    id: 'jobless-1',
    title: 'Initial Jobless Claims',
    date: `${year}-${String(month).padStart(2, '0')}-18`,
    time: '12:30',
    impact: 'Medium',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
  },
];

const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "Global Markets Rally as Inflation Fears Subside",
    text: "Stock markets worldwide saw a significant uptick today as new data suggests that inflation may be cooling faster than anticipated. The Dow Jones Industrial Average surged by over 500 points...",
    url: "#",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=800&auto=format&fit=crop",
    publish_date: "2024-07-22 14:30:00",
    authors: ["Jane Doe", "Market Insights"],
  },
  {
    id: 2,
    title: "Federal Reserve Hints at Pausing Interest Rate Hikes",
    text: "In a much-anticipated speech, the Federal Reserve Chair hinted at a potential pause in the aggressive interest rate hike cycle. This news sent ripples through the currency markets, with the US Dollar weakening against major pairs.",
    url: "#",
    image: "https://images.unsplash.com/photo-1600489000021-2198ac281204?q=80&w=800&auto=format&fit=crop",
    publish_date: "2024-07-22 11:15:00",
    authors: ["John Smith"],
  },
  {
    id: 3,
    title: "Crypto Market Sees Volatility Spike After Regulatory News",
    text: "The cryptocurrency market experienced a rollercoaster of a day following new regulatory announcements from the SEC. Bitcoin briefly dipped below $60,000 before recovering some of its losses.",
    url: "#",
    image: "https://images.unsplash.com/photo-1641427244199-629a1e2854e5?q=80&w=800&auto=format&fit=crop",
    publish_date: "2024-07-22 09:00:00",
    authors: ["CryptoChronicle"],
  },
  {
    id: 4,
    title: "Technical Analysis: Is the S&P 500 Poised for a Breakout?",
    text: "The S&P 500 has been consolidating in a tight range for the past two weeks, forming a classic bullish pennant pattern. Analysts are closely watching the 5,500 level for a potential breakout to the upside.",
    url: "#",
    image: "https://images.unsplash.com/photo-1658937213453-782410a8449c?q=80&w=800&auto=format&fit=crop",
    publish_date: "2024-07-21 18:00:00",
    authors: ["ChartMaster"],
  },
];

export const findByIndicators = async (indicators: string[]): Promise<StrategySummary[]> => {
  console.log('Searching for strategies with indicators:', indicators);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...MOCK_STRATEGIES].sort(() => 0.5 - Math.random()).slice(0, 4));
    }, 500);
  });
};

export const getStrategyInformation = async (id: number): Promise<Strategy | null> => {
  console.log('Fetching details for strategy ID:', id);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_STRATEGY_DETAILS[id] || MOCK_STRATEGIES.find(r => r.id === id) as Strategy || null);
    }, 500);
  });
};

export const searchStrategies = async (query: string): Promise<StrategySummary[]> => {
    console.log('Searching for strategies with query:', query);
    return new Promise(resolve => {
        setTimeout(() => {
            if (!query) {
                resolve(MOCK_STRATEGIES);
                return;
            }
            const filtered = MOCK_STRATEGIES.filter(strategy => strategy.title.toLowerCase().includes(query.toLowerCase()));
            resolve(filtered);
        }, 300);
    });
}

export const searchBooks = async (query: string, filters: string[]): Promise<BookSummary[]> => {
    console.log('Searching for books with query:', query, 'and filters:', filters);
    return new Promise(resolve => {
        setTimeout(() => {
            let results = MOCK_BOOKS;
            if (query) {
                results = results.filter(book => book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase()));
            }
            if (filters.length > 0) {
                results = results.filter(book => filters.every(filter => book.tags.includes(filter.toLowerCase().replace(' ', ''))));
            }
            resolve(results);
        }, 300);
    });
}

export const getRandomBooks = async (count: number): Promise<BookSummary[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const shuffled = [...MOCK_BOOKS].sort(() => 0.5 - Math.random());
            resolve(shuffled.slice(0, count));
        }, 300);
    });
};

export const searchProducts = async (query: string): Promise<ProductSummary[]> => {
    console.log('Searching for products with query:', query);
    return new Promise(resolve => {
        setTimeout(() => {
            if (!query) {
                resolve(MOCK_PRODUCTS);
                return;
            }
            const lowerCaseQuery = query.toLowerCase();
            const filtered = MOCK_PRODUCTS.filter(product => 
                product.title.toLowerCase().includes(lowerCaseQuery) ||
                product.description.toLowerCase().includes(lowerCaseQuery) ||
                product.tags.some(tag => tag.includes(lowerCaseQuery))
            );
            resolve(filtered);
        }, 300);
    });
};

export const searchAllInformation = async (query: string): Promise<SearchResult[]> => {
  console.log('Searching all information with query:', query);
  return new Promise(async (resolve) => {
    const [strategies, books] = await Promise.all([
      searchStrategies(query),
      searchBooks(query, []),
    ]);

    const typedStrategies: SearchResult[] = strategies.map(s => ({ ...s, type: 'strategy' }));
    const typedBooks: SearchResult[] = books.map(b => ({ ...b, type: 'book' }));
    
    const combined = [...typedStrategies, ...typedBooks];

    setTimeout(() => {
      resolve(combined.sort(() => 0.5 - Math.random()));
    }, 300);
  });
};

export const getNewsEvents = async (year: number, month: number): Promise<NewsEvent[]> => {
  console.log(`Fetching news for ${year}-${month}`);
  return new Promise(resolve => {
    setTimeout(() => {
      // In a real app, you'd fetch based on year/month. Here we check against our dynamic mock data.
      const currentMonthEvents = MOCK_NEWS_EVENTS.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month;
      });
      resolve(currentMonthEvents);
    }, 500);
  });
};

export const fetchTradingNews = async (): Promise<NewsArticle[]> => {
  console.log("Fetching trading news");
  // In a real app, this would be a fetch call to the news API.
  // For now, we return mock data.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_NEWS_ARTICLES);
    }, 800);
  });
};