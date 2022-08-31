import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  //Generates dice objects with value 1-6 inclusive, isHeld boolean, and key
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const Die = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
      newDice.push(Die);
    }
    return newDice;
  }

  //States for dice, number of rolls, if the game is won, and the lowerest score
  const [dice, setDice] = React.useState(allNewDice());
  const [rolls, setRolls] = React.useState(1);
  const [tenzies, setTenzies] = React.useState(false);
  const [highScore, setHighscore] = React.useState(0);

  //Maps over dice object array to geneate array of Die elements
  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      id={die.id}
      hold={() => hold(die.id)}
    />
  ));

  //Maps over dice and sets isHeld value if clicked
  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  //If game is won, reset back to the beginning
  //Rolls new dice for non-held dice
  //Increments the rolls by 1
  function roll() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0);
    }
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
    setRolls((prevRoll) => prevRoll + 1);
  }

  //Checks if all the dice are held and the same number
  //If so, sets tenzies to true and updates highscore
  React.useEffect(() => {
    if (dice.every((die) => die.isHeld)) {
      if (dice.every((die) => die.value === dice[0].value)) {
        setTenzies(true);
        if (rolls < highScore || highScore === 0) {
          setHighscore(rolls);
        }
      }
    }
  }, [dice]);

  return (
    <div>
      {/* If game won, brings down confetti */}
      {tenzies ? <Confetti /> : ""} /
      <h1 className="highscore">
        Highscore: {highScore > 0 ? highScore : " "}
      </h1>
      <main className="gameBoard">
        <h1 className="title">Tenzies</h1>
        <h3 className="description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </h3>
        <div className="dice">{diceElements}</div>
        {/* Changes the button based on tenzies */}
        {tenzies ? (
          <button onClick={roll}>New Game</button>
        ) : (
          <button onClick={roll}>Roll</button>
        )}

        <p className="roll-counter">Rolls: {rolls}</p>
      </main>
    </div>
  );
}

export default App;
