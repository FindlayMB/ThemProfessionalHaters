import React from 'react';
import { useState } from 'react';
import './map.css';


const [data, setData] = useState([]);

const getData = async () => {
  const res = await fetch (
    `put get api here`,
    {
      method: "GET",
    }
  );

  if(res.status === 200){
    // change this to match aws db
    const backendData = await res.json()
    setData(backendData["data"])
    console.log(backendData["data"])
  }
}



const map = () => {
  return (
    <div id="map-flex">
        <iframe id="map" allow="geolocation" src="https://data.calgary.ca/dataset/Community-Boundaries/ab7m-fwn6/embed?width=800&height=600"></iframe>
        {/* add drop down menu of location data; do this if mapbox doesnt work */}
    </div>
  )
}

export default map
