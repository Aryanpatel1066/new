import {NavLink} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"
export default function Footer(){
    return(
        <>
           <footer>
            <div className="headingPrivacyIcon">
                <NavLink className="linkPrivacy">Terms & Condition</NavLink>
                <NavLink className="linkPrivacy">Shipping Policy</NavLink>
                <NavLink className="linkPrivacy">Cancellation Policy</NavLink>
                <NavLink className="linkPrivacy">Privacy Policy</NavLink>
            </div>
            <div className="copyRightSection">
            Copyright <FontAwesomeIcon icon={faCopyright} /> 2024 StyleSavvy. All Rights Reserved.
            </div>
           </footer>
        </>
    )
}