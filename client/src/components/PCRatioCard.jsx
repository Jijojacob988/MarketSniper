import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GREEN = "#22c55e";
const RED = "#ef4444";

const RADIAN = Math.PI / 180;

const renderSliceLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  fill,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {(percent * 100).toFixed(1)}%
    </text>
  );
};

const PCRatioCard = ({ data }) => {
  const totalPE = data.pcTotalPE || 1;
  const totalCE = data.pcTotalCE || 1;

  const pieData = [
    { name: "PE", value: totalPE, color: GREEN },
    { name: "CE", value: totalCE, color: RED },
  ];

  const ratio = (totalPE / totalCE).toFixed(2);
  const isMobile = window.innerWidth < 600;

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-[#F0B90B] font-semibold text-sm uppercase mb-3">
        P/C RATIO NET
      </h2>

      <div
        className={`flex ${
          isMobile
            ? "flex-col items-center gap-5"
            : "flex-row items-center gap-6"
        }`}
      >
        {/* DONUT */}
        <div
          style={{
            width: isMobile ? 180 : 200,
            height: isMobile ? 180 : 200,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 40 : 50}
                outerRadius={isMobile ? 62 : 75}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                label={renderSliceLabel}
                labelLine={false}
              >
                {pieData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={isMobile ? "text-center" : ""}>
          <div className="text-gray-300 text-sm mb-1">
            Total PE OI (added):{" "}
            <span className="text-white font-semibold">
              {totalPE.toLocaleString()}
            </span>
          </div>

          <div className="text-gray-300 text-sm mb-1">
            Total CE OI (added):{" "}
            <span className="text-white font-semibold">
              {totalCE.toLocaleString()}
            </span>
          </div>

          <div className="text-gray-300 text-sm">
            PCR: <span className="text-white font-semibold">{ratio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCRatioCard;
