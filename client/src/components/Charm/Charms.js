import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./Charms.scss";
import { charms } from "../../data/CharmsData";

const Charms = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStandalonePage = location.pathname === "/charms";

  const handleViewDetails = (charm) => {
    navigate(`/charms/${charm.id}`, { state: { charm } });
  };

  const firstRowCharms = charms.slice(0, 4);
  const secondRowCharms = charms.slice(4);

  return (
    <div
      className={`charms ${
        isStandalonePage ? "charms--page" : "charms--inline"
      }`}
    >
      <h2 className="charms__title">Charms (Keychain)</h2>

      {/* First Row */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1.3}
        navigation={true}
        modules={[Navigation]}
        centeredSlides={true}
        breakpoints={{ 768: { slidesPerView: 3 } }}
        className="charms__swiper"
      >
        {firstRowCharms.map((charm) => (
          <SwiperSlide key={charm.id} className="charms__slide">
            <div className="charms__container">
              <div className="charms__wrapper">
                <img
                  className="charms__image"
                  src={charm.image}
                  alt={charm.name}
                />
              </div>
              <div className="charms__subtitle">
                <h3 className="charms__text">{charm.name}</h3>
                <p className="charms__subtext">From {charm.price}</p>
              </div>
              <div
                className="charms__button"
                onClick={() => handleViewDetails(charm)}
              >
                <div className="charms__button-text">View Details</div>
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
        breakpoints={{ 768: { slidesPerView: 3 } }}
        className="charms__swiper"
      >
        {secondRowCharms.map((charm) => (
          <SwiperSlide key={charm.id} className="charms__slide">
            <div className="charms__container">
              <div className="charms__wrapper">
                <img
                  className="charms__image"
                  src={charm.image}
                  alt={charm.name}
                />
              </div>
              <div className="charms__subtitle">
                <h3 className="charms__text">{charm.name}</h3>
                <p className="charms__subtext">From {charm.price}</p>
              </div>
              <div
                className="charms__button"
                onClick={() => handleViewDetails(charm)}
              >
                <div className="charms__button-text">View Details</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Charms;