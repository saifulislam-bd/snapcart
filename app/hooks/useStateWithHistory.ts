import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

export default function useStateWithHistory<T>(
  defaultValue: T,
  { capacity = 10 } = {},
): [
  T,
  Dispatch<SetStateAction<T>>,
  {
    history: T[];
    pointer: number;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
  },
] {
  const [value, setValue] = useState(defaultValue);
  const [history, setHistory] = useState<T[]>([defaultValue]);
  const [pointer, setPointer] = useState(0);
  const historyRef = useRef(history);
  const pointerRef = useRef(pointer);

  const set = useCallback(
    (v: SetStateAction<T>) => {
      const resolvedValue =
        typeof v === "function" ? (v as (prevState: T) => T)(value) : v;

      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        let nextHistory = historyRef.current;
        if (pointerRef.current < nextHistory.length - 1) {
          nextHistory = nextHistory.slice(0, pointerRef.current + 1);
        }

        nextHistory = [...nextHistory, resolvedValue];

        while (nextHistory.length > capacity) {
          nextHistory = nextHistory.slice(1);
        }

        const nextPointer = nextHistory.length - 1;
        historyRef.current = nextHistory;
        pointerRef.current = nextPointer;
        setHistory(nextHistory);
        setPointer(nextPointer);
      }

      setValue(resolvedValue);
    },
    [capacity, value],
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    const nextPointer = pointerRef.current - 1;
    pointerRef.current = nextPointer;
    setPointer(nextPointer);
    setValue(historyRef.current[nextPointer]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    const nextPointer = pointerRef.current + 1;
    pointerRef.current = nextPointer;
    setPointer(nextPointer);
    setValue(historyRef.current[nextPointer]);
  }, []);

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return;
    pointerRef.current = index;
    setPointer(index);
    setValue(historyRef.current[index]);
  }, []);

  return [
    value,
    set,
    {
      history,
      pointer,
      back,
      forward,
      go,
    },
  ];
}
