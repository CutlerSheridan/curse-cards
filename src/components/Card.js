import '../styles/Card.css';

const Card = (props) => {
  const { currentPlayer, cardIndex, bigClasses, handleClick } = props;
  // const bigCardClass = props.isBig ? 'bigCard' : '';
  const isCardSeenClass = (() => {
    if (props.text !== '') {
      switch (true) {
        case cardIndex < currentPlayer:
          console.log();
          return 'card-seen';
        case cardIndex === currentPlayer:
          return 'card-current';
        default:
          return '';
      }
    }
    return '';
  })();
  const cardText = (() => {
    if (bigClasses) {
      return (
        <>
          <div className="bigCard-phrase">{props.text}</div>
          <div className="bigCard-instructions-container">
            <div className="bigCard-instructions">Tap when</div>
            <div className="bigCard-instructions">finished</div>
          </div>
        </>
      );
    }
    return <></>;
  })();

  return (
    <div
      className={`card ${bigClasses} ${isCardSeenClass}`}
      onClick={
        props.text !== '' && (cardIndex === currentPlayer || bigClasses)
          ? handleClick
          : () => {}
      }
    >
      {cardText}
    </div>
  );
};

export default Card;
