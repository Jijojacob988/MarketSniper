import React, { useState } from "react";
import { Search, ArrowUp, ArrowDown } from "lucide-react";

const SwingTableSection = ({ title, data = [], columns = [] }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });

  const handleSort = (col) => {
    setSortConfig({
      key: col,
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const colKeyMap = {
    Symbol: "symbol",
    LTP: "ltp",
    "Pre C": "preC",
    "%": "change",
    Sector: "sector",
    Date: "datetime",
  };

  const filtered = data
    .filter((d) =>
      search ? d.symbol.toLowerCase().includes(search.toLowerCase()) : true
    )
    .sort((a, b) => {
      const key = colKeyMap[sortConfig.key];
      if (!key) return 0;
      const dir = sortConfig.direction === "asc" ? 1 : -1;
      if (typeof a[key] === "string") return a[key].localeCompare(b[key]) * dir;
      return (a[key] - b[key]) * dir;
    });

  const renderCell = (col, item) => {
    const key = colKeyMap[col];
    const raw = item[key];

    if (col === "Symbol") {
      return (
        <div
          className="inline-flex justify-center items-center w-[75px] sm:w-[90px] px-2 py-[3px] rounded-lg text-[10px] sm:text-[11px] font-semibold text-white truncate cursor-pointer hover:scale-105 transition-all"
          style={{ background: "linear-gradient(90deg,#574efb,#7b66ff)" }}
          title={`View ${item.symbol} chart`}
          onClick={() => console.log(`Clicked ${item.symbol}`)}
        >
          {item.symbol}
        </div>
      );
    }

    if (col === "%") {
      const v = parseFloat(raw);
      const isUp = v > 0;
      const cls = isUp
        ? "bg-green-500 text-black glow-green"
        : "bg-red-600 text-white glow-red";
      return (
        <div
          className={`flex justify-center items-center w-[65px] sm:w-[75px] h-[24px] sm:h-[26px] rounded-full text-[10px] sm:text-xs font-semibold ${cls}`}
        >
          {isUp ? "+" : ""}
          {v.toFixed(2)}%
        </div>
      );
    }

    if (col === "Sector") {
      const value = item.sector || "--";
      return (
        <div
          className="flex justify-center items-center px-2 py-[3px] rounded-md text-[10px] sm:text-xs font-medium text-gray-200 bg-[#1f1f1f] border border-[#2a2a2a] w-[110px] sm:w-[120px] text-center"
          title={value}
        >
          {value}
        </div>
      );
    }

    if (col === "Date") {
      const dateOnly = (raw || "").split(" ")[0] || "--";
      return (
        <div
          className="flex justify-center items-center w-[100px] sm:w-[120px] h-[24px] sm:h-[26px] px-2 rounded-md text-[10px] sm:text-xs font-semibold text-black"
          style={{ background: "#3CCF91" }}
        >
          {dateOnly}
        </div>
      );
    }

    if (["LTP", "Pre C"].includes(col)) {
      return (
        <div className="text-center w-[60px] sm:w-[70px]">
          {parseFloat(raw).toFixed(0)}
        </div>
      );
    }

    return (
      <div className="text-center w-[70px] sm:w-[80px]">{raw ?? "--"}</div>
    );
  };

  return (
    <div className="bg-[#181818] border border-[#262626] rounded-xl p-3 sm:p-4 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-[#F0B90B] text-sm sm:text-base font-semibold uppercase tracking-wide">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Active</span>
          </div>
        </div>

        <div className="relative w-full sm:w-48">
          <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Stock"
            className="w-full bg-[#0f0f0f] border border-[#333] rounded-md px-7 py-1 text-xs sm:text-sm text-gray-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-[440px] sm:max-h-[480px]">
        <table className="w-full text-[11px] sm:text-sm">
          <thead className="text-[#F0B90B] sticky top-0 bg-[#181818] z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="px-1 sm:px-2 py-2 text-left cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span>{col}</span>
                    {sortConfig.key === col ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp size={10} />
                      ) : (
                        <ArrowDown size={10} />
                      )
                    ) : (
                      <ArrowUp size={10} className="opacity-25" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-[#151515]" : "bg-[#101010]"
                } hover:bg-[#222] transition-colors`}
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-1 sm:px-2 py-2 align-middle text-center"
                  >
                    {renderCell(col, item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @keyframes glowGreen {
          0%,
          100% {
            box-shadow: 0 0 0px #22c55e;
          }
          50% {
            box-shadow: 0 0 10px 2px #22c55e80;
          }
        }
        @keyframes glowRed {
          0%,
          100% {
            box-shadow: 0 0 0px #ef4444;
          }
          50% {
            box-shadow: 0 0 10px 2px #ef444480;
          }
        }
        .glow-green {
          animation: glowGreen 4s infinite ease-in-out;
        }
        .glow-red {
          animation: glowRed 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SwingTableSection;
