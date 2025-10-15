import brocIcon from "../../assets/brocolli.png";
import "./Card.css";

function Card({ cardTitle, cardIcon }) {
  return (
    <div className="card">
      <div className="card__title">
        <img className="card__title_icon" src={brocIcon} alt="card Icon" />
        <h4 className="card__title_text">{cardTitle}</h4>
      </div>
      <ul className="card__info">
        <li className="card__point">Point 1</li>
        <li className="card__point">Point 2</li>
        <li className="card__point">Point 3</li>
        <li className="card__point">Point 4</li>
      </ul>
      <button className="card__button">Select</button>
    </div>
  );
}

export default Card;
