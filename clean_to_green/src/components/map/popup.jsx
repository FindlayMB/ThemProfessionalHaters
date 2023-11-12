// import React, { Children, useContext, useEffect, useRef } from "react";
// import { mapContext } from "../context/mapContext";
// import mapboxgl, { LngLat } from "mapbox-gl";

const Popup = ({comm_code, comm_name, sector}) => {
    return (
    <div className='popup'>
        <h1>{comm_code}</h1>
        <h2>{comm_name}</h2>
        <h2>{sector}</h2>
    </div>
  )};

export default Popup;
