import React, { useEffect, useRef } from "react";
import Layout from "../components/Layout";

const SearchPage = () => {
  const searchRef = useRef(null);

  useEffect(() => {
    const loadPagefind = async () => {
      if (!searchRef.current) return;

      // Load Pagefind UI CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/pagefind/pagefind-ui.css";
      document.head.appendChild(link);

      // Load and initialize Pagefind UI
      const PagefindUI = await import(
        /* webpackIgnore: true */ "/pagefind/pagefind-ui.js"
      );
      new PagefindUI.default({
        element: searchRef.current,
        showSubResults: true,
        showImages: false,
      });
    };

    loadPagefind();
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="cabin f4 f3-ns">Search</h1>
        <div ref={searchRef}></div>
      </div>
    </Layout>
  );
};

export default SearchPage;
