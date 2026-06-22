import { useEffect, useState, RefObject } from "react";

export default function useOnScreen<T extends Element = Element>(
  ref: RefObject<T>,
  rootMargin = "0px",
): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const current = ref.current;
    if (current == null) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(current);
    return () => {
      observer.unobserve(current);
    };
  }, [ref, rootMargin]);

  return isVisible;
}
