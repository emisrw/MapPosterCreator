import React, { useState, useRef, useEffect } from "react";
import "./Map.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import mapboxgl from "mapbox-gl";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Map() {
  const mapContainerRef = useRef(null);
  const classes = useStyles();

  const [zoom, setZoom] = useState(12);
  const [lng, setLng] = useState(-104.9876);
  const [lat, setLat] = useState(39.7405);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/emisrw/ckfobfyge018m19rujt5g5k0z",
      center: [lng, lat],
      zoom: zoom,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // clean up on unmount
    return () => map.remove();
  }, [zoom]);

  const handleChange = (event, newValue) => {
    setZoom(newValue);
  };
  const handleSubmit = (event, newValue) => {
    setZoom(newValue);
  };
  return (
    <React.Fragment>
      <CssBaseline />

      <Grid container spacing={0}>
        <Grid className={classes.mapContainer} item xs={8}>
          <div className="map-container" ref={mapContainerRef} />
        </Grid>
        <Grid item xs={4}>
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                value={lng}
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
                variant="outlined"
                margin="normal"
                fullWidth
                id="lat"
                label="Długość geograficzna"
                name="lat"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.submit}
              >
                Aktualizuj
              </Button>
            </form>
            <Box component="span" m={3}>
              <Typography id="zoom-slider" gutterBottom>
                Zoom level
              </Typography>
              <Slider
                defaultValue={10}
                // getAriaValueText={valuetext}
                aria-labelledby="zoom-slider"
                valueLabelDisplay="auto"
                // onChange={(e) => setZoom(e.target.value)}
                onChange={handleChange}
                step={0.5}
                marks
                min={1}
                max={12}
              />
            </Box>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Map;
