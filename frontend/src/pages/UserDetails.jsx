import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.css";
import Header from "../component/Header";

function UserDetails() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Function to fetch user from localStorage
    const fetchUser = () => {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Run once on mount and listen for user changes
    useEffect(() => {
        fetchUser();

        // Listen for login/logout changes
        const handleAuthChange = () => {
            fetchUser();
        };

        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
      };

    return (
        <>               
 
          <div className="account-details-container">

            <div className="address-details">
                <h2 className="fullName">
                    <strong className="highlightText">Name:</strong> {user?.name || "User"}
                </h2>
                <p>
                    <strong className="highlightText">Email:</strong> {user?.email || "Not Available"}
                </p>
                <button onClick={handleLogout} className="logoutButton">
                    Logout
                </button>
            </div>
        </div>
        </>

    );
}

export default UserDetails;
