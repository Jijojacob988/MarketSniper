// src/data/moneyfluxDummy.js
// Deterministic RNG + intraday helpers + candle/grouping generator
const hashStringToInt = (s) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a += 0x6d2b79f5;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- market-day helpers ----------
const prevTradingDay = (d) => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  do {
    copy.setDate(copy.getDate() - 1);
  } while (copy.getDay() === 0 || copy.getDay() === 6);
  return copy;
};

const getEffectiveNow = () => {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const open = 9 * 60 + 15;
  const close = 15 * 60 + 30;

  if (day === 0 || day === 6) {
    const prev = prevTradingDay(now);
    prev.setHours(15, 30, 0, 0);
    return prev;
  }
  if (minutes < open) {
    const prev = prevTradingDay(now);
    prev.setHours(15, 30, 0, 0);
    return prev;
  }
  if (minutes > close) {
    const todayClose = new Date(now);
    todayClose.setHours(15, 30, 0, 0);
    return todayClose;
  }
  return now;
};

// generate 3-minute ticks labels (09:15 -> 15:30)
export const SMOOTH_TICKS_3MIN = (() => {
  const arr = [];
  let h = 9, m = 15;
  while (h < 15 || (h === 15 && m <= 30)) {
    arr.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
    m += 3;
    if (m >= 60) { m -= 60; h++; }
  }
  return arr;
})();

// map a tick label "HH:MM" to a Unix seconds timestamp for the effective day to use
const tickLabelToTimestamp = (label, effectiveDate) => {
  // label = "09:15"
  const [hh, mm] = label.split(":").map(Number);
  const d = new Date(effectiveDate);
  d.setHours(hh, mm, 0, 0);
  return Math.floor(d.getTime() / 1000);
};

// convert 3-min ticks into groups for given timeframe
const groupTicks = (frame) => {
  // frame = "3m","5m","15m","30m"
  const baseMinutes = 3;
  const frameMinutes = Number(frame.replace("m", ""));
  const groupSize = Math.max(1, Math.round(frameMinutes / baseMinutes));
  const groups = [];
  const ticks = SMOOTH_TICKS_3MIN;
  for (let i = 0; i < ticks.length; i += groupSize) {
    groups.push(ticks.slice(i, i + groupSize));
  }
  return groups;
};

// ---------- CANDLES (today's intraday) ----------
// NOTE: Candles intentionally DO NOT include expiry in the seed.
// Chart should always be the present-day intraday candles for the selected timeframe.
export function generateCandles({ index = "NIFTY", expiry = null, timeframe = "3m" }) {
  // seed intentionally NOT using expiry so chart stays same across expiry changes
  const seed = hashStringToInt(`${index}::${timeframe}::candles`);
  const rand = mulberry32(seed);

  const groups = groupTicks(timeframe);
  // determine effective now & today's date or prev trading day if before open/weekend logic
  const effNow = getEffectiveNow();
  const effDate = new Date(effNow);
  effDate.setHours(0,0,0,0);

  // find tick index corresponding to effective now
  const effMinutes = effNow.getHours() * 60 + effNow.getMinutes();
  // find which 3-min tick <= effNow
  let lastTickIndex = 0;
  for (let i = 0; i < SMOOTH_TICKS_3MIN.length; i++) {
    const [hh, mm] = SMOOTH_TICKS_3MIN[i].split(":").map(Number);
    const tickMin = hh * 60 + mm;
    if (tickMin <= effMinutes) lastTickIndex = i;
  }
  // now convert tick index to grouped index
  const baseMinutes = 3;
  const frameMinutes = Number(timeframe.replace("m", ""));
  const groupSize = Math.max(1, Math.round(frameMinutes / baseMinutes));
  const lastGroupIndex = Math.floor(lastTickIndex / groupSize);

  // initial price base depends on index (roughly)
  const basePrice = (index === "BANKNIFTY") ? 58000 : (index === "SENSEX") ? 56000 : (index === "MIDCAP") ? 12000 : (index === "FINNIFTY") ? 20000 : 25500;

  let prevClose = Math.round(basePrice * (0.98 + rand() * 0.04));
  const candles = [];

  // only keep groups up to lastGroupIndex (inclusive)
  const effectiveGroups = groups.slice(0, lastGroupIndex + 1);

  effectiveGroups.forEach((g, i) => {
    const volatility = 0.006 + rand() * 0.02; // roughly 0.6%..2.6%
    const open = prevClose;
    const change = (rand() - 0.5) * 2 * volatility * prevClose;
    const close = Math.max(1, Math.round(open + change));
    const high = Math.max(open, close) + Math.round(Math.abs(rand()) * volatility * prevClose);
    const low = Math.min(open, close) - Math.round(Math.abs(rand()) * volatility * prevClose);
    const volume = Math.round(200 + rand() * 5000);
    const label = g[g.length - 1]; // use last tick label in group
    const time = tickLabelToTimestamp(label, effDate); // unix seconds for lightweight-charts

    // strength used initially (price direction magnitude)
    const strength = Math.sign(close - open) * Math.round(Math.abs(close - open));

    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume,
      strength, // keep for backward compat
      // histValue will be calculated separately by generateHistogramFromCandles when needed
    });
    prevClose = close;
  });

  return candles;
}

