/** @format */

import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import React from "react";

const Navbarr = ({ cart }) => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <p>David's Store</p>
      </Link>

      <Link to="/cart">
        <div>
          <FiShoppingCart className="cart-icon" /> <small>{cart.length}</small>
        </div>
      </Link>
    </div>
  );
};

export default Navbarr;
