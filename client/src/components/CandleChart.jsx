import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const CandleChart = ({ candles = [], histogram = [] }) => {
  const containerRef = useRef(null);

  const mainChartRef = useRef(null);
  const histChartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const histSeriesRef = useRef(null);

  const svgRef = useRef(null);
  const resizeObsRef = useRef(null);

  const COLORS = {
    strongUp: "#00e5ff",
    weakUp: "#66f0ff",
    weakDown: "#ff9f9f",
    strongDown: "#ff4b4b",
  };

  const drawOverlay = () => {
    const svg = svgRef.current;
    const histChart = histChartRef.current;
    const mainChart = mainChartRef.current;

    if (!svg || !histChart || !mainChart) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    if (!candles.length || !histogram.length) return;

    const rect = svg.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    let indexToX;
    let valueToY;

    try {
      indexToX = (i) => {
        const fn = mainChart.timeScale().indexToCoordinate;
        if (typeof fn === "function") return fn(i);

        const visible = mainChart.timeScale().getVisibleLogicalRange?.() || {
          from: 0,
          to: Math.max(1, candles.length),
        };
        const spacing = width / Math.max(1, visible.to - visible.from);
        return (i - visible.from) * spacing;
      };

      const priceScale = histChart.priceScale("");
      valueToY = (v) => priceScale.priceToCoordinate(v);
    } catch {
      return;
    }

    let baselineY;
    try {
      baselineY = valueToY(0);
    } catch {
      baselineY = height / 2;
    }

    let barWidth = 6;
    try {
      const x0 = indexToX(0);
      const x1 = indexToX(1);
      if (!isNaN(x1 - x0))
        barWidth = Math.min(32, Math.max(4, (x1 - x0) * 0.8));
    } catch {}

    const rx = Math.min(8, Math.max(3, Math.round(barWidth * 0.25)));

    candles.forEach((c, idx) => {
      try {
        const x = indexToX(idx);

        const hObj = histogram[idx];
        if (!hObj) return;
        const v = hObj.value;

        const y = valueToY(v);
        const base = baselineY;
        const topY = Math.min(y, base);
        const bottomY = Math.max(y, base);
        const h = Math.max(1, bottomY - topY);

        const absVal = Math.abs(v);
        let color =
          v >= 0
            ? absVal > 6
              ? COLORS.strongUp
              : COLORS.weakUp
            : absVal > 6
              ? COLORS.strongDown
              : COLORS.weakDown;

        const rectEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rectEl.setAttribute("x", String(Math.round(x - barWidth / 2)));
        rectEl.setAttribute("y", String(Math.round(topY)));
        rectEl.setAttribute("width", String(barWidth));
        rectEl.setAttribute("height", String(Math.round(h)));
        rectEl.setAttribute("rx", String(rx));
        rectEl.setAttribute("ry", String(rx));
        rectEl.setAttribute("fill", color);
        rectEl.setAttribute("opacity", "0.95");

        svg.appendChild(rectEl);
      } catch {}
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const totalH = container.clientHeight || 420;
    const mainH = Math.round(totalH * 0.7);
    const histH = Math.round(totalH * 0.3);

    const chart = createChart(container, {
      width: container.clientWidth,
      height: mainH,
      layout: { backgroundColor: "#181818", textColor: "#bfbfbf" },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { visible: false },
      timeScale: { visible: false, borderVisible: false },
      crosshair: { mode: CrosshairMode.Normal },
      handleScroll: false,
      handleScale: false,
    });

    mainChartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      borderVisible: false,
      priceLineVisible: false,
    });

    candleSeriesRef.current = candleSeries;

    const histContainer = document.createElement("div");
    histContainer.style.position = "relative";
    histContainer.style.width = "100%";
    histContainer.style.height = `${histH}px`;
    histContainer.style.marginTop = "6px";
    container.appendChild(histContainer);

    const histChart = createChart(histContainer, {
      width: container.clientWidth,
      height: histH,
      layout: { backgroundColor: "#181818", textColor: "#bfbfbf" },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { visible: false },
      timeScale: { visible: false, borderVisible: false },
      handleScroll: false,
      handleScale: false,
    });

    histChartRef.current = histChart;

    const histSeries = histChart.addHistogramSeries({
      base: 0,
      priceScaleId: "",
      scaleMargins: { top: 0.25, bottom: 0.25 },
      priceLineVisible: false,
    });

    histSeriesRef.current = histSeries;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    svgRef.current = svg;
    histContainer.appendChild(svg);

    const ro = new ResizeObserver(() => {
      chart.resize(container.clientWidth, mainH);
      histChart.resize(container.clientWidth, histH);
      drawOverlay();
    });

    ro.observe(container);
    resizeObsRef.current = ro;

    return () => {
      try {
        ro.disconnect();
        chart.remove();
        histChart.remove();
      } catch {}
    };
  }, []);

  // ------------------ UPDATE DATA ------------------
  useEffect(() => {
    if (!candleSeriesRef.current || !histSeriesRef.current) return;

    const candleData = candles.map((c, i) => ({
      time: i,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    const histData = histogram.map((h, i) => ({
      time: i,
      value: h.value,
      color:
        h.value > 4
          ? COLORS.strongUp
          : h.value > 0
            ? COLORS.weakUp
            : h.value < -4
              ? COLORS.strongDown
              : COLORS.weakDown,
    }));

    candleSeriesRef.current.setData(candleData);
    histSeriesRef.current.setData(histData);

    try {
      const bars = candles.length;
      const opts = {
        fixLeftEdge: true,
        fixRightEdge: true,
        rightOffset: 0,
        barSpacing: 7,
        minBarSpacing: 3,
        maxBarSpacing: 12,
      };
      mainChartRef.current.timeScale().applyOptions(opts);
      mainChartRef.current
        .timeScale()
        .setVisibleLogicalRange({ from: 0, to: bars });
      histChartRef.current.timeScale().applyOptions(opts);
      histChartRef.current
        .timeScale()
        .setVisibleLogicalRange({ from: 0, to: bars });
    } catch {}

    setTimeout(() => drawOverlay(), 20);
  }, [candles, histogram]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default CandleChart;
