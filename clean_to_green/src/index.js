import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleOAuthProvider } from 'react-oauth-flow';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
