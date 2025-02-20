import "./Header.scss";
import { useState } from "react";
import logo from "../../assets/images/rikakumalogo.jpeg";
import { FaBars, FaTimes, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const Header = ({ onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart(); // Ensure cart count updates correctly

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleViewCart = () => {
    window.location.href = "https://vd871k-pc.myshopify.com/cart";
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
          <img
            className="header__logo"
            src={logo}
            alt="Rikakuma Logo"
            loading="eager"
          />
          <div className="header__shopping-bag" onClick={handleViewCart}>
            <FaShoppingBag />
            {cartCount > 0 && (
              <span className="header__cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;