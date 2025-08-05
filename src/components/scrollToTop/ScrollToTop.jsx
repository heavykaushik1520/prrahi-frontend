/* eslint-disable no-unused-vars */
// src/components/ScrollToTop.jsx
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render any visible UI
}

export default ScrollToTop;