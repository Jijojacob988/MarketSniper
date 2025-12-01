import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from "recharts";
import { ZoomIn, ZoomOut, RotateCcw, MoreVertical } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    const isUp = entry.value > 0;
    return (
      <div
        className="p-2 rounded-md border border-[#333]"
        style={{
          backgroundColor: "#1a1a1a",
          color: isUp ? "#22c55e" : "#ef4444",
        }}
      >
        <p className="font-semibold">{label}</p>
        <p>
          {isUp ? "+" : ""}
          {entry.value.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

const WeeklySectorBarChart = ({
  title = "WEEKLY SECTORIAL PERFORMANCE",
  data = [],
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Name corrections
  const cleanedData = useMemo(
    () =>
      data.map((d) => {
        let symbol = d.symbol;
        if (symbol === "NIFTY_IT") symbol = "BANKNIFTY";
        if (symbol === "NIFTY_BANK") symbol = "NIFTY_PSU_BANK";
        if (symbol === "NIFTY_FIN") symbol = "NIFTY_FINSERVICE";
        return { ...d, symbol };
      }),
    [data]
  );

  //  Sort bars by performance
  const sortedData = useMemo(
    () => [...cleanedData].sort((a, b) => b.value - a.value),
    [cleanedData]
  );

  const visibleData = useMemo(() => {
    const total = sortedData.length || 0;
    const visibleCount = Math.max(5, Math.floor(total / zoomLevel));
    return sortedData.slice(0, visibleCount);
  }, [sortedData, zoomLevel]);

  // Dynamic Y-axis range
  const maxVal = Math.max(...visibleData.map((d) => d.value), 0);
  const minVal = Math.min(...visibleData.map((d) => d.value), 0);
  const yDomain = [Math.floor(minVal * 1.3), Math.ceil(maxVal * 1.3)];

  const handleZoom = (delta) =>
    setZoomLevel((z) => Math.max(0.5, Math.min(3, +(z + delta).toFixed(2))));

  return (
    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-3 sm:p-4 shadow-md relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[#F0B90B] font-semibold uppercase tracking-wide text-sm sm:text-base">
            {title}
          </h2>
          <div className="flex items-center gap-1 text-xs text-green-400">
            <span className="rounded-full bg-green-400 animate-pulse w-2 h-2" />
            <span>Active</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[
            { Icon: ZoomIn, delta: 0.3 },
            { Icon: ZoomOut, delta: -0.3 },
            { Icon: RotateCcw, delta: 0 },
          ].map(({ Icon, delta }, idx) => (
            <Icon
              key={idx}
              size={isMobile ? 13 : 16}
              className="text-gray-400 hover:text-white cursor-pointer transition-transform duration-150"
              onClick={() =>
                delta === 0 ? setZoomLevel(1) : handleZoom(delta)
              }
            />
          ))}
          <MoreVertical size={isMobile ? 13 : 16} className="text-gray-400" />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={isMobile ? 420 : 540}>
        <BarChart
          data={visibleData}
          margin={{
            top: 10,
            right: isMobile ? 5 : 15,
            left: isMobile ? -5 : 25,
            bottom: isMobile ? 70 : 50,
          }}
          barCategoryGap={isMobile ? "35%" : "18%"}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <ReferenceLine y={0} stroke="#666" strokeWidth={1.3} />

          <XAxis
            dataKey="symbol"
            stroke="#aaa"
            tick={{
              fontSize: isMobile ? 10 : 13,
              fill: "#ccc",
              fontWeight: 600,
            }}
            interval={0}
            angle={-90}
            textAnchor="end"
            height={isMobile ? 85 : 60}
          />
          <YAxis
            stroke="#888"
            tick={{ fontSize: 12, fill: "#aaa" }}
            domain={yDomain}
            tickFormatter={(val) => `${val}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#222" }} />

          <Bar
            dataKey="value"
            barSize={isMobile ? 11 : 28}
            radius={[6, 6, 6, 6]}
          >
            {visibleData.map((entry, idx) => (
              <Cell
                key={`bar-${idx}`}
                fill={entry.value >= 0 ? "#22c55e" : "#ef4444"}
                className="cursor-pointer transition-all duration-150 hover:brightness-125"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklySectorBarChart;
