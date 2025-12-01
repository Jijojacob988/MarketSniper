import { useEffect, useState } from "react";

// Mock live index data generator for NIFTY and BANKNIFTY
export default function useIndexData() {
  const [nifty, setNifty] = useState({ value: 22487.55, change: 0.45 });
  const [banknifty, setBanknifty] = useState({ value: 48222.10, change: -0.18 });

  useEffect(() => {
    const interval = setInterval(() => {
      // simulate small random market fluctuations
      setNifty((prev) => ({
        value: +(prev.value + (Math.random() * 20 - 10)).toFixed(2),
        change: +(Math.random() * 1.5 - 0.75).toFixed(2),
      }));

      setBanknifty((prev) => ({
        value: +(prev.value + (Math.random() * 40 - 20)).toFixed(2),
        change: +(Math.random() * 1.2 - 0.6).toFixed(2),
      }));
    }, 5000); // update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { nifty, banknifty };
}
