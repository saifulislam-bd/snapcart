import { useState } from "react";

const useAPI = () => {
  const [results, setResults] = useState<unknown[]>([]);

  const fetchData = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setResults((arr) => [...arr, data]);
      return data;
    } catch (err) {
      // optionally handle/log error
      throw err;
    }
  };

  return {
    fetchData,
    results,
  };
};

export default useAPI;