// ---------- HISTOGRAM FOR EXPIRY (aligned to candles) ----------
//
// generateHistogramFromCandles(candles, { index, expiry, timeframe })
// - returns array with same length as candles
// - uses expiry in the seed so different expiry => different histogram results
// - returns objects: { time: <same as candle.time>, value: <signed number>, confidence: <0..1> }
export function generateHistogramFromCandles(candles = [], { index = "NIFTY", expiry = "def", timeframe = "3m" } = {}) {
  if (!candles || !candles.length) return [];

  // base seed influenced by index+expiry+timeframe so whole series changes with expiry
  const baseSeed = hashStringToInt(`${index}::${expiry || "def"}::${timeframe}::hist`);
  const baseRand = mulberry32(baseSeed);

  return candles.map((c, idx) => {
    // per-candle deterministic noise seeded by candle time + idx + expiry
    const seed = hashStringToInt(`${baseSeed}::${c.time}::${idx}`);
    const rand = mulberry32(seed);

    // base magnitude from price move and volume (tunable)
    const priceMag = Math.abs((c.close ?? 0) - (c.open ?? 0));
    const volFactor = Math.round((c.volume || 0) / 150);
    let base = priceMag + volFactor;

    // pseudo option/flow signal that sometimes flips sign relative to candle:
    // range -1 .. +1
    const flowNoise = (rand() - 0.5) * 2;

    // use baseRand to add expiry-level bias (some expiries more bullish/bearish)
    const expiryBias = (baseRand() - 0.5) * 2 * 0.35; // small bias -0.35..0.35

    // small chance to invert sign (~18%) to simulate smart-money counter-flow
    const invertChance = rand();
    let sign = Math.sign((c.close ?? 0) - (c.open ?? 0)) || 1;
    if (invertChance < 0.18 + Math.abs(expiryBias) * 0.1) sign = -sign;

    // compute raw signed magnitude and amplify with flowNoise & expiryBias
    const raw = Math.round((base * (0.55 + Math.abs(flowNoise))) * (1 + expiryBias));
    const signed = Math.max(0, Math.abs(raw)) * sign;

    // confidence: how strongly we trust the signal (0..1)
    const confidence = Math.min(1, Math.abs(flowNoise) * 1.1 + Math.min(1, base / 120));

    // jitter for realism
    const jitter = Math.round((rand() - 0.5) * 2);

    return {
      time: c.time,
      value: signed + jitter,
      confidence,
    };
  });
}

// generate a dummy sentiment score (0..1)
export function generateSentiment({ index = "NIFTY", expiry = null, timeframe = "3m" }) {
  // sentiment should depend on expiry (user requirement)
  const seed = hashStringToInt(`sent::${index}::${expiry || "def"}::${timeframe}`);
  const rand = mulberry32(seed);
  return 0.1 + rand() * 0.8;
}

// generate a dummy PCR value (0..2)
export function generatePCR({ index = "NIFTY", expiry = null, timeframe = "3m" }) {
  const seed = hashStringToInt(`pcr::${index}::${expiry || "def"}::${timeframe}`);
  const rand = mulberry32(seed);
  return 0.3 + rand() * 1.2;
}

// heatmap
export function generateHeatmap({ index = "NIFTY", timeframe = "3m", size = 40 }) {
  const seed = hashStringToInt(`heat::${index}::${timeframe}::${size}`);
  const rand = mulberry32(seed);
  const names = [
    "TCS", "INFY", "WIPRO", "HDFC", "RELIANCE", "AXISBANK", "ICICIBANK", "SBIN", "HINDALCO",
    "TATAMOTORS", "MARUTI", "BAJAJ-AUTO", "JSWSTEEL", "LT", "HINDUNILVR", "M&M", "TECHM",
    "KOTAKBANK", "BHARTIARTL", "ULTRACEMCO", "HDFC LIFE", "IOC", "BPCL", "TATAPOWER", "ADANIPORTS"
  ];
  const dataset = [];
  for (let i = 0; i < size; i++) {
    const name = names[i % names.length] + (i >= names.length ? `.${i}` : "");
    const pct = (rand() - 0.45) * (1 + rand() * 2);
    const value = Math.round(Math.abs(pct) * 100);
    dataset.push({
      name,
      change: Number(pct.toFixed(2)),
      weight: value + 5 + Math.round(rand() * 100),
      color: pct >= 0 ? "green" : "red",
    });
  }
  dataset.sort((a, b) => b.weight - a.weight);
  return dataset;
}
