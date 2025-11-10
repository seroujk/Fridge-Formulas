import "./WhyBuildThis.css";
function WhyBuildthis() {
  return (
    <div className="section">
      <h1 className="section__title">Why I built This</h1>
      <h2 className="section__subtitle">
        Me entire life has been a struggle to eat clean and stay in shape having
        an autoimmune disease that restricts some diets was not fun either. So I
        decided to make this app for the following reasons:
      </h2>
      <ul className="section__points">
        <li>
          <h4 className="section__points_text_header">
            🥦 1. To Make Eating Clean Simple Again
          </h4>
          <p className="section__points_text_sub">I wanted a way to take the stress out of planning meals — no more calorie counting, no more guesswork. Just balanced, tasty recipes built around what you already have in your fridge.
          Image Idea: A clean kitchen counter with a fridge open, colorful fresh ingredients inside, and a tablet showing a meal plan.</p>
        </li>
        <li>
          <h4 className="section__points_text_header">
          🧠 2. To Personalize Nutrition Around Real Life
          </h4>
          <p className="section__points_text_sub">Everyone’s body is different — especially when you’re managing dietary restrictions or autoimmune conditions. This app adapts to you, not the other way around.
          Image Idea: A person smiling at their phone or laptop, with icons floating around representing different diet types (gluten-free, dairy-free, low-FODMAP, etc.).</p>
        </li>
        <li>
          <h4 className="section__points_text_header">
          💪 3. To Build Health as a Lifestyle, Not a Phase
          </h4>
          <p className="section__points_text_sub">The goal isn’t just eating better for a week — it’s learning how to fuel your body consistently, without burnout or guilt.
          Image Idea: A person meal-prepping or lifting light weights with neatly portioned meals beside them, symbolizing balance and consistency.</p>
        </li>
          <div className="section__contact">
            <form className="section__contact-form">
              <label htmlFor="suggestions">
                Have some ideas on how to make this app better?
              </label>
              <input className="section__suggestion-box"  type="text" placeholder="Please share them here" />
              <button className="section__suggestion-button" type="submit">Submit Suggestion</button>
            </form>
          </div>
      </ul>
    </div>
  );
}

export default WhyBuildthis;
