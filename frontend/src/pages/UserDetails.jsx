import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDetails() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Function to fetch user from localStorage
    const fetchUser = () => {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Fetch user on component mount
    useEffect(() => {
        fetchUser();

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
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center    px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-md text-center">
                
                
                <div className="border-b pb-4">
                    <p className="text-lg font-semibold text-gray-700">
                        <span className="text-purple-600">Name:</span> {user?.name || "User"}
                    </p>
                    <p className="text-lg font-semibold text-gray-700 mt-2">
                        <span className="text-purple-600">Email:</span> {user?.email || "Not Available"}
                    </p>
                </div>

                <button 
                    onClick={handleLogout} 
                    className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserDetails;
