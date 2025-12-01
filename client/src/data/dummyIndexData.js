// src/data/dummyIndexData.js
// Dummy data generator (Option A — each index x expiry has independent strikes & per-tick OI)
// Exposes:
//  - getExpiryListForIndex(indexKey) -> array of expiry strings
//  - computeDatasetForRange(indexKey, expiry, startIndex, endIndex) -> dataset used by page

// utility: ticks (3-min from 09:15 to 15:30)
const generateSmoothTicks = () => {
  const arr = [];
  let h = 9, m = 15;
  while (h < 15 || (h === 15 && m <= 30)) {
    arr.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 3;
    if (m >= 60) {
      m -= 60;
      h++;
    }
  }
  return arr;
};
export const SMOOTH_TICKS = generateSmoothTicks();
export const TICKS_COUNT = SMOOTH_TICKS.length; // 121 for 9:15..15:30 with 3-min steps

// strike range helper
const makeStrikes = (atm = 25500, step = 50, totalCount = 21) => {
  const half = Math.floor(totalCount / 2);
  const start = atm - half * step;
  return Array.from({ length: totalCount }, (_, i) => start + i * step);
};

// simple string -> integer hash to derive a unique seed per index+expiry
const hashStringToInt = (s) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};

// deterministic-ish RNG (seeded) for repeatability across runs
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a += 0x6d2b79f5;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Build full dataset for each index & expiry (per tick cumulative OI)
const buildIndexExpiryDataset = (opts = {}) => {
  const {
    atm = 25500,
    step = 50,
    strikesCount = 21,
    seed = 1,
    volatility = 0.12,
    oiBaseScale = 180000,
    uniqueSalt = "default",
  } = opts;

  // derive unique seed from provided seed and uniqueSalt (index+expiry)
  const hashed = hashStringToInt(String(seed) + "|" + uniqueSalt);
  const rand = mulberry32(hashed);

  const strikes = makeStrikes(atm, step, strikesCount);

  // For each strike create a base OI value and then per-tick incremental changes
  const perStrikeBase = strikes.map((s, i) => {
    const dist = Math.abs(i - Math.floor(strikes.length / 2));
    // larger OI near ATM, lower farther away
    const ceBase = Math.max(
      500,
      Math.round((oiBaseScale - dist * oiBaseScale * 0.08) * (0.8 + rand() * 0.6))
    );
    const peBase = Math.max(
      500,
      Math.round((oiBaseScale * 0.8 - dist * oiBaseScale * 0.07) * (0.7 + rand() * 0.6))
    );
    return { strike: s, ceBase, peBase };
  });

  // generate per-tick signed increments (random but seeded)
  const perTickDeltas = Array.from({ length: TICKS_COUNT }, (_, tickIdx) => {
    return perStrikeBase.map((p, sIdx) => {
      // create a drift/trend per strike to avoid identical patterns
      const trend = (Math.sin((tickIdx + sIdx * 0.7) / 6) + 1) * 0.5;
      const ceChange = Math.round((rand() - 0.5) * p.ceBase * volatility * (0.4 + rand() * 0.8) * (0.6 + trend));
      const peChange = Math.round((rand() - 0.5) * p.peBase * volatility * (0.4 + rand() * 0.8) * (0.6 + (1 - trend)));
      return { ceDelta: ceChange, peDelta: peChange };
    });
  });

  // convert perTick deltas into cumulative OI arrays
  const cumulativePerTick = [];
  // initialize with base
  let running = perStrikeBase.map((p) => ({ strike: p.strike, cumCe: p.ceBase, cumPe: p.peBase }));
  for (let t = 0; t < TICKS_COUNT; t++) {
    const tickDeltas = perTickDeltas[t];
    running = running.map((r, si) => {
      const deltaCe = tickDeltas[si].ceDelta;
      const deltaPe = tickDeltas[si].peDelta;
      const newCumCe = Math.max(0, Math.round(r.cumCe + deltaCe));
      const newCumPe = Math.max(0, Math.round(r.cumPe + deltaPe));
      return { strike: r.strike, cumCe: newCumCe, cumPe: newCumPe, lastDeltaCe: deltaCe, lastDeltaPe: deltaPe };
    });
    // deep clone snapshot for this tick
    cumulativePerTick.push(running.map((x) => ({ ...x })));
  }

  return {
    atm,
    strikes,
    perTick: cumulativePerTick,
  };
};

