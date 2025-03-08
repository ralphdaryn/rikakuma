import "./Stickers.scss";
import Sticker from "../../assets/images/in_out_buddy.jpg";

const Stickers = () => {
  return (
    <div className="stickers">
      <h2 className="stickers__title">Stickers</h2>
      <div className="stickers__container">
        <div className="stickers__wrapper">
          <img className="stickers__image" src={Sticker} alt="Charms" />
        </div>
        <div className="stickers__subtitle">
          <div className="stickers__subtitle-container">
            <h3 className="stickers__text">In and Out Buddies</h3>
            <p className="stickers__subtext">From $3.00</p>
          </div>
        </div>
        <div className="stickers__button">
          <div className="stickers__button-text">Add to Cart</div>
        </div>
      </div>
    </div>
  );
};
export default Stickers;
