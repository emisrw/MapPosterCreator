import React, { useState, useRef, useCallback } from "react";
// import "./Map.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MapControls from "../MapControls.js/MapControls";
import { Label } from "../Label/Label";
import { useStyles } from "./Map.style";

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPSTYLE = "mapbox://styles/emisrw/ckfobfyge018m19rujt5g5k0z";

function Map() {
  const classes = useStyles();

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 39.7405,
    longitude: -104.9876,
    padding: 20,
    zoom: 12,
  });
  const [frameWidth, setframeWidth] = useState("100%");
  const [mapStyle, setMapStyle] = useState(MAPSTYLE);
  const [labels, setLabels] = useState({
    title: "Kraków",
    subtitle: "my fucking city",
    bg: "#fff",
  });

  const geocoderContainerRef = useRef();
  const mapRef = useRef();

  // const handleZoomChange = (zoomLevel) => {
  //   setViewport((oldViewport) => ({
  //     ...oldViewport,
  //     zoom: zoomLevel,
  //   }));
  // };

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

  const updateCoordinates = (coordinates) => {
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
          <div
            id="mapWrapper"
            className={classes.mapFrame}
            style={{ width: frameWidth }}
          >
            <ReactMapGL
              ref={mapRef}
              preserveDrawingBuffer={true}
              mapboxApiAccessToken={TOKEN}
              mapStyle={mapStyle}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              {...viewport}
            >
              <div style={{ position: "fixed", left: 30 }}>
                <NavigationControl />
              </div>
              <Geocoder
                mapRef={mapRef}
                containerRef={geocoderContainerRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={TOKEN}
                marker={false}
                placeholder={"Wpisz swoje miasto"}
              />
              <Label labels={labels} />
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
              // zoomChange={(zoomLevel) => handleZoomChange(zoomLevel)}
              updateCoordinates={(coordinates) =>
                updateCoordinates(coordinates)
              }
              setLabels={setLabels}
              setMapStyle={setMapStyle}
              updateFrameWidth={(posterSizes) => updateFrameWidth(posterSizes)}
            />
            {/* <button onClick={getMapboxCanvas}>Save map</button> */}
          </div>
        </Grid>
      </Grid>
      <div className="hidden"></div>
    </>
  );
}

export default Map;
