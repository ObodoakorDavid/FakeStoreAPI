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
      const tempState = state.cart.find((item) => item.id == action.payload.id);
      if (tempState) {
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
      return { ...state, cart: tempState1 };
    case "DECREASE":
      const tempState2 = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempState2 };
    case "REMOVE":
      const newState = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: newState };
    case "UpdateCartFromLC":
      return { ...state, cart: action.payload };
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
  };

  const getProduct = async (id) => {
    let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await res.json();
    dispatch({ type: "FETCH PRODUCT", payload: data });
  };

  const setLocalStorage = () => {
    localStorage.setItem("userCart", JSON.stringify(state.cart));
  };

  useEffect(() => {
    if (localStorage.getItem("userCart")) {
      dispatch({
        type: "UpdateCartFromLC",
        payload: JSON.parse(localStorage.getItem("userCart")),
      });
    }
    getData();
  }, []);

  useEffect(() => {
    setLocalStorage();
  }, [state.cart]);

  const addToCart = (product) => {
    dispatch({ type: "ADD TO CART", payload: product });
    setLocalStorage(state.cart);
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
