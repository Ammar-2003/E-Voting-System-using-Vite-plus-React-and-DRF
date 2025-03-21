import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8000/";

// ✅ Function to get stored token safely
const getStoredToken = (key) => {
  const token = localStorage.getItem(key);
  return token && token !== "undefined" ? token : null;
};

// ✅ Initialize tokens
let accessToken = getStoredToken("authToken");
let refreshToken = getStoredToken("refreshToken");

console.log("Access Token:", accessToken);
console.log("Refresh Token:", refreshToken);

// ✅ Create Axios instance
const AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

// ✅ Request Interceptor: Attach the latest token & refresh if needed
AxiosInstance.interceptors.request.use(async (req) => {
  accessToken = getStoredToken("authToken");
  refreshToken = getStoredToken("refreshToken");

  if (!accessToken) {
    console.warn("No access token found. Proceeding without authentication.");
    return req;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      return req;
    }

    if (!refreshToken) {
      console.warn("No refresh token available. User must log in again.");
      return req;
    }

    // ✅ Attempt to refresh token
    const response = await axios.post(`${baseURL}api/v1/auth/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    console.log("New Access Token:", newAccessToken);

    // ✅ Store the new access token
    localStorage.setItem("authToken", newAccessToken);

    req.headers.Authorization = `Bearer ${newAccessToken}`;
    return req;
  } catch (error) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );

    // ✅ If refresh fails, clear tokens and force logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/login"; // Redirect to login
    return req;
  }
});


export default AxiosInstance;
