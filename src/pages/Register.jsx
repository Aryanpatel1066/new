import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Password does not match!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registered successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      
      setEmail(""); // Clear fields
    setPassword("");
    setConfirmPassword("");
    setTimeout(()=>{
      toast.dismiss()
      navigate("/login")
    },2000)
  } catch (error) {
      toast.error("Error during registration", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2 className="register-heading">Register</h2>
      
          
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
        />
        <input
          className="register-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
          required
        />
        <button className="register-button" type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login" className="ragisterLink">Login</Link>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Register;  