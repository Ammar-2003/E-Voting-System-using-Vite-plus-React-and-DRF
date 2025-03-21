import React from "react";
import { ToastContainer, toast, Slide, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to display toast messages
export const showToast = (message, type = "default", options = {}) => {
  toast(message, {
    type,
    position: options.position || "top-right",
    autoClose: options.autoClose ?? (type === "error" ? 5000 : 3000), // Error stays longer
    hideProgressBar: options.hideProgressBar ?? false,
    closeOnClick: options.closeOnClick ?? true,
    pauseOnHover: options.pauseOnHover ?? true,
    draggable: options.draggable ?? true,
    transition: options.transition || (type === "success" ? Bounce : Slide),
    theme:
      options.theme ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"), // Auto Dark Mode
  });
};

// Global Toast Container (must be included in the App)
const ToastMessage = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      transition={Slide}
    />
  );
};

export default ToastMessage;
