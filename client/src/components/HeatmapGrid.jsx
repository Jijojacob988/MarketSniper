import React from "react";

const colorForChange = (chg) => {
  const v = parseFloat(chg);
  if (isNaN(v)) return "#444";
  if (v > 3) return "#064e3b"; 
  if (v > 1) return "#15803d"; 
  if (v > 0) return "#22c55e"; 
  if (v > -1) return "#f87171"; 
  if (v > -3) return "#b91c1c"; 
  return "#7f1d1d"; 
};

const HeatmapGrid = ({ data = [] }) => {
  //  Dynamic rendering logic:
  // data = [{ sector: "NIFTY_IT", items: [{ symbol, change }, ...] }, ...]
  // Each sector may have variable item count depending on market data.
  // Sector order & count can vary every update.

  return (
    <div className="bg-[#111] border border-[#242424] rounded-lg p-4">
      <div
        className="grid gap-4 sm:gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
      >
        {data.map((sector) => (
          <div
            key={sector.sector}
            className="bg-[#171717] border border-[#2a2a2a] rounded-md p-2 transition-all duration-200 hover:border-[#F0B90B]/40"
          >
            {/* Sector Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#F0B90B] uppercase">
                {sector.sector}
              </span>
              <span className="text-xs text-gray-400">
                {sector.items?.length ?? 0}
              </span>
            </div>

            {/* Stocks */}
            <div className="flex flex-wrap gap-[3px]">
              {(sector.items ?? []).map((stock, idx) => (
                <div
                  key={`${sector.sector}-${stock.symbol}-${idx}`}
                  title={`${stock.symbol} — ${stock.change}%`}
                  className="text-[10px] text-white flex items-center justify-center rounded-[3px] cursor-pointer transition-transform duration-150 hover:brightness-125 active:scale-95"
                  style={{
                    background: colorForChange(stock.change),
                    flexGrow: Math.abs(stock.change) + 1, // 🔹 grows by momentum strength
                    minWidth: 35,
                    height: 32,
                    fontWeight: 600,
                  }}
                  onClick={() =>
                    console.log(`Open chart for: ${stock.symbol}`)
                  }
                >
                  {stock.symbol}
                </div>
              ))}

              {/*  Handle sectors that might have no items */}
              {(!sector.items || sector.items.length === 0) && (
                <div className="text-gray-500 text-xs italic p-2">
                  No active stocks
                </div>
              )}
            </div>
          </div>
        ))}

        {/*  Handle scenario: No sectors (if live data fails) */}
        {data.length === 0 && (
          <div className="text-center text-gray-400 py-6 text-sm col-span-full">
            No sector data available
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatmapGrid;
