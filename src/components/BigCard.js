import '../styles/Card.css';
import Card from './Card';

const BigCard = (props) => {
  const wordsArray = props.text.split(' ');
  const longestWord = wordsArray.reduce((x, y) => {
    if (x.length > y.length) {
      return x;
    }
    return y;
  }, '');

  return (
    <Card
      text={props.text}
      bigClasses={`bigCard bigCard-hidden ${
        longestWord.length > 10 ? 'bigCard-smallerText' : ''
      }`}
      handleClick={props.handleClick}
    ></Card>
  );
};

export default BigCard;
