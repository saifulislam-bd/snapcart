import { useRef, useEffect } from "react";

export default function useRenderCount() {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current += 1;
  }, []);

  return countRef;
}
