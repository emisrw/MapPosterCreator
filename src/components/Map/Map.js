import React, { Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZW1pc3J3IiwiYSI6ImNrZm83YmpvdTJmb2gyeG52MTB2cnM4OTgifQ.0ZH8kkQWf-2MXp_BGJo7HA";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //@50.0606372,19.9395669,14z
      lng: 21.2680569,
      lat: 50.196359,
      zoom: 13,
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/emisrw/ckfobfyge018m19rujt5g5k0z",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
  }

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}
