import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#181818] border-t border-[#242424] text-center py-3 text-xs sm:text-sm text-gray-500">
      <p>
        © 2025{" "}
        <a
          href="https://jijojacob.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F0B90B] hover:underline"
        >
          JijoJacob
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
