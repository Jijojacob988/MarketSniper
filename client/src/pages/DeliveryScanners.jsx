
import React, { useMemo, useState } from "react";
import DeliveryTable from "../components/DeliveryTable";
import highestData from "../data/dummyHighestDelivery";
import spikeData from "../data/dummyDeliverySpike";

const DeliveryScanners = () => {
  const [scanType, setScanType] = useState("highest");
  const [segment, setSegment] = useState("fo");
  const [query, setQuery] = useState("");

 
  const data = useMemo(() => {
    return scanType === "highest"
      ? highestData[segment]
      : spikeData[segment];
  }, [scanType, segment]);

  // Filter search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((d) => (d.name || "").toLowerCase().includes(q));
  }, [data, query]);

  // Sort logic 
  const sortedData = useMemo(() => {
    const base = [...filtered];

    if (scanType === "highest") {
      return base.sort((a, b) => b.delivery - a.delivery);
    } else {
      return base.sort((a, b) => b.increaseDelivery - a.increaseDelivery);
    }
  }, [filtered, scanType]);

  return (
    <div className="min-h-screen px-3 sm:px-6 md:px-10 pb-12 text-gray-200">
      <div className="w-full max-w-[1200px] mx-auto">

        {/* FILTER CARD */}
        <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6 mb-6 mt-6">

          {/* Title + Active */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-semibold tracking-wide text-[#F0B90B]">
              DELIVERY SCANNER
            </h1>

            <div className="flex items-center gap-2 text-sm text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Scan Type */}
            <div>
              <div className="text-sm text-[#F0B90B] font-semibold mb-2">Type of Scan:</div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="scan"
                    checked={scanType === "highest"}
                    onChange={() => setScanType("highest")}
                    className="accent-[#F0B90B]"
                  />
                  <span>Highest Delivery</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="scan"
                    checked={scanType === "spike"}
                    onChange={() => setScanType("spike")}
                    className="accent-[#F0B90B]"
                  />
                  <span>Delivery Spike</span>
                </label>
              </div>
            </div>

            {/* Segment */}
            <div>
              <div className="text-sm text-[#F0B90B] font-semibold mb-2">Segment:</div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="segment"
                    checked={segment === "fo"}
                    onChange={() => setSegment("fo")}
                    className="accent-[#F0B90B]"
                  />
                  <span>F&O</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="segment"
                    checked={segment === "nifty500"}
                    onChange={() => setSegment("nifty500")}
                    className="accent-[#F0B90B]"
                  />
                  <span>Nifty500</span>
                </label>
              </div>
            </div>

            {/* Search */}
            <div>
              <div className="text-sm text-[#F0B90B] font-semibold mb-2">Search Stock</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stock..."
                className="
                  w-full 
                  bg-[#0E0E0E]
                  rounded-xl 
                  px-4 py-2 
                  border border-[#2a2a2a]
                  text-gray-300
                  focus:outline-none
                  focus:ring-0
                "
              />
            </div>

          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4">
          <DeliveryTable data={sortedData} scanType={scanType} />
        </div>

      </div>
    </div>
  );
};

export default DeliveryScanners;
