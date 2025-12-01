import React from "react";
import { Link, useLocation } from "react-router-dom";
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

const menuIcons = [
  { path: "/market-depth", icon: Activity, label: "Market Depth" },
  { path: "/pro-setups", icon: LineChart, label: "Pro Setups" },
  { path: "/sectorial-flow", icon: BarChart3, label: "Sectorial Flow" },
  { path: "/swing-center", icon: Layers, label: "Swing Center" },
  { path: "/index-analysis", icon: TrendingUp, label: "Index Analysis" },
  { path: "/money-flux", icon: Database, label: "Money Flux" },
  {
    path: "/delivery-scanners",
    icon: ClipboardList,
    label: "Delivery Scanners",
  },
  { path: "/fii-dii", icon: Users, label: "FII/DII" },
  { path: "/trading-journal", icon: ClipboardList, label: "Trading Journal" },

  // NEW
  { path: "/calculators", icon: Calculator, label: "Calculators" },
  { path: "/market-insights", icon: Newspaper, label: "Market Insights" },

  { path: "/help-us-to-grow", icon: HelpCircle, label: "Help Us To Grow" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside
      className="
        hidden sm:flex flex-col 
        bg-[#181818] border-r border-[#242424] 
        w-20 h-screen fixed left-0 top-0 pt-16 
        overflow-y-auto
      "
    >
      <nav className="flex flex-col items-center gap-5 py-6">
        {menuIcons.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              title={item.label}
              className={`p-2 rounded-lg cursor-pointer transition ${
                isActive ? "bg-[#242424]" : "hover:bg-[#242424]"
              }`}
            >
              <item.icon
                size={20}
                className={`${
                  isActive ? "text-[#F0B90B]" : "text-[#F0B90B]/70"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
