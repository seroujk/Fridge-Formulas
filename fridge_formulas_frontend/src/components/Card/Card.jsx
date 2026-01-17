import "./Card.css";
import { useLocation } from "react-router-dom";
function Card({ cardTitle, cardPoints, cardIcon, onDelete }) {
  const location = useLocation();

  return (
    <div className="card">
      <div className="card__title">
        <h4 className="card__title_icon">{cardIcon}</h4>
        <h4 className="card__title_text">{cardTitle}</h4>
      </div>
      <div className="card__info">
        <ul className="card__points">
          {cardPoints.map((point, index) => {
            return <li key={index}>{point}</li>;
          })}
        </ul>
      </div>
      {location.pathname === "/my-meal-plans" ? (
        <button className="card__delete-btn" onClick={onDelete}>
          Delete
        </button>
      ) : null}
    </div>
  );
}

export default Card;
