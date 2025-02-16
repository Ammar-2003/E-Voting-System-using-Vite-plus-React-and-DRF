import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import loginicon from "./loginicon.png"; // Updated to use local login icon

export default function Login() {
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

            <form>
              <p className="mb-4 text-center">Sign Up First</p>

              {/* First Name & Last Name */}
              <div className="flex space-x-2 mb-4">
                <TEInput type="text" label="First Name" className="w-1/2" />
                <TEInput type="text" label="Last Name" className="w-1/2" />
              </div>

              {/* Username input */}
              <TEInput type="text" label="Username" className="mb-4" />

              {/* Email input */}
              <TEInput type="email" label="Email" className="mb-4" />

              {/* Password input */}
              <TEInput type="password" label="Password" className="mb-4" />

              {/* Confirm Password input */}
              <TEInput
                type="password"
                label="Confirm Password"
                className="mb-4"
              />

              {/* Submit button */}
              <div className="mb-6 text-center">
                <TERipple rippleColor="light" className="w-full">
                  <button
                    className="w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:outline-none focus:ring-0 bg-black text-white"
                    type="button"
                  >
                    Sign  Up
                  </button>
                </TERipple>
              </div>

              {/* Continue with Google and GitHub */}
              <div className="mb-4 space-y-2">
                <TERipple rippleColor="light" className="w-full">
                  <button
                    className="w-full flex items-center justify-center border-2 border-gray-300 px-6 py-2 rounded text-sm font-medium hover:bg-gray-100"
                    type="button"
                  >
                    <FcGoogle className="mr-2 text-lg" /> Continue with Google
                  </button>
                </TERipple>
                <TERipple rippleColor="light" className="w-full">
                  <button
                    className="w-full flex items-center justify-center border-2 border-gray-300 px-6 py-2 rounded text-sm font-medium hover:bg-gray-100"
                    type="button"
                  >
                    <FaGithub className="mr-2 text-lg" /> Continue with GitHub
                  </button>
                </TERipple>
              </div>

              {/* Register button */}
              <div className="flex items-center justify-between">
                <p className="text-sm">Already have an account ?</p>
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
