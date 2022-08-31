import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";

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
    //console.log(newDice);
    return newDice;
  }

  //New state, calls allNewDice as default
  const [dice, setDice] = React.useState(allNewDice());

  const [rolls, setRolls] = React.useState(1);

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

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function roll() {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
    setRolls((prevRoll) => prevRoll + 1);
  }

  return (
    <main className="gameBoard">
      <h1 className="title">Tenzies</h1>
      <h3 className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div className="dice">{diceElements}</div>
      <button onClick={roll}>Roll</button>
      <p className="roll-counter">Rolls: {rolls}</p>
    </main>
  );
}

export default App;
