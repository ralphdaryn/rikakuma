import { useParams, useNavigate } from "react-router-dom";
import { charms } from "../../data/CharmsData";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../../context/CartContext"; // ✅
import "./CharmsDetail.scss";

const CharmsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅

  const charm = charms.find((c) => c.id === parseInt(id, 10));

  if (!charm) {
    return <div className="charm-detail">Charm not found.</div>;
  }

  return (
    <div className="charm-detail">
      <button className="charm-detail__back" onClick={() => navigate(-1)}>
        <FaArrowLeft className="charm-detail__back-icon" />
        <span className="charm-detail__back-text">Back</span>
      </button>

      <div className="charm-detail__card">
        <img className="charm-detail__image" src={charm.image} alt={charm.name} />
        <div className="charm-detail__info">
          <h2 className="charm-detail__name">{charm.name}</h2>
          <p className="charm-detail__price">{charm.price}</p>
          <p className="charm-detail__description">
            This adorable charm makes the perfect accessory!
          </p>
          <button
            className="charm-detail__add-to-cart"
            onClick={() => addToCart(charm)} // ✅
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharmsDetail;
