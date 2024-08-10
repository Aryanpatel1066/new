import {NavLink} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"
export default function Footer(){
    return(
        <>
           <footer>
            <div className="headingPrivacyIcon">
                <NavLink className="link">Terms & Condition</NavLink>
                <NavLink className="link">Shipping Policy</NavLink>
                <NavLink className="link">Cancellation Policy</NavLink>
                <NavLink className="link">Privacy Policy</NavLink>
            </div>
            <div className="copyRightSection">
            Copyright 2023 Glamour.<FontAwesomeIcon icon={faCopyright} /> All Rights Reserved.
            </div>
           </footer>
        </>
    )
}