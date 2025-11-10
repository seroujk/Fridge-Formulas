import Card from "../Card/Card";
function RecipeSection({recipes}) {
  if (recipes) {
    return recipes.map((recipe, index) => {
      return (
        <Card
          key={index}
          cardTitle={recipe.recipeTitle}
          cardIcon={recipe.recipeIcon}
          cardPoints={recipe.recipeInstructions}
        />
      );
    });
  }
}

export default RecipeSection;
