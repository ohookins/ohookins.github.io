import React, { useEffect, useRef } from "react";
import Layout from "../components/Layout";

const SearchPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Pagefind component UI CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/pagefind/pagefind-component-ui.css";
    document.head.appendChild(link);

    // Load Pagefind component UI JS (web components)
    const script = document.createElement("script");
    script.src = "/pagefind/pagefind-component-ui.js";
    script.type = "module";
    script.onload = () => {
      // Insert the web components after the script loads
      containerRef.current.innerHTML = `
        <pagefind-input></pagefind-input>
        <pagefind-results></pagefind-results>
      `;

      // Check for a ?q= query parameter and pre-fill the search
      const params = new URLSearchParams(window.location.search);
      const query = params.get("q");
      if (query) {
        // Wait for the web component to render its internal input
        setTimeout(() => {
          const input = containerRef.current.querySelector("pagefind-input input");
          if (input) {
            input.value = query;
            input.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }, 100);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="cabin f4 f3-ns">Search</h1>
        <div ref={containerRef}></div>
      </div>
    </Layout>
  );
};

export default SearchPage;
