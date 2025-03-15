import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./Stickers.scss";

// Importing sticker images
import Sticker1 from "../../assets/images/in_out_buddy.jpg";
import Sticker2 from "../../assets/images/luna_buddy.jpg";
import Sticker3 from "../../assets/images/dan_the_penguin.jpg";
import Sticker4 from "../../assets/images/brimduck_buddy.jpg";
import Sticker5 from "../../assets/images/brimsicle_buddy.jpg";
import Sticker6 from "../../assets/images/jett_knife_buddy.jpg";
import Sticker7 from "../../assets/images/tanghulu_buddy.jpg";
import Sticker8 from "../../assets/images/pizza_buddy.jpg";
import Sticker9 from "../../assets/images/1iron.jpg";
import Sticker10 from "../../assets/images/2bronze.jpg";
import Sticker11 from "../../assets/images/3silver.jpg";
import Sticker12 from "../../assets/images/4gold.jpg";
import Sticker13 from "../../assets/images/5platinum.jpg";
import Sticker14 from "../../assets/images/6diamond.jpg";
import Sticker15 from "../../assets/images/7ascendant.jpg";
import Sticker16 from "../../assets/images/8immortal.jpg";
import Sticker17 from "../../assets/images/9radiant.jpg";
import Sticker18 from "../../assets/images/10riotbuddy.jpg";
import Sticker19 from "../../assets/images/ALL_STICKERS.jpg";

// Sticker data for first row
const firstRowStickers = [
  { id: 1, image: Sticker1, name: "In and Out Buddies", price: "$2.00" },
  { id: 2, image: Sticker2, name: "Luna Buddy", price: "$2.00" },
  { id: 3, image: Sticker3, name: "Dan the Penguin", price: "$2.00" },
  { id: 4, image: Sticker4, name: "Brimduck Buddy", price: "$2.00" },
  { id: 5, image: Sticker5, name: "Brimsicle Buddy", price: "$2.00" },
  { id: 6, image: Sticker6, name: "Jett Knife Buddy", price: "$2.00" },
  { id: 7, image: Sticker7, name: "Tanghulu Buddy", price: "$2.00" },
  { id: 8, image: Sticker8, name: "Pizza Buddy", price: "$2.00" },
];

// Sticker data for second row
const secondRowStickers = [
  { id: 9, image: Sticker19, name: "All Stickers", price: "$2.00" },
  { id: 10, image: Sticker18, name: "Riot Buddy", price: "$2.00" },
  { id: 11, image: Sticker9, name: "Iron", price: "$2.00" },
  { id: 12, image: Sticker10, name: "Bronze", price: "$2.00" },
  { id: 13, image: Sticker11, name: "Silver", price: "$2.00" },
  { id: 14, image: Sticker12, name: "Gold", price: "$2.00" },
  { id: 15, image: Sticker13, name: "Platinum", price: "$2.00" },
  { id: 16, image: Sticker14, name: "Diamond", price: "$2.00" },
  { id: 17, image: Sticker15, name: "Ascendant", price: "$2.00" },
  { id: 18, image: Sticker16, name: "Immortal", price: "$2.00" },
  { id: 19, image: Sticker17, name: "Radiant", price: "$2.00" },
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
              <div className="stickers__button">
                <div className="stickers__button-text">Add to Cart</div>
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
