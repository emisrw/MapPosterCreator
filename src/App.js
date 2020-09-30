import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map/Map.js";
import MapHooks from "./components/Map/MapHooks";
function App() {
  return (
    <div className="App">
      <MapHooks />
    </div>
  );
}

export default App;
