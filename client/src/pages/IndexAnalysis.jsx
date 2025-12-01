import React, { useState, useMemo, useEffect } from "react";
import TimeSlider from "../components/TimeSlider";
import IndexSelector from "../components/IndexSelector";
import OICompassChart from "../components/OICompassChart";
import OpenInterestTracker from "../components/OpenInterestTracker";
import PECEChange from "../components/PECEChange";
import PCRatioCard from "../components/PCRatioCard";
import {
  computeDatasetForRange,
  getExpiryListForIndex,
} from "../data/dummyIndexData";

const IndexAnalysis = () => {
  const indices = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCAP", "SENSEX"];

  const [selectedIndex, setSelectedIndex] = useState("NIFTY");
  const expiryList = getExpiryListForIndex(selectedIndex);
  const [selectedExpiry, setSelectedExpiry] = useState(expiryList[0] || "");

  const [rangeState, setRangeState] = useState({
    startIndex: 0,
    endIndex: null,
    autoFollow: true,
  });

  const generateSmoothTicks = () => {
    const arr = [];
    let h = 9,
      m = 15;
    while (h < 15 || (h === 15 && m <= 30)) {
      arr.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      m += 3;
      if (m >= 60) {
        m -= 60;
        h++;
      }
    }
    return arr;
  };
  const smoothTicks = generateSmoothTicks();

  // ---------- MARKET DAY LOGIC ----------
  const prevTradingDay = (d) => {
    const copy = new Date(d);
    copy.setHours(0, 0, 0, 0);
    do {
      copy.setDate(copy.getDate() - 1);
    } while (copy.getDay() === 0 || copy.getDay() === 6);
    return copy;
  };

  const getEffectiveNow = () => {
    const now = new Date();
    const day = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const open = 9 * 60 + 15;
    const close = 15 * 60 + 30;

    if (day === 0 || day === 6) {
      const prev = prevTradingDay(now);
      prev.setHours(15, 30, 0, 0);
      return prev;
    }
    if (minutes < open) {
      const prev = prevTradingDay(now);
      prev.setHours(15, 30, 0, 0);
      return prev;
    }
    if (minutes > close) {
      const todayClose = new Date(now);
      todayClose.setHours(15, 30, 0, 0);
      return todayClose;
    }
    return now;
  };

  const getLiveIndex = () => {
    const eff = getEffectiveNow();
    const nowMin = eff.getHours() * 60 + eff.getMinutes();
    let best = 0;
    let minDiff = Infinity;
    smoothTicks.forEach((t, idx) => {
      const [hh, mm] = t.split(":").map(Number);
      const tickMin = hh * 60 + mm;
      const diff = Math.abs(tickMin - nowMin);
      if (diff < minDiff) {
        minDiff = diff;
        best = idx;
      }
    });
    return best;
  };
  // ---------- END MARKET DAY LOGIC ----------

  const liveIndex = getLiveIndex();

  const startIndex = rangeState.startIndex;
  const endIndex = rangeState.autoFollow
    ? liveIndex
    : (rangeState.endIndex ?? liveIndex);

  useEffect(() => {
    const timer = setInterval(() => {
      if (rangeState.autoFollow) {
        setRangeState((prev) => ({ ...prev }));
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [rangeState.autoFollow]);

  const dataset = useMemo(() => {
    return computeDatasetForRange(
      selectedIndex,
      selectedExpiry,
      startIndex,
      endIndex
    );
  }, [selectedIndex, selectedExpiry, startIndex, endIndex]);

  const onIndexChange = (v) => {
    setSelectedIndex(v);
    const exps = getExpiryListForIndex(v);
    setSelectedExpiry(exps[0] || "");
    setRangeState({ startIndex: 0, endIndex: null, autoFollow: true });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white py-8 sm:py-10 px-3 sm:px-6 md:px-10">
      <div className="max-w-[1500px] mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-8 text-[#F0B90B] tracking-wide">
          INDEX ANALYSIS
        </h1>

        <TimeSlider
          onApply={(r) =>
            setRangeState({
              startIndex: r.startIndex,
              endIndex: r.endIndex,
              autoFollow: false,
            })
          }
        />

        <div className="mt-4">
          <IndexSelector
            indices={indices}
            expiryDates={getExpiryListForIndex(selectedIndex)}
            selectedIndex={selectedIndex}
            setSelectedIndex={onIndexChange}
            selectedExpiry={selectedExpiry}
            setSelectedExpiry={(v) => setSelectedExpiry(v)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-[#181818] border border-[#2a2a2a] rounded-xl p-4">
            <OICompassChart data={dataset.oiCompass} atm={dataset.atm} />
          </div>

          <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 flex flex-col justify-between">
            <div className="flex-[1.3] border-b border-[#2a2a2a] pb-4 mb-4">
              <PECEChange
                peChange={dataset.peChange}
                ceChange={dataset.ceChange}
              />
            </div>

            <div className="flex-[0.9]">
              <PCRatioCard
                data={{
                  pcTotalPE: dataset.pcTotalPE,
                  pcTotalCE: dataset.pcTotalCE,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#181818] border border-[#2a2a2a] rounded-xl p-4">
          <OpenInterestTracker
            data={dataset.openInterestTracker}
            atm={dataset.atm}
            selectedIndex={selectedIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default IndexAnalysis;
