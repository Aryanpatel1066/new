import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profileContainer">
      <h1 className="profileHeading">Account Details</h1>

      <div className="tabContainer">
        <div className="tab">
          <ul>
            <li>
              <NavLink 
                to="userDetails" // Use relative path to work with nested routes
                className={({ isActive }) => (isActive ? "active-tab" : "")}
              >
                User Details
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="addressDetails" 
                className={({ isActive }) => (isActive ? "active-tab" : "")}
              >
                Address Details
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Dynamic content loads here */}
        <div className="mainBodyContainer">
          <Outlet /> {/* Renders the default or selected route content */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
