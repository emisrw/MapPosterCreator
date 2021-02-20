import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  slider: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    marginBottom: "15px",
  },
  popper: {
    width: 300,
    zIndex: 2,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));
