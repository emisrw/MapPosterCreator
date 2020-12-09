import React, { useState, useRef, useCallback } from "react";
import "./Map.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MapControls from "../MapControls.js/MapControls";
import { saveAs } from "file-saver";
import "blueimp-canvas-to-blob/js/canvas-to-blob";
import { makeStyles } from "@material-ui/core/styles";

//import PosterGenerator from "../PosterGenerator/PosterGenerator";
// http://visgl.github.io/react-map-gl/

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPSTYLE = "mapbox://styles/emisrw/ckfobfyge018m19rujt5g5k0z";
const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mapFrame: {
    position: "relative",
    border: "1px solid #000",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    width: "100%",
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
  const [frameWidth, setframeWidth] = useState("100%");
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
  const updateFrameWidth = (result) => {
    // check if is horizontal or vertical
    // calculate radio

    // get container width
    const mapWrapper = document.getElementById("mapWrapper");
    const width = mapWrapper.clientWidth;
    const height = mapWrapper.clientHeight;
    let ratio = result.width / result.height;

    setViewport((oldViewport) => ({
      ...oldViewport,
      width: height * ratio,
      height: height,
    }));
  };

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
    setViewport((oldViewport) => ({
      ...oldViewport,
      ...coordinates,
    }));
  };

  const saveMapToFile = () => {};

  return (
    <>
      <CssBaseline />

      <Grid container spacing={0}>
        <Grid className={classes.mapContainer} item xs={8}>
          <div
            id="mapWrapper"
            className={classes.mapFrame}
            style={{ width: frameWidth }}
          >
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
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.paper}>
            <Box
              className={classes.cityInput}
              ref={geocoderContainerRef}
              component="div"
              mb={3}
            ></Box>

            <MapControls
              zoomChange={(zoomLevel) => handleZoomChange(zoomLevel)}
              updateCoordinates={(coordinates) =>
                updateCoordinates(coordinates)
              }
              updateFrameWidth={(posterSizes) => updateFrameWidth(posterSizes)}
            />
            <button onClick={getMapboxCanvas}>Save map</button>
          </div>
        </Grid>
      </Grid>
      <div className="hidden"></div>
    </>
  );
}

export default Map;
