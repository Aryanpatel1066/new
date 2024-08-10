import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCloudArrowDown, faTag, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons"; // Import from 'free-brands-svg-icons'

import HeroSection from "../pages/HeroSection";
import CoopanCode from "../pages/CoopanCode";
import "./Home.css";
import Footer from "../pages/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CoopanCode />
       {/* Newsletter Section */}
      <div className="newsLetterContainer">
        <h2>Newsletter</h2>
        <p>Get timely updates from your favorite products.</p>
        <div className="inputContainer">
          <input placeholder="Your email" />
          <button>Send</button>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="facilitiesContainer">
        <div className="topBrandIcon">
          <div className="facilitiesIcon">
            <FontAwesomeIcon icon={faTruck} />
            <p>FREE SHIPPING</p>
          </div>
          <div className="facilitiesIcon">
            <FontAwesomeIcon icon={faTag} />
            <p>TOP BRANDS</p>
          </div>
          <div className="facilitiesIcon">
            <FontAwesomeIcon icon={faCloudArrowDown} />
            <p>100% ORIGINAL PRODUCTS</p>
          </div>
          <div className="facilitiesIcon">
            <FontAwesomeIcon icon={faRotateLeft} />
            <p>EASY RETURNS</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="socialMediaIcon">
          <p>Show some love on social media</p>
          <div className="socialIconContainer">
            <div className="socialIcon">
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <div className="socialIcon">
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
            <div className="socialIcon">
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </div>
        </div>
      </div>

      <Footer/>
     </>
  );
}
