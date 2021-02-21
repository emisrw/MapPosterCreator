import React from "react";
import "./App.css";

import Map from "./components/Map/Map";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import purple from "@material-ui/core/colors/deepOrange";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    type: "dark",

    primary: {
      main: "#FE6B8B",
      color: "#fff",
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Map />
    </ThemeProvider>
  );
}

export default App;
