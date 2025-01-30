import "./Card.scss";
import stickerImg from "../../assets/images/sticker.png";
import keychainImg from "../../assets/images/keychain.png";

const Card = () => {
  return (
    <div className="card">
      <div className="card__container card__container-welcome">
        <div className="card__wrapper">
          <h3 className="card__title">Welcome!</h3>
          <p className="card__subtitle">Find your style!</p>
        </div>
        <div className="card__button">Shop All</div>
      </div>
      <div className="card__container-feature">
        <div className="card__container">
          <div className="card__wrapper">
            <div className="card__image-container">
              <img
                className="card__image"
                src={stickerImg}
                alt="sticker pic"
              ></img>
            </div>
            <h3 className="card__title">Featured Items:</h3>
            <p className="card__subtitle">Stickers!</p>
            <div className="card__button">Shop</div>
          </div>
        </div>

        <div className="card__container">
          <div className="card__wrapper">
            <h3 className="card__title">Featured Items:</h3>
            <p className="card__subtitle">
              Charms (Key Chains)
            </p>
            <div className="card__button">Shop</div>
            <div className="card__image-container">
              <img
                className="card__image"
                src={keychainImg}
                alt="keychain pic"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
