import React, { useState, useRef, useEffect } from "react";
import "./Map.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactMapGL from "react-map-gl";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MapControls from "../MapControls.js/MapControls";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

// http://visgl.github.io/react-map-gl/

//http://visgl.github.io/react-map-gl/
const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPSTYLE = "mapbox://styles/emisrw/ckfobfyge018m19rujt5g5k0z";
const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
  },
  paper: {
    padding: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

function Map() {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 39.7405,
    longitude: -104.9876,
    zoom: 12,
  });

  const DRC_MAP = {
    longitude: 23.656,
    latitude: -2.88,
    zoom: 4.3,
  };

  const handleChange = (event, newValue) => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      zoom: newValue,
    }));
  };

  const updateCoordinates = (coordinates) => {
    console.log(coordinates);
    setViewport((oldViewport) => ({
      ...oldViewport,
      ...coordinates,
    }));
  };
  return (
    <React.Fragment>
      <CssBaseline />

      <Grid container spacing={0}>
        <Grid className={classes.mapContainer} item xs={8}>
          <ReactMapGL
            mapboxApiAccessToken={TOKEN}
            mapStyle={MAPSTYLE}
            onLoad={() => setLoaded(true)}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            {...viewport}
          />
        </Grid>
        <Grid item xs={4}>
          <div className={classes.paper}>
            <Box component="span" m={3}>
              //TO DO SEARCH CITY
              <Typography id="zoom-slider" gutterBottom>
                Zoom level
              </Typography>
              <Slider
                defaultValue={12}
                // getAriaValueText={valuetext}
                aria-labelledby="zoom-slider"
                valueLabelDisplay="auto"
                // onChange={(e) => setZoom(e.target.value)}
                onChange={handleChange}
                step={0.5}
                marks
                min={5}
                max={14}
              />
              <MapControls
                update={(coordinates) => updateCoordinates(coordinates)}
              />
            </Box>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Map;
