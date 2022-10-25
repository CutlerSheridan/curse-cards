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
  return (
    <div className={`card ${otherClasses} ${isCardSeenClass}`}>
      <div>{props.text}</div>
    </div>
  );
};

export default Card;
