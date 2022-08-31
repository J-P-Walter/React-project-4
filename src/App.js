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
        key: nanoid(),
      };
      newDice.push(Die);
    }
    console.log(newDice);
    return newDice;
  }

  //New state, calls allNewDice as default
  const [dice, setDice] = React.useState(allNewDice());

  //Maps over dice object array to geneate array of Die elements
  const diceElements = dice.map((die) => (
    <Die value={die.value} isHeld={die.isHeld} key={die.key} />
  ));

  function roll() {
    setDice(allNewDice());
  }

  function hold() {
    return;
  }

  return (
    <main className="gameBoard">
      <h1 className="title">Tenzies</h1>
      <h3 className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div className="dice" onClick={hold}>
        {diceElements}
      </div>
      <button onClick={roll}>Roll</button>
    </main>
  );
}

export default App;
