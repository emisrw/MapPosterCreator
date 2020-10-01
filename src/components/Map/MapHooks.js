import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// https://dev.to/laney/react-mapbox-beginner-tutorial-2e35
const MapHooks = (props) => {
  const mapContainerRef = useRef(null);

  // initialize map when component mounts
  useEffect(() => {
    console.log(props);
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/emisrw/ckfobfyge018m19rujt5g5k0z",
      center: [props.lng, props.lat],
      zoom: 12.5,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapHooks;
