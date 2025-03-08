import "./Charms.scss";
import Charms from "../../assets/images/KUROMI_x_SONNY_ANGEL.jpg";

const Charm = () => {
  return (
    <div className="charms">
      <h2 className="charms__title">Charms (Keychain)</h2>
      <div className="charms__container">
        <div className="charms__wrapper">
          <img className="charms__image" src={Charms} alt="Sticker" />
        </div>
        <div className="charms__subtitle">
          <div className="charms__subtitle-container">
            <h3 className="charms__text">Kuromi x Sonny Angel</h3>
            <p className="charms__subtext">From $10.00</p>
          </div>
        </div>
        <div className="charms__button">
          <div className="charms__button-text">Add to Cart</div>
        </div>
      </div>
    </div>
  );
};
export default Charm;
