/** @format */

import React from "react";

const Section1 = ({ products, fetched, loading, addToCart }) => {
  return (
    <div>
      {loading && <div>Loading</div>}{" "}
      {fetched && (
        <div>
          {products.map((product) => {
            const { id, title } = product;
            return (
              <div key={id}>
                <p>{product.title}</p>
                <button
                  onClick={() => {
                    addToCart(product);
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
