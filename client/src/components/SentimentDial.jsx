import React from "react";

const SentimentDial = ({ label = "Sentiment Dial", value = 0.5, tooltip }) => {
  const v = Math.max(0, Math.min(1, value));
  const angle = -90 + v * 180;

  return (
    <div className="flex flex-col items-center w-[260px] relative">
      {/* DIAL */}
      <svg viewBox="0 0 200 120" width="220" height="120">
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke="#222"
          strokeWidth="16"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="dialGradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#c0392b" />
            <stop offset="30%" stopColor="#e67e22" />
            <stop offset="50%" stopColor="#ecf0f1" />
            <stop offset="70%" stopColor="#2ecc71" />
            <stop offset="100%" stopColor="#006400" />
          </linearGradient>
        </defs>

        <path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#dialGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        <g
          transform={`rotate(${angle} 100 100)`}
          style={{ transition: "transform 0.6s ease" }}
        >
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="#F0B90B"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="6" fill="#F0B90B" />
        </g>
      </svg>

      {/* LABEL + INFO */}
      <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-[#F0B90B]">
        {label}

        <div className="relative group">
          <div className="w-4 h-4 flex items-center justify-center bg-gray-300 text-black rounded-full text-[10px] cursor-pointer">
            i
          </div>

          <div
            className="
    absolute left-1/2 -translate-x-1/2 mt-1
    bg-black text-white text-xs p-2 rounded
    opacity-0 group-hover:opacity-100 pointer-events-none
    max-w-[160px] text-center leading-tight
    break-words z-50 shadow-lg
  "
          >
            {tooltip}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentDial;
