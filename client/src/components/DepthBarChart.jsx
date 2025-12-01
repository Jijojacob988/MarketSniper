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
} from "recharts";
import { ZoomIn, ZoomOut, RotateCcw, MoreVertical } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    const isUp = (entry.change ?? 0) > 0;
    return (
      <div
        className="p-2 rounded-md border border-[#333]"
        style={{
          backgroundColor: "#1a1a1a",
          color: isUp ? "#22c55e" : "#ef4444",
        }}
      >
        <p className="font-semibold">{label}</p>
        {"change" in entry && (
          <p>
            {isUp ? "+" : ""}
            {entry.change?.toFixed(2)}%
          </p>
        )}
        {"tov" in entry && entry.tov && (
          <p className="text-gray-400">T.O: {entry.tov.toFixed(2)}</p>
        )}
        {"rfactor" in entry && entry.rfactor && (
          <p className="text-gray-400">R-Factor: {entry.rfactor.toFixed(2)}</p>
        )}
      </div>
    );
  }
  return null;
};

const DepthBarChart = ({
  title,
  data = [],
  barColor = "#3b82f6",
  bidirectional = false,
  valueKey,
}) => {
  const isIntraday = title.toLowerCase().includes("intraday");
  const key = valueKey || (isIntraday ? "rfactor" : "tov");

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleZoom = (delta) => {
    setZoomLevel((z) => Math.max(0.5, Math.min(3, +(z + delta).toFixed(2))));
  };

  const visibleData = useMemo(() => {
    const total = data.length || 0;
    if (total === 0) return [];
    const visibleCount = Math.max(5, Math.floor(total / zoomLevel));
    return data.slice(0, visibleCount);
  }, [data, zoomLevel]);

  const processedData = useMemo(() => {
    if (!bidirectional) return visibleData;
    return visibleData.map((d) => {
      const val = Number(d[key]) || 0;
      return {
        ...d,
        positive: val > 0 ? val : 0,
        negative: val < 0 ? Math.abs(val) : 0,
        value: val,
      };
    });
  }, [visibleData, key, bidirectional]);

  // Correct Y-axis domain to handle negatives properly
  const yDomain = bidirectional
    ? [
        (dataMin) =>
          Math.floor(Math.min(...processedData.map((d) => d.value), 0) * 1.3),
        (dataMax) =>
          Math.ceil(Math.max(...processedData.map((d) => d.value), 0) * 1.3),
      ]
    : [0, (dataMax) => Math.ceil(dataMax * 1.05)];

  return (
    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-3 sm:p-4 shadow-md relative">
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-3 ${isMobile ? "gap-2" : ""}`}
      >
        <div className="flex items-center gap-2">
          <h2
            className={`text-[#F0B90B] font-semibold uppercase tracking-wide ${
              isMobile ? "text-[11px]" : "text-sm sm:text-base"
            }`}
          >
            {title}
          </h2>
          <div
            className={`flex items-center gap-1 ${
              isMobile ? "text-[10px]" : "text-xs"
            } text-green-400`}
          >
            <span
              className={`rounded-full bg-green-400 animate-pulse ${
                isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
              }`}
            />
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
      <ResponsiveContainer width="100%" height={isMobile ? 350 : 480}>
        <BarChart
          data={processedData}
          margin={{
            top: 10,
            right: 10,
            left: isMobile ? 5 : 40,
            bottom: isMobile ? 70 : 35,
          }}
          barCategoryGap={isMobile ? "40%" : "20%"}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="symbol"
            stroke="#aaa"
            tick={{
              fontSize: isMobile ? 10 : 14,
              fill: "#ccc",
              fontWeight: 600,
            }}
            interval={0}
            angle={-90}
            textAnchor="end"
            height={isMobile ? 80 : 40}
          />
          <YAxis
            stroke="#888"
            tick={{ fontSize: 12, fill: "#aaa" }}
            domain={yDomain}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#222" }} />

          {!bidirectional && (
            <Bar
              dataKey={key}
              barSize={isMobile ? 10 : 28}
              radius={[6, 6, 0, 0]}
              animationDuration={700}
            >
              {visibleData.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={barColor}
                  className="cursor-pointer transition-all duration-200 hover:brightness-125 hover:scale-y-105"
                />
              ))}
            </Bar>
          )}

          {bidirectional && (
            <>
              <Bar
                dataKey="positive"
                barSize={isMobile ? 10 : 28}
                radius={[6, 6, 0, 0]}
              >
                {processedData.map((entry, idx) => (
                  <Cell
                    key={`pos-${idx}`}
                    fill={entry.value > 0 ? "#22c55e" : "transparent"}
                    className="cursor-pointer transition-all duration-200 hover:brightness-125 hover:scale-105"
                  />
                ))}
              </Bar>

              <Bar
                dataKey="negative"
                barSize={isMobile ? 10 : 28}
                radius={[0, 0, 6, 6]}
              >
                {processedData.map((entry, idx) => (
                  <Cell
                    key={`neg-${idx}`}
                    fill={entry.value < 0 ? "#ef4444" : "transparent"}
                    className="cursor-pointer transition-all duration-200 hover:brightness-125 hover:scale-105"
                    transform={`translate(0, ${
                      entry.value < 0
                        ? (entry.value /
                            Math.min(...processedData.map((d) => d.value))) *
                          -2
                        : 0
                    })`}
                  />
                ))}
              </Bar>
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepthBarChart;
