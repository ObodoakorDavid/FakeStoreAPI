/** @format */

import { FiShoppingCart } from "react-icons/fi";

import React from "react";

const Navbarr = ({ cart }) => {
  return (
    <div>
      <div>
        <FiShoppingCart /> <p>
          cart: {cart.length}
        </p>
      </div>
    </div>
  );
};

export default Navbarr;
