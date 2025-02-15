import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserIcon,
  LockClosedIcon,
  ClipboardDocumentListIcon, // Fixed import
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../context";

export function Sidenav({ brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // Define new routes with icons
  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Candidates",
      path: "/candidates",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      name: "Vote",
      path: "/vote",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    }, // Fixed icon
    {
      name: "Results",
      path: "/results",
      icon: <ChartBarIcon className="h-5 w-5" />,
    },
    {
      name: "User Profile",
      path: "/user-profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      name: "Admin Panel",
      path: "/admin-panel",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
    {
      name: "Login",
      path: "/login",
      icon: <LockClosedIcon className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="flex flex-col gap-1">
          {routes.map(({ name, path, icon }) => (
            <li key={name}>
              <NavLink to={path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: "E-Voting System",
};

Sidenav.propTypes = {
  brandName: PropTypes.string,
};

export default Sidenav;
