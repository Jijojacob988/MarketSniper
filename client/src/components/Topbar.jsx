import React from "react";
import { User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import useIndexData from "../hooks/useIndexData";

const Topbar = () => {
  const location = useLocation();
  const { nifty, banknifty } = useIndexData();

 const pathToTitle = {
  "/home": "Home",
  "/market-depth": "Market Depth",
  "/pro-setups": "Pro Setups",
  "/money-flux": "Money Flux",
  "/index-analysis": "Index Analysis",
  "/sectorial-flow": "Sectorial Flow",
  "/swing-center": "Swing Center",
  "/fii-dii": "FII / DII",
  "/delivery-scanners": "Delivery Scanners",
  "/trading-journal": "Trading Journal",
  "/calculators": "Calculators",
  "/market-insights": "Market Insights",
  "/help-us-to-grow": "Help Us To Grow",
};


  const pageTitle = pathToTitle[location.pathname] || "Home";

  const getColor = (val) => (val >= 0 ? "text-green-400" : "text-red-400");

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[#181818] border-b border-[#242424] h-16 flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <Link to="/home">
          <div className="w-8 h-8 bg-[#F0B90B] rounded-full flex items-center justify-center text-black font-bold text-sm hover:scale-105 transition">
            M
          </div>
        </Link>
        <h1 className="text-sm sm:text-base md:text-lg font-medium tracking-wide">
          {pageTitle}
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">NIFTY</span>
          <span className={`font-medium ${getColor(nifty.change)}`}>
            {nifty.value.toFixed(2)}
          </span>
          <span className={`${getColor(nifty.change)}`}>
            ({nifty.change.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">BANKNIFTY</span>
          <span className={`font-medium ${getColor(banknifty.change)}`}>
            {banknifty.value.toFixed(2)}
          </span>
          <span className={`${getColor(banknifty.change)}`}>
            ({banknifty.change.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <User size={20} className="text-gray-400" />
        <span className="hidden sm:inline text-sm text-gray-300">
          trader@sniper.com
        </span>
      </div>
    </header>
  );
};

export default Topbar;
