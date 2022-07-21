// src/App.js

import InputUser from "./components/InputUser";
import GetRIV from "./components/GetRIV";
import "./App.css";

//import PostInput from "./components/PostInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <h1>RIV</h1>
      </header>
      <InputUser />
      <GetRIV />
    </div>
  );
}

export default App;
