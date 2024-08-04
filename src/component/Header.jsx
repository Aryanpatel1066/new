 
import React, { useState } from "react";
import Navbar from "../pages/NavBar";
import OfferBar from "../pages/OfferBar";

export default function Header() {
  const [isOfferBarVisible, setIsOfferBarVisible] = useState(true);

  const handleOfferBarRemove = () => {
    setIsOfferBarVisible(false);
  }

  return (
    <>
      <header>
        {isOfferBarVisible && <OfferBar onRemove={handleOfferBarRemove} />}
        <Navbar isOfferBarVisible={isOfferBarVisible} />
      </header>
    </>
  );
}

