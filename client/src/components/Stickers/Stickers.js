import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Stickers.scss";
import Sticker1 from "../../assets/images/in_out_buddy.jpg";
import Sticker2 from "../../assets/images/luna_buddy.jpg";
import Sticker3 from "../../assets/images/dan_the_penguin.jpg";

const stickersData = [
  { id: 1, image: Sticker1, name: "In and Out Buddies", price: "$2.00" },
  { id: 2, image: Sticker2, name: "Luna Buddy", price: "$2.00" },
  { id: 3, image: Sticker3, name: "Dan the Penguin", price: "$2.00" },
];

const Stickers = () => {
  const location = useLocation(); 
  const isStandalonePage = location.pathname === "/stickers";
  return (
    <div
      className={`stickers ${
        isStandalonePage ? "stickers--page" : "stickers--inline"
      }`}
    >
      <h2 className="stickers__title">Stickers</h2>

      <Swiper
        spaceBetween={0}
        slidesPerView={1.3}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        centeredSlides={true}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
        className="stickers__swiper"
      >
        {stickersData.map((sticker) => (
          <SwiperSlide key={sticker.id} className="stickers__slide">
            <div className="stickers__container">
              <div className="stickers__wrapper">
                <img
                  className="stickers__image"
                  src={sticker.image}
                  alt={sticker.name}
                />
              </div>
              <div className="stickers__subtitle">
                <div className="stickers__subtitle-container">
                  <h3 className="stickers__text">{sticker.name}</h3>
                  <p className="stickers__subtext">From {sticker.price}</p>
                </div>
              </div>
              <div className="stickers__button">
                <div className="stickers__button-text">Add to Cart</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stickers;