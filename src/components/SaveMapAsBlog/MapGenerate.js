import { saveAs } from "file-saver";
import "blueimp-canvas-to-blob/js/canvas-to-blob";

const getMapboxCanvas = () => {
  // let image = mapboxRef.getCanvas().toDataURL("image/png");
  let map = mapRef.current.getMap();
  // let blob = map.getCanvas().toDataURL("image/png").toBlob();

  map.getCanvas().toBlob(function (blob) {
    saveAs(blob, "map.png");
  });

  //  FileSaver.saveAs(blob, "hello world.txt");
  // console.log(mapRef.getCanvas().toDataURL("image/png"));
};
