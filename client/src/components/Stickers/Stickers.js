import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./Stickers.scss";
import { stickers } from "../../data/StickersData";


const Stickers = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Moved inside component
  const isStandalonePage = location.pathname === "/stickers";

  const handleViewDetails = (sticker) => {
    navigate(`/stickers/${sticker.id}`, { state: { sticker } });
  };


const firstRowStickers = stickers.slice(0, 8);
const secondRowStickers = stickers.slice(8);

  return (
    <div
      className={`stickers ${
        isStandalonePage ? "stickers--page" : "stickers--inline"
      }`}
    >
      <h2 className="stickers__title">Stickers</h2>

      {/* First Row */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1.3}
        navigation={true}
        modules={[Navigation]}
        centeredSlides={true}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
        className="stickers__swiper"
      >
        {firstRowStickers.map((sticker) => (
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
                <h3 className="stickers__text">{sticker.name}</h3>
                <p className="stickers__subtext">From {sticker.price}</p>
              </div>
              <div
                className="stickers__button"
                onClick={() => handleViewDetails(sticker)}
              >
                <div className="stickers__button-text">View Details</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Second Row */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1.3}
        navigation={true}
        modules={[Navigation]}
        centeredSlides={true}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
        className="stickers__swiper"
      >
        {secondRowStickers.map((sticker) => (
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
                <h3 className="stickers__text">{sticker.name}</h3>
                <p className="stickers__subtext">From {sticker.price}</p>
              </div>
              <div
                className="stickers__button"
                onClick={() => handleViewDetails(sticker)}
              >
                <div className="stickers__button-text">View Details</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stickers;