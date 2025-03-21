import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { showToast } from "./ToastComponent"; // Import the function

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/verify-email/",
        { otp },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("OTP Verified:", response.data);
      showToast("Email Verified Successfully!");

      // ✅ Save JWT Token in Local Storage
if (response.data.tokens) {
  localStorage.setItem("authToken", response.data.tokens.access);
  localStorage.setItem("refreshToken", response.data.tokens.refresh);
}


      // ✅ Redirect to Dashboard (without page reload)
      navigate("/login");
    } catch (error) {
      console.error(
        "OTP Verification Failed:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Invalid OTP! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">OTP Verification</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <form onSubmit={handleSubmit}>
          {/* OTP Input */}
          <input
            type="text"
            placeholder="Enter your OTP"
            name="otp"
            value={otp}
            onChange={handleChange}
            className="mb-4 p-2 border rounded w-full"
            required
          />

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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
