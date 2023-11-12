import React, { useState } from "react";

const Contribute = () => {
  const [location, setLoc] = useState("");
  const [scale, setScale] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const xButton = () => {
    toggleVisible();
    setLoc("");
    setScale("");
  };

  window.onload = async() => {
    getData();
  };

  const getData = async () => {
    const promise = await fetch(
      `API URL`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const temp = await promise.json();
      const temp2 = temp["data"];
      setData(temp2);
    }
    catch {
        console.log("Failed");
        setData([]);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    let tempDict = {"Location_code": location,"Garbage_val": scale}

    const writeButton = document.getElementById("write-button");
    writeButton.disabled = true;

    const promise = await fetch(
      "https://wseslxtj6g5tsqfc5q76gefd4u0oyelt.lambda-url.ca-central-1.on.aws/",
      { method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...tempDict, }),
    });

    try {
      const returnInfo = await promise.json();
      const temp = [
        ...data,
        {
          name: returnInfo["data"]["location"],
          born: returnInfo["data"]["scale"],
        },
      ];

      setData(temp);
    } catch {
      console.log("Failed");
    }
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
          <p>
            Please enter the location and scale of dirtiness in the area. 
          </p>
          <button id="close-button" onClick={xButton}>
            X
          </button>
          <form onSubmit={(e) => onSubmitForm(e)}>
          <label htmlFor="location">Location:</label>
            <select
              id="location"
              required
              value={location}
              onChange={(e) => setLoc(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="BYV">Location 1</option>
              <option value="Location2">Location 2</option>
              
            </select>

            <label htmlFor="scale">Dirtiness Scale:</label>
            <select
              id="scale"
              className="scale1"
              required
              value={scale}
              onChange={(e) => setScale(e.target.value)}
            >
              <option value="">Select Scale</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

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