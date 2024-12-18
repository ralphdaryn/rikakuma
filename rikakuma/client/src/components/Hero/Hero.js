import "./Hero.scss";
import heroImg from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__container">
        <img className="hero__image" src={heroImg} alt="hero pic" />
      </div>
    </div>
  );
};

export default Hero;
