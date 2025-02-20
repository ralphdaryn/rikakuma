// // import "./Header.scss";
// // import { useState } from "react";
// // import logo from "../../assets/images/rikakumalogo.jpeg";
// // import {
// //   FaBars,
// //   FaTimes,
// //   FaShoppingBag,
// //   FaHome,
// //   FaInfoCircle,
// //   FaEnvelope,
// //   FaShoppingCart,
// // } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";

// // const Header = ({ onContactClick }) => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const navigate = useNavigate();

// //   const toggleMenu = () => {
// //     setIsMenuOpen((prevState) => !prevState);
// //   };

// //   const handleContactClick = () => {
// //     navigate("/"); // Navigate to the Home page
// //     setTimeout(() => {
// //       onContactClick(); // Scroll to the contact section
// //     }, 100); // Add a small delay to ensure navigation is complete
// //   };

// //   return (
// //     <div className="header">
// //       <div className="header__container">
// //         <div className="header__wrapper">
// //           <div
// //             className="header__menu-icon"
// //             onClick={toggleMenu}
// //             aria-label="Toggle Menu"
// //           >
// //             {isMenuOpen ? <FaTimes /> : <FaBars />}
// //           </div>
// //           <div>
// //             <img
// //               className="header__logo"
// //               src={logo}
// //               alt="Rikakuma Logo"
// //               loading="eager"
// //             />
// //           </div>
// //           <div className="header__shopping-bag">
// //             <FaShoppingBag />
// //           </div>
// //         </div>
// //       </div>

// //       <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
// //         <ul className="header__nav-list">
// //           <li className="header__nav-list__item">
// //             <span className="header__navlink" onClick={() => navigate("/")}>
// //               <FaHome /> Home
// //             </span>
// //           </li>
// //           <li className="header__nav-list__item">
// //             <span className="header__navlink" onClick={() => navigate("/shop")}>
// //               <FaShoppingCart /> Shop
// //             </span>
// //           </li>
// //           <li className="header__nav-list__item">
// //             <span
// //               className="header__navlink"
// //               onClick={() => navigate("/about")}
// //             >
// //               <FaInfoCircle /> Information
// //             </span>
// //           </li>
// //           <li className="header__nav-list__item">
// //             <span
// //               className="header__navlink"
// //               onClick={handleContactClick}
// //               style={{ cursor: "pointer" }}
// //             >
// //               <FaEnvelope /> Contact
// //             </span>
// //           </li>
// //         </ul>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Header;

// import "./Header.scss";
// import { useState } from "react";
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

// const Header = ({ onContactClick }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsMenuOpen((prevState) => !prevState);
//   };

//   const handleContactClick = () => {
//     navigate("/"); // Navigate to the Home page
//     setTimeout(() => {
//       onContactClick(); // Scroll to the contact section
//     }, 100); // Add a small delay to ensure navigation is complete
//   };

//   const handleViewCart = () => {
//     const cartUrl = "https://vd871k-pc.myshopify.com/cart";
//     console.log("🔗 Redirecting to Shopify Cart:", cartUrl);
//     window.location.href = cartUrl;
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
//           {/* Shopping bag icon now redirects to Shopify Cart */}
//           <div className="header__shopping-bag" onClick={handleViewCart}>
//             <FaShoppingBag />
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
import { useState } from "react";
import { useCart } from "../../context/CartContext"; // ✅ Import useCart
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
  const { cartCount } = useCart(); // ✅ Get cart count from context
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleViewCart = () => {
    const cartUrl = "https://vd871k-pc.myshopify.com/cart";
    console.log("🔗 Redirecting to Shopify Cart:", cartUrl);
    window.location.href = cartUrl;
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
            <img
              className="header__logo"
              src={logo}
              alt="Rikakuma Logo"
              loading="eager"
            />
          </div>
          {/* Shopping bag icon now shows cart count */}
          <div className="header__shopping-bag" onClick={handleViewCart}>
            <FaShoppingBag />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}{" "}
            {/* ✅ Display cart count */}
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
              onClick={onContactClick}
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