import { Routes,Route } from "react-router-dom"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import ProductList from "../pages/ProductList"
import Home from "./Home"
import NotFound from "../pages/NotFound"
import ProductDetails from "../pages/ProductDetails"
export default function MyRoutes(){
    return(
        <>
        <Routes>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/productdetails/:id" element={<ProductDetails/>}/>
        </Routes>
        
        </>
    )
}