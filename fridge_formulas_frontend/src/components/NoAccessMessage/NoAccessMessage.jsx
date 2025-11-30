import "./NoAccessMessage.css";
import FoodImage from "../../assets/hero_section_image.png";
function NoAccessMessage({ loginModal, signUpModal, onButtonClick }) {
  return (
    <div className="no-access-message">
      <h2 className="no-access-message__text">
        You need to be logged in to check your saved meal plans
      </h2>
      <img
      className="no-access-message__image"
      src={FoodImage} alt="image of food" />
      <div className="no-access-message__buttons">
        <button 
        className="no-access-message__button"
        onClick={() => onButtonClick(loginModal)}>Login</button>
        <button 
        className="no-access-message__button"
        onClick={() => onButtonClick(signUpModal)}>Signup</button>
      </div>
    </div>
  );
}

export default NoAccessMessage;
