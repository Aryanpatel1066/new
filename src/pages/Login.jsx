import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login success
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    // Password length validation
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long!", {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
      return;
    }

    try {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      });

      // Set logged-in state to true
      setIsLoggedIn(true);

      // Clear input fields
      setEmail("");
      setPassword("");
    } catch (error) {
      // Show error toast message
      toast.error("Error while logging in. Please try again.", {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  // Redirect user to the profile page upon successful login
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2 className="formHeading">Login</h2>
        <ToastContainer />

        <input
          className="inputField"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />

        <input
          className="inputField"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
        />

        <button className="submitButton" type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="registerLink">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
