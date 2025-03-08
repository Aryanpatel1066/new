import { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../api/apiservices";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../component/Header";
 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiService.post("/auth/signin", { email, password });

      console.log("API Response:", response.data); 
      
      const { name, userId, message ,accessToken,userType} = response.data;
      localStorage.setItem("userId", userId);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userType",userType)
      console.log("user type",localStorage.getItem("userType"))
      console.log("Stored User:", localStorage.getItem("user"));
      console.log("Stored UserID:", localStorage.getItem("userId"));
      console.log("Stored Token:", localStorage.getItem("accessToken"));
      if (!userId) {
        throw new Error("Invalid login response: userId missing");
      }

      

      toast.success(`✅ ${message || "Login successful!"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      setEmail("");
      setPassword("");

      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
      setTimeout(() => {
        if (response.data.userType === "ADMIN") {
            console.log("✅ Redirecting Admin to Dashboard...");
            navigate("/dashboard");
        } else {
            console.log("✅ Redirecting Customer to Home...");
            navigate("/");
        }
    }, 500); // Delay to ensure localStorage updates first
    
      
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      toast.error(`❌ ${err.response?.data?.message || "Login failed!"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>   
    <Header/>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <NavLink to="/register" className="text-blue-500 hover:text-blue-700">
            Don't have an account?
          </NavLink>
        </div>
        <div className="mt-4 text-center">
          <NavLink to="/forgot-password" className="text-blue-500 hover:text-blue-700">
            Forgot password?
          </NavLink>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
    </>
  );
}

export default Login;