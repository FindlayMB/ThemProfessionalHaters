import React, { useRef, useEffect, useState } from 'react';
// import { ReactDOM } from 'react-dom';
// import { ReactDOM } from 'react';
import ReactDOM from "react-dom/client";
import './map.css';

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
//'pk.eyJ1IjoiZi1icm93biIsImEiOiJjbG91bzZrNDMwaGZmMmpucnJobTZkZWJpIn0.g-F2iMN4W7Q1GYz21tIeAQ';
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

    map.on("click", "community", (e) => {
      const feature = e.features[0]
      console.log(e.features[0].properties.comm_code)

      const coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      // map.setPaintProperty('community','fill-color',"blue","color":["match",["get","comm_code"], [e.features[0].properties.comm_code], "green", "blue"])
      // feature.getCenter().geometry.coordinates
      const popup = new mapboxgl.Popup({offset: [0, 0]})
        .setLngLat(e.lngLat)
        .setHTML(
          `<div className='popup'><h1>${feature.properties.comm_code}</h1><h2>${feature.properties.name}</h2><h2>${feature.properties.sector}</h2></div>`
        )
        .addTo(map)
      }
      
    );
    map.on('mouseenter', 'community', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
       
      // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'community', () => {
      map.getCanvas().style.cursor = '';
    });
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


