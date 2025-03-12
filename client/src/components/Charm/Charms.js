// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "./Charms.scss";
// import Charms1 from "../../assets/images/KUROMI_x_SONNY_ANGEL.jpg";
// import Charms2 from "../../assets/images/CINNAMOROLL_x_SONNY_ANGEL.jpg";
// import Charms3 from "../../assets/images/MIFFY_x_SONNY_ANGEL.jpg";

// const charmsData = [
//   { id: 1, image: Charms1, name: "Kuromi x Sonny Angel", price: "$10.00" },
//   { id: 2, image: Charms2, name: "Cinnamoroll x Sonny Angel", price: "$10.00" },
//   { id: 3, image: Charms3, name: "Miffy x Sonny Angel", price: "$10.00" },
// ];

// const Charms = () => {
//   return (
//     <div className="charms">
//       <h2 className="charms__title">Charms (Keychain)</h2>

//       <Swiper
//         spaceBetween={0}
//         slidesPerView={1.3}
//         pagination={{ clickable: true }}
//         navigation={true}
//         modules={[Navigation]}
//         centeredSlides={true}
//         breakpoints={{
//           768: {
//             slidesPerView: 3,
//           },
//         }}
//         className="charms__swiper"
//       >
//         {charmsData.map((charm) => (
//           <SwiperSlide key={charm.id} className="charms__slide">
//             <div className="charms__container">
//               <div className="charms__wrapper">
//                 <img
//                   className="charms__image"
//                   src={charm.image}
//                   alt={charm.name}
//                 />
//               </div>
//               <div className="charms__subtitle">
//                 <div className="charms__subtitle-container">
//                   <h3 className="charms__text">{charm.name}</h3>
//                   <p className="charms__subtext">From {charm.price}</p>
//                 </div>
//               </div>
//               <div className="charms__button">
//                 <div className="charms__button-text">Add to Cart</div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Charms;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Charms.scss";
import Charms1 from "../../assets/images/KUROMI_x_SONNY_ANGEL.jpg";
import Charms2 from "../../assets/images/CINNAMOROLL_x_SONNY_ANGEL.jpg";
import Charms3 from "../../assets/images/MIFFY_x_SONNY_ANGEL.jpg";

const charmsData = [
  { id: 1, image: Charms1, name: "Kuromi x Sonny Angel", price: "$10.00" },
  { id: 2, image: Charms2, name: "Cinnamoroll x Sonny Angel", price: "$10.00" },
  { id: 3, image: Charms3, name: "Miffy x Sonny Angel", price: "$10.00" },
];

const Charms = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === "/charms"; // Check if we are on /charms page

  return (
    <div
      className={`charms ${
        isStandalonePage ? "charms--page" : "charms--inline"
      }`}
    >
      <h2 className="charms__title">Charms (Keychain)</h2>

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
        className="charms__swiper"
      >
        {charmsData.map((charm) => (
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
                <div className="charms__subtitle-container">
                  <h3 className="charms__text">{charm.name}</h3>
                  <p className="charms__subtext">From {charm.price}</p>
                </div>
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