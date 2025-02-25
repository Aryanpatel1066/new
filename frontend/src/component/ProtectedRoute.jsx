import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const userId = localStorage.getItem("userId"); // Check if user is logged in

    return userId ? children : <Navigate to="/login" />;
}
