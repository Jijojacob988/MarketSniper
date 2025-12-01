import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CandleHistogram = ({ histogram = [] }) => {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const resizeRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const chart = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      layout: {
        backgroundColor: "#181818",
        textColor: "#bfbfbf",
      },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { visible: false },
      timeScale: { borderVisible: false, timeVisible: false },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addHistogramSeries({
      base: 0,
      priceFormat: { type: "volume" },
      priceScaleId: "",
      scaleMargins: { top: 0.5, bottom: 0.5 },
    });

    chartRef.current = chart;
    seriesRef.current = series;

    resizeRef.current = new ResizeObserver(() => {
      chart.resize(ref.current.clientWidth, ref.current.clientHeight);
    });
    resizeRef.current.observe(ref.current);

    return () => {
      try {
        resizeRef.current.disconnect();
        chart.remove();
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;

    const data = histogram.map((h) => ({
      time: h.time,
      value: h.value,
      color: h.value > 0 ? "#00e5ff" : h.value < 0 ? "#ff6b6b" : "#ffffff",
    }));

    try {
      seriesRef.current.setData(data);

      chartRef.current.timeScale().fitContent();
      chartRef.current.timeScale().applyOptions({ rightOffset: 6 });
      seriesRef.current.applyOptions({
        scaleMargins: { top: 0.5, bottom: 0.5 },
      });
    } catch (e) {}
  }, [histogram]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default CandleHistogram;
