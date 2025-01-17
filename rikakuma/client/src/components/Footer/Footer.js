import "./Footer.scss";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <h2 className="footer__subheading">Get In Touch!</h2>
          <p className="footer__text">
            Stay connected with our latest products, updates and events!
          </p>
          <a
            href="https://www.instagram.com/rikakuma.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="Visit our Instagram page"
          >
            <FaInstagram className="footer__icon" /> @rikakuma.ca
          </a>
          <p className="footer__text footer__copyright">
            © 2025 Rikakuma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
