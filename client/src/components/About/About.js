import { useState } from "react";
import "./About.scss";

const FAQItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-header" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="about__subtitle">{title}</h3>
        <button className="faq-toggle">{isOpen ? "-" : "+"}</button>
      </div>
      {isOpen && <p className="about__subtext">{children}</p>}
    </div>
  );
};

const About = () => {
  return (
    <div className="about">
      <h2 className="about__title">FAQ</h2>
      <FAQItem title="Stickers, Deco Stickers & Toploader">
        All stickers, prints, and other flat media are packaged in a letter
        envelope with a rigid backing to keep them flat. This is sent as snail
        mail without tracking and should arrive in your mailbox as letter mail.
        If you’d like to upgrade shipping, feel free to reach out!
      </FAQItem>
      <FAQItem title="Charms, Keychains">
        These orders are shipped in thick bubble mailers with rigid cardboard
        for protection during transit. Orders going to the United States include
        tracking. If you are in Canada or another international location and
        would like tracking, please contact me!
      </FAQItem>
    </div>
  );
};

export default About;
