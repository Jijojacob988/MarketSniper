import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
      {/* Fixed Topbar */}
      <Topbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar (hidden on mobile) */}
        <Sidebar />

        {/* Main content */}
        <main
          className="
            flex-1 overflow-y-auto pb-10
            px-3 sm:px-6 md:px-10 lg:px-14
          "
          style={{
            paddingLeft: isMobile ? "1rem" : "5rem", // responsive fix
            transition: "padding 0.3s ease",
          }}
        >
          <div className="w-full max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
