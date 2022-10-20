/** @format */

import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer, useEffect } from "react";
import Navbarr from "./Components/Navbarr";
import Store from "./Components/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Components/Product";
import Cart from "./Components/Cart";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, data: action.payload, fetched: true, loading: false };
    case "ADD TO CART":
      console.log(action.payload);
      const tempState = state.cart.filter(
        (item) => item.id === action.payload.id
      );
      if (tempState.length > 0) {
        return state;
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case "FETCH PRODUCT":
      return { ...state, productFetching: true, productData: action.payload };
    case "INCREASE":
      const tempState1 = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      console.log(tempState1);

      return { ...state, cart: tempState1 };
    case "DECREASE":
      const tempState2 = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });

      console.log(tempState2);

      return { ...state, cart: tempState2 };
    case "REMOVE":
      const newState = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      return { ...state, cart: newState };
    default:
      return state;
  }
};

const initialState = {
  loading: true,
  fetched: false,
  data: [],
  cart: [],
  productData: {},
  productFetching: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    dispatch({ type: "FETCH", payload: data });
    // console.log(data);
  };

  const getProduct = async (id) => {
    let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await res.json();
    dispatch({ type: "FETCH PRODUCT", payload: data });
    // console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD TO CART", payload: product });
  };
  const increaseQuantity = (product) => {
    dispatch({ type: "INCREASE", payload: product });
  };
  const decreaseQuantity = (product) => {
    dispatch({ type: "DECREASE", payload: product });
  };
  const remove = (product) => {
    dispatch({ type: "REMOVE", payload: product });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbarr cart={state.cart} />
        <Routes>
          <Route
            path="/"
            element={
              <Store
                products={state.data}
                loading={state.loading}
                fetched={state.fetched}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="products/:id"
            element={
              <Product
                fetching={state.productFetching}
                getProduct={getProduct}
                product={state.productData}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={state.cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                remove={remove}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
