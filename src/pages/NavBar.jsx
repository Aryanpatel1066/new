import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function NavBar(){
    return(
        <>
        
        <nav className="navbar">
        <div className="navLogo">
          <NavLink to="/" className="navLinks">
            StyleSavvy
          </NavLink>
        </div>
        <div className="leftCournerLink">
          <div className="inputBox">
            <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
            <input className="searchBar" placeholder="search on StyleStavvy" />
          </div>
          <NavLink className="navLinks" to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>{" "}
          <NavLink className="navLinks" to="/products">
            <FontAwesomeIcon icon={faBagShopping} />
          </NavLink>{" "}
          <NavLink className="navLinks" to="/login">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>{" "}
        </div>
      </nav>
        </>
    )
}