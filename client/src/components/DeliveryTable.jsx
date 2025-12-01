import React from "react";

const PillName = ({ name }) => (
  <div
    className="
      w-[120px]
      text-center
      bg-gradient-to-r from-[#6b46ff] to-[#7c4dff]
      rounded-full px-3 py-1
      text-xs font-semibold text-white truncate
      shadow-md shadow-purple-900/40
      mx-0
      cursor-pointer
      hover:opacity-90
      transition
    "
  >
    {name}
  </div>
);

const AvgPill = ({ value }) => (
  <div
    className="
      w-[90px]
      bg-gradient-to-r from-[#045249] to-[#015246]
      text-center text-sm font-semibold text-white
      py-1 rounded-full
      shadow-md shadow-teal-900/40
      mx-auto
    "
  >
    {value}
  </div>
);

const ProgressBar = ({ percent }) => {
  const safe = Math.max(0, Math.min(100, Number(percent) || 0));
  return (
    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
      <div style={{ width: `${safe}%` }} className="h-full">
        <div className="h-full bg-gradient-to-r from-[#2f756d] to-[#177467]" />
      </div>
    </div>
  );
};

const DeliveryTable = ({ data = [], scanType }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse table-fixed">
        <colgroup>
          <col style={{ width: "170px" }} />
          <col style={{ width: "120px" }} />
          {scanType === "highest" ? (
            <>
              <col style={{ width: "170px" }} />
              <col style={{ width: "110px" }} />
              <col />
            </>
          ) : (
            <>
              <col style={{ width: "110px" }} />
              <col />
              <col style={{ width: "130px" }} />
            </>
          )}
        </colgroup>

        <thead>
          <tr className="text-[#F0B90B] bg-[#181818] border border-[#2a2a2a]">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">LTP</th>

            {scanType === "highest" ? (
              <>
                <th className="px-4 py-3 text-left">Volume</th>
                <th className="px-4 py-3 text-left">Avg. Del %</th>
                <th className="px-4 py-3 text-left">Delivery %</th>
              </>
            ) : (
              <>
                <th className="px-4 py-3 text-left">Avg. Del %</th>
                <th className="px-4 py-3 text-left">Delivery %</th>
                <th className="px-4 py-3 text-left">Increase %</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`
                border-t border-[#2a2a2a] 
                transition
                ${idx % 2 === 0 ? "bg-[#111111]" : "bg-[#181818]"}
                hover:bg-[#1f1f1f]
              `}
            >
              <td className="px-4 py-4 align-middle">
                <PillName name={row.name} />
              </td>

              <td className="px-4 py-4 align-middle">{row.ltp}</td>

              {scanType === "highest" ? (
                <>
                  <td className="px-4 py-4 align-middle">
                    {row.volume.toLocaleString()}
                  </td>

                  <td className="px-4 py-4 align-middle">
                    <AvgPill value={row.avgDelivery} />
                  </td>

                  <td className="px-4 py-4 align-middle">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <ProgressBar percent={row.delivery} />
                      </div>
                      <div className="w-[48px] text-right text-sm">
                        {row.delivery}
                      </div>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-4 align-middle">
                    <AvgPill value={row.avgDelivery} />
                  </td>

                  <td className="px-4 py-4 align-middle">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <ProgressBar percent={row.delivery} />
                      </div>
                      <div className="w-[48px] text-right text-sm">
                        {row.delivery}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-middle">
                    {row.increaseDelivery}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;
