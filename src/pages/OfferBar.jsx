import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./OfferBar.css"
export default function OfferBar(){
    const [remove,setRemove]=useState(true);
    const removeTopNavBar=() =>{
         setRemove(false);
    }
    return(
        <>{
            remove &&<div className="topNavBar">
            <div className="topNavBarHeading">Get Exclusive offers on your favourite products</div>
            <FontAwesomeIcon className="removeIcon" icon={faXmark} onClick={removeTopNavBar} />
          </div>
        }
        
        
        </>
    )
}