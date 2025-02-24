import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-6 text-center">
      {/* Privacy Policy Links */}
      <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 text-white text-sm md:text-base">
        <NavLink to="#" className="hover:text-gray-200 transition duration-300">
          Terms & Conditions
        </NavLink>
        <NavLink to="#" className="hover:text-gray-200 transition duration-300">
          Shipping Policy
        </NavLink>
        <NavLink to="#" className="hover:text-gray-200 transition duration-300">
          Cancellation Policy
        </NavLink>
        <NavLink to="#" className="hover:text-gray-200 transition duration-300">
          Privacy Policy
        </NavLink>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-gray-300 text-sm">
        Copyright <FontAwesomeIcon icon={faCopyright} className="mx-1" /> 2024
        Shopyfy. All Rights Reserved.
      </div>
    </footer>
  );
}
