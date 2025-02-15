import { Link } from "react-router-dom";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Navbar({ isAuthenticated, onSignOut, userProfile }) {
  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-3 flex justify-end items-center bg-transparent backdrop-blur-none z-50">
      {/* Right Section: Search, Notifications, Profile & Auth Buttons */}
      <div className="flex items-center space-x-6">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />

        {/* Notifications Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <BellIcon className="h-7 w-7 text-gray-700" />
        </button>

        {/* Profile Section: Profile Picture + Sign In/Out */}
        <div className="flex items-center space-x-1.5">
          {isAuthenticated ? (
            <button
              onClick={onSignOut}
              className="text-gray-700 text-sm hover:underline hover:decoration-gray-400 px-2 py-1 rounded-md transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 text-sm hover:underline hover:decoration-gray-400 px-2 py-1 rounded-md transition"
            >
              Sign In
            </Link>
          )}

          {/* Profile Picture / Default User Icon */}
          <div className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center bg-gray-200 overflow-hidden">
            {isAuthenticated && userProfile?.photoURL ? (
              <img
                src={userProfile.photoURL}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="h-6 w-6 text-gray-500" /> // Default profile icon
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
