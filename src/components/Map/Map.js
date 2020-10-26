import React, { useState, useRef, useCallback } from "react";
import "./Map.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MapControls from "../MapControls.js/MapControls";
// import {saveAs} from 'file-saver'
import { saveAs } from "file-saver";
import "blueimp-canvas-to-blob/js/canvas-to-blob";
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
  cityInput: {
    "& .mapboxgl-ctrl-geocoder": {
      width: "100%",
    },
  },
}));

function Map() {
  const classes = useStyles();
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 39.7405,
    longitude: -104.9876,
    zoom: 12,
  });

  const geocoderContainerRef = useRef();
  const mapRef = useRef();

  const handleZoomChange = (zoomLevel) => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      zoom: zoomLevel,
    }));
  };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const getMapboxCanvas = () => {
    // let image = mapboxRef.getCanvas().toDataURL("image/png");
    let map = mapRef.current.getMap();
    // let blob = map.getCanvas().toDataURL("image/png").toBlob();

    map.getCanvas().toBlob(function (blob) {
      saveAs(blob, "map.png");
    });

    //  FileSaver.saveAs(blob, "hello world.txt");
    // console.log(mapRef.getCanvas().toDataURL("image/png"));
  };
  const updateCoordinates = (coordinates) => {
    console.log(coordinates);
    setViewport((oldViewport) => ({
      ...oldViewport,
      ...coordinates,
    }));
  };
  return (
    <>
      <CssBaseline />

      <Grid container spacing={0}>
        <Grid className={classes.mapContainer} item xs={8}>
          <ReactMapGL
            ref={mapRef}
            preserveDrawingBuffer={true}
            mapboxApiAccessToken={TOKEN}
            mapStyle={MAPSTYLE}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            {...viewport}
          >
            <Geocoder
              mapRef={mapRef}
              containerRef={geocoderContainerRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={TOKEN}
              marker={false}
              placeholder={"Wpisz swoje miasto"}
            />
          </ReactMapGL>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.paper}>
            <Box
              className={classes.cityInput}
              ref={geocoderContainerRef}
              component="div"
              mb={3}
            ></Box>
            <button onClick={getMapboxCanvas}>Save map</button>
            <MapControls
              zoomChange={(zoomLevel) => handleZoomChange(zoomLevel)}
              update={(coordinates) => updateCoordinates(coordinates)}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Map;
