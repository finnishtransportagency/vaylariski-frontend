import CalculateRIV from "./components/CalculateRIV";
import "./App.css";
import { Header } from "components/Header";

function App() {
  return (
    <div
      className="App"
      style={{
        minWidth: 1210,
      }}
    >
      <Header />
      <CalculateRIV />
    </div>
  );
}

export default App;
