// src/data/dummySwingData.js
// Dummy data for Swing Center page

export const growthData = {
  nifty: 76.47, // % advance growth
  fo: 223.81,
};

// Basic rows for swing tables. Use DepthSection rendering (Symbol, LTP, Pre C, %, Sector, Date-Time)
const now = "2025-11-07";

export const swingTables = {
  shortUp: [
    { symbol: "CUMMINSIND", ltp: 4423.1, preC: 4316.1, change: 2.48, sector: "Industrials", datetime: `${now} 10:25:00` },
    { symbol: "PAYTM", ltp: 1335.6, preC: 1320.6, change: 1.14, sector: "IT", datetime: `${now} 11:45:00` },
    { symbol: "LTF", ltp: 286.45, preC: 275.2, change: 4.09, sector: "Financials", datetime: `${now} 12:20:00` },
  ],
  shortDown: [
    { symbol: "AMBER", ltp: 7099.5, preC: 7832.5, change: -9.36, sector: "Consumer Discretionary", datetime: `${now} 10:12:00` },
    { symbol: "ABB", ltp: 5099, preC: 5228, change: -2.47, sector: "Industrials", datetime: `${now} 09:55:00` },
    { symbol: "INOXWIND", ltp: 148.5, preC: 150.06, change: -1.04, sector: "Industrials", datetime: `${now} 09:45:00` },
  ],
  longUp: [
    { symbol: "BSE", ltp: 2593.8, preC: 2455.5, change: 5.63, sector: "Financials", datetime: `${now} 13:10:00` },
    { symbol: "LICI", ltp: 928.7, preC: 896.1, change: 3.64, sector: "Insurance", datetime: `${now} 12:35:00` },
    { symbol: "LTIM", ltp: 6124.5, preC: 6000.5, change: 2.07, sector: "IT", datetime: `${now} 14:15:00` },
  ],
  longDown: [
    { symbol: "GRASIM", ltp: 1820.5, preC: 1850.7, change: -1.63, sector: "Materials", datetime: `${now} 11:15:00` },
    { symbol: "TATASTEEL", ltp: 124.5, preC: 126.2, change: -1.35, sector: "Metals", datetime: `${now} 10:45:00` },
  ],
  // NR7 and NR14 breakouts - combined (both up & down)
  nr7Breakouts: [
    { symbol: "ABC", ltp: 120, preC: 118, change: 1.69, sector: "Industrials", datetime: `${now} 09:50:00` },
    { symbol: "XYZ", ltp: 75, preC: 80, change: -6.25, sector: "Consumer", datetime: `${now} 09:55:00` },
  ],
  nr14Breakouts: [
    { symbol: "PQR", ltp: 540, preC: 520, change: 3.85, sector: "Pharma", datetime: `${now} 10:05:00` },
    { symbol: "LMN", ltp: 220, preC: 230, change: -4.35, sector: "FMCG", datetime: `${now} 10:08:00` },
  ],
  // LOM swings (these are the LOM tables)
  downsideLOM: [
    { symbol: "DELHIVERY", ltp: 431.05, preC: 442, change: -2.61, sector: "Logistics", datetime: `${now} 15:34:24` },
    { symbol: "PNBHOUSING", ltp: 890.4, preC: 908, change: -2.00, sector: "Financials", datetime: `${now} 12:24:24` },
    { symbol: "NCC", ltp: 193.37, preC: 195.5, change: -1.11, sector: "Construction", datetime: `${now} 12:14:24` },
  ],
  upsideLOM: [
    { symbol: "BSE", ltp: 2623.2, preC: 2460, change: 6.83, sector: "Financials", datetime: `${now} 15:56:24` },
    { symbol: "LICI", ltp: 932.7, preC: 896, change: 4.08, sector: "Insurance", datetime: `${now} 15:56:24` },
    { symbol: "PIIND", ltp: 376.9, preC: 374, change: 0.53, sector: "Industrials", datetime: `${now} 10:46:24` },
  ],
};

export const weeklyPerformance = [
  { symbol: "NIFTY_METAL", value: 2.0 },
  { symbol: "NIFTY_BANK", value: 0.4 },
  { symbol: "NIFTY_FIN", value: 0.15 },
  { symbol: "NIFTY_AUTO", value: 0.05 },
  { symbol: "BANKNIFTY", value: 0.0 },
  { symbol: "NIFTY_PVTBANK", value: -0.2 },
  { symbol: "NIFTY_REALTY", value: -0.4 },
  { symbol: "NIFTY", value: -0.6 },
  { symbol: "CNX_ENERGY", value: -1.2 },
  { symbol: "CNX_MEDIA", value: -1.4 },
  { symbol: "CNX_PHARMA", value: -1.8 },
  { symbol: "NIFTY_FMCG", value: -2.0 },
  { symbol: "CNX_IT", value: -3.8 },
];
