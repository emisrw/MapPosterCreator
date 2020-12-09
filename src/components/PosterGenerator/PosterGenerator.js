import React from "react";
import { saveAs } from "file-saver";
import "blueimp-canvas-to-blob/js/canvas-to-blob";
import ReactMapGL from "react-map-gl";
const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPSTYLE = "mapbox://styles/emisrw/ckfobfyge018m19rujt5g5k0z";

// komponent bedzie przyjmowal szerokosc i wysokosc w mm
const PosterGenerator = () => {
  const mapRef = useRef();

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

  // 1. Trzeba wygenerowac nowa mape - czy musze ja pokazywac ?

  const saveToFile = () => {
    let map = mapRef.current.getMap();
    let blob = map.getCanvas().toDataURL("image/png").toBlob();
    // map.getCanvas().toBlob(function (blob) {
    //   saveAs(blob, "map.png");
    // });
    //  FileSaver.saveAs(blob, "hello world.txt");
    // console.log(mapRef.getCanvas().toDataURL("image/png"));
  };

  return (
    <div>
      <ReactMapGL
        ref={mapRef}
        preserveDrawingBuffer={true}
        mapboxApiAccessToken={TOKEN}
        mapStyle={MAPSTYLE}
        {...props}
      ></ReactMapGL>
    </div>
  );
};

export default PosterGenerator;
