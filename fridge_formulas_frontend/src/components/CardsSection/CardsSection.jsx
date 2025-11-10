import "./CardsSection.css";
import DietCard from "../DietCard/DietCard";
import HowItWorks from "../HowItWorks/HowItWorks";
import RecipeSection from "../RecipesSection/RecipesSection";
function CardsSection({ sectionTitle,buttonText, onButtonClick, formModal, recipes }) {
  const sectionComponents = {
    "Dietary Templates": <DietCard />,
    "How It Works": <HowItWorks />,
    "Your Meals Plans": <RecipeSection recipes={recipes} />,
  };

  const selectedSection = sectionComponents[sectionTitle] || null;

  return (
    <div className="cards__section">
      <h2 className="cards__section__title">{sectionTitle}</h2>
      <div className="cards">{selectedSection}</div>
      <button
        className="cards__section__button"
        onClick={() => {
          onButtonClick(formModal);
        }}
      >
       {buttonText}
      </button>
    </div>
  );
}

export default CardsSection;
