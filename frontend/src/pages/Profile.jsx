import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../component/Header";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Account Details</h1>

        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <nav className="w-full md:w-1/4 bg-gray-100 p-4">
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="userDetails"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  User Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="addressDetails"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  Address Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="orderHistory"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  Order History
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Dynamic content loads here */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;