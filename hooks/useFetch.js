import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const fetchData = async () => {
    const response = await fetch(url);
    const dataResponse = await response.json();
    setData(dataResponse);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { loading, data };
};

export default useFetch;
