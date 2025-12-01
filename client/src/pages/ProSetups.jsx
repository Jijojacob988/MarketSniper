import React, { useMemo } from "react";
import DepthSection from "../components/DepthSection";
import DepthBarChart from "../components/DepthBarChart";

// Dummy sample data for now (replace later with backend logic)
import {
  downsideIntra,
  upsideIntra,
  multiResBo,
  multiSupBo,
  nearPrevHigh,
  nearPrevLow,
  dailyContraction,
  preMarket,
  fiveMinMomentum,
  tenMinMomentum,
} from "../data/dummyProSetupData";

const ProSetups = () => {
  // Limit bar chart data to 20 for both
  const top5Min = useMemo(() => fiveMinMomentum.slice(0, 20), []);
  const top10Min = useMemo(() => tenMinMomentum.slice(0, 20), []);

  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 sm:py-10 px-2 sm:px-6 md:px-10">
      <div className="w-full max-w-[1300px] mx-auto">
        {/*  Bar Chart Sections */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="w-full overflow-x-auto sm:overflow-visible">
            <DepthBarChart
              title="5 Minute Momentum Spike - Top 20"
              data={top5Min}
              barColor="#007bff"
            />
          </div>
          <div className="w-full overflow-x-auto sm:overflow-visible">
            <DepthBarChart
              title="10 Minute Momentum Spike - Top 20"
              data={top10Min}
              barColor="#007bff"
            />
          </div>
        </div>

        {/*  Table Sections (Grid of 8 cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <DepthSection
            title="Downside LOM Intra"
            data={downsideIntra}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
          <DepthSection
            title="Upside LOM Intra"
            data={upsideIntra}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <DepthSection
            title="Multi Resistance BO"
            data={multiResBo}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
          <DepthSection
            title="Multi Support BO"
            data={multiSupBo}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <DepthSection
            title="Near Prev. Day's High"
            data={nearPrevHigh}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
          <DepthSection
            title="Near Prev. Day's Low"
            data={nearPrevLow}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <DepthSection
            title="Daily Contraction"
            data={dailyContraction}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
          <DepthSection
            title="Pre Market"
            data={preMarket}
            columns={["Symbol", "%", "Price", "Volume", "Date-Time"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProSetups;
