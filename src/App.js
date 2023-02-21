import CalculateRIV from "./components/CalculateRIV";
import "./App.css";
import TestButton from "./components/TestButton";
import { useEffect } from "react";
import apiClient from 'http-common';

function App() {


  return (
      <div className="App" style={{
        minWidth: 1210,
      }}>
        <header className="App-header">
          <img style={{ width: 210, height: 220}}
              src="/vaylariski.png"
              className="App-logo"
              alt="logo" />
          <h6>versio 0.1.0</h6>
        </header>
        <CalculateRIV/>
        {/* <TestButton /> */}
      </div>
  );
}

export default App;
