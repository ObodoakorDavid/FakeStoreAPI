/** @format */

import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../context/StoreContext";
import { useParams } from "react-router-dom";
import "./Product.css";
import Loading from "../../utils/Loading";

const Product = () => {
  const { id } = useParams();
  const { state, addToCart, getProduct } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getProduct(id);
      setLoading(false);
    }, 3000);
  }, [id]);
  return (
    <div>
      {loading && <Loading loading={loading} />}
      {!loading && (
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
