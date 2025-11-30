import Card from "../Card/Card";
import {dietCards} from "../../utils/constants"
function DietCard() {
  return dietCards.map((card,index) => {
    return (
      <Card
        key={index}
        cardTitle={card.cardTitle}
        cardIcon={card.cardIcon}
        cardPoints={card.cardPoints}
      />
    );
  });
}

export default DietCard;
