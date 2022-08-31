import Die from "./components/Die";

function App() {
  return (
    <main className="gameBoard">
      <h1 className="title">Tenzies</h1>
      <h3 className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <container className="dice">
        <Die value={1} />
        <Die value={2} />
        <Die value={3} />
        <Die value={4} />
        <Die value={5} />
        <Die value={6} />
        <Die value={5} />
        <Die value={4} />
        <Die value={3} />
        <Die value={2} />
      </container>
      <button>Roll</button>
    </main>
  );
}

export default App;
