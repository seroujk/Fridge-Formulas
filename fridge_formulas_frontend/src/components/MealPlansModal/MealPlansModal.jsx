import "./MealPlansModal.css";
import Card from "../Card/Card";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function MealPlansModal({
  isOpen,
  recipes,
  onClose,
  buttonText1,
  buttonText2,
  formTitle,
  isLoggedIn,
  isValidUser,
  setIsValidUser,
  onButtonClick,
  onNotLoggedIn,
  formModal,
  setPendingRecipes,
}) {
  if (recipes) {
    return (
      <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        buttonText1={buttonText1}
        buttonText2={buttonText2}
        formTitle={formTitle}
        isValidUser={isValidUser}
        setIsValidUser={setIsValidUser}
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
        <button
          className="modal__submit-button modal__plan-save-button"
          onClick={() => {
            if (isLoggedIn) {
              onButtonClick(recipes);
            }
            else{
              setPendingRecipes(recipes);
              onNotLoggedIn(formModal);

            }
          }}
        >
          Save to "My Meals"
        </button>
      </ModalWithForm>
    );
  }
}
export default MealPlansModal;
