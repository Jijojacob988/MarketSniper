import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routeMap = {
  "Market Depth": "/market-depth",
  "Pro Setups": "/pro-setups",
  "Sectorial Flow": "/sectorial-flow",
  "Swing Center": "/swing-center",
  "Index Analysis": "/index-analysis",
  "Money Flux": "/money-flux",
  "Delivery Scanners": "/delivery-scanners",
  "FII/DII": "/fii-dii",
  "Trading Journal": "/trading-journal",
  Calculators: "/calculators",
  "Market Insights": "/market-insights",
  "Help Us To Grow": "/help-us-to-grow",
};

const CardItem = ({ title, Icon }) => {
  const path = routeMap[title] || "/";

  return (
    <Link
      to={path}
      className="bg-[#181818] border border-[#242424] rounded-lg 
                 p-5 sm:p-6 md:p-7 
                 flex justify-between items-center 
                 hover:border-[#F0B90B] hover:shadow-[0_0_12px_rgba(240,185,11,0.3)] 
                 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] group"
    >
      <div className="flex items-center gap-3">
        <Icon
          size={22}
          className="text-[#F0B90B] group-hover:text-yellow-400 transition-colors duration-300"
        />
        <h2 className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
          {title}
        </h2>
      </div>
      <ChevronRight
        size={20}
        className="text-[#F0B90B] group-hover:text-yellow-400 transition-transform duration-300"
      />
    </Link>
  );
};

export default CardItem;
