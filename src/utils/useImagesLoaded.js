// utils/useImagesLoaded.js
import { useEffect, useState } from "react";

const BLANK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const useImagesLoaded = (containerRef) => {
  const [imagesStatus, setImagesStatus] = useState({
    loaded: [],
    proper: [],
    broken: [],
    allLoaded: false,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const images = [...containerRef.current.querySelectorAll("img")].filter(
      (img) => img.src !== BLANK
    );

    if (images.length === 0) {
      setImagesStatus((prev) => ({ ...prev, allLoaded: true }));
      return;
    }

    const loaded = [];
    const proper = [];
    const broken = [];

    const checkImage = (img) => {
      return new Promise((resolve) => {
        if (img.complete && img.naturalWidth !== undefined) {
          const isBroken = img.naturalWidth === 0 || img.naturalHeight === 0;
          resolve({ img, isBroken });
          return;
        }

        img.addEventListener("load", () => resolve({ img, isBroken: false }), {
          once: true,
        });
        img.addEventListener("error", () => resolve({ img, isBroken: true }), {
          once: true,
        });

        // Handle cached images
        if (img.readyState || img.complete) {
          img.src = BLANK;
          img.src = img.getAttribute("src");
        }
      });
    };

    Promise.all(images.map(checkImage)).then((results) => {
      results.forEach(({ img, isBroken }) => {
        if (loaded.includes(img)) return;
        loaded.push(img);
        if (isBroken) {
          broken.push(img);
        } else {
          proper.push(img);
        }
      });

      setImagesStatus({
        loaded,
        proper,
        broken,
        allLoaded: loaded.length === images.length,
      });
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", () => {});
        img.removeEventListener("error", () => {});
      });
    };
  }, [containerRef]);

  return imagesStatus;
};

export default useImagesLoaded;
