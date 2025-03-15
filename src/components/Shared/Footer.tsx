import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="p-2 dark:bg-gray-800 dark:text-white bg-gray-300 text-black">
        <div className="container mx-auto">
          <p className="text-center text-sm">&copy; 2025 Todo Application</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
