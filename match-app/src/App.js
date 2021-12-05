import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import "./app.css"
import NameForm from "./NameForm";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link, 
  useHistory,
} from "react-router-dom";
import Results from './Results';

const cardImages = [
  {"src": "/images/1.jpg", matched: false},
  {"src": "/images/2.jpg", matched: false},
  {"src": "/images/3.jpg", matched: false},
  {"src": "/images/4.jpg", matched: false},
  {"src": "/images/5.jpg", matched: false},
  {"src": "/images/6.jpg", matched: false}
]


function App() {

  const [games, setGame] = React.useState([
    {id:1, player: "Alena", score: "25"},
    {id:2, player: "Alex", score: "19"}
]);

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [ended, setEnded] = useState(true);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const form = !ended && cards.filter(card => card.matched === false).length === 0;

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

  const handleStatistics = () => {
    localStorage.setItem('results', JSON.stringify(games));

    history.push('/results');
  };

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

  useEffect(() => {
    if (form) {
      console.log(form)
      console.log(userName);
       setGame([...games, {
          player: userName, 
          id: Date.now(),
          score: turns
       }])
      setEnded(true);
      console.log(games);
      //setUserName("")
      console.log('completed');
    }
    else {
      console.log(games);
      console.log('no');
    } 

  }, [form, games, userName, turns, setEnded]);

  //reset choices & increase turn
  const resetTurn = (card) => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns => turns + 1);
    setDisabled(false);
  }

  function addName(title) {
    setUserName(title);
    setEnded(false);
    shuffleCards();
  }


  return (
    <>
      <div className="App">
      <h1>Magic Match</h1>

    </div>
    <Switch>
      <Route exact path="/">
      <div className="App">
        <NameForm onCreate={addName} name = {userName} showForm = {ended || form} ></NameForm>     
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
        <button onClick={handleStatistics}>Statistics</button>
        </div>
      </Route>
      <Route path="/results">
        <Results />
      </Route>
    </Switch>
   </>   
  );
}

export default App;
