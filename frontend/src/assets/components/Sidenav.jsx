import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../context";

export function Sidenav({ brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gray-900 text-white",
    white: "bg-white shadow-lg text-gray-900",
    transparent: "bg-transparent",
  };

  const routes = [
    { name: "Dashboard", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
    {
      name: "Users",
      path: "/users",
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
    {
      name: "Results",
      path: "/results",
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      name: "User Panel",
      path: "/user-panel",
      icon: <UserIcon className="h-6 w-6" />,
    },
    {
      name: "Admin Panel",
      path: "/admin-panel",
      icon: <CheckCircleIcon className="h-6 w-6" />,
    },
  ];

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } 
      fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl shadow-2xl transition-transform duration-300 xl:translate-x-0 p-4`}
    >
      <div className="relative flex flex-col items-center">
        <Link to="/" className="py-6 text-center w-full">
          <Typography variant="h5" className="font-bold text-lg uppercase">
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-2 top-4 xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </IconButton>
      </div>
      <div className="mt-4">
        <ul className="flex flex-col gap-2">
          {routes.map(({ name, path, icon }) => (
            <li key={name}>
              <NavLink to={path}>
                {({ isActive }) => (
                  <Button
                    variant="text"
                    className={`flex items-center gap-4 p-4 w-full text-left rounded-lg transition-all duration-200 
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                        : "hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {icon}
                    <Typography variant="subtitle1" className="font-medium">
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
