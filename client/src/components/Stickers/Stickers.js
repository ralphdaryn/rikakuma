import "./Stickers.scss";
import Sticker from "../../assets/images/luna_buddy.jpg";

const Stickers = () => {
  return (
    <div className="stickers">
      <h2 className="stickers__title">Stickers</h2>
      <div className="stickers__container">
        <div className="stickers__wrapper">
          <img className="stickers__image" src={Sticker} alt="Sticker" />
        </div>
      </div>
    </div>
  );
};
export default Stickers;
