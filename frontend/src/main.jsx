import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MaterialTailwindControllerProvider } from "./assets/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// ✅ Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // ✅ Wrap the app with QueryClientProvider
  <QueryClientProvider client={queryClient}>
    <MaterialTailwindControllerProvider>
      <App />
    </MaterialTailwindControllerProvider>
  </QueryClientProvider>
);