import React, { useMemo } from "react";
import DepthSection from "../components/DepthSection";
import DepthBarChart from "../components/DepthBarChart";
import {
  highPowerStocks,
  intradayBoost,
  topGainers,
  topLosers,
} from "../data/dummyDepthData";

const MarketDepth = () => {
  const highPowerData = useMemo(
    () => [...highPowerStocks].sort((a, b) => b.tov - a.tov),
    []
  );
  const intradayData = useMemo(
    () => [...intradayBoost].sort((a, b) => b.rfactor - a.rfactor),
    []
  );
  const gainersData = useMemo(
    () =>
      [...topGainers]
        .filter((s) => s.change > 0)
        .sort((a, b) => b.change - a.change),
    []
  );
  const losersData = useMemo(
    () =>
      [...topLosers]
        .filter((s) => s.change < 0)
        .sort((a, b) => a.change - b.change),
    []
  );
  const topHighPower = useMemo(
    () => highPowerData.slice(0, 20),
    [highPowerData]
  );
  const topIntraday = useMemo(() => intradayData.slice(0, 20), [intradayData]);

  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 sm:py-10 px-2 sm:px-6 md:px-10">
      <div className="w-full max-w-[1300px] mx-auto">
        {/* STOCK LISTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <DepthSection
            title="High Power Stocks"
            data={highPowerData}
            columns={["Symbol", "LTP", "Pre C", "% Chg", "T.O"]}
          />
          <DepthSection
            title="Intraday Boost"
            data={intradayData}
            columns={["Symbol", "LTP", "Pre C", "% Chg", "R-Factor"]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <DepthSection
            title="Top Gainers"
            data={gainersData}
            columns={["Symbol", "LTP", "Pre C", "% Chg", "R-Factor"]}
          />
          <DepthSection
            title="Top Losers"
            data={losersData}
            columns={["Symbol", "LTP", "Pre C", "% Chg", "R-Factor"]}
          />
        </div>

        {/* BAR CHARTS */}
        <div className="flex flex-col gap-6 mt-10">
          <div className="w-full overflow-x-auto sm:overflow-visible">
            <DepthBarChart
              title="High Power Stocks - Top 20"
              data={topHighPower}
              barColor="#007bff"
            />
          </div>
          <div className="w-full overflow-x-auto sm:overflow-visible">
            <DepthBarChart
              title="Intraday Boost - Top 20"
              data={topIntraday}
              barColor="#007bff"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDepth;
