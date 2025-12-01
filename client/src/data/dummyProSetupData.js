// src/data/dummyProSetupData.js

// Dummy dataset for Pro Setup page UI

export const fiveMinMomentum = [
  { symbol: "PIIND", tov: 1600 },
  { symbol: "PFC", tov: 800 },
  { symbol: "ONGC", tov: 700 },
  { symbol: "L&T", tov: 600 },
  { symbol: "ACCEM", tov: 500 },
  { symbol: "3QFIN", tov: 400 },
  { symbol: "ORTB", tov: 350 },
  { symbol: "LABS", tov: 320 },
  { symbol: "NBOL", tov: 310 },
  { symbol: "IGL", tov: 300 },
  { symbol: "NBMK", tov: 280 },
  { symbol: "VOLT", tov: 260 },
  { symbol: "MARCO", tov: 250 },
  { symbol: "TOCOO", tov: 230 },
  { symbol: "ANIKUL", tov: 210 },
  { symbol: "URAM", tov: 190 },
  { symbol: "NYKAA", tov: 170 },
  { symbol: "SBIN", tov: 150 },
  { symbol: "INFY", tov: 130 },
  { symbol: "HDFCBANK", tov: 120 },
];

export const tenMinMomentum = [
  { symbol: "RK", tov: 700 },
  { symbol: "NET", tov: 500 },
  { symbol: "COAL", tov: 450 },
  { symbol: "ISL", tov: 430 },
  { symbol: "RI", tov: 410 },
  { symbol: "NTPC", tov: 390 },
  { symbol: "SY", tov: 370 },
  { symbol: "OL", tov: 350 },
  { symbol: "EM", tov: 340 },
  { symbol: "RD", tov: 330 },
  { symbol: "ITC", tov: 320 },
  { symbol: "EB", tov: 310 },
  { symbol: "WMA", tov: 300 },
  { symbol: "DIA", tov: 290 },
  { symbol: "PC", tov: 280 },
  { symbol: "FC", tov: 270 },
  { symbol: "ND", tov: 260 },
  { symbol: "FER", tov: 250 },
  { symbol: "INFY", tov: 240 },
  { symbol: "PIIND", tov: 230 },
];

// 8 Table Sections (each 10 sample rows)
const createRow = (symbol, change, price, volume, datetime) => ({
  symbol,
  change,
  price,
  volume,
  datetime,
});

export const downsideIntra = [
  createRow("DELHIVERY", -2.61, 431.05, 4741639, "2025-11-07 14:34:24"),
  createRow("PNBHOUSING", -2.0, 890.4, 441964, "2025-11-07 12:24:24"),
  createRow("NCC", -1.11, 193.37, 4611217, "2025-11-07 12:14:24"),
  createRow("JUBLFOOD", -2.49, 568.7, 837475, "2025-11-07 12:10:24"),
  createRow("SUZLON", -3.64, 57.44, 5277016, "2025-11-07 12:04:24"),
  createRow("APOLLOHOSP", -1.45, 766.9, 260877, "2025-11-07 11:50:24"),
  createRow("DMART", -2.05, 3998.6, 259570, "2025-11-07 11:26:24"),
  createRow("CONCOR", -0.36, 517.5, 496334, "2025-11-07 10:34:24"),
  createRow("ETERNAL", -0.98, 302.65, 386668, "2025-11-07 09:42:24"),
  createRow("TORNTPOWER", -1.04, 1260, 411464, "2025-11-07 09:22:24"),
];

export const upsideIntra = [
  createRow("BSE", 6.83, 2623.2, 10497532, "2025-11-07 13:56:24"),
  createRow("LICI", 4.08, 932.7, 583794, "2025-11-07 13:56:24"),
  createRow("PIIND", 0.53, 376.9, 46579, "2025-11-07 10:46:24"),
  createRow("POWERINDIA", 2.5, 20713, 73154, "2025-11-07 10:22:24"),
  createRow("ASTRAL", -0.22, 1562.6, 68711, "2025-11-06 09:22:24"),
  createRow("INDUSTOWER", 1.13, 397, 298446, "2025-11-06 10:12:24"),
  createRow("DABUR", 0.46, 519.45, 1127224, "2025-11-06 10:18:24"),
  createRow("BIOCON", 1.18, 388, 255191, "2025-11-06 09:22:24"),
  createRow("GMRAIRPORT", 1.15, 83.5, 2772119, "2025-11-06 09:12:24"),
  createRow("ASTRAL", 6.98, 1569.6, 559228, "2025-11-06 09:24:24"),
];

export const multiResBo = [
  createRow("APOLLOHOSP", 0, 7824.5, 829, "2025-11-04 09:16:24"),
  createRow("BHARATFORG", -0.07, 1323.8, 28399, "2025-11-03 09:16:24"),
  createRow("ASTRAL", 0.21, 1468, 49011, "2025-10-31 09:44:24"),
  createRow("NESTLEIND", 0.15, 1281.8, 46480, "2025-10-31 09:40:24"),
  createRow("ULTRACEMCO", 0.09, 1204, 4202, "2025-10-31 09:36:24"),
  createRow("TORNTPHARM", 0.07, 3605.1, 97, "2025-10-31 09:14:24"),
  createRow("PGEL", 0.59, 578, 293449, "2025-10-30 12:14:24"),
  createRow("UNOMINDA", 0.17, 1217.1, 110360, "2025-10-30 11:44:24"),
  createRow("DABUR", 0.68, 511.5, 8313, "2025-10-30 10:36:24"),
  createRow("DIXON", 0.28, 15555, 502, "2025-10-30 09:16:24"),
];

