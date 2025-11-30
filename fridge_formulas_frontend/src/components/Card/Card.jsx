import "./Card.css";

function Card({ cardTitle, cardPoints, cardIcon }) {
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
    </div>
  );
}

export default Card;
