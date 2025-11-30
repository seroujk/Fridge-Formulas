import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";
import "./MyMealPlans.css"
function MyMealPlans({onButtonClick,formModal}) {
  const currentUser = useContext(CurrentUserContext);


  return (
    <div className="my-meal-plans">
        <h1 className="my-meal-plans__title">My Meal Plans</h1>
    <div className="my-meal-plans__plans cards">
      {currentUser?.recipes?.length ?
         currentUser.recipes.map((recipe, index) => {
            return (
              <Card
                key={index}
                cardTitle={recipe.recipeTitle}
                cardIcon={recipe.recipeIcon}
                cardPoints={recipe.recipeInstructions}
              />
            );
          })
        : 
        <div className="my-meal-plans__empty_message">
          <h2 className="my-meal-plans__empty_message_text">You have not generated any meals plans yet</h2>
          <button className="my-meal-plans__generate-button"
          onClick={()=>onButtonClick(formModal)}>
            Generate Meal Plans
            </button>
        </div>
        }
    </div>
    </div>
  );
}

export default MyMealPlans;
