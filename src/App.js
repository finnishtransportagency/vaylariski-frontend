import CalculateRIV from "./components/CalculateRIV";
import "./App.css";
import TestButton from "./components/TestButton";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img style={{ width: 210, height: 220}}
              src="/vaylariski.png"
              className="App-logo"
              alt="logo" />
          {/* <h2>RIV</h2> */}
        </header>
        <CalculateRIV/>
        <TestButton />
      </div>
  );
}

export default App;
