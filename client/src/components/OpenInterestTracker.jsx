import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const GREEN = "#22c55e";
const RED = "#ef4444";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0].payload;

  return (
    <div
      style={{
        background: "#222",
        border: "1px solid #2a2a2a",
        padding: "8px 12px",
        color: "#ddd",
        borderRadius: 6,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>
        Strike: {entry.strike}
      </div>
      <div>Call OI: {(entry.ceOI || 0).toLocaleString()}</div>
      <div>Put OI: {(entry.peOI || 0).toLocaleString()}</div>
    </div>
  );
};

/* -----------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------ */
const OpenInterestTracker = ({
  data = [],
  atm = 0,
  selectedIndex = "NIFTY",
}) => {
  const filtered = useMemo(
    () => data.filter((r) => (r.ceOI || 0) > 0 || (r.peOI || 0) > 0),
    [data]
  );

  const maxVal = useMemo(() => {
    let mx = 0;
    for (const r of filtered) mx = Math.max(mx, r.ceOI || 0, r.peOI || 0);
    return Math.ceil((mx || 1) / 50000) * 50000 || 50000;
  }, [filtered]);

  const isMobile = window.innerWidth < 500;

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2
          style={{
            color: "#F0B90B",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          {selectedIndex} Open Interest Tracker
        </h2>

        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div style={{ width: 10, height: 10, background: RED }}></div>
            <span>Call OI</span>
          </div>
          <div className="flex items-center gap-1">
            <div style={{ width: 10, height: 10, background: GREEN }}></div>
            <span>Put OI</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={isMobile ? 340 : 420}>
        <BarChart
          data={filtered}
          margin={{
            top: 30,
            right: isMobile ? 15 : 35,
            left: isMobile ? 10 : 40, // 🔥 Slightly increased
            bottom: isMobile ? 60 : 30,
          }}
          barCategoryGap={isMobile ? "20%" : "28%"}
        >
          <CartesianGrid stroke="#222" strokeDasharray="3 3" />

          <XAxis
            dataKey="strike"
            tick={{
              fill: "#bbb",
              fontSize: isMobile ? 10 : 14,
            }}
            interval={0}
            angle={isMobile ? -90 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            dx={isMobile ? -5 : 0}
            dy={isMobile ? 10 : 10}
          />

          <YAxis
            tick={{
              fill: "#bbb",
              fontSize: isMobile ? 10 : 12,
              fontWeight: 600,
            }}
            domain={[0, maxVal]}
            tickFormatter={(v) => v.toLocaleString()}
            width={isMobile ? 55 : 75}
            label={{
              value: "Open Interest",
              angle: -90,
              position: "insideLeft",
              offset: isMobile ? -10 : -5,
              fill: "#ccc",
              fontSize: isMobile ? 11 : 13,
              fontWeight: 700,
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Bars */}
          <Bar
            dataKey="peOI"
            name="Put OI"
            fill={GREEN}
            barSize={isMobile ? 6 : 14}
            radius={[4, 4, 4, 4]}
          />
          <Bar
            dataKey="ceOI"
            name="Call OI"
            fill={RED}
            barSize={isMobile ? 6 : 14}
            radius={[4, 4, 4, 4]}
          />

          {/* ATM vertical dotted line */}
          {filtered.find((d) => d.strike === atm) && (
            <ReferenceLine
              x={atm}
              stroke="#ffffff"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              ifOverflow="extendDomain"
              label={{
                position: "insideTop",
                offset: 6,
                value: "ATM",
                fill: "#ffffff",
                fontSize: isMobile ? 10 : 12,
                fontWeight: 700,
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default OpenInterestTracker;
