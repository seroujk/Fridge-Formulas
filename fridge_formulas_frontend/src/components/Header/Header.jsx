import "./Header.css";
import fridgeIcon from "../../assets/fridge-icon.svg";

function Header() {
  return (
    <div className="header">
      <div className="header__brand">
        <img className="header__icon" src={fridgeIcon} alt="fridge icon" />
        <p>Fridge Formulas</p>
      </div>
      <nav className="header__navbar">
        <ul className="header__navabar_items">
          <li>
            <a href="#">Try for Free</a>
          </li>
          <li>
            <a href="#">How it Works</a>
          </li>
          <li>
            <a href="#">Dietary Templates</a>
          </li>
        </ul>
      </nav>
      <div className="header__buttons">
        <button className="header__login__button">Log In</button>
        <button className="header__signup__button">Sign Up</button>
      </div>
    </div>
  );
}

export default Header;
