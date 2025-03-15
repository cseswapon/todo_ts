import ThemeProvider from "@/utils/ThemeProvider";
import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <div className="dark:bg-gray-800 dark:text-white bg-gray-300 text-black py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">TODO</h1>
          </div>
          <div>
            <ThemeProvider />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
