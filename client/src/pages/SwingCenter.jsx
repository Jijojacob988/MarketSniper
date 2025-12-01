import React from "react";
import GrowthMeter from "../components/GrowthMeter";
import WeeklySectorBarChart from "../components/WeeklySectorBarChart";
import SwingTableSection from "../components/SwingTableSection";
import {
  growthData,
  swingTables,
  weeklyPerformance,
} from "../data/dummySwingData";

const SwingCenter = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 sm:py-10 px-3 sm:px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Growth Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <GrowthMeter title="Nifty A/D Growth" value={growthData.nifty} />
          <GrowthMeter title="F&O A/D Growth" value={growthData.fo} />
        </div>

        {/* 8 Swing Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <SwingTableSection
            title="SHORT TERM SWING BO - UP"
            data={swingTables.shortUp}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />
          <SwingTableSection
            title="SHORT TERM SWING BO - DOWN"
            data={swingTables.shortDown}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />

          <SwingTableSection
            title="LONG TERM SWING BO - UP"
            data={swingTables.longUp}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />
          <SwingTableSection
            title="LONG TERM SWING BO - DOWN"
            data={swingTables.longDown}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />

          <SwingTableSection
            title="NR7 BREAKOUTS"
            data={swingTables.nr7Breakouts}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />
          <SwingTableSection
            title="NR14 BREAKOUTS"
            data={swingTables.nr14Breakouts}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />

          <SwingTableSection
            title="DOWNSIDE LOM SWING"
            data={swingTables.downsideLOM}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />
          <SwingTableSection
            title="UPSIDE LOM SWING"
            data={swingTables.upsideLOM}
            columns={["Symbol", "LTP", "Pre C", "%", "Sector", "Date"]}
          />
        </div>

        {/* Weekly Chart */}
        <WeeklySectorBarChart
          title="Weekly Sectorial Performance"
          data={weeklyPerformance}
        />
      </div>
    </div>
  );
};

export default SwingCenter;
