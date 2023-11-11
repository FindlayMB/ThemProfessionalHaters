import React, { useState } from "react";

const Contribute = () => {
  const [location, setLoc] = useState("");
  const [scale, setScale] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const xButton = () => {
    toggleVisible();
    setLoc("");
    setScale("");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // console.log(name, date, file);
    const formData = new FormData();
    formData.append("location", location);
    formData.append("scale", scale);
  };

  return (
    <div className="App">
      <header>
        <div id="app-header">
          <h1>Contribute</h1>
        </div>
        <aside>
          <button id="menu-button" onClick={toggleVisible}>
            Contribute
          </button>
        </aside>
      </header>
    {visible && (
        <div id="ContributeShell">
          <h1>Contribute</h1>
          <p>
            Please enter the location and scale of dirtines in the area. 
          </p>
          <button id="close-button" onClick={xButton}>
            X
          </button>
          <form onSubmit={(e) => onSubmitForm(e)}>
            <input
              id="location "
              required
              type="text"
              value={location}
              
              onChange={(e) => setLoc(e.target.value)}
              placeholder="Location"
            />
            <div id="scale">
              <p>
                <i>Dirtiness Scale:</i>
              </p>
              <input
                className="scale1"
                type="text"
                value={scale}
                required
                onChange={(e) => setScale(e.target.value)}
                placeholder="On a scale of 1-10, how dirty is the area?"
              />
            </div>

            <button id="write-button" type="submit">
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contribute;