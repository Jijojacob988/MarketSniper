import React from "react";
import Bars from "../components/FIDIIBars";
import FIDIITable from "../components/FIDIITable";

const FiiDii = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 px-2 sm:px-6 md:px-10">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl text-center font-semibold text-[#F0B90B]">
            FII / DII DATA
          </h1>
        </div>

        {/* Bars */}
        <div className="bg-[#181818] rounded-xl p-4 border border-[#2a2a2a] shadow-inner mb-6">
          <Bars />
        </div>

        {/* Table */}
        <div className="bg-[#181818] rounded-xl p-4 border border-[#2a2a2a] shadow-inner">
          <div
            className="
              max-h-[500px]
              w-full
              overflow-y-auto
              overflow-x-hidden
              scrollbar-thin
              scrollbar-thumb-[#2a2a2a]
              scrollbar-track-[#0f0f0f]
              scrollbar-thumb-rounded-full
              scrollbar-track-rounded-full
            "
          >
            <div className="w-full overflow-hidden">
              <FIDIITable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiiDii;
