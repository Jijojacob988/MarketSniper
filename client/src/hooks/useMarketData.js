import { useEffect, useState } from "react";
import { getMockStocks } from "../services/mockMarketData";

export default function useMarketData() {
  const [data, setData] = useState({
    highPower: [],
    intradayBoost: [],
    topGainers: [],
    topLosers: [],
  });

  const refreshData = () => {
    const all = getMockStocks(40); // base pool of 40 stocks
    setData({
      highPower: all.slice(0, 10),
      intradayBoost: all.slice(10, 20),
      topGainers: [...all].sort((a, b) => b.percent - a.percent).slice(0, 10),
      topLosers: [...all].sort((a, b) => a.percent - b.percent).slice(0, 10),
    });
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return data;
}
