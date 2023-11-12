import React, { useRef, useEffect, useState } from 'react';
// import { ReactDOM } from 'react-dom';
// import { ReactDOM } from 'react';
import ReactDOM from "react-dom/client";
import './map.css';

import mapboxgl from 'mapbox-gl'
// import Popup from "./popup";

mapboxgl.accessToken = 'pk.eyJ1IjoiZi1icm93biIsImEiOiJjbG91bzZrNDMwaGZmMmpucnJobTZkZWJpIn0.g-F2iMN4W7Q1GYz21tIeAQ';//'sk.eyJ1IjoiZi1icm93biIsImEiOiJjbG91dGZvamowZWQwMmlsM3R4eG1yMjNpIn0.vCOfKM6p9CLM7vorW3jd2w';
// Create a new map.
// const map = new mapboxgl.Map({
//   container: 'map',
//   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//   style: 'mapbox://styles/f-brown/clouov3f000gj01qdava0736f',
//   center: [-114.064692, 51.023736],
//   zoom: 10.52
// });

// map.on('load', () => {
//   // Add a source for the state polygons.
//   map.addSource('states', {
//   'type': 'geojson',
//   'data': 'https://data.calgary.ca/resource/surr-xmvs.geojson'
// });

// Add a layer showing the state polygons.
// map.addLayer({
//   'id': 'states-layer',
//   'type': 'fill',
//   'source': 'states',
//   'paint': {
//   'fill-color': 'rgba(200, 100, 240, 0.4)',
//   'fill-outline-color': 'rgba(200, 100, 240, 1)'
//   }
// });

// When a click event occurs on a feature in the states layer,
// open a popup at the location of the click, with description
// HTML from the click event's properties.
// map.on('click', 'states-layer', (e) => {
//   new mapboxgl.Popup()
//   .setLngLat(e.lngLat)
//   .setHTML(e.features[0].properties.name)
//   .addTo(map);
// });

// Change the cursor to a pointer when
// the mouse is over the states layer.
// map.on('mouseenter', 'states-layer', () => {
//   map.getCanvas().style.cursor = 'pointer';
// });

// // Change the cursor back to a pointer
// // when it leaves the states layer.
// map.on('mouseleave', 'states-layer', () => {
//   map.getCanvas().style.cursor = '';
//   });
// });

const Popup = ({comm_code, comm_name, sector}) => (
  <div className='popup'>
      <h1>{comm_code}</h1>
      <h2>{comm_name}</h2>
      <h2>{sector}</h2>
  </div>
);




export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-114.0642);
  const [lat, setLat] = useState(51.0235);
  const [zoom, setZoom] = useState(10.13);
  // const popupRef = useRef(new mapboxgl.Popup({offset: 15}));

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/f-brown/clouov3f000gj01qdava0736f',
      center: [lng, lat],
      zoom: zoom
    });
    
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("click", e => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["community"]
      })
      if (!features.length) {
        return;
      }
      const feature = features[0]
      // const popupNode = document.createElement("div")

      // ReactDOM.render(
        // <Popup
        //     comm_code={feature["properties"]}
        //     comm_name={feature["properties"]}
        //     sector={feature["properties"]}
        // />
      // )
      console.log(feature.geometry.coordinates[0])
      const popup = new mapboxgl.Popup({offset: [0, -15]})
        .setLngLat(feature.geometry.coordinates[0][0])
        .setHTML(
          `<div className='popup'><h1>${feature.properties.comm_code}</h1><h2>${feature.properties.name}</h2><h2>${feature.properties.sector}</h2></div>`
        )
        .addTo(map)
      }
    );

    // return () => map.remove()
  }, []);


  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}


