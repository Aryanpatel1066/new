import { auth } from "../firebase";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
            <h1>address detail page</h1>
            <h2>Welcome, {user?.displayName || "User"}</h2>
            <p>Email: {user?.email}</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>

        </>
    )
}
export default UserDetails;