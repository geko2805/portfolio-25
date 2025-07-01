// utils/useDebounceResize.js
import { useEffect, useRef } from "react";

const useDebounceResize = (callback, threshold = 250) => {
  const resizeTimeout = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        callback(event);
      }, threshold);
    };

    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [callback, threshold]);
};

export default useDebounceResize;
