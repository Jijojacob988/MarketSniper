// src/data/dummyDepthData.js

const realStocks = [
  "RELIANCE", "TCS", "HDFCBANK", "ICICIBANK", "INFY", "SBIN", "KOTAKBANK",
  "AXISBANK", "LT", "MARUTI", "M&M", "TITAN", "BAJFINANCE", "BAJAJFINSV",
  "HCLTECH", "WIPRO", "TECHM", "ULTRACEMCO", "HINDUNILVR", "ITC",
  "SUNPHARMA", "DRREDDY", "CIPLA", "TATAMOTORS", "TATASTEEL",
  "JSWSTEEL", "ONGC", "NTPC", "POWERGRID", "COALINDIA",
  "NESTLEIND", "ASIANPAINT", "DIVISLAB", "BPCL", "IOC",
  "GRASIM", "ADANIENT", "ADANIPORTS", "HEROMOTOCO", "EICHERMOT"
];

// Generate realistic shuffled stock symbols
const getSymbols = (count) => {
  const shuffled = [...realStocks].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Generate dummy data with REAL stock symbols
const generateStock = (symbols) => {
  return symbols.map((symbol) => {
    const ltp = +(100 + Math.random() * 800).toFixed(2);
    const preC = +(ltp * (1 + (Math.random() * 0.04 - 0.02))).toFixed(2); // ±2%
    const change = +(((ltp - preC) / preC) * 100).toFixed(2);
    const tov = +(200 + Math.random() * 1000).toFixed(2);
    const rfactor = +(Math.random() * 10).toFixed(2);

    return { symbol, ltp, preC, change, tov, rfactor };
  });
};

// Export realistic sets
export const highPowerStocks = generateStock(getSymbols(40));
export const intradayBoost = generateStock(getSymbols(40));

export const topGainers = generateStock(getSymbols(40)).sort(
  (a, b) => b.change - a.change
);

export const topLosers = generateStock(getSymbols(40)).sort(
  (a, b) => a.change - b.change
);
