import "./Header.scss";
import { useState } from "react";
import logo from "../../assets/images/rikakumalogo.jpeg";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

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
          <div className="header__shopping-cart">
            <FaShoppingCart />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <a href="/">Home</a>
          </li>
          <li className="header__nav-item">
            <a href="#shop">Shop</a>
          </li>
          <li className="header__nav-item">
            <a href="#about">About</a>
          </li>
          <li className="header__nav-item">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
