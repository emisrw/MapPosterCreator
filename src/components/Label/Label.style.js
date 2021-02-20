import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    left: "0",
    width: "100%",
    bottom: 0,
    textAlign: "center",
    zIndex: 4,
    padding: "30px 15px",
    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7567401960784313) 80%, rgba(255,255,255,0) 100%)",
  },
}));
