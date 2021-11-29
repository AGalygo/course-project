import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import "./app.css"

const cardImages = [
  {"src": "/images/1.jpg", matched: false},
  {"src": "/images/2.jpg", matched: false},
  {"src": "/images/3.jpg", matched: false},
  {"src": "/images/4.jpg", matched: false},
  {"src": "/images/5.jpg", matched: false},
  {"src": "/images/6.jpg", matched: false}
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=> Math.random()- 0.5)
    .map((card) => ({...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);

  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compate 2 selected cards
  useEffect(()=> {
     if(choiceOne && choiceTwo) {
      setDisabled(true);
        if(choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === choiceTwo.src) {
                return {...card, matched: true};
              }
              else {
                return card;
              }
            })
          })
          resetTurn();
        }
        else {
          setTimeout(() => resetTurn(), 1000);
        }
     }
  }, [choiceOne, choiceTwo]) //также условие, когда 1 и 2 выбраны

  console.log(cards);

  //reset choices & increase turn
  const resetTurn = (card) => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns => turns + 1);
    setDisabled(false);
  }

  // start new game automatically

  useEffect(() => {
    shuffleCards()
  }, []); //[]- условие выполнения useeffect

  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
          {cards.map(card => (
            <CardItem key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo  || card.matched }
            disabled ={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
