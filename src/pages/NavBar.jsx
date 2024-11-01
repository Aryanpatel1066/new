import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBagShopping, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import "./NavBar.css";
export default function NavBar({ isOfferBarVisible }) {
  const {cartItem}=useContext(CartContext);
  return (
    <nav className={`navbar ${isOfferBarVisible ? '' : 'navBarWithBg'}`}>
      <div className="navLogo">
        <NavLink to="/" className="navLinks">
          StyleSavvy
        </NavLink>
      </div>
      <div className="leftCournerLink">
        {/* <div className="inputBox">
          <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
          <input className="searchBar" placeholder="search on StyleSavvy" />
        </div> */}
        <NavLink className="navLinks" to="/products">
           <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </NavLink>{" "}
        <NavLink className="navLinks" to="/products">
          <FontAwesomeIcon icon={faBagShopping} />
        </NavLink>{" "}
        <NavLink className="navLinks" to="/cart">
          <FontAwesomeIcon icon={faCartShopping} /><sup>{cartItem.length}</sup>
        </NavLink>{" "}
        <NavLink className="navLinks" to="/login">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>{" "}
      </div>
    </nav>
  );
}
