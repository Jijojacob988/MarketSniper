import React from "react";

const MoneyFluxSelector = ({
  indices,
  expiryDates,
  selectedIndex,
  setSelectedIndex,
  selectedExpiry,
  setSelectedExpiry,
  timeframe,
  setTimeframe,
}) => {
  const allIndices =
    indices && indices.length
      ? indices
      : ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCAP", "SENSEX"];
  const timeOptions = ["3m", "5m", "15m", "30m"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#181818] border border-[#2a2a2a] rounded-xl p-4">
      <div className="flex flex-wrap justify-center sm:justify-start gap-3 w-full sm:w-auto">
        {allIndices.map((idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`px-5 py-2 cursor-pointer rounded-lg border text-sm font-semibold transition-all duration-200 ${
              selectedIndex === idx
                ? "border-[#3CCF91] text-[#3CCF91] bg-[#0d1612] shadow-[0_0_6px_rgba(60,207,145,0.5)]"
                : "border-[#2a2a2a] text-gray-400 hover:border-[#3CCF91]/40 hover:text-[#3CCF91]/80"
            }`}
            style={{ minWidth: 100 }}
          >
            {idx}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Time</span>
          <select
            className="cursor-pointer bg-[#0f0f0f] border border-[#333] text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3CCF91]"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Expiry</span>
          <select
            className="cursor-pointer bg-[#0f0f0f] border border-[#333] text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3CCF91]"
            value={selectedExpiry}
            onChange={(e) => setSelectedExpiry(e.target.value)}
          >
            {expiryDates.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MoneyFluxSelector;
