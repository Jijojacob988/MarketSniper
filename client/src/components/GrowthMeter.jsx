
import React, { useEffect, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GrowthMeter = ({ title, value, color = "#3b82f6" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const animate = () => {
      start += (value - start) * 0.08;
      if (Math.abs(start - value) > 0.5) {
        setProgress(start);
        requestAnimationFrame(animate);
      } else {
        setProgress(value);
      }
    };
    animate();
  }, [value]);

  return (
    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 flex flex-col items-center shadow-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[#F0B90B] font-semibold text-sm uppercase">{title}</h2>
          <div className="flex items-center gap-1 text-xs text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Active</span>
          </div>
        </div>
      </div>

      
      <div style={{ width: 180, height: 100 }}>
        <CircularProgressbarWithChildren
          value={progress}
          circleRatio={0.5}
          strokeWidth={10}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: "round",
            pathTransitionDuration: 0.5,
            pathColor: color, 
            trailColor: "#333",
          })}
        >
          <div className="text-center mt-6">
            <span className="text-white font-semibold text-xl">
              {progress.toFixed(2)}%
            </span>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-3">
        Advance % Growth from Yest. Close
      </p>
    </div>
  );
};

export default GrowthMeter;
