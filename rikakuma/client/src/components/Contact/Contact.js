import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact">
      <span className="contact__heading">Contact Us</span>
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
  );
};

export default Contact;