import React from "react";
import { useStyles } from "./Label.style";
// https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container
export function Label({ labels }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>{labels.title}</h1>
      <h2>{labels.subtitle}</h2>
    </div>
  );
}
