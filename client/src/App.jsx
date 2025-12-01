import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import MarketDepth from "./pages/MarketDepth";
import MoneyFlux from "./pages/MoneyFlux";
import IndexAnalysis from "./pages/IndexAnalysis";
import SectorialFlow from "./pages/SectorialFlow";
import SwingCenter from "./pages/SwingCenter";
import FiiDii from "./pages/FiiDii";
import DeliveryScanners from "./pages/DeliveryScanners";
import TradingJournal from "./pages/TradingJournal";
import HelpUsToGrow from "./pages/HelpUsToGrow";
import ProSetups from "./pages/ProSetups";
import Calculators from "./pages/Calculators";
import MarketInsights from "./pages/MarketInsights";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/market-depth" element={<MarketDepth />} />
          <Route path="/pro-setups" element={<ProSetups />} />
          <Route path="/money-flux" element={<MoneyFlux />} />
          <Route path="/index-analysis" element={<IndexAnalysis />} />
          <Route path="/sectorial-flow" element={<SectorialFlow />} />
          <Route path="/swing-center" element={<SwingCenter />} />
          <Route path="/fii-dii" element={<FiiDii />} />
          <Route path="/delivery-scanners" element={<DeliveryScanners />} />
          <Route path="/trading-journal" element={<TradingJournal />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/market-insights" element={<MarketInsights />} />
          <Route path="/help-us-to-grow" element={<HelpUsToGrow />} />
          <Route path="*" element={<Home />} /> {/* default */}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
