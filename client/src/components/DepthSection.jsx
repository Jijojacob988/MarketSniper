import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const DepthSection = ({ title, data = [], columns = [] }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });

  const colKeyMap = {
    Symbol: "symbol",
    LTP: "ltp",
    "Pre C": "preC",
    "% Chg": "change",
    "%": "change",
    "T.O": "tov",
    "R-Factor": "rfactor",
    Time: "time",
    Signal: "signal",
    Price: "price",
    Volume: "volume",
    "Date-Time": "datetime",
  };

  const isHighPower = title.toLowerCase().includes("high power");
  const isIntraday = title.toLowerCase().includes("intraday");
  const isProSetup =
    title.toLowerCase().includes("lom") ||
    title.toLowerCase().includes("bo") ||
    title.toLowerCase().includes("day") ||
    title.toLowerCase().includes("market");

  const activeColumns = useMemo(() => {
    if (isHighPower && !columns.includes("Time")) return [...columns, "Time"];
    if (isIntraday && !columns.includes("Signal"))
      return [...columns, "Signal"];
    return columns;
  }, [columns, title]);

  const processed = useMemo(() => {
    let arr = Array.isArray(data) ? [...data] : [];

    arr = arr.map((item) => ({
      ...item,
      time: isHighPower
        ? `${String(Math.floor(9 + Math.random() * 6)).padStart(2, "0")}:${String(
            Math.floor(Math.random() * 60)
          ).padStart(2, "0")}`
        : item.time,
      signal: isIntraday
        ? item.change > 0
          ? "up"
          : item.change < 0
            ? "down"
            : "neutral"
        : item.signal,
    }));

    if (sortConfig.key) {
      const dataKey = colKeyMap[sortConfig.key];
      arr.sort((a, b) => {
        const A = a[dataKey] ?? 0;
        const B = b[dataKey] ?? 0;
        return sortConfig.direction === "asc" ? A - B : B - A;
      });
    }

    if (search && search.trim().length) {
      const q = search.trim().toLowerCase();
      arr = arr.filter((s) =>
        String(s.symbol || "")
          .toLowerCase()
          .includes(q)
      );
    }

    return arr;
  }, [data, search, sortConfig, title]);

  //  Render each cell type
  const renderCell = (col, item) => {
    const key = colKeyMap[col];
    const raw = item[key];

    if (col === "Symbol") {
      return (
        <div
          className="inline-flex justify-center items-center w-[70px] sm:w-[90px] px-2 py-[3px] rounded-lg text-[9px] sm:text-[11px] font-semibold text-white truncate cursor-pointer transition-all duration-200 hover:brightness-125 hover:scale-105"
          style={{ background: "linear-gradient(90deg,#574efb,#7b66ff)" }}
          title={`Click to view ${item.symbol} chart`}
          onClick={() => console.log(`Clicked stock: ${item.symbol}`)}
        >
          {String(raw || item.symbol || "").toUpperCase()}
        </div>
      );
    }

    if (col === "% Chg" || col === "%") {
      const v = Number(raw);
      const isUp = v > 0;
      const cls = isUp
        ? "bg-green-500 text-black glow-green"
        : "bg-red-600 text-white glow-red";
      const sign = v > 0 ? "+" : "";
      return (
        <div
          className={`inline-block w-[60px] sm:w-[75px] text-center px-2 py-[2px] sm:py-[3px] rounded-full text-[10px] sm:text-xs font-semibold ${cls}`}
        >
          {sign}
          {v.toFixed(2)}%
        </div>
      );
    }

    if (col === "T.O" || col === "R-Factor") {
      const v = Number(raw);
      return (
        <div
          className="inline-flex justify-center items-center w-[75px] sm:w-[90px] px-2 py-[3px] rounded-md text-[10px] sm:text-sm font-semibold text-black truncate"
          style={{ background: "#d48f14" }}
          title={isFinite(v) ? v.toFixed(2) : "--"}
        >
          {isFinite(v) ? v.toFixed(2) : "--"}
        </div>
      );
    }

    if (col === "Time") {
      return (
        <div
          className="inline-flex justify-center items-center w-[75px] sm:w-[85px] px-2 py-[3px] rounded-md text-[10px] sm:text-sm font-semibold text-black"
          style={{ background: "#3CCF91" }}
        >
          {raw || "--:--"}
        </div>
      );
    }

    if (col === "Signal") {
      if (raw === "neutral" || raw == null)
        return <div className="text-gray-400 text-xs text-center">--</div>;

      const isUp = raw === "up";
      const Icon = isUp ? ArrowUpRight : ArrowDownRight;
      const color = isUp ? "text-green-400" : "text-red-500";
      return (
        <div className="flex justify-center items-center">
          <Icon size={16} className={`${color} animate-pulse`} />
        </div>
      );
    }

    if (col === "LTP" || col === "Pre C") {
      if (!isFinite(raw)) return "--";
      return Math.round(raw);
    }

    if (col === "Price") {
      return typeof raw === "number" ? raw.toFixed(2) : (raw ?? "--");
    }

    if (col === "Volume") {
      return (
        <div className="inline-flex justify-center items-center w-[90px] sm:w-[110px] px-2 py-[3px] rounded-md text-[10px] sm:text-sm font-semibold text-gray-200 truncate">
          {Number(raw)?.toLocaleString() ?? "--"}
        </div>
      );
    }

    if (col === "Date-Time") {
      return (
        <div
          className="inline-flex justify-center items-center w-[120px] sm:w-[140px] px-2 py-[3px] rounded-md text-[10px] sm:text-xs font-semibold text-black"
          style={{ background: "#3CCF91" }}
        >
          {raw || "--"}
        </div>
      );
    }

    return raw ?? "--";
  };

  return (
    <div className="bg-[#181818] border border-[#262626] rounded-xl p-3 sm:p-4 w-full">
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

      <div className="overflow-y-auto max-h-[440px] sm:max-h-[480px]">
        <table className="w-full text-[11px] sm:text-sm">
          <thead className="text-[#F0B90B] sticky top-0 bg-[#181818] z-10">
            <tr>
              {activeColumns.map((col) => (
                <th
                  key={col}
                  onClick={() =>
                    setSortConfig({
                      key: col,
                      direction:
                        sortConfig.direction === "asc" ? "desc" : "asc",
                    })
                  }
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
            {processed.map((item, idx) => (
              <tr
                key={item.symbol + idx}
                className={`${
                  idx % 2 === 0 ? "bg-[#151515]" : "bg-[#101010]"
                } hover:bg-[#222] transition-colors`}
              >
                {activeColumns.map((col) => (
                  <td key={col} className="px-1 sm:px-2 py-2 align-middle">
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
          animation: glowGreen 5s infinite ease-in-out;
        }
        .glow-red {
          animation: glowRed 5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DepthSection;
