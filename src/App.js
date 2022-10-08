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
      break;
    case "TEST":
      return { ...state, data: [10] };
    default:
      return state;
      break;
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
    console.log(state.loading);
    console.log(state.fetched);
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    dispatch({ type: "FETCH", payload: data });

    // console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);
  
  console.log(state.data);
  return (
    <div className="App">
      <Navbarr />
      <Section1
        products={state.data}
        loading={state.loading}
        fetched={state.fetched}
      />
    </div>
  );
}

export default App;
