import React, { useState } from "react";
import "./App.css";
// import Map from "./components/Map/Map.js";
// import Layout from "./containers/Layout/Layout.js";
import MapHooks from "./components/Map/MapHooks";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [lng, setLng] = useState(-104.9876);
  const [lat, setLat] = useState(39.7405);
  const [zoom, setZoom] = useState(12);

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid className={classes.mapContainer} item xs={8}>
          <MapHooks lng={lng} lat={lat} />
        </Grid>
        <Grid item xs={4}>
          <div className={classes.paper}>
            <TextField
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              id="lng"
              label="Szerokość geograficzna"
              name="lng"
              autoFocus
            />
            <TextField
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              id="lat"
              label="Długość geograficzna"
              name="lat"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="zoom"
              label="Zoom"
              name="zoom"
              autoFocus
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
