import img from "../assets/headerimage.jpg";
import Header from "../component/Header";
import { NavLink } from "react-router-dom";

export default function HeroSection() {
  return (
    <>
      <Header />
      <NavLink to="/productlist">
        <div className="relative w-full max-h-[600px] overflow-hidden">
          <img
            className="w-full object-cover max-h-[600px] transition-transform duration-500 hover:scale-105"
            src={img}
            alt="Hero Banner"
          />
         
        </div>
      </NavLink>
    </>
  );
}
