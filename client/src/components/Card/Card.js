import { Link } from "react-router-dom";
import "./Card.scss";
import stickerImg from "../../assets/images/stickers.jpg";
import keychainImg from "../../assets/images/charms.jpg";

const Card = () => {
  return (
    <div className="card">
      <div className="card__container card__container-welcome">
        <div className="card__wrapper-welcome">
          <h3 className="card__title">Welcome!</h3>
          <p className="card__subtitle-welcome">Thanks for visiting!</p>
        </div>
        <Link to="/shop" className="card__button">
          Shop All
        </Link>{" "}
      </div>

      <div className="card__container-feature">
        <div className="card__container">
          <div className="card__wrapper">
            <div className="card__image-container">
              <img className="card__image" src={stickerImg} alt="sticker pic" />
            </div>
            <h3 className="card__title">Featured Items:</h3>
            <p className="card__subtitle"> Valorant Stickers!</p>
            <Link to="/stickers" className="card__button-stickers">
              Shop
            </Link>{" "}
          </div>
        </div>

        <div className="card__container">
          <div className="card__wrapper">
            <h3 className="card__title">Featured Items:</h3>
            <p className="card__subtitle">Valorant Battle Pet & Sonny Angel Charms!</p>
            <Link to="/charms" className="card__button-charms">
              Shop
            </Link>{" "}
            <div className="card__image-container">
              <img
                className="card__image"
                src={keychainImg}
                alt="keychain pic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
