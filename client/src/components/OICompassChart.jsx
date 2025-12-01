import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  LabelList,
} from "recharts";

const GREEN = "#22c55e";
const RED = "#ef4444";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div
      style={{
        background: "#222",
        border: "1px solid #2a2a2a",
        padding: 8,
        color: "#ddd",
        borderRadius: 6,
      }}
    >
      <div style={{ fontWeight: 700 }}>Strike: {row.strike}</div>
      <div>CE OI (end): {row.ceOI?.toLocaleString()}</div>
      <div>PE OI (end): {row.peOI?.toLocaleString()}</div>
      <div>CE Change: {row.ceSigned?.toLocaleString()}</div>
      <div>PE Change: {row.peSigned?.toLocaleString()}</div>
    </div>
  );
};

const OICompassChart = ({ data = [], atm = 0 }) => {
  //  ATM FIX → convert all strike values to STRING
  const sorted = useMemo(
    () =>
      [...data]
        .sort((a, b) => a.strike - b.strike)
        .map((row) => ({ ...row, strike: String(row.strike) })), // REQUIRED FIX
    [data]
  );

  // signed min/max
  const { signedMin, signedMax } = useMemo(() => {
    let min = 0,
      max = 0;
    sorted.forEach((r) => {
      const ce = Number(r.ceSigned || 0);
      const pe = Number(r.peSigned || 0);
      min = Math.min(min, ce, pe);
      max = Math.max(max, ce, pe);
    });
    return { signedMin: min, signedMax: max };
  }, [sorted]);

  const safeMin = signedMin === 0 && signedMax === 0 ? -1 : signedMin;
  const safeMax = signedMin === 0 && signedMax === 0 ? 1 : signedMax;

  const domain = [Math.floor(safeMin * 1.15), Math.ceil(safeMax * 1.15)];

  const ticks = useMemo(() => {
    const [lo, hi] = domain;
    const step = Math.ceil((hi - lo) / 4);
    const arr = [];
    for (let v = lo; v <= hi; v += step) arr.push(v);
    if (!arr.includes(0)) arr.push(0);
    return arr.sort((a, b) => a - b);
  }, [domain]);

  const isMobile = window.innerWidth < 500;

  return (
    <>
      <h2 className="text-[#F0B90B] font-semibold text-sm uppercase mb-2">
        OI COMPASS
      </h2>

      <ResponsiveContainer width="100%" height={isMobile ? 600 : 700}>
        <BarChart
          layout="vertical"
          data={sorted}
          margin={{
            top: 10,
            right: isMobile ? 40 : 120,
            left: isMobile ? 30 : 50,
            bottom: 10,
          }}
          barCategoryGap={isMobile ? "15%" : "20%"}
        >
          <CartesianGrid stroke="#1f1f1f" strokeDasharray="3 3" />

          <XAxis
            type="number"
            domain={domain}
            ticks={ticks}
            tick={{ fill: "#aaa", fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(v) => v.toLocaleString()}
          />

          <YAxis
            dataKey="strike"
            type="category"
            width={isMobile ? 45 : 60}
            tick={{ fill: "#fff", fontSize: isMobile ? 10 : 12 }}
            tickMargin={5}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(80,80,80,0.28)" }}
          />

          <Bar
            dataKey="peSigned"
            barSize={isMobile ? 10 : 14}
            fill={GREEN}
            radius={[6, 6, 6, 6]}
          >
            <LabelList
              dataKey="peSigned"
              position={({ value }) => (value < 0 ? "left" : "right")}
              offset={10}
              fill="#ccc"
              fontSize={isMobile ? 10 : 11}
              formatter={(v) =>
                v < 0 ? `-${Math.abs(v).toLocaleString()}` : v.toLocaleString()
              }
            />
          </Bar>

          <Bar
            dataKey="ceSigned"
            barSize={isMobile ? 10 : 14}
            fill={RED}
            radius={[6, 6, 6, 6]}
          >
            <LabelList
              dataKey="ceSigned"
              position={({ value }) => (value < 0 ? "left" : "right")}
              offset={10}
              fill="#ccc"
              fontSize={isMobile ? 10 : 11}
              formatter={(v) =>
                v < 0 ? `-${Math.abs(v).toLocaleString()}` : v.toLocaleString()
              }
            />
          </Bar>

          <ReferenceLine
            y={String(atm)}
            stroke="#fff"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            ifOverflow="extendDomain"
            label={{
              position: "right",
              value: "ATM",
              fill: "#fff",
              fontSize: isMobile ? 10 : 12,
              fontWeight: 700,
              offset: 15,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default OICompassChart;
