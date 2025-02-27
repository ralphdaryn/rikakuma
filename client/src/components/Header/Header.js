import "./Header.scss";
import { useState } from "react";
import logo from "../../assets/images/rikakumalogo.jpeg";
import {
  FaBars,
  FaTimes,
  FaShoppingBag, 
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleContactClick = () => {
    navigate("/"); // Navigate to Home
    setTimeout(() => {
      onContactClick(); // Scroll to contact section
    }, 100);
  };

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__wrapper">
          {/* Hamburger Menu */}
          <div
            className="header__menu-icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Logo */}
          <div>
            <img
              className="header__logo"
              src={logo}
              alt="Rikakuma Logo"
              loading="eager"
            />
          </div>

          {/* 🛒 Shopping Bag (Navigate to Cart) */}
          <div
            className="header__shopping-bag"
            onClick={() => navigate("/cart")} // ✅ Add navigation to Cart
            style={{ cursor: "pointer" }} // ✅ Make it clickable
          >
            <FaShoppingBag />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <ul className="header__nav-list">
          <li className="header__nav-list__item">
            <span className="header__navlink" onClick={() => navigate("/")}>
              <FaHome /> Home
            </span>
          </li>
          <li className="header__nav-list__item">
            <span className="header__navlink" onClick={() => navigate("/shop")}>
              <FaShoppingCart /> Shop
            </span>
          </li>
          <li className="header__nav-list__item">
            <span
              className="header__navlink"
              onClick={() => navigate("/about")}
            >
              <FaInfoCircle /> Information
            </span>
          </li>
          <li className="header__nav-list__item">
            <span
              className="header__navlink"
              onClick={handleContactClick}
              style={{ cursor: "pointer" }}
            >
              <FaEnvelope /> Contact
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;