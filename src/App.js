import CalculateRIV from "./components/CalculateRIV";
import "./App.css";
import Mapp from "./components/Mapp";
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
        <Mapp />
        <TestButton />
        {/* <div id='myMapp'></div>  */}
      </div>
  );
}

export default App;
