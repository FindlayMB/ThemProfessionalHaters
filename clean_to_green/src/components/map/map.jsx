import React from 'react';
import './map.css';

const map = () => {
  return (
    <div id="map-flex">
        <iframe id="map" allow="geolocation" src="https://data.calgary.ca/dataset/Community-Boundaries/ab7m-fwn6/embed?width=800&height=600"></iframe>
    </div>
  )
}

export default map
