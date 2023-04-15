/** @format */

import React, { useContext } from "react";
import StoreContext from "../../context/StoreContext";
import { Link } from "react-router-dom";

const EachProduct = ({ product }) => {
  const { addToCart } = useContext(StoreContext);
  const { id, title, price } = product;
  return (
    <div className="product">
      <Link to={`/products/${id}`}>
        <img src={product.image} alt="" />
        <p>{title.slice(0, 25)}...</p>
        <p>${price}</p>
        <p>{product.description.slice(0, 40)}...</p>
      </Link>
      <button
        onClick={() => {
          addToCart(product);
          // console.log(product);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default EachProduct;
