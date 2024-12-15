import { auth } from "../firebase";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css"
function UserDetails() {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        toast.info("Logged out successfully!");
        navigate("/login");
    };

    const user = auth.currentUser;
    return (
        <>
        <div className="account-details-container">
              <div className="address-details">
             <h2 className="fullName"><strong className="helightText">Name:</strong> {user?.displayName || "User"}</h2>

            <p><strong className="helightText">Email:</strong> {user?.email}</p>
            <button onClick={handleLogout} className="logoutButton">Logout</button>
            </div>
            </div>
         </>
    )
}
export default UserDetails;