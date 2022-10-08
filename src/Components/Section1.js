/** @format */

import React from "react";

const Section1 = ({ products, fetched, loading }) => {
  return (
    <div>
      {" "}
      {loading && <div>Loading</div>}{" "}
      {fetched && (
        <div>
          {products.map((product) => {
            const {id, title} = product
            return (
              <div key={id}>
                <p>{product.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Section1;
