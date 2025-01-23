import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact" id="#contact">
      <div className="contact__container">
        <div className="contact__intro">
          <h1 className="contact__heading">Contact Us</h1>
          <div className="contact__info"></div>
          <p className="contact__description">
            Have questions?<br></br> We're here to help!
          </p>
        </div>
        <form className="contact__form">
          <label htmlFor="name" className="contact__label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="contact__input"
            required
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
          />
          <label htmlFor="message" className="contact__label">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            className="contact__textarea"
            required
          ></textarea>

          <button type="submit" className="contact__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
