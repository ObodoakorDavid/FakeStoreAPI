/** @format */

import React, { useContext } from "react";
import StoreContext from "../../context/StoreContext";
import "./Cart.css";

const Cart = () => {
  //   console.log(increaseQuantity);
  const { state, decreaseQuantity, increaseQuantity, remove } =
    useContext(StoreContext);
  return (
    <div>
      {state.cart.map((eachItem) => {
        return (
          <div className="cart-items" key={eachItem.id}>
            <img src={eachItem.image} alt="" />
            <div>
              <p>{eachItem.title}</p>
              <div>
                <button
                  onClick={() => {
                    eachItem.quantity < 2
                      ? remove(eachItem)
                      : decreaseQuantity(eachItem);
                  }}
                >
                  -
                </button>
                <p>{eachItem.quantity}</p>
                <button
                  onClick={() => {
                    increaseQuantity(eachItem);
                  }}
                >
                  +
                </button>
              </div>
              <p
                onClick={() => {
                  remove(eachItem);
                }}
              >
                x
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
