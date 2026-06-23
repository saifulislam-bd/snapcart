import { useRef, useEffect, useState } from "react";

export default function usePrevious<T>(value: T) {
  const currentRef = useRef(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrevious(currentRef.current);
    currentRef.current = value;
  }, [value]);

  return previous;
}
