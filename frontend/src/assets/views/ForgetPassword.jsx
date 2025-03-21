import React, { useState } from "react";
import { showToast } from "./ToastComponent";
import AxiosInstance from "../utils/AxiosInstance";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your email", "error");
      return;
    }

    try {
      const res = await AxiosInstance.post("api/v1/auth/password-reset/", {
        email,
      });
      if (res.status === 200) {
        showToast("A reset link has been sent to your email", "success");
        setEmail("");
      }
    } catch (error) {
      showToast("Something went wrong, try again!", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-md bg-white/80">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address:
            </label>
            <input
              type="email"
              className="w-full p-3 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Animated Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Send Reset Link
          </button>
        </form>

        {/* Signup Navigation */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Back to {" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
