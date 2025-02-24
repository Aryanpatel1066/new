 
import React, { useState, useEffect ,useContext} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../context/CartContext";
import {
  faMagnifyingGlass,
  faBagShopping,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function NavBar({ isOfferBarVisible }) {
  const [user, setUser] = useState(null);
  const { cartItem } = useContext(CartContext);

 
      useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <nav className={`navbar ${isOfferBarVisible ? "" : "navBarWithBg"}`}>
      <div className="navLogo">
        <NavLink to="/" className="navLinks">
          Shopyfy
        </NavLink>
      </div>

      <div className="leftCournerLink">
        <NavLink className="navLinks" to="/productlist">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </NavLink>

        <NavLink className="navLinks" to="/productlist">
          <FontAwesomeIcon icon={faBagShopping} />
         </NavLink>

        <NavLink className="navLinks" to="/cart">
          <FontAwesomeIcon icon={faCartShopping} />
          <sup>{cartItem.length}</sup>
        </NavLink>

        {user ? (
          <NavLink className="navLinks" to="/profile/userDetails">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        ) : (
          <NavLink className="navLinks" to="/login">
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
