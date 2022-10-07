/** @format */

import logo from "./logo.svg";
import "./App.css";
import { useReducer, useEffect } from "react";
import Navbarr from "./Components/Navbarr";
import Section1 from "./Components/Section1";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, data: action.payload, fetched: true, loading: false };
    default:
      return state;
  }
};

function App() {
  const initialState = {
    loading: true,
    fetched: false,
    data: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const getData = async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    dispatch({ type: "FETCH", payload: data });

    console.log(initialState.loading);
    console.log(initialState.fetched);
    console.log(initialState.data);
    console.log(data);
  };
  useEffect(() => {
    getData();

    setTimeout(() => {
      console.log(initialState.loading);
    console.log(initialState.fetched);
    console.log(initialState.data);
    }, 4000);
  }, []);


  
  return (
    <div className="App">
      <Navbarr />
      <Section1
        products={initialState.data}
        loading={initialState.loading}
        fetching={initialState.fetched}
      />
    </div>
  );
}

export default App;
