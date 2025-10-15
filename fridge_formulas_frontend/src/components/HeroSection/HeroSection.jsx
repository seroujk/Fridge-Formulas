import "./HeroSection.css";
import HeroSectionImage from "../../assets/hero_section_image.png";
function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-section__info">
        <h1 className="hero-section__headline">
          Turn your fridge items into <br /> affordable meal plans with <span>AI</span>
        </h1>
        <p className="hero-section__tagline">
          Get personalized, easy to follow, and healthy recipe
          suggestions for the items your already have in your fridge to create the
          perfect meal plan
        </p>
        <button className="hero-section__button">
            Try Now For Free!
        </button>
      </div>
      <img
        className="hero-section__image"
        src={HeroSectionImage}
        alt="firdge and food photos"
      />
    </div>
  );
}

export default HeroSection;
