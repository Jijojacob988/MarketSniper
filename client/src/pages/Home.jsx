import React from "react";
import CardGrid from "../components/CardGrid";
import { AlertTriangle } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 sm:py-10 px-3 sm:px-6 md:px-10">
      <div className="w-full max-w-[1300px] mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#F0B90B]">
            MarketSniper Dashboard
          </h2>
        </div>

        {/* Dashboard Cards */}
        <CardGrid />

        {/* Disclaimer */}
        <div className="mt-10 flex justify-center px-2 sm:px-0">
          <div className="bg-[#181818] border border-[#242424] rounded-lg p-4 sm:p-5 max-w-3xl text-center text-gray-400 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-[#F0B90B]" />
              <span className="font-medium text-gray-300">Disclaimer</span>
            </div>
            <p className="text-xs sm:text-sm">
              MarketSniper provides analytical insights for educational purposes
              only. Trading in financial markets involves risk. Please do your
              own research before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
