// ------------------------------
// REALISTIC STOCK LISTS PER SECTOR
// ------------------------------

const SECTOR_STOCKS = {
  NIFTY_METAL: [
    "TATASTEEL", "HINDALCO", "JSWSTEEL", "JINDALSTEL", "NMDC",
    "SAIL", "VEDL", "NCC", "APL Apollo", "RATNAMANI"
  ],

  NIFTY_BANK: [
    "HDFCBANK", "ICICIBANK", "KOTAKBANK", "AXISBANK", "SBIN",
    "BANKBARODA", "PNB", "IDFCFIRSTB", "CANBK", "AUBANK"
  ],

  NIFTY_FIN: [
    "HDFC", "BAJFINANCE", "BAJAJFINSV", "ICICIPRULI", "HDFCLIFE",
    "ICICIGI", "MUTHOOTFIN", "PFC", "RECLTD", "CHOLAFIN"
  ],

  NIFTY_AUTO: [
    "TATAMOTORS", "MARUTI", "M&M", "EICHERMOT", "HEROMOTOCO",
    "BAJAJ-AUTO", "ASHOKLEY", "TVSMOTOR", "BOSCHLTD", "MRF"
  ],

  NIFTY_IT: [
    "TCS", "INFY", "WIPRO", "HCLTECH", "TECHM",
    "LTIM", "COFORGE", "PERSISTENT", "MPHASIS", "CYIENT"
  ],

  NIFTY_PVTBANK: [
    "HDFCBANK", "ICICIBANK", "KOTAKBANK", "AXISBANK", "FEDERALBNK",
    "IDFCFIRSTB", "INDUSINDBK", "RBLBANK", "YESBANK", "AUBANK"
  ],

  NIFTY_REALTY: [
    "DLF", "LODHA", "PRESTIGE", "GODREJPROP", "OBEROIRLTY",
    "BRIGADE", "PHOENIXLTD", "SOBHA", "SUNTECK", "NESCO"
  ],

  NIFTY: [
    "RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK",
    "BHARTIARTL", "SBIN", "LT", "HUL", "ITC"
  ],

  CNX_ENERGY: [
    "RELIANCE", "ONGC", "GAIL", "IOC", "BPCL",
    "HPCL", "NTPC", "POWERGRID", "ADANIGREEN", "TATAPOWER"
  ],

  CNX_MEDIA: [
    "ZEEL", "SUNTV", "PVRINOX", "TV18BRDCST", "NETWORK18",
    "DISHTV", "NAZARA", "ZEELEARN", "NDTV", "SAREGAMA"
  ],

  CNX_PHARMA: [
    "SUNPHARMA", "CIPLA", "DIVISLAB", "DRREDDY", "BIOCON",
    "LUPIN", "AUROPHARMA", "GLENMARK", "TORNTPHARM", "ABBOTINDIA"
  ],

  NIFTY_FMCG: [
    "ITC", "HUL", "NESTLEIND", "TATACONSUM", "DABUR",
    "MARICO", "BRITANNIA", "UBL", "COLPAL", "VBL"
  ],

  CNX_IT: [
    "TCS", "INFY", "WIPRO", "HCLTECH", "TECHM",
    "LTIM", "COFORGE", "PERSISTENT", "MPHASIS", "ZENSARTECH"
  ],
};

// ------------------------------
// ORIGINAL CHART VALUES
// ------------------------------

export const sectorBars = [
  { symbol: "NIFTY_METAL", value: 1.2 },
  { symbol: "NIFTY_BANK", value: 0.9 },
  { symbol: "NIFTY_FIN", value: 0.75 },
  { symbol: "NIFTY_AUTO", value: 0.5 },
  { symbol: "NIFTY_IT", value: 0.45 },
  { symbol: "NIFTY_PVTBANK", value: 0.2 },
  { symbol: "NIFTY_REALTY", value: 0.1 },
  { symbol: "NIFTY", value: -0.05 },
  { symbol: "CNX_ENERGY", value: -0.25 },
  { symbol: "CNX_MEDIA", value: -0.4 },
  { symbol: "CNX_PHARMA", value: -0.8 },
  { symbol: "NIFTY_FMCG", value: -1.2 },
  { symbol: "CNX_IT", value: -1.5 },
];

// ------------------------------
// HEATMAP (12 items per sector)
// ------------------------------

export const heatmapData = sectorBars.map((s) => ({
  sector: s.symbol,
  items: SECTOR_STOCKS[s.symbol].slice(0, 12).map((sym) => ({
    symbol: sym,
    change: (Math.random() * 6 - 3).toFixed(2), // -3 to +3%
  })),
}));

// ------------------------------
// SECTOR TABLES (10 items each)
// ------------------------------

export const sectorTables = Object.fromEntries(
  sectorBars.map((s) => [
    s.symbol,
    SECTOR_STOCKS[s.symbol].slice(0, 10).map((sym) => ({
      symbol: sym,
      ltp: +(100 + Math.random() * 1000).toFixed(2),
      preC: +(100 + Math.random() * 1000).toFixed(2),
      change: (Math.random() * 6 - 3).toFixed(2),
      rfactor: (Math.random() * 2).toFixed(2),
    })),
  ])
);
