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
import Select from "@material-ui/core/Select";

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
  },
}));

function MapControls({ update, zoomChange }) {
  const classes = useStyles();

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Insert lat & lng</Typography>
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
              onClick={() => update({ longitude, latitude })}
              className={classes.submit}
            >
              Aktualizuj
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Poster size
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default MapControls;
