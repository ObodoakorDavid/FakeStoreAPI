/** @format */

import React from "react";
import "./Store.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Section1 = ({ products, fetched, loading, addToCart }) => {
  const [xx, setxx] = useState(false);

  return (
    <div>
      {loading && <div>Loading</div>}{" "}
      {fetched && (
        <div className="products">
          {products.map((product) => {
            const { id, title } = product;
            return (
              <div key={id} className="product">
                <Link to={`/products/${id}`}>
                  <img src={product.image} alt="" />
                  <p>{product.title}</p>
                  <p>${product.price}</p>
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
          })}
        </div>
      )}
    </div>
  );
};

export default Section1;