export const multiSupBo = [
  createRow("HINDUNILVR", -0.18, 2441.4, 474373, "2025-11-06 13:50:24"),
  createRow("TRENT", -0.25, 4649, 152103, "2025-11-06 11:10:24"),
  createRow("PRESTIGE", -0.79, 1732.7, 72128, "2025-11-06 10:44:24"),
  createRow("VOLTAS", -0.45, 1353.3, 189979, "2025-11-06 10:30:24"),
  createRow("GODREJPROP", -0.61, 2279.1, 152289, "2025-11-06 10:12:24"),
  createRow("NIFTY", -0.16, 25557.3, 0, "2025-11-06 10:16:24"),
  createRow("SBICARD", -0.35, 877.35, 102974, "2025-11-06 09:56:24"),
  createRow("JSWENERGY", -0.63, 524.75, 293123, "2025-11-06 09:42:24"),
  createRow("OBEROIRLTY", -0.7, 1779.9, 32163, "2025-11-06 09:26:24"),
  createRow("PFC", -0.25, 402.25, 155704, "2025-11-03 11:54:24"),
];

export const nearPrevHigh = [
  createRow("ALKEM", 0.48, 5670.5, 223216, "2025-11-07 15:34:08"),
  createRow("NAUKRI", 1.42, 1345.6, 983205, "2025-11-07 15:28:24"),
  createRow("CIPLA", 0.47, 1508.6, 983371, "2025-11-07 15:28:24"),
  createRow("ICICIGI", 1.15, 2024, 625402, "2025-11-07 14:40:24"),
  createRow("CAMS", 1.61, 3799.9, 246266, "2025-11-07 14:30:24"),
  createRow("INFY", 0.84, 1479, 6747969, "2025-11-07 14:30:24"),
  createRow("INDUSINDBK", 1.14, 795.15, 1426449, "2025-11-07 14:20:24"),
  createRow("UPL", 1.79, 746.45, 403683, "2025-11-07 13:54:24"),
  createRow("IOC", 0.65, 169.46, 857091, "2025-11-07 13:48:24"),
  createRow("LT", 1.34, 3720, 931114, "2025-11-07 13:32:24"),
];

export const nearPrevLow = [
  createRow("RELIANCE", -1.08, 1479.9, 5479497, "2025-11-07 14:12:24"),
  createRow("TATACONSUM", -1.65, 1170.7, 836173, "2025-11-07 13:44:24"),
  createRow("AUROPHARMA", -1.53, 1123.2, 189082, "2025-11-07 12:34:24"),
  createRow("NCC", -0.54, 194.49, 4027125, "2025-11-07 12:00:24"),
  createRow("CUMMINSIND", -1.34, 425.81, 141170, "2025-11-07 11:34:24"),
  createRow("ITC", -0.2, 406.7, 109324, "2025-11-07 10:46:24"),
  createRow("MAXHEALTH", -0.35, 1121.5, 223299, "2025-11-07 10:18:24"),
  createRow("POLICYBZR", -1.27, 1735, 212555, "2025-11-07 10:00:24"),
  createRow("MOTHERSON", -1.3, 102.57, 1011833, "2025-11-07 09:42:24"),
  createRow("BHARATFORG", -0.56, 1230, 422190, "2025-11-07 09:22:24"),
];

export const dailyContraction = [
  createRow("MOTHERSON", 0.34, 104.27, 842842, "2025-11-07 15:36:08"),
  createRow("PIDILITIND", 0.29, 1447, 533593, "2025-11-07 15:36:08"),
  createRow("HDFCBANK", -0.04, 984.25, 15003586, "2025-11-07 15:36:08"),
  createRow("BHARATFORG", -0.17, 1317.4, 457436, "2025-11-07 15:36:08"),
  createRow("OIL", 0.38, 433.15, 129988, "2025-11-07 15:36:08"),
  createRow("SONACOMS", -0.14, 483.1, 1428861, "2025-11-07 15:36:08"),
  createRow("IOC", -0.53, 168.36, 1972944, "2025-11-07 15:36:08"),
  createRow("UNIONBANK", 0.44, 151.54, 1462242, "2025-11-07 15:36:08"),
  createRow("UNITDSPR", 0.23, 1450.9, 961290, "2025-11-07 15:36:08"),
  createRow("ABB", -0.23, 5244, 1041, "2025-11-07 15:36:08"),
];

export const preMarket = [
  createRow("TATACONSUM", 0.19, 1199.8, 426906, "2025-11-04 09:07:57"),
  createRow("TITAN", 0, 3724.5, 165829, "2025-11-04 09:07:57"),
  createRow("POWERGRID", -1.22, 284.5, 425995, "2025-11-04 09:07:58"),
  createRow("COALINDIA", 0.45, 380, 27946, "2025-11-04 09:08:08"),
  createRow("EICHERMOT", 0.38, 7050, 27149, "2025-11-04 09:08:08"),
  createRow("BHARTIARTL", 1.59, 2107, 27089, "2025-11-04 09:08:09"),
  createRow("JSWSTEEL", 0.64, 1202.6, 25974, "2025-11-04 09:08:10"),
  createRow("AXISBANK", -0.29, 1230.1, 24576, "2025-11-04 09:08:11"),
  createRow("M&M", -0.01, 3548.6, 19527, "2025-11-04 09:08:12"),
  createRow("INDIGO", 0.41, 5169.3, 13494, "2025-11-04 09:08:13"),
];
