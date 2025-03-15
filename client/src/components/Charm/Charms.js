import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./Charms.scss";

// Importing charm images
import Charms1 from "../../assets/images/kuromi.jpg";
import Charms2 from "../../assets/images/my_melody.jpg";
import Charms3 from "../../assets/images/miffy.jpg";
import Charms4 from "../../assets/images/cinnamoroll.jpg";
import Charms5 from "../../assets/images/1_charm-iron.jpg";
import Charms6 from "../../assets/images/2_charm-bronze.jpg";
import Charms7 from "../../assets/images/3_charm-silver.jpg";
import Charms8 from "../../assets/images/4_charm-gold.jpg";
import Charms9 from "../../assets/images/5_charm-platinum.jpg";
import Charms10 from "../../assets/images/6_charm-diamond.jpg";
import Charms11 from "../../assets/images/7_charm-ascendant.jpg";
import Charms12 from "../../assets/images/8_charm-immortal.jpg";
import Charms13 from "../../assets/images/9_charm-radiant.jpg";
import Charms14 from "../../assets/images/10_charm-riot.jpg";

// Charm data for first row
const firstRowCharms = [
  { id: 1, image: Charms1, name: "Kuromi x Sonny Angel", price: "$10.00" },
  { id: 2, image: Charms2, name: "My Melody x Sonny Angel", price: "$10.00" },
  { id: 3, image: Charms3, name: "Miffy x Sonny Angel", price: "$10.00" },
  { id: 4, image: Charms4, name: "Cinnamoroll x Sonny Angel", price: "$10.00" },
];

// Charm data for second row
const secondRowCharms = [
  { id: 5, image: Charms5, name: "Iron Charm", price: "$10.00" },
  { id: 6, image: Charms6, name: "Bronze Charm", price: "$10.00" },
  { id: 7, image: Charms7, name: "Silver Charm", price: "$10.00" },
  { id: 8, image: Charms8, name: "Gold Charm", price: "$10.00" },
  { id: 9, image: Charms9, name: "Platinum Charm", price: "$10.00" },
  { id: 10, image: Charms10, name: "Diamond Charm", price: "$10.00" },
  { id: 11, image: Charms11, name: "Ascendant Charm", price: "$10.00" },
  { id: 12, image: Charms12, name: "Immortal Charm", price: "$10.00" },
  { id: 13, image: Charms13, name: "Radiant Charm", price: "$10.00" },
  { id: 14, image: Charms14, name: "Riot Charm", price: "$10.00" },
];

const Charms = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === "/charms";

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
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        centeredSlides={true}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
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
              <div className="charms__button">
                <div className="charms__button-text">Add to Cart</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Second Row */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1.3}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        centeredSlides={true}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
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
              <div className="charms__button">
                <div className="charms__button-text">Add to Cart</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Charms;