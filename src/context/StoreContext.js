/** @format */

import { createContext, useReducer, useEffect } from "react";

const StoreContext = createContext();

export default StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH All PRODUCTS":
      return { ...state, allProducts: action.payload };
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
    case "FETCH SINGLE PRODUCT":
      return { ...state, singleProduct: action.payload };
    case "INCREASE":
      const newCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      return { ...state, cart: newCart };
    case "DECREASE":
      const newCart2 = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      return { ...state, cart: newCart2 };
    case "REMOVE":
      const newCart3 = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: newCart3 };
    case "UpdateCartFromLC":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const initialState = {
  allProducts: [],
  cart: [],
  singleProduct: {},
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const getData = async () => {
  //   let res = await fetch("https://fakestoreapi.com/products");
  //   let data = await res.json();
  //   dispatch({ type: "FETCH All PRODUCTS", payload: data });
  // };

  const getProduct = async (id) => {
    let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await res.json();
    dispatch({ type: "FETCH SINGLE PRODUCT", payload: data });
  };

  const setLocalStorage = () => {
    localStorage.setItem("userCart", JSON.stringify(state.cart));
  };

  useEffect(() => {
    if (localStorage.getItem("userCart")) {
      console.log(localStorage.getItem("userCart"));
      dispatch({
        type: "UpdateCartFromLC",
        payload: JSON.parse(localStorage.getItem("userCart")),
      });
    }
    // setTimeout(() => {
    //   getData();
    // }, 3000);
  }, []);

  // useEffect(() => {
  //   setLocalStorage();
  // }, [state.cart]);

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

  const storeData = {
    state,
    addToCart,
    getProduct,
    increaseQuantity,
    decreaseQuantity,
    remove,
    dispatch,
  };

  return (
    <StoreContext.Provider value={storeData}>{children}</StoreContext.Provider>
  );
};
