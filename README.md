# ⚡ **Market Sniper**  
### **A Real-Time Market Intelligence Platform for Intraday Options Traders**

<p align="center">
  <a href="https://market-sniper-two.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀 Live Demo-Visit%20Now-blue?style=for-the-badge" />
  </a>
</p>

Market Sniper is a high-speed trading intelligence platform built for **intraday stock option buyers**.  
While most tools teach *how* to trade, Market Sniper helps traders identify **WHERE high-probability opportunities exist right now**—using momentum flow, sector activity, volatility behavior, delivery analysis, and option-chain dynamics.

The platform is designed with a **fully custom analytics workflow and UI/UX**.

---

# 🧭 **Table of Contents**
- [Features](#-features-frontend-ui-complete--backend-coming-soon)
- [Purpose](#-purpose-of-the-project)
- [Roadmap](#-upcoming-backend-features-full-real-time-engine)
- [Tech Stack](#-tech-stack-current--planned)
- [Folder Structure](#-folder-structure-frontend)
- [Local Setup](#-local-setup)
- [Project Status](#-status)
- [Author](#-author)

---

# 🚀 **Features (Frontend UI Complete – Backend Coming Soon)**

### **1. Market Depth**
A multi-table momentum engine that helps traders see where money is flowing *right now*.

- Combines **price action + volume + technical indicator blend**  
- Calculates an internal **Relative-Factor** to score and rank stocks  
- Higher R-Factor = stronger real-time momentum  
- Identifies potential intraday movers instantly  
- One of the core highlights of Market Sniper  

---

### **2. Pro Setups**
Built for intraday momentum traders.

- Tracks **5-min** and **10-min momentum spikes**  
- Highlights stocks breaking structure or accelerating rapidly  
- Useful for catching breakout moves early  

---

### **3. Sectorial Flow**
A real-time sector performance dashboard.

- **Sector heatmap**  
- Bar chart for sector strength comparison  
- Shows which sectors are leading or lagging  
- Helps align stock trades with broader market direction  

---

### **4. Swing Center**
Designed for swing traders.

- NR7 / NR14 breakout & breakdown detection  
- Consolidation pattern identification  
- Volume–OI–Price scoring model  
- Helps find stocks preparing for larger multi-day moves  

---

### **5. Index Analysis**
A full option-chain based index sentiment dashboard.

- Call OI buildup  
- Put OI buildup  
- PCR, PE/CE change  
- ATM bias indicators  
- Index momentum compass  
- Modeled similar to advanced proprietary tools  

---

### **6. MoneyFlux**
Intraday momentum scanner + index strength analyzer.

- High-momentum stock list  
- Synthetic candlestick and histogram data  
- Sentiment meter  
- PCR meter  
- Heatmap of index movers  
- Multi-timeframe filters  

---

### **7. Delivery Scanners**
Positional analysis tools based on delivery percentage.

- Highest delivery stocks  
- Delivery spikes from previous trading day  
- Volume–delivery correlation  
- Helps identify accumulation/distribution zones  

---

### **8. FII/DII Activity**
Daily institutional participation summary.

- FII buying/selling  
- DII buying/selling  
- Net market sentiment  
- Useful for understanding overall market bias  

---

# 🧠 **Purpose of the Project**

Most option buyers understand charts, but struggle with a critical question:

### 🎯 **“Where is the move happening right now?”**

Market Sniper aims to solve this by providing:

- Real-time momentum visibility  
- Smart-money flow identification  
- Sector rotation tracking  
- Index contribution breakdown  
- Volume–OI–Price relationships  
- Institutional sentiment  

This platform is built to help active traders make **fast, informed decisions**.

---

# 🔥 **Upcoming Backend Features (Full Real-Time Engine)**

### **1. Live Data Engine (Socket.IO / WebSocket)**
- Real tick ingestion  
- Push updates for Nifty, BankNifty, F&O Stocks  
- Low-latency chart & table updates  

### **2. Candle Consolidation System**
- Convert tick data into 3m / 5m / 15m / 30m candles  
- Replay engine for testing setups  

### **3. Smart-Money Flow Engine**
- Long/Short buildup detection  
- Sudden OI switches  
- Volume acceleration zones  
- Sector contribution map  

### **4. Momentum & Trend Score**
Factors include:
- Price velocity  
- Volume correlation  
- OI pressure  
- Volatility skews  
- VWAP relationship  

### **5. Index Movers Engine**
- Identifies stocks pulling/pushing the index  
- Links sector movement with index direction  

### **6. Order-Flow Scanner**
- Bid/ask imbalance  
- Liquidity pockets  
- Potential breakout pressure zones  

### **7. REST API Suite**
Endpoints such as:
- `/candles/:symbol`  
- `/heatmap/:index`  
- `/momentum/top`  
- `/oi/:symbol`  

### **8. Cron Jobs**
- Pre-market scans  
- Intraday 5m/10m scans  
- Closing summaries  

### **9. User Authentication**
- JWT login  
- Watchlist  
- Saved setups  
- Trading journal  

### **10. Historical Processor**
- OI replay  
- Heatmap replay  
- Candle + OI merge engine  

---

# 🛠️ **Tech Stack (Current & Planned)**

### **Frontend**
- React (Vite)
- TailwindCSS  
- Recharts  
- Context API  
- Vercel Deployment  

### **Backend (Planned)**
- Node.js + Express  
- MongoDB Atlas  
- WebSocket + Socket.IO  
- Cron jobs  
- JWT Authentication  

### **Optional Enhancements**
- Redis caching  
- BullMQ job queues  
- GCP VM for stable live feed  
- Nginx reverse proxy  

---

# 📦 **Folder Structure (Frontend)**

```
src/
 ├─ components/
 ├─ pages/
 │   ├─ MarketDepth.jsx
 │   ├─ ProSetups.jsx
 │   ├─ SectorialFlow.jsx
 │   ├─ SwingCenter.jsx
 │   ├─ IndexAnalysis.jsx
 │   ├─ MoneyFlux.jsx
 │   ├─ DeliveryScanners.jsx
 │   └─ FIIDII.jsx
 ├─ data/
 ├─ App.jsx
 └─ main.jsx
```

---

# 🧪 **Local Setup**

```
git clone https://github.com/yourusername/market-sniper.git
cd market-sniper/client
npm install
npm run dev
```

---

# 📝 **Status**

✔ 80% UI completed  
✔ Most analysis pages functional (with dummy data)  
✔ Correct routing and UI flow established  
✔ Live on Vercel  
✔ Backend development planned  
🚧 Real-time engines & APIs coming soon  

---
## 📄 License
This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software with attribution.


# 👤 **Author**

**Jijo Jacob**  
Full-Stack Developer | Options Trader  

<p align="left">
  <a href="https://github.com/Jijojacob988" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Jijo--Jacob-black?style=for-the-badge&logo=github" />
  </a>
</p>

---
# ⭐ **If you found this project interesting, consider giving it a star!**


