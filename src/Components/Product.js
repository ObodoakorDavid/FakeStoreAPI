/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = ({ getProduct, fetching, product, addToCart }) => {
  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
    console.log(product);
  }, []);
  return (
    <div>
      {!fetching && <div>Loading</div>}
      {fetching && (
        <div className="eachProduct" key={product.id}>
          <img src={product.image} alt="" />
          <p>{product.title}</p>
          <p>${product.price}</p>
          <small>{product.description}</small>
          <button
            onClick={() => {
              addToCart(product);
              console.log(product);
            }}
          >
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
