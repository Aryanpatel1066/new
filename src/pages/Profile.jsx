import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {auth.currentUser?.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
