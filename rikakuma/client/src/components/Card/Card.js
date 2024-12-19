import "./Card.scss";

const Card = () => {
  return (
    <div className="card">
      <div className="card__container">
        <h3 className="card__title">Welcome!</h3>
        <h3 className="card__subtitle">Thank you for visiting!</h3>
        <div className="card__button">Shop All</div>
      </div>
    </div>
  );
};
export default Card;
