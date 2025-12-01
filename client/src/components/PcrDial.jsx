import React from "react";
import SentimentDial from "./SentimentDial";

const PcrDial = ({ pcr = 0.7 }) => {
  const normalized = Math.max(0, Math.min(1, (pcr - 0.3) / 1.2));

  return (
    <div className="flex flex-col items-center">
      <SentimentDial
        label="PCR"
        value={normalized}
        tooltip="PCR = number of traded put options / number of traded call options weekly"
      />
    </div>
  );
};

export default PcrDial;
