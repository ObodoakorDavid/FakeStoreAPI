/** @format */

import React from "react";

const Cart = ({ cart, increaseQuantity, decreaseQuantity, remove }) => {
  //   console.log(increaseQuantity);
  return (
    <div>
      {cart.map((eachItem) => {
        return (
          <div key={eachItem.id}>
            <p>{eachItem.title}</p>
            <p>{eachItem.quantity}</p>
            <button
              onClick={() => {
                eachItem.quantity < 2
                  ? remove(eachItem)
                  : decreaseQuantity(eachItem);
              }}
            >
              -
            </button>{" "}
            <button
              onClick={() => {
                increaseQuantity(eachItem);
              }}
            >
              +
            </button>
            <p
              onClick={() => {
                remove(eachItem);
              }}
            >
              x
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
