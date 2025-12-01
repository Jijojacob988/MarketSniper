import React, { useMemo, useState } from "react";
import data from "../data/dummyFiDiiData";

const Pill = ({ children, positive }) => (
  <div
    className={`
      inline-block text-xs font-semibold 
      w-[90px] text-center 
      px-3 py-1 rounded-full
      ${positive ? "text-black" : "text-white"}
    `}
    style={{ background: positive ? "#1FA673" : "#d64545" }}
  >
    {children}
  </div>
);

const NetValue = ({ value }) => (
  <span
    className={`${value >= 0 ? "text-[#3CCF91]" : "text-[#ff6b6b]"} font-semibold`}
  >
    {value >= 0 ? "+" : "-"}
    {Math.abs(value).toFixed(2)}
  </span>
);

const FIDIITable = () => {
  const [query, setQuery] = useState("");

  const computed = useMemo(() => {
    return data.map((d) => {
      const fiiNet = d.fiiBuy - d.fiiSell;
      const diiNet = d.diiBuy - d.diiSell;
      const inMarket = fiiNet + diiNet;
      return { ...d, fiiNet, diiNet, inMarket };
    });
  }, []);

  // Sort latest first
  const sorted = useMemo(() => {
    return [...computed].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [computed]);

  //  Filter by date
  const filtered = useMemo(() => {
    if (!query.trim()) return sorted;

    return sorted.filter((row) =>
      row.date.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sorted]);

  return (
    <div className="bg-[#181818] rounded-xl p-4 border border-[#262626]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[#F0B90B] font-semibold">
          Capital Market Activity (in Cr)
        </h3>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Date"
          className="
    bg-[#0f0f0f] 
    rounded-full 
    px-3 py-1.5          /* smaller padding */
    text-xs              /* smaller font for mobile */
    border border-[#333] 
    w-40                 /* smaller width on mobile */
    sm:w-56              /* full size on bigger screens */
    text-gray-300
    placeholder-gray-500
    focus:outline-none
  "
        />
      </div>

      <div className="max-h-[420px] overflow-y-auto overflow-x-hidden">
        <table className="w-full text-sm border-collapse">
          {/* HEADER */}
          <thead className="sticky top-0 bg-[#181818] z-20 text-[#F0B90B]">
            <tr className="border-b border-[#2a2a2a]">
              <th className="py-3 px-2 text-left">Date</th>
              <th className="py-3 px-2 text-left">FII Buy</th>
              <th className="py-3 px-2 text-left">FII Sell</th>
              <th className="py-3 px-2 text-left">FII Net</th>
              <th className="py-3 px-2 text-left">In Market</th>
              <th className="py-3 px-2 text-left">DII Net</th>
              <th className="py-3 px-2 text-left">DII Buy</th>
              <th className="py-3 px-2 text-left">DII Sell</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filtered.map((row, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-[#151515]" : "bg-[#101010]"
                } hover:bg-[#222]`}
              >
                <td className="px-2 py-3">{row.date}</td>

                <td className="px-2 py-3">{row.fiiBuy.toLocaleString()}</td>
                <td className="px-2 py-3">{row.fiiSell.toLocaleString()}</td>

                <td className="px-2 py-3">
                  <NetValue value={row.fiiNet} />
                </td>

                <td className="px-2 py-3">
                  <Pill positive={row.inMarket >= 0}>
                    {row.inMarket >= 0 ? "+" : "-"}
                    {Math.abs(row.inMarket).toFixed(2)}
                  </Pill>
                </td>

                <td className="px-2 py-3">
                  <NetValue value={row.diiNet} />
                </td>

                <td className="px-2 py-3">{row.diiBuy.toLocaleString()}</td>
                <td className="px-2 py-3">{row.diiSell.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FIDIITable;
