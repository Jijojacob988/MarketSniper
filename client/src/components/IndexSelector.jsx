import React from "react";

const IndexSelector = ({
  indices,
  expiryDates,
  selectedIndex,
  setSelectedIndex,
  selectedExpiry,
  setSelectedExpiry,
}) => {
  const allIndices =
    indices && indices.length
      ? indices
      : ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCAP", "SENSEX"];

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

      <div className="flex justify-center sm:justify-end items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
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
  );
};

export default IndexSelector;
