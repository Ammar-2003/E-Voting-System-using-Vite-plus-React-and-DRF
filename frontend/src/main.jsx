import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MaterialTailwindControllerProvider } from "./assets/context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MaterialTailwindControllerProvider>
      <App />
    </MaterialTailwindControllerProvider>
  </StrictMode>
);
