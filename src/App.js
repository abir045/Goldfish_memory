import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "../img/shield-1.png", matched: false },
  { src: "../img/sword-1.png", matched: false },
  { src: "../img/goldfish-1.jpg", matched: false },
  { src: "../img/goldfish-2.jpg", matched: false },
  { src: "../img/goldfish-3.jpg", matched: false },
  { src: "../img/goldfish-4.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);

  const [turns, setTurns] = useState(0);

  // saving users card choices in two different states
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    //double the cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  // if chiceOne has value then choose the second othewise if no value set choice two
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      //setting disabled true after we made two choices
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // caaling the resetTurn after 1sec delay
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  //reset choices & increase turn

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="flex flex-col md:mx-[30%]">
      <h1 className="font-bold text-white text-center text-2xl mt-[10%]">
        Memory of a gold fish
      </h1>
      <button
        className=" p-2 font-bold mt-5 bg-red-400 text-white rounded-lg mx-[30%]"
        onClick={shuffleCards}
      >
        New game
      </button>
      <div className="grid grid-cols-4 gap-x-0  mt-[5%]">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="flex text-xl text-white mt-[5%] justify-center">
        Turns: {turns}
      </p>
    </div>
  );
}

export default App;
