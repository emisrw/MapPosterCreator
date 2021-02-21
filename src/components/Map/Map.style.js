import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mapFrame: {
    position: "relative",
    background: "#ccc",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // padding: theme.spacing(8, 4),
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
