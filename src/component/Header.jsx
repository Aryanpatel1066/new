import React from "react";
import Navbar from "../pages/NavBar";
import OfferBar from "../pages/OfferBar";
export default function Header() {
  return (
    <>
      <header>
        <OfferBar/>
        <nav>
          <Navbar />
          </nav>
      </header>
    </>
  );
}
