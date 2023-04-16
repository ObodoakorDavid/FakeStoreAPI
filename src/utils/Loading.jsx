/** @format */

import { useState } from "react";
import { FadeLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = ({ loading }) => {
  let [color, setColor] = useState("black");
  return (
    <div className="mt-5">
      <FadeLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
