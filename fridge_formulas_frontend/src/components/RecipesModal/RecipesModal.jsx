import "./RecipesModal.css";
import Card from "../Card/Card";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function RecipesModal({
  isOpen,
  recipes,
  onClose,
  buttonText1,
  buttonText2,
  formTitle,
}) {
  if (recipes) {
    return (
      <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        buttonText1={buttonText1}
        buttonText2={buttonText2}
        formTitle={formTitle}
      >
        <div className="modal__meal-plans">
          {recipes.map((recipe, index) => {
            return (
              <Card
                key={index}
                cardTitle={recipe.recipeTitle}
                cardIcon={recipe.recipeIcon}
                cardPoints={recipe.recipeInstructions}
              />
            );
          })}
        </div>
        <button className="modal__submit-button modal__recipe-save-button">Save to "My Meals"</button>
      </ModalWithForm>
    );
  }
}
export default RecipesModal;
