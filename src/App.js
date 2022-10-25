import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

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

  useEffect(() => {
    if (deck.length === 0) {
      const deckCopy = [];
      phrases.forEach((phrase) => deckCopy.push(phrase));
      setDeck(deckCopy);
    }
  }, [deck]);

  const drawHand = () => {
    let hand = [deck[0]];
    for (let i = 1; i < numOfPlayers; i++) {
      hand.push('safe');
    }
    hand = shuffleArray(hand);
    setCurrentHand(hand);
    setDeck((deck) => deck.slice(1));
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

  return (
    <div className="App">
      <h1>Curse Cards</h1>
      <div className="hand-container">
        {currentHand.map((x) => (
          <Card text={x}></Card>
        ))}
      </div>
      <button onClick={drawHand}>New Round</button>
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
