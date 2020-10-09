import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
  },
}));

function MapControls(props) {
  const classes = useStyles();

  const [lng, setLng] = useState(21.2593022);
  const [lat, setLat] = useState(50.196359);

  return (
    <div>
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        color="primary"
        onClick={() => props.update({ lng, lat })}
        className={classes.submit}
      >
        Aktualizuj
      </Button>
    </div>
  );
}

export default MapControls;
