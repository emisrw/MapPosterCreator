import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
  },
}));

function MapControls({ update, zoomChange }) {
  const classes = useStyles();

  const [longitude, setLongitude] = useState(21.2593022);
  const [latitude, setLatitude] = useState(50.196359);

  return (
    <div>
      <Typography id="zoom-slider" gutterBottom>
        Zoom level
      </Typography>
      <Slider
        defaultValue={12}
        // getAriaValueText={valuetext}
        aria-labelledby="zoom-slider"
        valueLabelDisplay="auto"
        // onChange={(e) => setZoom(e.target.value)}

        onChange={(event, value) => zoomChange(value)}
        step={0.5}
        marks
        min={5}
        max={14}
      />
      <TextField
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        id="lng"
        label="Szerokość geograficzna"
        name="lng"
        autoFocus
      />
      <TextField
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
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
        onClick={() => update({ longitude, latitude })}
        className={classes.submit}
      >
        Aktualizuj
      </Button>
    </div>
  );
}

export default MapControls;
