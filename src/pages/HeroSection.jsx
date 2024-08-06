 import img from "../assets/headerimage.jpg"
 import "./HeroSection.css"
 import {NavLink} from "react-router-dom"
 export default function HeroSection(){
  return(
    <>
    <NavLink to="/products">
    <div className="heroHeaderContainer">
      <img className="heroImg"src={img} alt="img"/>
    </div>
    </NavLink>
    </>
  )
 }