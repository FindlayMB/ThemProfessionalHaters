import react from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/about/about";
import Events from "./components/events/events";
import Map from "./components/map/map";
import Register from "./components/register/register";
import Donate from "./components/donate/donate";
import Contribute from "./components/contribute/contribute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/about" component={About} />
          <Route path="/events" component={Events} />
          <Route path="/map" component={Map} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
