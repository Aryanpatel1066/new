import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons"
import "../component/Header.css";

export default function Header() {
  return (
    <>
      <nav>
        <div className="navLogo">
          <NavLink to="/" className="navLinks">StyleSavvy</NavLink>
        </div>
        <div className="leftCournerLink">
          <div className="inputBox">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input />
        </div>
          <NavLink className="navLinks" to="/cart"><FontAwesomeIcon icon={faCartShopping}/></NavLink>
          {" "}
          <NavLink className="navLinks" to="/products"><FontAwesomeIcon icon={faBagShopping} /></NavLink>
          {" "}
          <NavLink className="navLinks" to="/login"><FontAwesomeIcon icon={faUser}/></NavLink>
          {" "}
        
        </div>
      </nav>
    </>
  );
}
