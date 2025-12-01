import React from "react";
import CardItem from "./CardItem";
import {
  Activity,
  BarChart3,
  TrendingUp,
  LineChart,
  Database,
  Layers,
  ClipboardList,
  HelpCircle,
  Users,
  Calculator,
  Newspaper,
} from "lucide-react";

const features = [
  { name: "Market Depth", icon: Activity },
  { name: "Pro Setups", icon: LineChart },
  { name: "Sectorial Flow", icon: BarChart3 },
  { name: "Swing Center", icon: Layers },
  { name: "Index Analysis", icon: TrendingUp },
  { name: "Money Flux", icon: Database },
  { name: "Delivery Scanners", icon: ClipboardList },
  { name: "FII/DII", icon: Users },
  { name: "Trading Journal", icon: ClipboardList },
  { name: "Calculators", icon: Calculator },
  { name: "Market Insights", icon: Newspaper },
  { name: "Help Us To Grow", icon: HelpCircle },
];

const CardGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {features.map((f, i) => (
        <CardItem key={i} title={f.name} Icon={f.icon} />
      ))}
    </div>
  );
};

export default CardGrid;
