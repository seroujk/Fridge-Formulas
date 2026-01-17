import "./MealPlansModal.css";
import Card from "../Card/Card";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function MealPlansModal({
  isOpen,
  meals,
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
}) {
  if (meals) {
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
          {meals.map((meal, index) => {
            return (
              <Card
                key={index}
                cardTitle={meal.mealTitle}
                cardIcon={meal.mealIcon}
                cardPoints={meal.mealInstructions}
              />
            );
          })}
        </div>
        <button
          className="modal__submit-button modal__plan-save-button"
          onClick={() => {
            if (isLoggedIn) {
              onButtonClick();
            } else {
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
