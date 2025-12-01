import React from "react";

const MoneyFluxHeatmap = ({ items = [], blink }) => {
  const getColor = (v) => {
    if (v > 1) return "#0b3d24";
    if (v > 0) return "#1d6b4a";
    if (v === 0) return "#b7b446";
    if (v > -1) return "#8a2e2e";
    return "#5a1717";
  };

  const getHoverColor = (v) => {
    if (v > 1) return "#125f3a";
    if (v > 0) return "#248f63";
    if (v === 0) return "#d6d374";
    if (v > -1) return "#b84646";
    return "#7a1f1f";
  };

  return (
    <>
      <style>
        {`
          @keyframes heatBlink {
            0% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>

      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "6px",
          animation: blink ? "heatBlink 0.4s ease-in-out" : "none",
        }}
      >
        <div className="grid grid-cols-4 gap-2">
          {items.map((it, i) => {
            const val = parseFloat(it.change);
            const isFirstRow = i < 4;

            return (
              <div
                key={i}
                className="relative group rounded-md p-2 flex flex-col justify-center items-center text-white cursor-pointer transition-all"
                style={{
                  backgroundColor: getColor(val),
                  height: "68px",
                }}
              >
                <div
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                  style={{ backgroundColor: getHoverColor(val) }}
                ></div>

                <div className="text-xs font-bold truncate w-full text-center z-10">
                  {it.name}
                </div>
                <div className="text-sm z-10">{val.toFixed(2)}</div>

                <div
                  className="absolute bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20"
                  style={{
                    top: isFirstRow ? "75px" : "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {it.name}: {val.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MoneyFluxHeatmap;
