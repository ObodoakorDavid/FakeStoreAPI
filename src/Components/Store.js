/** @format */

import React from "react";
import "./Store.css";

const Section1 = ({ products, fetched, loading, addToCart }) => {
  return (
    <div>
      {loading && <div>Loading</div>}{" "}
      {fetched && (
        <div className="products">
          {products.map((product) => {
            const { id, title } = product;
            return (
              <div key={id} className="product">
                <p>{product.title}</p>
                <button
                  onClick={() => {
                    addToCart(product);
                    console.log(product);
                  }}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Section1;
