import React, { useState, useMemo, useEffect } from "react";
import MoneyFluxSelector from "../components/MoneyFluxSelector";
import CandleChart from "../components/CandleChart";
import SentimentDial from "../components/SentimentDial";
import PcrDial from "../components/PcrDial";
import MoneyFluxHeatmap from "../components/MoneyFluxHeatmap";

import {
  generateCandles,
  generateSentiment,
  generatePCR,
  generateHeatmap,
  generateHistogramFromCandles,
} from "../data/moneyfluxDummy";

import { getExpiryListForIndex } from "../data/dummyIndexData";

const MoneyFlux = () => {
  const indices = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCAP", "SENSEX"];
  const [selectedIndex, setSelectedIndex] = useState("NIFTY");
  const expiryList = getExpiryListForIndex(selectedIndex);
  const [selectedExpiry, setSelectedExpiry] = useState(expiryList[0]);
  const [timeframe, setTimeframe] = useState("3m");

  // --- CANDLES: depend on index + timeframe ONLY
  const candles = useMemo(
    () =>
      generateCandles({
        index: selectedIndex,
        timeframe,
      }),
    [selectedIndex, timeframe]
  );

  // --- HISTOGRAM (smart-money): depends on index + expiry + candles
  const histogram = useMemo(
    () =>
      generateHistogramFromCandles(candles, {
        index: selectedIndex,
        expiry: selectedExpiry,
        timeframe,
      }),
    [candles, selectedIndex, selectedExpiry, timeframe]
  );

  // Sentiment & PCR must depend on expiry
  const sentiment = useMemo(
    () =>
      generateSentiment({
        index: selectedIndex,
        expiry: selectedExpiry,
        timeframe,
      }),
    [selectedIndex, selectedExpiry, timeframe]
  );

  const pcr = useMemo(
    () =>
      generatePCR({
        index: selectedIndex,
        expiry: selectedExpiry,
        timeframe,
      }),
    [selectedIndex, selectedExpiry, timeframe]
  );

  // --- HEATMAP: independent 5-minute live refresh (NOT linked to timeframe)
  const [heatmap, setHeatmap] = useState(() =>
    generateHeatmap({ index: selectedIndex })
  );
  const [heatmapBlink, setHeatmapBlink] = useState(false);

  // refresh when index changes
  useEffect(() => {
    setHeatmap(generateHeatmap({ index: selectedIndex }));
    setHeatmapBlink(true);
    setTimeout(() => setHeatmapBlink(false), 400);
  }, [selectedIndex]);

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmap(generateHeatmap({ index: selectedIndex }));
      setHeatmapBlink(true);
      setTimeout(() => setHeatmapBlink(false), 400);
    }, 300000); // 300000ms = 5 min

    return () => clearInterval(interval);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 px-3 sm:px-6 md:px-10 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto overflow-x-hidden">
        <MoneyFluxSelector
          indices={indices}
          expiryDates={expiryList}
          selectedIndex={selectedIndex}
          setSelectedIndex={(v) => {
            setSelectedIndex(v);
            setSelectedExpiry(getExpiryListForIndex(v)[0]);
          }}
          selectedExpiry={selectedExpiry}
          setSelectedExpiry={setSelectedExpiry}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />

        <div className="grid grid-cols-0.3 lg:grid-cols-2 gap-6 mt-6">
          {/* LEFT PANEL */}
          <div
            className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6"
            style={{ height: 620 }}
          >
            <div className="text-lg font-semibold mb-4 text-[#F0B90B]">
              {selectedIndex}
            </div>
            <div style={{ height: 530 }}>
              <CandleChart candles={candles} histogram={histogram} />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col gap-6">
            {/* Dials */}
            <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/2 flex justify-center">
                  <SentimentDial
                    label="Sentiment Dial"
                    value={sentiment}
                    tooltip="Sentiment Dial = smart money flow intraday index"
                  />
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                  <PcrDial pcr={pcr} />
                </div>
              </div>

              {/* LEGEND */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-[11px] font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#c0392b] rounded-sm"></span>{" "}
                  Strong Sell
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#e67e22] rounded-sm"></span> Sell
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#ecf0f1] rounded-sm"></span>{" "}
                  Neutral
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#2ecc71] rounded-sm"></span> Buy
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#006400] rounded-sm"></span>{" "}
                  Strong Buy
                </div>
              </div>
            </div>

            {/* HEATMAP */}
            <div
              className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 overflow-hidden relative"
              style={{ height: 380 }}
            >
              <div className="text-lg font-semibold text-[#F0B90B] mb-3">
                Heat Map
              </div>

              <div
                className="absolute left-4 right-4 bottom-4"
                style={{
                  top: "56px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  paddingRight: 6,
                }}
              >
                <MoneyFluxHeatmap items={heatmap} blink={heatmapBlink} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyFlux;
