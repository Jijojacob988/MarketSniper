// Generate random mock stock data for Market Depth dashboard
const randomPercent = () => +(Math.random() * 4 - 2).toFixed(2); // between -2% and +2%

export const getMockStocks = (count = 10) =>
  Array.from({ length: count }, (_, i) => {
    const price = +(100 + Math.random() * 400).toFixed(2);
    const change = randomPercent();
    return {
      symbol: `STOCK${i + 1}`,
      ltp: price,
      prevClose: +(price / (1 + change / 100)).toFixed(2),
      percent: change,
      to: +(Math.random() * 100).toFixed(2), // turnover rank
      rFactor: +(Math.random() * 10).toFixed(2), // institutional strength
    };
  });
