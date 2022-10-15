/** @format */

import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer, useEffect } from "react";
import Navbarr from "./Components/Navbarr";
import Store from "./Components/Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, data: action.payload, fetched: true, loading: false };
    case "ADD TO CART":
      return { ...state, cart: [...state.cart, action.payload] };
    default:
      return state;
  }
};

function App() {
  const initialState = {
    loading: true,
    fetched: false,
    data: [],
    cart: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    dispatch({ type: "FETCH", payload: data });
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD TO CART", payload: product });
    console.log(state.cart);
  };

  return (
    <div className="App">
      <Navbarr cart={state.cart} />
      <Store
        products={state.data}
        loading={state.loading}
        fetched={state.fetched}
        addToCart={addToCart}
      />
    </div>
  );
}

export default App;
