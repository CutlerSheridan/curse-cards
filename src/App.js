import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import BigCard from './components/BigCard';
import NamesForm from './components/NamesForm';

const App = () => {
  const phrases = [
    "Frankenstein's monster",
    'in my opinion',
    'creative differences',
    'blood moon',
  ];
  const useLocalStorage = (prop, defaultValue) => {
    if (localStorage.getItem('storedStates')) {
      const storedStates = JSON.parse(localStorage.getItem('storedStates'));
      return storedStates[prop];
    }
    return defaultValue;
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
  const [deck, setDeck] = useState(
    useLocalStorage('deck', shuffleArray(phrases))
  );

  const [numOfPlayers, setNumOfPlayers] = useState(
    useLocalStorage('numOfPlayers', 5)
  );
  const [currentPlayer, setCurrentPlayer] = useState(
    useLocalStorage('currentPlayer', 0)
  );
  const [playerNames, setPlayerNames] = useState(
    useLocalStorage('playerNames', () => {
      const names = [];
      for (let i = 0; i < numOfPlayers; i++) {
        names.push(`Player ${i + 1}`);
      }
      return names;
    })
  );
  const [currentHand, setCurrentHand] = useState(
    useLocalStorage('currentHand', () => {
      const hand = [];
      for (let i = 0; i < numOfPlayers; i++) {
        hand.push('');
      }
      return hand;
    })
  );
  const [startingNewRound, setStartingNewRound] = useState(false);
  const [isBigCardShowing, setIsBigCardShowing] = useState(false);

  useEffect(() => {
    if (deck.length === 0) {
      const deckCopy = [];
      const shuffledPhrases = shuffleArray(phrases);
      shuffledPhrases.forEach((phrase) => deckCopy.push(phrase));
      setDeck(deckCopy);
    }
  }, [deck]);
  useEffect(() => {
    const namesCopy = [...playerNames];
    while (namesCopy.length > numOfPlayers) {
      namesCopy.pop();
    }
    while (namesCopy.length < numOfPlayers) {
      namesCopy.push(`Player ${namesCopy.length + 1}`);
    }
    setPlayerNames(namesCopy);
  }, [numOfPlayers]);
  useEffect(() => {
    if (startingNewRound) {
      startNewRound();
    }
  }, [startingNewRound]);
  useEffect(() => {
    localStorage.setItem(
      'storedStates',
      JSON.stringify({
        deck,
        numOfPlayers,
        currentPlayer,
        playerNames,
        currentHand,
      })
    );
  }, [deck, numOfPlayers, currentPlayer, playerNames, currentHand]);

  const startNewRound = () => {
    const bigCardElement = document.querySelector('.bigCard');
    if (bigCardElement.classList.contains('card-flipOver')) {
      replaceCard();
    } else {
      const hand = shuffleHand();
      setCurrentHand(hand);
      setDeck((deck) => deck.slice(1));
      setCurrentPlayer(0);
      setStartingNewRound(false);
    }
  };
  const shuffleHand = () => {
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
    return hand;
  };
  const advanceToNextPlayer = () => {
    setCurrentPlayer((prev) => {
      if (prev + 1 <= numOfPlayers) {
        return prev + 1;
      }
      return 0;
    });
  };

  const drawCard = () => {
    document
      .querySelector('.gameControl-draw')
      .classList.add('gameControl-disabled');
    let smallCardElement;
    const cardElements = Array.from(
      document.querySelectorAll('.card:not(.bigCard)')
    );
    if (currentPlayer < numOfPlayers) {
      smallCardElement = cardElements[currentPlayer];
    } else {
      smallCardElement =
        cardElements[currentHand.findIndex((x) => x !== 'safe')];
    }
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
            setIsBigCardShowing(true);
          },
          { once: true }
        );
      },
      { once: true }
    );
  };
  const replaceCard = () => {
    const bigCardElement = document.querySelector('.bigCard');
    bigCardElement.classList.remove('card-flipOver');
    bigCardElement.classList.add('card-flipBack');
    bigCardElement.addEventListener('animationend', flipBigCardBack);
  };
  const flipBigCardBack = (e) => {
    const bigCardElement = e.target;
    if (e.animationName === 'flip-back') {
      bigCardElement.removeEventListener('animationend', flipBigCardBack);
      bigCardElement.classList.remove('card-flipBack', 'card-fadeIn');
      bigCardElement.classList.add('card-fadeOut');
      bigCardElement.addEventListener('animationend', fadeBigCardOut);
    }
  };
  const fadeBigCardOut = (e) => {
    const bigCardElement = e.target;
    if (e.animationName === 'fade-out') {
      bigCardElement.removeEventListener('animationend', fadeBigCardOut);
      let smallCardElement;
      const cardElements = Array.from(
        document.querySelectorAll('.card:not(.bigCard)')
      );
      if (currentPlayer < numOfPlayers) {
        smallCardElement = cardElements[currentPlayer];
      } else {
        smallCardElement =
          cardElements[currentHand.findIndex((x) => x !== 'safe')];
      }
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
          setIsBigCardShowing(false);
          if (currentPlayer < numOfPlayers) {
            if (!startingNewRound) {
              advanceToNextPlayer();
            } else {
              startNewRound();
            }
          }
        },
        { once: true }
      );
    }
  };
  const resetRound = () => {
    setCurrentPlayer(0);
    const hand = shuffleHand();
    setCurrentHand(hand);
  };

  const bigCardText =
    currentPlayer < numOfPlayers
      ? currentHand[currentPlayer]
      : currentHand.find((x) => x !== 'safe');
  const nameText =
    currentPlayer < playerNames.length
      ? `${playerNames[currentPlayer]}'s turn`
      : 'Final stage';

  return (
    <div className="content-container">
      <h1>Curse Cards</h1>
      <div className="info-grid">
        <div className="playerCount-container">
          <div>Players:</div>
          <div className="alterCount-container">
            <div
              className="gameControl alterCount-button"
              onClick={() => {
                setNumOfPlayers((prev) => prev - 1);
              }}
            >
              {'<'}
            </div>
            <div className="alterCount-count">{numOfPlayers}</div>
            <div
              className="gameControl alterCount-button"
              onClick={() => {
                setNumOfPlayers((prev) => prev + 1);
              }}
            >
              {'>'}
            </div>
          </div>
        </div>
        <div className="currentPlayer">{nameText}</div>
        <button className="gameControl infoControl-names">Player names</button>
      </div>

      <NamesForm playerNames={playerNames}></NamesForm>

      <div className="gameCenter-container">
        <button
          className={`gameControl gameControl-draw ${
            currentHand[0] === '' ? 'gameControl-disabled' : ''
          }`}
          onClick={drawCard}
        >
          {currentPlayer < numOfPlayers ? 'Draw' : 'Reveal'}
        </button>
        <BigCard handleClick={replaceCard} text={bigCardText}></BigCard>
      </div>
      <div className="hand-container">
        {currentHand.map((x, index) => (
          <Card
            text={x}
            currentPlayer={currentPlayer}
            cardIndex={index}
            handleClick={drawCard}
            key={`card-${index}`}
          ></Card>
        ))}
      </div>
      <div className="controls-container">
        <button
          className={`gameControl gameControl-small ${
            isBigCardShowing ? 'gameControl-disabled' : ''
          }`}
          onClick={resetRound}
        >
          Reset Round
        </button>
        <button
          className="gameControl"
          onClick={() => setStartingNewRound(true)}
        >
          New Round
        </button>
        <button className="gameControl gameControl-small">Show rules</button>
        {/* <button
          className="gameControl gameControl-small"
          onClick={() =>
            console.log(JSON.parse(localStorage.getItem('storedStates')))
          }
        >
          Log storage
        </button>
        <button
          className="gameControl gameControl-small"
          onClick={() => localStorage.clear()}
        >
          Clear localStorage
        </button>
        <button
          className="gameControl gameControl-small"
          onClick={() => {
            console.log(deck);
            console.log('num of players' + numOfPlayers);
            console.log(currentHand);
            console.log(playerNames);
          }}
        >
          log states
        </button> */}
      </div>
    </div>
  );
};

export default App;
