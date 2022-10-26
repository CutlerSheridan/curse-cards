import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import BigCard from './components/BigCard';

const App = () => {
  const phrases = ['in my opinion', 'creative differences', 'blood moon'];
  const [deck, setDeck] = useState(phrases);
  const [numOfPlayers, setNumOfPlayers] = useState(5);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentHand, setCurrentHand] = useState(() => {
    const hand = [];
    for (let i = 0; i < numOfPlayers; i++) {
      hand.push('');
    }
    return hand;
  });
  const [isNextTurnButtonAvail, setIsNextTurnButtonAvail] = useState(() => {
    if (currentHand[0] === '') {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (deck.length === 0) {
      const deckCopy = [];
      phrases.forEach((phrase) => deckCopy.push(phrase));
      setDeck(deckCopy);
    }
  }, [deck]);
  useEffect(() => {
    const nextTurnButton = document.querySelector('.gameControl-nextTurn');
    if (isNextTurnButtonAvail) {
      nextTurnButton.classList.remove('gameControl-disabled');
    } else {
      nextTurnButton.classList.add('gameControl-disabled');
    }
  }, [isNextTurnButtonAvail]);

  const startNewRound = () => {
    const bigCardElement = document.querySelector('.bigCard');
    if (bigCardElement.classList.contains('card-flipOver')) {
      replaceCard();
      const cardElements = Array.from(
        document.querySelectorAll('.card:not(.bigCard)')
      );
      const smallCardElement = cardElements[currentPlayer];
      smallCardElement.addEventListener(
        'animationend',
        () => {
          startNewRound();
        },
        { once: true }
      );
    } else {
      let hand = [deck[0]];
      for (let i = 1; i < numOfPlayers; i++) {
        hand.push('safe');
      }
      hand = shuffleArray(hand);
      const prevHand = [...currentHand];
      while (
        prevHand.findIndex((x) => x !== 'safe') ===
          hand.findIndex((x) => x !== 'safe') &&
        prevHand[0] !== ''
      ) {
        hand = shuffleArray(hand);
      }
      setCurrentHand(hand);
      setDeck((deck) => deck.slice(1));
      setCurrentPlayer(0);
      setIsNextTurnButtonAvail(false);
    }
  };
  const advanceToNextPlayer = () => {
    setIsNextTurnButtonAvail(false);
    setCurrentPlayer((prev) => {
      if (prev + 1 <= numOfPlayers) {
        return prev + 1;
      }
      return 0;
    });
  };
  const shuffleArray = (arr) => {
    const arrCopy = [...arr];
    const shuffledArray = [];
    while (arrCopy.length >= 1) {
      const randomIndex = Math.floor(Math.random() * arrCopy.length);
      shuffledArray.push(...arrCopy.splice(randomIndex, 1));
    }
    return shuffledArray;
  };
  const drawCard = () => {
    document
      .querySelector('.gameControl-draw')
      .classList.add('gameControl-disabled');
    const cardElements = Array.from(
      document.querySelectorAll('.card:not(.bigCard)')
    );
    const smallCardElement = cardElements[currentPlayer];
    const bigCardElement = document.querySelector('.bigCard');
    smallCardElement.classList.add('card-fadeOut');
    smallCardElement.addEventListener(
      'animationend',
      () => {
        bigCardElement.classList.remove('bigCard-hidden');
        bigCardElement.classList.add('card-fadeIn');
        bigCardElement.addEventListener(
          'animationend',
          () => {
            bigCardElement.classList.add('card-flipOver');
            document
              .querySelector('.gameControl-replace')
              .classList.remove('gameControl-disabled');
          },
          { once: true }
        );
      },
      { once: true }
    );
  };
  const replaceCard = () => {
    document
      .querySelector('.gameControl-replace')
      .classList.add('gameControl-disabled');
    const cardElements = Array.from(
      document.querySelectorAll('.card:not(.bigCard)')
    );
    const smallCardElement = cardElements[currentPlayer];
    const bigCardElement = document.querySelector('.bigCard');
    bigCardElement.classList.remove('card-flipOver');
    bigCardElement.classList.add('card-flipBack');
    bigCardElement.addEventListener(
      'animationend',
      () => {
        bigCardElement.classList.remove('card-flipBack', 'card-fadeIn');
        bigCardElement.classList.add('card-fadeOut');
        bigCardElement.addEventListener(
          'animationend',
          () => {
            bigCardElement.classList.remove('card-fadeOut');
            bigCardElement.classList.add('bigCard-hidden');
            smallCardElement.classList.remove('card-fadeOut');
            smallCardElement.classList.add('card-fadeIn');
            smallCardElement.addEventListener(
              'animationend',
              () => {
                smallCardElement.classList.remove('card-fadeIn');
                document
                  .querySelector('.gameControl-draw')
                  .classList.remove('gameControl-disabled');
                setIsNextTurnButtonAvail(true);
              },
              { once: true }
            );
          },
          { once: true }
        );
      },
      { once: true }
    );
  };
  const bigCardText =
    currentPlayer < numOfPlayers
      ? currentHand[currentPlayer]
      : currentHand.find((x) => x !== 'safe');

  return (
    <div className="App">
      <h1>Curse Cards</h1>
      <div>CURRENT PLAYER</div>
      <div>{currentPlayer}</div>
      <button className="gameControl gameControl-draw" onClick={drawCard}>
        Draw
      </button>
      <button
        className="gameControl gameControl-replace gameControl-disabled"
        onClick={replaceCard}
      >
        Put back
      </button>
      <BigCard text={bigCardText}></BigCard>
      <div className="hand-container">
        {currentHand.map((x, index) => (
          <Card
            text={x}
            currentPlayer={currentPlayer}
            cardIndex={index}
            key={`card-${index}`}
          ></Card>
        ))}
      </div>
      <button onClick={startNewRound}>New Round</button>
      <button
        className="gameControl gameControl-nextTurn"
        onClick={advanceToNextPlayer}
      >
        Next player
      </button>
      <div>CURRENT HAND:</div>
      {currentHand.map((x) => (
        <div>{x}</div>
      ))}
      <br></br>
      <div>CURRENT DECK:</div>
      {deck.map((x) => {
        return <div>{x}</div>;
      })}
    </div>
  );
};

export default App;
