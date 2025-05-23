import { StrictMode } from "react";
import  { createRoot } from "react-dom/client";

import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";

import "leaflet/dist/leaflet.css";
import "./index.css";
import "./styles/generalStyles.css";
import "./styles/tooltip.css";
import "./styles/tab.css";
import "./styles/mapView.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossOrigin="anonymous"
    />
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
