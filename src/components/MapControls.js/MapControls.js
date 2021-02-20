import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/Select";
import { useStyles } from "./MapControls.style";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import { postersSizes } from "../../constants/Sizes";
import { styles } from "../../constants/Styles";
import { Slider } from "../Slider/Slider";

function MapControls({ setLabels, setMapStyle, updateFrameWidth }) {
  const classes = useStyles();

  // const [longitude, setLongitude] = useState(21.2593022);
  // const [latitude, setLatitude] = useState(50.196359);
  const [size, setSize] = useState("A0");
  const [title, setTitle] = useState("Kraków");
  const [subtitle, setSubtitle] = useState("Twoje nowe miejsce");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [currentStyleActive, setCurrentStyleActive] = useState("style1");
  // Set first array size on init
  useEffect(() => {
    updateFrameWidth(postersSizes[0]);
  }, []);

  // Update labels on change
  useEffect(() => {
    setLabels({ title, subtitle, bg: "#fff" });
  }, [title, subtitle]);

  const handleClickSettings = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleSubtitleChange = (event) => {
    setSubtitle(event.target.value);
  };
  const handleStyleChange = (item) => {
    console.log(item);
    if (currentStyleActive != item.id) {
      setMapStyle(item.url);
      setCurrentStyleActive(item.id);
    }
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    let result = postersSizes.filter((size) => {
      return size.label === event.target.value;
    });
    updateFrameWidth(...result);
  };
  return (
    <>
      <Popper
        className={classes.popper}
        open={open}
        anchorEl={anchorEl}
        placement="left"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>
                The content of the Popper. The content of the Popper. The
                content of the Popper. The content of the Popper.The content of
                the Popper.The content of the Popper.
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

      <div className={classes.slider}>
        <Slider
          styles={styles}
          tag="section"
          wrapperTag="ul"
          currentStyleActive={currentStyleActive}
          handleStyleChange={handleStyleChange}
        />
      </div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Kraków"
          value={title}
          onChange={handleTitleChange}
          inputProps={{ "aria-label": "search google maps" }}
        />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={handleClickSettings("left")}
        >
          <SettingsIcon />
        </IconButton>
      </Paper>

      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          value={subtitle}
          onChange={handleSubtitleChange}
          inputProps={{ "aria-label": "search google maps" }}
        />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={handleClickSettings("left")}
        >
          <SettingsIcon />
        </IconButton>
      </Paper>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Poster size
        </InputLabel>
        <NativeSelect
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleSizeChange}
          value={size}
          defaultValue={"A0"}
          label="Poster size"
        >
          {postersSizes.map((ctrl) => (
            <MenuItem value={ctrl.label} key={ctrl.label}>
              {ctrl.label} - {ctrl.width}mm x {ctrl.height} mm
            </MenuItem>
          ))}
        </NativeSelect>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Generate map
      </Button>
    </>
  );
}

export default MapControls;
