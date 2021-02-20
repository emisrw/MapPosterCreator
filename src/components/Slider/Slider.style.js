import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    margin: 0,
    padding: 0,
    "& .swiper-wrapper": {
      padding: 0,
    },
    "& .swiper-button-prev, .swiper-button-next": {},
    "& .swiper-button-prev:after, .swiper-button-next:after": {
      fontSize: "12px",
    },
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },
  nav: {
    position: "absolute",
    width: "120%",
    left: "-10%",
    display: "flex",
    justifyContent: "space-between",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
