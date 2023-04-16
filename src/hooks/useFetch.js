/** @format */

import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something Went Wrong");
          }
          return res.json();
        })
        .then((json) => {
          setData(json);
          // console.log(json);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 1000);
  }, [url]);
  return { data, error, loading };
};
