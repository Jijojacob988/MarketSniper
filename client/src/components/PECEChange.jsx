import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const label = item.dataKey === "pe" ? "PE Chg" : "CE Chg";

  return (
    <div className="bg-[#1c1c1c] text-white text-xs px-3 py-2 rounded-lg border border-[#333] shadow">
      <div className="font-semibold mb-1">{label}</div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <span>OI Change: {item.value.toLocaleString()}</span>
      </div>
    </div>
  );
};

const PECEChange = ({ peChange, ceChange }) => {
  const maxVal = Math.max(Math.abs(peChange), Math.abs(ceChange));

  const roundedMax = Math.ceil(maxVal / 10000) * 10000 || 10000;
  const yMax = roundedMax * 1.25;

  const tickStep = Math.floor(yMax / 5) || 1;
  const ticks = [
    0,
    tickStep,
    tickStep * 2,
    tickStep * 3,
    tickStep * 4,
    tickStep * 5,
  ];

  const data = [
    { name: "PE Chg", pe: Math.abs(peChange) },
    { name: "CE Chg", ce: Math.abs(ceChange) },
  ];

  const peColor = peChange >= 0 ? "#3CCF91" : "#E24C4C";
  const ceColor = ceChange >= 0 ? "#E24C4C" : "#3CCF91";

  const isMobile = window.innerWidth < 500;

  return (
    <div
      className={`w-full ${isMobile ? "flex flex-col" : "flex flex-row"} h-full`}
    >
      {/* ==== LEFT CHART ==== */}
      <div className={isMobile ? "w-full h-48" : "flex-1 h-full"}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={8}
            barCategoryGap="30%"
            margin={{
              top: 10,
              right: 10,
              left: isMobile ? 25 : 60,
              bottom: isMobile ? 10 : 5,
            }}
          >
            <CartesianGrid vertical={false} stroke="#2a2a2a" strokeWidth={1} />

            <XAxis
              dataKey="name"
              stroke="#888"
              tick={{ fill: "#bbb", fontSize: isMobile ? 10 : 12 }}
            />

            <YAxis
              width={isMobile ? 35 : 50}
              ticks={ticks}
              domain={[0, yMax]}
              stroke="#888"
              tick={{ fill: "#bbb", fontSize: isMobile ? 9 : 11 }}
              tickFormatter={(v) => v.toLocaleString()}
            />

            <ReferenceLine y={0} stroke="#666" strokeDasharray="4 4" />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="pe"
              fill={peColor}
              barSize={isMobile ? 22 : 38}
              radius={[6, 6, 6, 6]}
            />
            <Bar
              dataKey="ce"
              fill={ceColor}
              barSize={isMobile ? 22 : 38}
              radius={[6, 6, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ==== RIGHT SIDE TEXT ==== */}
      <div className={isMobile ? "w-full mt-4" : "w-36 pl-4 pt-2"}>
        <div className="text-[#F0B90B] font-semibold text-lg mb-3">
          Change in P/C
        </div>

        <div className="flex flex-col mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-gray-300">Change PE OI</span>
          </div>
          <span className="bg-[#2b2b2b] px-2 py-1 rounded text-white text-xs w-fit">
            {Math.abs(peChange).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-gray-300">Change CE OI</span>
          </div>
          <span className="bg-[#2b2b2b] px-2 py-1 rounded text-white text-xs w-fit">
            {Math.abs(ceChange).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PECEChange;
