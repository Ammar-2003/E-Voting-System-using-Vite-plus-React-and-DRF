import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "./ToastComponent";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data);

      // Extract tokens from response
      const { access_token, refresh_token } = response.data;

      if (!access_token) {
        throw new Error("Authentication failed. No token received.");
      }

      // Store tokens securely
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("refreshToken", refresh_token || "");

      showToast("Login Successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.detail || "Login failed! Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Login to continue</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-4 p-2 border rounded w-full"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-2 p-2 border rounded w-full"
            required
          />

          {/* Forgot Password Link */}
          <p
            className="text-sm text-blue-600 hover:underline cursor-pointer mb-4 text-right"
            onClick={() => navigate("/forget-password")}
          >
            Forgot Password?
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`px-4 py-2 rounded w-full text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
