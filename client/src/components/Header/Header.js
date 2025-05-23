import "./Header.scss";
import { useState } from "react";
import logo from "../../assets/images/rikakumalogo.jpeg";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingCart,
  FaShoppingBag
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // ✅

const Header = ({ onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart(); // ✅

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      onContactClick();
    }, 100);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <div
            className="header__menu-icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <div>
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <img
                className="header__logo"
                src={logo}
                alt="Rikakuma Logo"
                loading="eager"
              />
            </span>
          </div>
          <div className="header__cart" onClick={handleCartClick}>
            <FaShoppingCart className="header__cart-icon" />
            <span className="header__cart-text">View Cart</span>
            {cartCount > 0 && (
              <span className="header__cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </div>

      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <ul className="header__nav-list">
          <li className="header__nav-list__item">
            <span className="header__navlink" onClick={() => navigate("/")}>
              <FaHome /> Home
            </span>
          </li>
          <li className="header__nav-list__item">
            <span className="header__navlink" onClick={() => navigate("/shop")}>
              <FaShoppingBag /> Shop
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
