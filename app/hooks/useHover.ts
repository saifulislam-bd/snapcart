import { RefObject, useState, useCallback, useEffect } from "react";

export default function useHover(ref: RefObject<HTMLElement | null>) {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const handleMouseOut = useCallback(() => {
    setHovered(false);
  }, [setHovered]);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    const onOver = () => handleMouseOver();
    const onOut = () => handleMouseOut();

    node.addEventListener("mouseover", onOver);
    node.addEventListener("mouseout", onOut);

    return () => {
      node.removeEventListener("mouseover", onOver);
      node.removeEventListener("mouseout", onOut);
    };
  }, [ref, handleMouseOver, handleMouseOut]);

  return hovered;
}
