import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Set initial state
    setMatches(mediaQueryList.matches);

    // Define the update function with correct type
    const updateMatches = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    // Add event listener
    mediaQueryList.addEventListener("change", updateMatches);

    return () => {
      // Remove event listener
      mediaQueryList.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
};
