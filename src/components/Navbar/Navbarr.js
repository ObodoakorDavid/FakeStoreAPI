/** @format */

import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import StoreContext from "../../context/StoreContext";
import { useContext } from "react";

import React from "react";

const Navbarr = () => {
  const { state } = useContext(StoreContext);

  return (
    <div className="nav-bar">
      <Link to="/">
        <p>David's Store</p>
      </Link>

      <input type="text" />

      <Link to="/cart">
        <div>
          <FiShoppingCart className="cart-icon" />{" "}
          <small>{state.cart.length}</small>
        </div>
      </Link>
    </div>
  );
};

export default Navbarr;
