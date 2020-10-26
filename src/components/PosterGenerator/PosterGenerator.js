import React from "react";
import { saveAs } from "file-saver";
import "blueimp-canvas-to-blob/js/canvas-to-blob";
import ReactMapGL from "react-map-gl";

// komponent bedzie przyjmowal szerokosc i wysokosc w mm
const PosterGenerator = ({ width, height }) => {
  function toPixels(length) {
    "use strict";

    // w przyszlosci mozna dodac in
    //var unit = form.unitOptions[0].checked ? "in" : "mm";
    var unit = "mm";

    var conversionFactor = 96;
    if (unit == "mm") {
      conversionFactor /= 25.4;
    }

    return conversionFactor * length + "px";
  }

  const createFakeMapContainer = () => {
    // Create map container
    var hidden = document.createElement("div");
    hidden.className = "hidden-map";
    document.body.appendChild(hidden);
    var container = document.createElement("div");
    container.style.width = toPixels(width);
    container.style.height = toPixels(height);
    hidden.appendChild(container);
  };

  const saveToFile = () => {
    // let image = mapboxRef.getCanvas().toDataURL("image/png");
    // let map = mapRef.current.getMap();
    // // let blob = map.getCanvas().toDataURL("image/png").toBlob();
    // map.getCanvas().toBlob(function (blob) {
    //   saveAs(blob, "map.png");
    // });
    //  FileSaver.saveAs(blob, "hello world.txt");
    // console.log(mapRef.getCanvas().toDataURL("image/png"));
  };

  return <div></div>;
};

export default PosterGenerator;
