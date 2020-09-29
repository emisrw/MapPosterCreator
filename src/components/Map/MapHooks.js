import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};
// mapboxgl.accessToken =
//   "pk.eyJ1IjoiZW1pc3J3IiwiYSI6ImNrZm83YmpvdTJmb2gyeG52MTB2cnM4OTgifQ.0ZH8kkQWf-2MXp_BGJo7HA";

const Map = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZW1pc3J3IiwiYSI6ImNrZm83YmpvdTJmb2gyeG52MTB2cnM4OTgifQ.0ZH8kkQWf-2MXp_BGJo7HA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [0, 0],
        zoom: 5,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};
export default Map;
