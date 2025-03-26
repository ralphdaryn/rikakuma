import "./Shop.scss";
import { useNavigate } from "react-router-dom";
import { stickers } from "../../data/StickersData";
import { charms } from "../../data/CharmsData";

const Shop = () => {
  const navigate = useNavigate();

  const handleStickerClick = (sticker) => {
    navigate(`/stickers/${sticker.id}`, { state: { sticker } });
  };

  const handleCharmClick = (charm) => {
    navigate(`/charms/${charm.id}`, { state: { charm } });
  };

  return (
    <div className="shop">
      <h2 className="shop__title">Shop All</h2>

      <div className="shop__section">
        <h3 className="shop__section-title">Stickers</h3>
        <div className="shop__list">
          {stickers.map((sticker) => (
            <div key={sticker.id} className="shop__item">
              <img
                src={sticker.image}
                alt={sticker.name}
                className="shop__image"
              />
              <h3 className="shop__name">{sticker.name}</h3>
              <p className="shop__price">{sticker.price}</p>
              <button
                className="shop__button"
                onClick={() => handleStickerClick(sticker)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="shop__section">
        <h3 className="shop__section-title">Charms (Keychains)</h3>
        <div className="shop__list">
          {charms.map((charm) => (
            <div key={charm.id} className="shop__item">
              <img src={charm.image} alt={charm.name} className="shop__image" />
              <h3 className="shop__name">{charm.name}</h3>
              <p className="shop__price">{charm.price}</p>
              <button
                className="shop__button"
                onClick={() => handleCharmClick(charm)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
