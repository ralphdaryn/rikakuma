import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <h2 className="footer__subheading">Get in Touch</h2>
          <p className="footer__text">
            Email:{" "}
            <a href="mailto:info@shopifystore.com" className="footer__link">
              info@shopifystore.com
            </a>
          </p>
          <p className="footer__text">Phone: (123) 456-7890</p>
          <p className="footer__text">
            Address: 123 Sticker Lane, Keychain City
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
