import React, { useRef, useEffect, useState } from 'react';
// import { ReactDOM } from 'react-dom';
// import { ReactDOM } from 'react';
import ReactDOM from "react-dom/client";
import './map.css';

import mapboxgl from 'mapbox-gl'
// import Popup from "./popup";

mapboxgl.accessToken = 'pk.eyJ1IjoiZi1icm93biIsImEiOiJjbG91bzZrNDMwaGZmMmpucnJobTZkZWJpIn0.g-F2iMN4W7Q1GYz21tIeAQ';
//'sk.eyJ1IjoiZi1icm93biIsImEiOiJjbG91dGZvamowZWQwMmlsM3R4eG1yMjNpIn0.vCOfKM6p9CLM7vorW3jd2w';

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
      
      const popup = new mapboxgl.Popup({offset: [-50, 15]})
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


