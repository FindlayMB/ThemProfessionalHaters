import react from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import About from "./components/about/about";
import Events from "./components/events/events";
import Map from "./components/map/map";
import Register from "./components/register/register";
import Donate from "./components/donate/donate";
import Contribute from "./components/contribute/contribute";
import ErrorPage from "./components/errorPage/errorPage";
import Login from "./components/login/login";
const App = () => {
  return (
    <>
        <Navbar />
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* </div> */}

    </>
  );
};
export default App;
