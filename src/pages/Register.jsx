import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long!", { /* options */ });
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match!", { /* options */ });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast.success("Registered successfully!", { /* options */ });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        toast.dismiss();
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Error during registration", { /* options */ });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2 className="register-heading">Register</h2>
        <input
          className="register-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          required
        />
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
          Already have an account? <Link to="/login" className="registerLink">Login</Link>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Register;
