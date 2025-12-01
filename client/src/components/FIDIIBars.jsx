import React from "react";
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
import data from "../data/dummyFiDiiData";

const POS = "#22c55e";
const NEG = "#ef4444";

const TooltipTotal = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;

  return (
    <div className="p-2 rounded-md bg-[#111] border border-[#333] text-xs text-white">
      <div className="font-semibold">{label}</div>
      <div className="flex items-center gap-2 mt-1">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: v >= 0 ? POS : NEG }}
        />
        FII + DII Net: {v >= 0 ? "+" : "-"}
        {Math.abs(v).toFixed(2)}
      </div>
    </div>
  );
};

const TooltipFII = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;

  return (
    <div className="p-2 rounded-md bg-[#111] border border-[#333] text-xs text-white">
      <div className="font-semibold">{label}</div>
      <div className="flex items-center gap-2 mt-1">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: v >= 0 ? POS : NEG }}
        />
        FII Net Value: {v >= 0 ? "+" : "-"}
        {Math.abs(v).toFixed(2)}
      </div>
    </div>
  );
};

const TooltipDII = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;

  return (
    <div className="p-2 rounded-md bg-[#111] border border-[#333] text-xs text-white">
      <div className="font-semibold">{label}</div>
      <div className="flex items-center gap-2 mt-1">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: v >= 0 ? POS : NEG }}
        />
        DII Net Value: {v >= 0 ? "+" : "-"}
        {Math.abs(v).toFixed(2)}
      </div>
    </div>
  );
};

const FIDIIBars = ({ height = 150 }) => {
  return (
    <div className="w-full">
      <div className="bg-[#181818] p-4 rounded-xl mb-6">
        <div className="text-[#F0B90B] text-sm font-semibold mb-3">
          FII + DII Net
        </div>

        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} syncId="fidii">
            <CartesianGrid stroke="none" />
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip content={<TooltipTotal />} cursor={{ fill: "#222" }} />

            <Bar dataKey="totalNet" radius={[4, 4, 0, 0]} activeBar={false}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.totalNet >= 0 ? POS : NEG} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#181818] p-4 rounded-xl mb-6">
        <div className="text-[#F0B90B] text-sm font-semibold mb-3">FII Net</div>

        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} syncId="fidii">
            <CartesianGrid stroke="none" />
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip content={<TooltipFII />} cursor={{ fill: "#222" }} />

            <Bar dataKey="fiiNet" radius={[4, 4, 0, 0]} activeBar={false}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.fiiNet >= 0 ? POS : NEG} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#181818] p-4 rounded-xl">
        <div className="text-[#F0B90B] text-sm font-semibold mb-3">DII Net</div>

        <ResponsiveContainer width="100%" height={height + 40}>
          <BarChart data={data} syncId="fidii">
            <CartesianGrid stroke="none" />
            <XAxis
              dataKey="date"
              tick={{
                fill: "#999",
                fontSize: 10,
              }}
              tickLine={false}
              interval={
                window.innerWidth < 640 ? 0 : Math.floor(data.length / 10)
              }
              angle={window.innerWidth < 640 ? -90 : 0}
              textAnchor="end"
              height={window.innerWidth < 640 ? 70 : 30}
              tickFormatter={(val, idx) =>
                window.innerWidth < 640 &&
                idx % Math.ceil(data.length / 5) !== 0
                  ? ""
                  : val
              }
            />

            <YAxis hide />
            <Tooltip content={<TooltipDII />} cursor={{ fill: "#222" }} />

            <Bar dataKey="diiNet" radius={[4, 4, 0, 0]} activeBar={false}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.diiNet >= 0 ? POS : NEG} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FIDIIBars;
