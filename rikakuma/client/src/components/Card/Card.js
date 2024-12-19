import "./Card.scss";
import stickerImg from "../../assets/images/sticker.png";

const Card = () => {
  return (
    <div className="card">
      <div className="card__container">
        <h3 className="card__title">Welcome!</h3>
        <h3 className="card__subtitle">Thank you for visiting!</h3>
        <div className="card__button">Shop All</div>
      </div>
      <div className="card__container">
        <img className="card__image" src={stickerImg} alt="sticker pic"></img>
        <h3 className="card__title">Featured:</h3>
        <h3 className="card__subtitle">Stickers!</h3>
        <div className="card__button">Shop</div>
      </div>
    </div>
  );
};
export default Card;
