/** @format */

import React, { useContext, useEffect } from "react";
import StoreContext from "../../context/StoreContext";
import { useParams } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const { state, addToCart, getProduct } = useContext(StoreContext);

  useEffect(() => {
    getProduct(id);
    // console.log(product);
    console.log(state.fetching);
  }, []);
  return (
    <div>
      {!state.productFetching && <div>Loading</div>}
      {state.productFetching && (
        <div className="eachProduct" key={state.productData.id}>
          <img src={state.productData.image} alt="" />
          <div>
            <p>{state.productData.title}</p>
            <p>${state.productData.price}</p>
            <small>{state.productData.description}</small>
            <button
              onClick={() => {
                addToCart(state.productData);
                console.log(state.productData);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
