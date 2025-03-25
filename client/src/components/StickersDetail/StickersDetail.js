import { useParams, useNavigate } from "react-router-dom";
import { stickers } from "../../data/StickersData";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../../context/CartContext"; // ✅
import "./StickersDetail.scss";

const StickersDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅

  const sticker = stickers.find((s) => s.id === parseInt(id, 10));

  if (!sticker) {
    return <div className="sticker-detail">Sticker not found.</div>;
  }

  return (
    <div className="sticker-detail">
      <button className="sticker-detail__back" onClick={() => navigate(-1)}>
        <FaArrowLeft className="sticker-detail__back-icon" />
        <span className="sticker-detail__back-text">Back</span>
      </button>

      <div className="sticker-detail__card">
        <img
          className="sticker-detail__image"
          src={sticker.image}
          alt={sticker.name}
        />
        <div className="sticker-detail__info">
          <h2 className="sticker-detail__name">{sticker.name}</h2>
          <p className="sticker-detail__price">{sticker.price}</p>
          <p className="sticker-detail__description">
            This is a cute, high-quality sticker of{" "}
            <strong>{sticker.name}</strong>.
          </p>
          <button
            className="sticker-detail__add-to-cart"
            onClick={() => addToCart(sticker)} // ✅
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickersDetail;
