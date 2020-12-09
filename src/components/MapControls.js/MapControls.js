import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    marginBottom: "15px",
  },
}));

function MapControls({ updateCoordinates, zoomChange, updateFrameWidth }) {
  const classes = useStyles();

  const [longitude, setLongitude] = useState(21.2593022);
  const [latitude, setLatitude] = useState(50.196359);
  const [size, setSize] = useState("A0");

  const controls = [
    { label: "A0", width: 840, height: 1180 },
    { label: "A1", width: 594, height: 841 },
    { label: "A2", width: 420, height: 594 },
    { label: "A3", width: 297, height: 420 },
  ];
  const handleChange = (event) => {
    setSize(event.target.value);
    let result = controls.filter((size) => {
      return size.label === event.target.value;
    });
    updateFrameWidth(...result);
  };
  return (
    <>
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

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Poster size
        </InputLabel>
        <NativeSelect
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          value={size}
          defaultValue={"A0"}
          label="Poster size"
        >
          {controls.map((ctrl) => (
            <MenuItem value={ctrl.label} key={ctrl.label}>
              {ctrl.label} - {ctrl.width}mm x {ctrl.height} mm
            </MenuItem>
          ))}
        </NativeSelect>
      </FormControl>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Custom lat & lng</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.form}>
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
              onClick={() => updateCoordinates({ longitude, latitude })}
              className={classes.submit}
            >
              Aktualizuj
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default MapControls;
