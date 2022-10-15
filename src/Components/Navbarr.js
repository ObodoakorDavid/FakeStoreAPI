/** @format */

import { FiShoppingCart } from "react-icons/fi";

import React from "react";

const Navbarr = ({ cart }) => {
  return (
    <div className="nav-bar">
      <p>David's Store</p>
      <div>
        <FiShoppingCart className="cart-icon" /> <small>{cart.length}</small>
      </div>
    </div>
  );
};

export default Navbarr;
