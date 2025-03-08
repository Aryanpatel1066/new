import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import ProductList from "../pages/ProductList";
import Home from "./Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import AddressDetail from "../pages/AddressDetail";
import UserDetails from "../pages/UserDetails";
import Checkout from "../pages/Checkout";
import HandlePayment from "../pages/HandlePayment";
import OrderSuccessFully from "../pages/OrderSuccessFully";
import ForgotPassword from "../pages/ForgotPassword"
import VerifyOtp from "../pages/VerifyOtp"
import ResetPassword from "../pages/ResetPassword"
import OrderHistory from "../pages/OrderHistory"
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import AdminRoute from "./AdminRoute";
export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/"   element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
      <Route path="*" element={<NotFound />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      <Route path="/register" element={<Register />} />
      
      {/* Nested routes for Profile */}
      <Route path="/profile" element={<Profile />}>
        <Route index element={<Navigate to="userDetails" />} /> {/* Default route */}
        <Route path="userDetails" element={<UserDetails />} />
        <Route path="addressDetails" element={<AddressDetail />} />
        <Route path="orderHistory" element={<OrderHistory/>}/>
      </Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="/handlepayment" element={<HandlePayment/>}/>
      <Route path="/ordersuccessfully" element={
        <OrderSuccessFully/>
      }/>
       <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
         
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />

    </Routes>
  );
}
