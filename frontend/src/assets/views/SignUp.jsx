import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ Import useNavigate
import { TEInput, TERipple } from "tw-elements-react";
import loginicon from "./loginicon.png";
import { showToast } from "./ToastComponent"; // Import the function
import { FaGithub } from "react-icons/fa";
import AxiosInstance from "../utils/AxiosInstance";

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate(); // ✅ Initialize navigation
  const [searchparams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register/",
        formData
      );

      localStorage.setItem("token", response.data.token);
      showToast(
        "Signup successful Now verify your email using OTP sent to your email"
      );

      // ✅ Redirect to OTP Verification page without reload
      navigate("/verify-otp");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed. Try again.");
    }
    setLoading(false);
  };

  // Handle Google Sign-In
  const handleSigninWithGoogle = async (response) => {
    try {
      const payload = response.credential;
      const server_res = await axios.post(
        "http://localhost:8000/api/v1/auth/google/",
        { access_token: payload }
      );

      console.log("Google Auth Response:", server_res.data);

      if (server_res.status === 200) {
        const user = {
          email: server_res.data.email,
          names: server_res.data.full_name,
        };

        // ✅ Store user data & tokens with new names
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authToken", server_res.data.tokens.access); // Changed from 'access'
        localStorage.setItem("refreshToken", server_res.data.tokens.refresh); // Changed from 'refresh'

        // ✅ Set Authorization Header for Future API Calls
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${server_res.data.tokens.access}`;

        showToast("✅ Google Login Success!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(
        "Google Login Error:",
        error.response?.data || error.message
      );
      showToast("❌ Google Login Failed! Please try again.");
    }
  };

  // Initialize Google Sign-In Button
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleSigninWithGoogle,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "circle",
      width: "280",
    });
  }, []);


  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="container p-10 flex justify-center">
        <div className="w-full max-w-md">
          <div className="block rounded-lg bg-white shadow-lg p-8">
            {/* Logo */}
            <div className="text-center mb-6">
              <img
                src={loginicon}
                className="mx-auto w-24 h-24"
                alt="Login Icon"
              />
            </div>

            <form onSubmit={handleSignup}>
              <p className="mb-4 text-center">Sign Up First</p>

              {/* First Name & Last Name */}
              <div className="flex space-x-2 mb-4">
                <TEInput
                  type="text"
                  label="First Name"
                  name="first_name"
                  onChange={handleChange}
                  className="w-1/2"
                />
                <TEInput
                  type="text"
                  label="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </div>

              {/* Username
                            <TEInput
                type="text"
                label="Username"
                name="username"
                onChange={handleChange}
                className="mb-4"
              />
               */}

              {/* Email */}
              <TEInput
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                className="mb-4"
              />

              {/* Password */}
              <TEInput
                type="password"
                label="Password"
                name="password"
                onChange={handleChange}
                className="mb-4"
              />

              {/* Confirm Password */}
              <TEInput
                type="password"
                label="Confirm Password"
                name="password2"
                onChange={handleChange}
                className="mb-4"
              />

              {/* Submit button */}
              <div className="mb-6 text-center">
                <TERipple rippleColor="light" className="w-full">
                  <button
                    className="w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:outline-none focus:ring-0 bg-black text-white"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </TERipple>
              </div>

              <div className="flex flex-col items-start space-y-4 ml-4">
                {/* Google Login Button */}
                <div id="signInDiv" className="w-[280px] ml-8	"></div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <p className="text-sm">Already have an account?</p>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="rounded border-2 border-black px-6 py-1 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-black hover:text-white focus:outline-none focus:ring-0"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
