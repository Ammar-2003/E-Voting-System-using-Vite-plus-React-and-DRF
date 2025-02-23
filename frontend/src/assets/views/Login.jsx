import React, { useState } from "react";
import axios from "axios";
import { TEInput, TERipple } from "tw-elements-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import loginicon from "./loginicon.png";

export default function Login() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login/register/",
        formData
      );
      localStorage.setItem("token", response.data.token);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed. Try again.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/auth/google/login/"
      );
      console.log("Google Login Response:", response.data); // Debugging

      if (response.data.auth_url) {
        window.location.href = response.data.auth_url;
      } else {
        console.error("Error: auth_url is undefined.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  // Handle GitHub Login
  const handleGitHubLogin = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/auth/github/login/"
      );
      window.location.href = response.data.auth_url;
    } catch (error) {
      console.error("GitHub Login Error:", error);
    }
  };

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

              {/* Username */}
              <TEInput
                type="text"
                label="Username"
                name="username"
                onChange={handleChange}
                className="mb-4"
              />

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
                name="confirm_password"
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

              {/* Google & GitHub OAuth Login */}
              <div className="mb-4 space-y-2">
                <TERipple rippleColor="light" className="w-full">
                  <button
                    className="w-full flex items-center justify-center border-2 border-gray-300 px-6 py-2 rounded text-sm font-medium hover:bg-gray-100"
                    type="button"
                    onClick={handleGoogleLogin}
                  >
                    <FcGoogle className="mr-2 text-lg" /> Continue with Google
                  </button>
                </TERipple>
                <TERipple rippleColor="light" className="w-full">
                  <button
                    className="w-full flex items-center justify-center border-2 border-gray-300 px-6 py-2 rounded text-sm font-medium hover:bg-gray-100"
                    type="button"
                    onClick={handleGitHubLogin}
                  >
                    <FaGithub className="mr-2 text-lg" /> Continue with GitHub
                  </button>
                </TERipple>
              </div>

              {/* Register button */}
              <div className="flex items-center justify-between">
                <p className="text-sm">Already have an account?</p>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="rounded border-2 border-black px-6 py-1 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-black hover:text-white focus:outline-none focus:ring-0"
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
