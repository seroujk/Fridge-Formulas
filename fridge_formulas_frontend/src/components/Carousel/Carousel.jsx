import "./Carousel.css";

function Carousel() {
  return (
    <div className="carousel">
      <div className="carousel__track">
        <span>Meal Plans</span>
        <span>AI Recipes</span>
        <span>Smart Cooking</span>
        <span>Fridge Optimization</span>
        <span>Save Money</span>
        <span>Eat Better</span>

        {/* duplicate the same list for seamless looping */}
        <span>Meal Plans</span>
        <span>AI Recipes</span>
        <span>Smart Cooking</span>
        <span>Fridge Optimization</span>
        <span>Save Money</span>
        <span>Eat Better</span>
      </div>
    </div>
  );
}

export default Carousel;
