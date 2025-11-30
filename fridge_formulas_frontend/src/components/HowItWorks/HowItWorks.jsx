import Card from "../Card/Card";
import {howItWorks} from "../../utils/constants";
function HowItWorks() {
  return howItWorks.map((card,index) => {
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

export default HowItWorks;
