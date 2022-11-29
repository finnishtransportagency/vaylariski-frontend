import CalculateRIV from "./components/CalculateRIV";
import "./App.css";
import TestButton from "./components/TestButton";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src="/vayla_logo.png" className="App-logo" alt="logo" />
          <h1>RIV</h1>
        </header>
        <CalculateRIV/>
        <TestButton />
      </div>
  );
}

export default App;
