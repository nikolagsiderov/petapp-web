"use client";

import { useEffect } from "react";

const useOnClickOutsideComponent = (
  ref: React.MutableRefObject<HTMLElement | undefined | null>,
  handler: any,
  additionalRef?: React.MutableRefObject<HTMLElement | undefined | null>
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Do nothing if clicking on the additional ref component
      if (
        additionalRef &&
        (!additionalRef.current || additionalRef.current.contains(event.target))
      ) {
        return;
      }

      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, additionalRef, handler]);
};

export default useOnClickOutsideComponent;
