// import "./Header.scss";
// import { useState, useContext, useEffect } from "react";
// import logo from "../../assets/images/rikakumalogo.jpeg";
// import {
//   FaBars,
//   FaTimes,
//   FaShoppingBag,
//   FaHome,
//   FaInfoCircle,
//   FaEnvelope,
//   FaShoppingCart,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../context/CartContext";

// const Header = ({ onContactClick }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { cart, fetchCart } = useContext(CartContext);

//   // Ensure the cart is updated when the component mounts
//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   const toggleMenu = () => {
//     setIsMenuOpen((prevState) => !prevState);
//   };

//   const handleContactClick = () => {
//     navigate("/");
//     setTimeout(() => {
//       onContactClick();
//     }, 100);
//   };

//   const handleCartClick = () => {
//     // Redirect to Shopify cart instead of React Router cart page
//     window.location.href = "https://vd871k-pc.myshopify.com/cart";
//   };

//   return (
//     <div className="header">
//       <div className="header__container">
//         <div className="header__wrapper">
//           <div
//             className="header__menu-icon"
//             onClick={toggleMenu}
//             aria-label="Toggle Menu"
//           >
//             {isMenuOpen ? <FaTimes /> : <FaBars />}
//           </div>
//           <div>
//             <img
//               className="header__logo"
//               src={logo}
//               alt="Rikakuma Logo"
//               loading="eager"
//             />
//           </div>
//           {/* 🛒 Updated Shopping Cart to use Shopify link */}
//           <div
//             className="header__shopping-bag"
//             onClick={handleCartClick}
//             style={{ cursor: "pointer" }}
//           >
//             <FaShoppingBag />
//             {cart?.item_count > 0 && (
//               <span className="cart-count">{cart.item_count}</span>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
//         <ul className="header__nav-list">
//           <li className="header__nav-list__item">
//             <span className="header__navlink" onClick={() => navigate("/")}>
//               <FaHome /> Home
//             </span>
//           </li>
//           <li className="header__nav-list__item">
//             <span className="header__navlink" onClick={() => navigate("/shop")}>
//               <FaShoppingCart /> Shop
//             </span>
//           </li>
//           <li className="header__nav-list__item">
//             <span
//               className="header__navlink"
//               onClick={() => navigate("/about")}
//             >
//               <FaInfoCircle /> Information
//             </span>
//           </li>
//           <li className="header__nav-list__item">
//             <span
//               className="header__navlink"
//               onClick={handleContactClick}
//               style={{ cursor: "pointer" }}
//             >
//               <FaEnvelope /> Contact
//             </span>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Header;

import "./Header.scss";
import { useState, useContext, useEffect } from "react";
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
import { CartContext } from "../../context/CartContext";

const Header = ({ onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, fetchCart } = useContext(CartContext);

  // Ensure the cart is updated when the component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      onContactClick();
    }, 100);
  };

  const handleCartClick = () => {
    // Redirect to Shopify cart instead of React Router cart page
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
          {/* 🛒 Updated Shopping Cart to use Shopify link */}
          <div
            className="header__shopping-bag"
            onClick={handleCartClick}
            style={{ cursor: "pointer" }}
          >
            <FaShoppingBag />
            {cart?.item_count > 0 && (
              <span className="cart-count">{cart.item_count}</span>
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