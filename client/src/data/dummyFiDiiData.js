// src/data/dummyFiDiiData.js
// 40 days of sample FII / DII data (realistic-ish numbers in crores)
const data = [
  { date: "2025-10-21", fiiNet: -1234.5, diiNet: 1540.7, totalNet: 306.2, fiiBuy: 8000.1, fiiSell: 9234.6, diiBuy: 9500.7, diiSell: 7959.9, inMarket: 120.4 },
  { date: "2025-10-22", fiiNet: 342.7, diiNet: -210.5, totalNet: 132.2, fiiBuy: 6400.0, fiiSell: 6057.3, diiBuy: 6200.0, diiSell: 6410.5, inMarket: -22.5 },
  { date: "2025-10-23", fiiNet: 980.3, diiNet: -120.1, totalNet: 860.2, fiiBuy: 12000.3, fiiSell: 11020.0, diiBuy: 5200.2, diiSell: 5320.3, inMarket: 155.6 },
  { date: "2025-10-24", fiiNet: -450.1, diiNet: 670.0, totalNet: 219.9, fiiBuy: 7400.4, fiiSell: 7850.5, diiBuy: 9000.3, diiSell: 8330.3, inMarket: 95.2 },
  { date: "2025-10-25", fiiNet: 120.0, diiNet: 320.5, totalNet: 440.5, fiiBuy: 6012.7, fiiSell: 5892.7, diiBuy: 7200.3, diiSell: 6879.8, inMarket: 107.9 },
  { date: "2025-10-26", fiiNet: -1010.2, diiNet: -520.4, totalNet: -1530.6, fiiBuy: 5200.0, fiiSell: 6210.2, diiBuy: 4100.3, diiSell: 4620.7, inMarket: -287.5 },
  { date: "2025-10-27", fiiNet: 2350.6, diiNet: 1200.4, totalNet: 3551.0, fiiBuy: 15000.0, fiiSell: 12649.4, diiBuy: 9800.3, diiSell: 8600.0, inMarket: 340.2 },
  { date: "2025-10-28", fiiNet: -75.3, diiNet: 130.0, totalNet: 54.7, fiiBuy: 6100.1, fiiSell: 6175.4, diiBuy: 6800.2, diiSell: 6670.2, inMarket: 12.6 },
  { date: "2025-10-29", fiiNet: 420.4, diiNet: 80.5, totalNet: 500.9, fiiBuy: 7200.2, fiiSell: 6780.0, diiBuy: 5300.0, diiSell: 5219.5, inMarket: 98.3 },
  { date: "2025-10-30", fiiNet: -860.0, diiNet: -1200.3, totalNet: -2060.3, fiiBuy: 5400.0, fiiSell: 6260.0, diiBuy: 4200.0, diiSell: 5400.3, inMarket: -220.7 },

  { date: "2025-10-31", fiiNet: 310.1, diiNet: 400.5, totalNet: 710.6, fiiBuy: 6800.0, fiiSell: 6489.9, diiBuy: 7200.0, diiSell: 6799.5, inMarket: 130.8 },
  { date: "2025-11-01", fiiNet: -210.5, diiNet: -340.0, totalNet: -550.5, fiiBuy: 5900.2, fiiSell: 6110.7, diiBuy: 5200.3, diiSell: 5540.3, inMarket: -43.2 },
  { date: "2025-11-02", fiiNet: 1420.0, diiNet: 300.2, totalNet: 1720.2, fiiBuy: 9700.4, fiiSell: 8280.4, diiBuy: 5300.6, diiSell: 5000.4, inMarket: 210.7 },
  { date: "2025-11-03", fiiNet: -630.7, diiNet: 220.3, totalNet: -410.4, fiiBuy: 6100.0, fiiSell: 6730.7, diiBuy: 5200.0, diiSell: 4979.7, inMarket: -75.0 },
  { date: "2025-11-04", fiiNet: 90.5, diiNet: 120.9, totalNet: 211.4, fiiBuy: 5820.9, fiiSell: 5730.4, diiBuy: 6330.5, diiSell: 6209.6, inMarket: 32.4 },
  { date: "2025-11-05", fiiNet: 560.0, diiNet: -120.3, totalNet: 439.7, fiiBuy: 7500.0, fiiSell: 6940.0, diiBuy: 4800.2, diiSell: 4920.5, inMarket: 88.9 },
  { date: "2025-11-06", fiiNet: -140.2, diiNet: 640.4, totalNet: 500.2, fiiBuy: 6100.3, fiiSell: 6240.5, diiBuy: 11200.0, diiSell: 10559.6, inMarket: 143.7 },
  { date: "2025-11-07", fiiNet: 230.3, diiNet: -90.2, totalNet: 140.1, fiiBuy: 6900.0, fiiSell: 6669.7, diiBuy: 5200.0, diiSell: 5290.2, inMarket: 60.2 },
  { date: "2025-11-08", fiiNet: 1800.7, diiNet: 2100.3, totalNet: 3901.0, fiiBuy: 17500.3, fiiSell: 15700.6, diiBuy: 10200.5, diiSell: 8100.2, inMarket: 410.0 },
  { date: "2025-11-09", fiiNet: -320.8, diiNet: -420.1, totalNet: -740.9, fiiBuy: 5600.0, fiiSell: 5920.8, diiBuy: 4800.0, diiSell: 5220.1, inMarket: -120.0 },

  { date: "2025-11-10", fiiNet: 400.0, diiNet: 600.0, totalNet: 1000.0, fiiBuy: 7200.3, fiiSell: 6800.3, diiBuy: 8200.3, diiSell: 7600.3, inMarket: 200.4 },
  { date: "2025-11-11", fiiNet: -980.5, diiNet: 120.0, totalNet: -860.5, fiiBuy: 5400.0, fiiSell: 6380.5, diiBuy: 6200.0, diiSell: 6080.0, inMarket: -80.6 },
  { date: "2025-11-12", fiiNet: 150.2, diiNet: 380.5, totalNet: 530.7, fiiBuy: 6300.0, fiiSell: 6149.8, diiBuy: 8200.4, diiSell: 7819.9, inMarket: 98.2 },
  { date: "2025-11-13", fiiNet: 60.0, diiNet: -200.0, totalNet: -140.0, fiiBuy: 6100.3, fiiSell: 6040.3, diiBuy: 4900.0, diiSell: 5100.0, inMarket: -22.2 },
  { date: "2025-11-14", fiiNet: 900.0, diiNet: 1000.0, totalNet: 1900.0, fiiBuy: 11000.0, fiiSell: 10100.0, diiBuy: 8400.0, diiSell: 7400.0, inMarket: 350.0 },
  { date: "2025-11-15", fiiNet: -220.0, diiNet: -300.0, totalNet: -520.0, fiiBuy: 5300.0, fiiSell: 5520.0, diiBuy: 4700.0, diiSell: 5000.0, inMarket: -90.0 },
  { date: "2025-11-16", fiiNet: 710.3, diiNet: 420.7, totalNet: 1131.0, fiiBuy: 8800.0, fiiSell: 8089.7, diiBuy: 7600.0, diiSell: 7179.3, inMarket: 210.8 },
  { date: "2025-11-17", fiiNet: 120.0, diiNet: 50.0, totalNet: 170.0, fiiBuy: 6400.4, fiiSell: 6280.4, diiBuy: 6200.0, diiSell: 6150.0, inMarket: 35.5 },
  { date: "2025-11-18", fiiNet: -430.0, diiNet: -120.0, totalNet: -550.0, fiiBuy: 5600.0, fiiSell: 6030.0, diiBuy: 4800.0, diiSell: 4920.0, inMarket: -140.3 },
  { date: "2025-11-19", fiiNet: 1400.7, diiNet: 900.1, totalNet: 2300.8, fiiBuy: 14000.8, fiiSell: 12600.1, diiBuy: 9500.2, diiSell: 8600.1, inMarket: 320.6 },

  { date: "2025-11-20", fiiNet: -60.0, diiNet: 80.0, totalNet: 20.0, fiiBuy: 5800.0, fiiSell: 5860.0, diiBuy: 6000.0, diiSell: 5920.0, inMarket: 4.2 },
  { date: "2025-11-21", fiiNet: 420.0, diiNet: -520.0, totalNet: -100.0, fiiBuy: 7000.0, fiiSell: 6580.0, diiBuy: 5200.0, diiSell: 5720.0, inMarket: -23.0 },
  { date: "2025-11-22", fiiNet: 320.5, diiNet: 610.4, totalNet: 930.9, fiiBuy: 6800.0, fiiSell: 6479.5, diiBuy: 9200.0, diiSell: 8589.6, inMarket: 110.1 },
  { date: "2025-11-23", fiiNet: -900.0, diiNet: -400.0, totalNet: -1300.0, fiiBuy: 4900.0, fiiSell: 5800.0, diiBuy: 4200.0, diiSell: 4600.0, inMarket: -265.4 },
  { date: "2025-11-24", fiiNet: 230.0, diiNet: 320.0, totalNet: 550.0, fiiBuy: 6500.0, fiiSell: 6270.0, diiBuy: 7200.0, diiSell: 6880.0, inMarket: 88.7 },
  { date: "2025-11-25", fiiNet: 410.9, diiNet: 980.2, totalNet: 1391.1, fiiBuy: 9000.0, fiiSell: 8589.1, diiBuy: 10200.0, diiSell: 9200.8, inMarket: 220.3 },
  { date: "2025-11-26", fiiNet: -320.0, diiNet: 60.0, totalNet: -260.0, fiiBuy: 5400.0, fiiSell: 5720.0, diiBuy: 5900.0, diiSell: 5840.0, inMarket: -72.9 },
  { date: "2025-11-27", fiiNet: 980.0, diiNet: -120.0, totalNet: 860.0, fiiBuy: 9800.0, fiiSell: 8820.0, diiBuy: 5200.0, diiSell: 5320.0, inMarket: 180.9 },
  { date: "2025-11-28", fiiNet: 1300.3, diiNet: 780.7, totalNet: 2081.0, fiiBuy: 14500.0, fiiSell: 13200.0, diiBuy: 9800.0, diiSell: 9020.0, inMarket: 300.4 }
];

export default data;
