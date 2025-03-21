import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showToast } from "./ToastComponent";
import AxiosInstance from "../utils/AxiosInstance";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirm_password) {
      showToast("Both password fields are required!", "error");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      showToast("Passwords do not match!", "error");
      return;
    }

    try {
      const res = await AxiosInstance.patch("api/v1/auth/set-new-password/", {
        ...formData,
        uidb64: uid,
        token: token,
      });

      if (res.status === 200) {
        showToast(res.data.message, "success");
        navigate("/login");
      }
    } catch (error) {
      showToast("Failed to reset password. Try again!", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-md bg-white/80">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Reset Your Password
        </h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              className="w-full p-3 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
              placeholder="Confirm new password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button with Animation */}
          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
