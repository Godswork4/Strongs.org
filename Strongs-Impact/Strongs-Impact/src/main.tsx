import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- Add this import
import App from "./App.tsx";
import "./index.css";

// Prevent transitions on page load
const Root = () => {
  useEffect(() => {
    // Remove preload class after initial page load
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("preload");
    });
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

// Add preload class to prevent transitions on page load
document.documentElement.classList.add("preload");

createRoot(document.getElementById("root")!).render(<Root />);