// index + expiries config (each expiry will be built separately)
const INDICES = {
  NIFTY: {
    expiries: ["Nov-14", "Nov-28"],
    atm: 25500,
    seed: 1021,
  },
  BANKNIFTY: {
    expiries: ["Nov-13", "Dec-05"],
    atm: 58000,
    seed: 2317,
  },
  FINNIFTY: {
    expiries: ["Nov-12", "Nov-26"],
    atm: 20000,
    seed: 7841,
  },
  MIDCAP: {
    expiries: ["Nov-20", "Dec-12"],
    atm: 12000,
    seed: 4309,
  },
  SENSEX: {
    expiries: ["Nov-18", "Dec-02"],
    atm: 56000,
    seed: 9013,
  },
};

// build master dataset with unique salt (index + expiry)
const MASTER = {};
Object.keys(INDICES).forEach((key) => {
  const cfg = INDICES[key];
  MASTER[key] = { expiries: {}, atm: cfg.atm };
  cfg.expiries.forEach((exp, idx) => {
    const uniqueSalt = `${key}::${exp}::${idx}`;
    MASTER[key].expiries[exp] = buildIndexExpiryDataset({
      atm: cfg.atm,
      step: key === "MIDCAP" ? 25 : 50,
      strikesCount: 21,
      seed: cfg.seed + idx * 1000,
      volatility: 0.12 + idx * 0.02,
      oiBaseScale: key === "BANKNIFTY" ? 280000 : 180000,
      uniqueSalt,
    });
  });
});

// Main exported function:
// computeDatasetForRange(indexKey, expiry, startIndex, endIndex)
export function computeDatasetForRange(indexKey = "NIFTY", expiry = null, startIndex = 0, endIndex = TICKS_COUNT - 1) {
  const idx = MASTER[indexKey];
  if (!idx) return null;
  const expData = (expiry && idx.expiries[expiry]) ? idx.expiries[expiry] : Object.values(idx.expiries)[0];
  if (!expData) return null;

  // clamp indexes
  const s = Math.max(0, Math.min(startIndex, TICKS_COUNT - 1));
  const e = Math.max(0, Math.min(endIndex, TICKS_COUNT - 1));
  const startI = Math.min(s, e);
  const endI = Math.max(s, e);

  const strikes = expData.strikes;
  const atm = expData.atm;

  const oiCompass = [];
  const openInterestTracker = [];

  let peChangeTotal = 0;
  let ceChangeTotal = 0;
  let pcTotalPE = 0;
  let pcTotalCE = 0;

  for (let si = 0; si < strikes.length; si++) {
    const startRow = expData.perTick[startI][si];
    const endRow = expData.perTick[endI][si];

    const cumCeStart = startRow.cumCe;
    const cumPeStart = startRow.cumPe;
    const cumCeEnd = endRow.cumCe;
    const cumPeEnd = endRow.cumPe;

    const ceSigned = cumCeEnd - cumCeStart;
    const peSigned = cumPeEnd - cumPeStart;

    const ceOIAtEnd = Math.max(0, cumCeEnd);
    const peOIAtEnd = Math.max(0, cumPeEnd);

    peChangeTotal += peSigned;
    ceChangeTotal += ceSigned;

    pcTotalPE += Math.max(0, peSigned);
    pcTotalCE += Math.max(0, ceSigned);

    oiCompass.push({
      strike: strikes[si],
      ceSigned,
      peSigned,
      ceOI: Math.abs(cumCeEnd),
      peOI: Math.abs(cumPeEnd),
    });

    openInterestTracker.push({
      strike: strikes[si],
      ceOI: ceOIAtEnd,
      peOI: peOIAtEnd,
    });
  }

  return {
    atm,
    oiCompass,
    openInterestTracker,
    peChange: Math.round(peChangeTotal),
    ceChange: Math.round(ceChangeTotal),
    pcTotalPE: Math.round(pcTotalPE),
    pcTotalCE: Math.round(pcTotalCE),
  };
}

// Helper to get expiry list for UI
export function getExpiryListForIndex(indexKey = "NIFTY") {
  const idx = MASTER[indexKey];
  if (!idx) return [];
  return Object.keys(idx.expiries);
}
