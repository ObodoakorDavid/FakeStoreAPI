/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = ({ getProduct, fetching, product }) => {
  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
    console.log(product);
  }, []);
  return (
    <div>
      {!fetching && <div>Loading</div>}
      {fetching && (
        <div key={product.id}>
          <h1>{product.title}</h1>
        </div>
      )}
    </div>
  );
};

export default Product;
