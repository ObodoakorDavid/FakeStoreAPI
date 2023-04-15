/** @format */

import React, { useContext } from "react";
import StoreContext from "../../context/StoreContext";
import "./Home.css";
import EachProduct from "../EachProduct/EachProduct";

const Home = () => {
  const { state} = useContext(StoreContext);
  return (
    <div>
      <div>Hero Section</div>
      {state.loading && <div>Loading</div>}
      {state.fetched && (
        <div className="products">
          {state.data.map((product) => {
            return <EachProduct key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
