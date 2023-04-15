/** @format */

import React from "react";
import Navbarr from "../components/Navbar/Navbarr";

const RootLayout = ({ children }) => {
  return (
    <div>
      <Navbarr />
      {children}
    </div>
  );
};

export default RootLayout;
