import '../styles/Card.css';
import Card from './Card';

const BigCard = (props) => {
  return <Card text={props.text} otherClasses="bigCard bigCard-hidden"></Card>;
};

export default BigCard;
