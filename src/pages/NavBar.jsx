 
// import { useContext } from "react";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass, faBagShopping, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
// import { CartContext } from "../context/CartContext";
// import { AuthContext } from "../context/AuthContext";
// import "./NavBar.css";

// export default function NavBar({ isOfferBarVisible }) {
//   const { cartItem } = useContext(CartContext);
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className={`navbar ${isOfferBarVisible ? '' : 'navBarWithBg'}`}>
//       <div className="navLogo">
//         <NavLink to="/" className="navLinks">
//           StyleSavvy
//         </NavLink>
//       </div>
//       <div className="leftCournerLink">
//         <NavLink className="navLinks" to="/products">
//           <FontAwesomeIcon icon={faMagnifyingGlass} />
//         </NavLink>{" "}
//         <NavLink className="navLinks" to="/products">
//           <FontAwesomeIcon icon={faBagShopping} />
//         </NavLink>{" "}
//         <NavLink className="navLinks" to="/cart">
//           <FontAwesomeIcon icon={faCartShopping} /><sup>{cartItem.length}</sup>
//         </NavLink>{" "}
//         {user ? (
//           <>
//             <NavLink className="navLinks" to="/profile">
//               {/* <FontAwesomeIcon icon={faUser} />  */}
              
//               {user?.displayName}
//             </NavLink>{" "}
//             {/* <button className="logoutButton" onClick={logout}>
               
//             </button> */}
//           </>
//         ) : (
//           <NavLink className="navLinks" to="/login">
//             <FontAwesomeIcon icon={faUser} />  
//           </NavLink>
//         )}
//       </div>
//     </nav>
//   );
// }
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBagShopping, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

export default function NavBar({ isOfferBarVisible }) {
  const { cartItem } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`navbar ${isOfferBarVisible ? '' : 'navBarWithBg'}`}>
      <div className="navLogo">
        <NavLink to="/" className="navLinks">
          StyleSavvy
        </NavLink>
      </div>
      <div className="leftCournerLink">
        <NavLink className="navLinks" to="/products">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </NavLink>{" "}
        <NavLink className="navLinks" to="/products">
          <FontAwesomeIcon icon={faBagShopping} />
        </NavLink>{" "}
        <NavLink className="navLinks" to="/cart">
          <FontAwesomeIcon icon={faCartShopping} /><sup>{cartItem.length}</sup>
        </NavLink>{" "}
        {user ? (
          <>
            <NavLink className="navLinks" to="/profile">
              {user?.displayName || "Profile"}
            </NavLink>{" "}
            {/* <button className="logoutButton" onClick={logout}>
              Logout
            </button> */}
          </>
        ) : (
          <NavLink className="navLinks" to="/login">
            <FontAwesomeIcon icon={faUser} />  
          </NavLink>
        )}
      </div>
    </nav>
  );
}
