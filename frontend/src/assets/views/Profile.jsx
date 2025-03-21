import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { showToast } from "./ToastComponent";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("User not authenticated. Please login again.");
        }

        const response = await AxiosInstance.get("userpanel/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ FIXED Logout Function
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken"); // ✅ Correct key

      if (!refreshToken) {
        showToast("Session expired! Please login again.", "error");
        navigate("/login");
        return;
      }

      // ✅ Send refresh token in correct format
await AxiosInstance.post(
  "api/v1/auth/logout/",
  {
    refresh_token: refreshToken, // ✅ Correct key
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

      // ✅ Remove all authentication data
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      showToast("Logout successful!", "success");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);

      const errorMsg =
        error.response?.data?.refresh?.[0] || "Logout failed! Try again.";
      showToast(errorMsg, "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <p className="text-lg font-semibold text-gray-600">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <p className="text-red-500 font-semibold">{error}</p>
          <p className="text-gray-600 text-sm mt-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-semibold bg-gray-100">👤 Name:</td>
              <td className="p-3">
                {user?.first_name} {user?.last_name}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold bg-gray-100">📧 Email:</td>
              <td className="p-3">{user?.email}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
