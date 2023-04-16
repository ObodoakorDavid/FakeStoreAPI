/** @format */

import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../context/StoreContext";
import "./Home.css";
import EachProduct from "../EachProduct/EachProduct";
import HeroSection from "../../utils/HeroSection";
import Loading from "../../utils/Loading";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
  const { state, dispatch } = useContext(StoreContext);
  // const [loading, setLoading] = useState(true);

  const { data, loading, error } = useFetch(
    `https://fakestoreapi.com/products`
  );

  useEffect(() => {
    dispatch({ type: "FETCH All PRODUCTS", payload: data });
  }, []);

  return (
    <div>
      <HeroSection />
      {loading && <Loading loading={loading} />}
      {!loading && (
        <div className="products">
          {data.map((product) => {
            return <EachProduct key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
