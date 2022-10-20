/** @format */

import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer, useEffect } from "react";
import Navbarr from "./Components/Navbarr";
import Store from "./Components/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, data: action.payload, fetched: true, loading: false };
    case "ADD TO CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "FETCH PRODUCT":
      return { ...state, productFetching: true, productData: action.payload };
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
    productData: {},
    productFetching: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    dispatch({ type: "FETCH", payload: data });
    console.log(data);
  };

  const getProduct = async (id) => {
    let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await res.json();
    dispatch({ type: "FETCH PRODUCT", payload: data });
    console.log(data);
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
