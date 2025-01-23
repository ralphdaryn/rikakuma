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
import { Link } from "react-scroll";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="header">
      <div className="header__container">
        {/* Hamburger Menu Icon */}
        <div className="header__wrapper">
          <div
            className="header__menu-icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          {/* Logo */}
          <a href="/">
            <img
              className="header__logo"
              src={logo}
              alt="Rikakuma Logo"
              loading="eager" // Prioritize loading of the logo
            />
          </a>
          <div className="header__shopping-bag">
            <FaShoppingBag />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <ul className="header__nav-list">
          <li className="header__nav-list__item">
            <a className="header__navlink" href="/">
              <FaHome /> Home
            </a>
          </li>
          <li className="header__nav-list__item">
            <a className="header__navlink" href="#shop">
              <FaShoppingCart /> Shop
            </a>
          </li>
          <li className="header__nav-list__item">
            <a className="header__navlink" href="#about">
              <FaInfoCircle /> About
            </a>
          </li>
          <li className="header__nav-list__item">
            <Link
              className="header__navlink"
              to="contact"
              smooth={true}
              duration={500}
            >
              <FaEnvelope /> Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
