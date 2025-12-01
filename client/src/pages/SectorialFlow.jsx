import React, { useRef } from "react";
import HeatmapGrid from "../components/HeatmapGrid";
import SectorialBarChart from "../components/SectorialBarChart";
import DepthSection from "../components/DepthSection";
import {
  sectorBars,
  heatmapData,
  sectorTables,
} from "../data/dummySectorialData";

const SectorialFlow = () => {
  const sectionRefs = useRef({});

  const handleBarClick = (sector) => {
    const el = sectionRefs.current[sector];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("animate-pulse-glow");
      setTimeout(() => el.classList.remove("animate-pulse-glow"), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 sm:py-10 px-2 sm:px-6 md:px-10">
      <div className="w-full max-w-[1400px] mx-auto">
        {/*  Heatmap Section */}
        <h2 className="text-[#F0B90B] font-semibold mb-3 text-lg">
          Sector Heatmap
        </h2>
        <HeatmapGrid data={heatmapData} className="mb-10" />

        {/*  Bidirectional Bar Chart (NEW COMPONENT) */}
        <div className="mb-10">
          <SectorialBarChart
            title="Sectorial View - Active"
            data={sectorBars}
            onBarClick={handleBarClick}
          />
        </div>

        {/* Sector Tables */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(sectorTables).map(([sector, stocks]) => (
            <div
              key={sector}
              id={sector}
              ref={(el) => (sectionRefs.current[sector] = el)}
              className="scroll-mt-24"
            >
              <DepthSection
                title={sector}
                data={stocks}
                columns={["Symbol", "LTP", "Pre C", "% Chg", "R-Factor"]}
              />
            </div>
          ))}
        </section>
      </div>

      <style jsx>{`
        @keyframes glowPulse {
          0%,
          100% {
            box-shadow: 0 0 0px #f0b90b;
          }
          50% {
            box-shadow: 0 0 20px 4px #f0b90b50;
          }
        }
        .animate-pulse-glow {
          animation: glowPulse 2s ease-in-out 2;
        }
      `}</style>
    </div>
  );
};

export default SectorialFlow;
