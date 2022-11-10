import CalculateRIV from "./components/CalculateRIV";
import "./App.css";
import Mapp from "./components/Mapp"

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src="/vayla_logo.png" className="App-logo" alt="logo" />
          <h1>RIV</h1>
        </header>
        <CalculateRIV/>
        <Mapp />
        <div id='myMapp'></div>
      </div>
  );
}

export default App;
