import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./MyMealPlans.css";
import { getMeals } from "../../utils/api";

function MyMealPlans({ onButtonClick, formModal,onDelete }) {
  const [meals, setMeals] = useState([]);      
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    getMeals(token)
      .then((data) => {
        // backend returns an array
        setMeals(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Get meals error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  
  return (
    <div className="my-meal-plans">
      <h1 className="my-meal-plans__title">My Meal Plans</h1>

      <div className="my-meal-plans__plans cards">
        {isLoading ? (
          <div className="my-meal-plans__empty_message">
            <h2 className="my-meal-plans__empty_message_text">Loading...</h2>
          </div>
        ) : meals.length ? (
          meals.map((meal) => (
            <Card
              key={meal._id} // using mongoID
              cardTitle={meal.mealTitle}
              cardIcon={meal.mealIcon}
              cardPoints={meal.mealInstructions}
              onDelete={()=>onDelete(meal._id)}
            />
          ))
        ) : (
          <div className="my-meal-plans__empty_message">
            <h2 className="my-meal-plans__empty_message_text">
              You have not generated any meal plans yet
            </h2>
            <button
              className="my-meal-plans__generate-button"
              onClick={() => onButtonClick(formModal)}
            >
              Generate Meal Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyMealPlans;