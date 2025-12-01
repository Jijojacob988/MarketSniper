import React, { useState, useEffect, useRef } from "react";

// ticks local to this file (3-min)
const generateSmoothTicks = () => {
  const arr = [];
  let h = 9,
    m = 15;
  while (h < 15 || (h === 15 && m <= 30)) {
    arr.push({
      h,
      m,
      label: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
    });
    m += 3;
    if (m >= 60) {
      m -= 60;
      h++;
    }
  }
  return arr;
};
const smoothTicks = generateSmoothTicks();
const MAX = smoothTicks.length - 1;

const generateDisplayTicks = () => {
  const arr = [];
  let h = 9,
    m = 15;
  while (h < 15 || (h === 15 && m <= 30)) {
    arr.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 31;
    if (m >= 60) {
      m -= 60;
      h++;
    }
  }
  if (arr[arr.length - 1] !== "15:30") arr.push("15:30");
  return arr;
};
const displayTicks = generateDisplayTicks();

const isWeekend = (d) => {
  const day = d.getDay();
  return day === 0 || day === 6;
};

// get previous trading day (Mon-Fri). If d is Mon before market open, prev trading day is Friday.
const prevTradingDay = (d) => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  do {
    copy.setDate(copy.getDate() - 1);
  } while (copy.getDay() === 0 || copy.getDay() === 6);
  return copy;
};

// returns a Date representing the **effective** time we should use for live-index calculation.
// Rules:
// - If weekend -> previous Friday at 15:30
// - If weekday and time < 09:15 -> previous trading day at 15:30
// - If weekday and 09:15 <= time <= 15:30 -> use actual now
// - If weekday and time > 15:30 -> today at 15:30
const getEffectiveNow = () => {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const marketOpenMin = 9 * 60 + 15; // 9:15
  const marketCloseMin = 15 * 60 + 30; // 15:30

  // Weekend -> previous trading day at 15:30
  if (day === 0 || day === 6) {
    const prev = prevTradingDay(now);
    prev.setHours(15, 30, 0, 0);
    return prev;
  }

  // Weekday
  if (minutes < marketOpenMin) {
    // before market open -> show previous trading day's close (15:30)
    const prev = prevTradingDay(now);
    prev.setHours(15, 30, 0, 0);
    return prev;
  }

  if (minutes > marketCloseMin) {
    // after market close -> clamp to today's 15:30
    const todayClose = new Date(now);
    todayClose.setHours(15, 30, 0, 0);
    return todayClose;
  }

  // market open window -> return real now
  return now;
};

// compute live index using effective now (so weekends/after-hours map to 15:30 tick)
const getLiveIndex = () => {
  const eff = getEffectiveNow();
  const nowMin = eff.getHours() * 60 + eff.getMinutes();
  let best = 0;
  let minDiff = Infinity;
  smoothTicks.forEach((t, idx) => {
    const tickMin = t.h * 60 + t.m;
    const diff = Math.abs(tickMin - nowMin);
    if (diff < minDiff) {
      minDiff = diff;
      best = idx;
    }
  });
  return Math.min(best, MAX);
};
// ---------- END MARKET DAY HELPERS ----------

const TimeSlider = ({ onApply }) => {
  const sliderRef = useRef(null);
  const autoFollow = useRef(true);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(() => getLiveIndex());
  const dragType = useRef(null);

  const [nowStr, setNowStr] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      const timestr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      setNowStr(timestr);

      // If autoFollow is enabled, update right handle to effective live index.
      if (autoFollow.current) {
        setRight(getLiveIndex());
      }
    }, 60000);

    // also update immediately once on mount to sync with market logic
    setRight(getLiveIndex());

    return () => clearInterval(interval);
  }, []);

  const userMoved = () => (autoFollow.current = false);

  const pxToIndex = (px) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = (px - rect.left) / rect.width;
    const idx = Math.round(percent * MAX);
    return Math.max(0, Math.min(MAX, idx));
  };

  const startDrag = (type) => (e) => {
    dragType.current = type;
    userMoved();
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    const idx = pxToIndex(e.clientX);
    const live = getLiveIndex();
    if (dragType.current === "left") {
      setLeft(Math.min(idx, right - 1));
    } else if (dragType.current === "right") {
      const clamped = Math.min(idx, live);
      setRight(Math.max(clamped, left + 1));
    }
  };

  const stopDrag = () => {
    dragType.current = null;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  const onClickBar = (e) => {
    const idx = pxToIndex(e.clientX);
    const live = getLiveIndex();
    userMoved();
    if (Math.abs(idx - left) < Math.abs(idx - right)) {
      setLeft(Math.min(idx, right - 1));
    } else {
      const clamped = Math.min(idx, live);
      setRight(Math.max(clamped, left + 1));
    }
  };

  const handleGo = () => {
    autoFollow.current = false;
    onApply &&
      onApply({
        startIndex: left,
        endIndex: right,
        startTime: smoothTicks[left].label,
        endTime: smoothTicks[right].label,
      });
  };

  return (
    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 mb-6">
      <div className="flex flex-col gap-4">
        <div
          className="relative w-full h-10 cursor-pointer"
          ref={sliderRef}
          onClick={onClickBar}
        >
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[8px] bg-[#0f0f0f] rounded-full" />

          <div
            className="absolute top-1/2 -translate-y-1/2 h-[8px] rounded-full"
            style={{
              left: `${(left / MAX) * 100}%`,
              width: `${((right - left) / MAX) * 100}%`,
              background: "linear-gradient(90deg, #F0B90B, #F59E0B)",
            }}
          />

          <div
            className="absolute w-4 h-4 bg-white rounded-full border border-gray-300 shadow cursor-pointer z-20"
            style={{
              left: `calc(${(left / MAX) * 100}% - 8px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onMouseDown={startDrag("left")}
          />

          <div
            className="absolute w-4 h-4 bg-white rounded-full border border-gray-300 shadow cursor-pointer z-20"
            style={{
              left: `calc(${(right / MAX) * 100}% - 8px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onMouseDown={startDrag("right")}
          />

          <div
            className="absolute -top-4 px-2 py-0.5 bg-yellow-600/40 text-white text-[11px] rounded-md"
            style={{ left: `calc(${(left / MAX) * 100}% - 12px)` }}
          >
            {smoothTicks[left].label}
          </div>
          <div
            className="absolute -top-4 px-2 py-0.5 bg-yellow-600/40 text-white text-[11px] rounded-md"
            style={{ left: `calc(${(right / MAX) * 100}% - 12px)` }}
          >
            {smoothTicks[right].label}
          </div>
        </div>

        <div className="w-full flex justify-between text-gray-400 text-[10px] mt-2 px-1 overflow-hidden">
          {displayTicks.map((t, i) => {
            let show = true;
            if (window.innerWidth < 420) {
              const interval = Math.ceil(displayTicks.length / 6);
              show = i % interval === 0;
            }
            return (
              <div key={i} className="flex flex-col items-center w-0">
                <div className="w-[1px] h-2 bg-gray-600"></div>
                {show && <div className="mt-1 whitespace-nowrap">{t}</div>}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end items-center gap-4">
          <span className="text-xs text-gray-400">Current Time:</span>
          <span className="text-sm text-[#3CCF91] font-semibold">{nowStr}</span>

          <button
            onClick={handleGo}
            className="px-4 py-2 border border-[#444] rounded-lg text-[#F0B90B] hover:bg-[#111] transition"
          >
            GO
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;
