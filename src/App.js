import CalculateRIV from "./components/CalculateRIV";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        minWidth: 1210,
      }}
    >
      <header className="App-header">
        <img
          style={{ width: 210, height: 220 }}
          src="/vaylariski.png"
          className="App-logo"
          alt="logo"
        />
        <h6>versio 0.4.1</h6>
      </header>
      <CalculateRIV />
    </div>
  );
}

export default App;
