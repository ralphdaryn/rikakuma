import { useState } from "react";
import "./Contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setStatus("Sending...");
    try {
      const response = await fetch(
        "https://rikakuma.ca/.netlify/functions/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__intro">
          <h1 className="contact__heading">Contact Us</h1>
          <p className="contact__description">
            Have questions? We're here to help!
          </p>
        </div>
        <form className="contact__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="contact__label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="contact__input"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email" className="contact__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="contact__input"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="phoneNumber" className="contact__label">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="contact__input"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <label htmlFor="subject" className="contact__label">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="contact__input"
            required
            value={formData.subject}
            onChange={handleChange}
          />

          <label htmlFor="message" className="contact__label">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            className="contact__textarea"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="contact__button">
            Submit
          </button>
        </form>
        {status && <p className="contact__status">{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
