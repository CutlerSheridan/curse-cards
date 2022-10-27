import '../styles/Card.css';

const Card = (props) => {
  const { currentPlayer, cardIndex, otherClasses } = props;
  // const bigCardClass = props.isBig ? 'bigCard' : '';
  const isCardSeenClass = (() => {
    switch (true) {
      case cardIndex < currentPlayer:
        console.log();
        return 'card-seen';
      case cardIndex === currentPlayer:
        return 'card-current';
      default:
        return 'card-unseen';
    }
  })();
  const wordsArray = props.text.split(' ');
  const longestWord = wordsArray.reduce((x, y) => {
    if (x.length > y.length) {
      return x;
    }
    return y;
  }, '');
  return (
    <div
      className={`card ${otherClasses} ${isCardSeenClass} ${
        longestWord.length > 12 ? 'bigCard-smallerText' : ''
      }`}
    >
      <div>{otherClasses ? props.text : ''}</div>
    </div>
  );
};

export default Card;
