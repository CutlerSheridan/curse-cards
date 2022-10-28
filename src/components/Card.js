import '../styles/Card.css';

const Card = (props) => {
  const { currentPlayer, cardIndex, bigClasses, handleClick } = props;
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
  const cardText = (() => {
    if (bigClasses) {
      return (
        <>
          <div className="bigCard-phrase">{props.text}</div>
          <div className="bigCard-instructions">(tap when finished)</div>
        </>
      );
    }
    return <></>;
  })();

  return (
    <div
      className={`card ${bigClasses} ${isCardSeenClass}`}
      onClick={handleClick}
    >
      {cardText}
    </div>
  );
};

export default Card;
