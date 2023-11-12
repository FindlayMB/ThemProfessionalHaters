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
      "https://wseslxtj6g5tsqfc5q76gefd4u0oyelt.lambda-url.ca-central-1.on.aws/",
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
              <option value="LEB">LEWISBURG</option>
              <option value="TAR">TARADALE</option>
              <option value="CHV">COUNTRY HILLS VILLAGE</option>
              <option value="ERL">ERLTON</option>
              <option value="COA">COACH HILL</option>
              <option value="DIA">DIAMOND COVE</option>
              <option value="THO">THORNCLIFFE</option>
              <option value="FHT">FOREST HEIGHTS</option>
              <option value="HAY">HAYSBORO</option>
              <option value="CSC">CITYSCAPE</option>
              <option value="BLM">BELMONT</option>
              <option value="DOV">DOVER</option>
              <option value="MRT">MARTINDALE</option>
              <option value="WAL">WALDEN</option>
              <option value="ALP">ALPINE PARK</option>
              <option value="VAR">VARSITY</option>
              <option value="COL">COLLINGWOOD</option>
              <option value="QLD">QUEENSLAND</option>
              <option value="WOO">WOODLANDS</option>
              <option value="OAK">OAKRIDGE</option>
              <option value="SOW">SOUTHWOOD</option>
              <option value="RDL">ROSEDALE</option>
              <option value="APP">APPLEWOOD PARK</option>
              <option value="RID">RIDEAU PARK</option>
              <option value="ARB">ARBOUR LAKE</option>
              <option value="BVD">BELVEDERE</option>
              <option value="THS">TWINHILLS</option>
              <option value="CPF">COPPERFIELD</option>
              <option value="SIG">SIGNAL HILL</option>
              <option value="CAM">CAMBRIAN HEIGHTS</option>
              <option value="BRT">BRITANNIA</option>
              <option value="WBN">WOODBINE</option>
              <option value="HID">HIDDEN VALLEY</option>
              <option value="RUN">RUNDLE</option>
              <option value="ERI">ERIN WOODS</option>
              <option value="PIN">PINERIDGE</option>
              <option value="HIW">HIGHWOOD</option>
              <option value="MAL">MAYLAND HEIGHTS</option>
              <option value="MAC">MACEWAN GLEN</option>
              <option value="DRG">DEER RIDGE</option>
              <option value="MOP">MOUNT PLEASANT</option>
              <option value="SSW">SCARBORO/ SUNALTA WEST</option>
              <option value="COP">CANADA OLYMPIC PARK</option>
              <option value="SOV">SOUTHVIEW</option>
              <option value="EDG">EDGEMONT</option>
              <option value="RED">RED CARPET</option>
              <option value="CUR">CURRIE BARRACKS</option>
              <option value="SSD">SUNNYSIDE</option>
              <option value="CAP">CAPITOL HILL</option>
              <option value="UMR">UPPER MOUNT ROYAL</option>
              <option value="SAD">SADDLE RIDGE</option>
              <option value="BED">BEDDINGTON HEIGHTS</option>
              <option value="PAT">PATTERSON</option>
              <option value="SOC">SOUTH CALGARY</option>
              <option value="COR">CORAL SPRINGS</option>
              <option value="EAU">EAU CLAIRE</option>
              <option value="MCK">MCKENZIE LAKE</option>
              <option value="MIS">MISSION</option>
              <option value="GBK">GLENBROOK</option>
              <option value="TUX">TUXEDO PARK</option>
              <option value="EVN">EVANSTON</option>
              <option value="DNE">DOWNTOWN EAST VILLAGE</option>
              <option value="LPK">LINCOLN PARK</option>
              <option value="STR">STRATHCONA PARK</option>
              <option value="CHR">CHRISTIE PARK</option>
              <option value="SHG">SHAGANAPPI</option>
              <option value="NHU">NORTH HAVEN UPPER</option>
              <option value="ING">INGLEWOOD</option>
              <option value="SOM">SOMERSET</option>
              <option value="SAN">SANDSTONE VALLEY</option>
              <option value="HOU">HOUNSFIELD HEIGHTS/BRIAR HILL</option>
              <option value="SDC">SUNDANCE</option>
              <option value="ASP">ASPEN WOODS</option>
              <option value="UOC">UNIVERSITY OF CALGARY</option>
              <option value="WHL">WEST HILLHURST</option>
              <option value="RCK">ROSSCARROCK</option>
              <option value="KIL">KILLARNEY/GLENGARRY</option>
              <option value="CAN">CANYON MEADOWS</option>
              <option value="FAI">FAIRVIEW</option>
              <option value="BEL">BEL-AIRE</option>
              <option value="MOR">MONTEREY PARK</option>
              <option value="DIS">DISCOVERY RIDGE</option>
              <option value="HPK">HIGHLAND PARK</option>
              <option value="CGR">COUGAR RIDGE</option>
              <option value="HUN">HUNTINGTON HILLS</option>
              <option value="NPK">NOSE HILL PARK</option>
              <option value="ROC">ROCKY RIDGE</option>
              <option value="TUS">TUSCANY</option>
              <option value="GRV">GREENVIEW</option>
              <option value="SGH">SAGE HILL</option>
              <option value="DNC">DOWNTOWN COMMERCIAL CORE</option>
              <option value="MID">MIDNAPORE</option>
              <option value="STA">ST. ANDREWS HEIGHTS</option>
              <option value="EPK">ELBOW PARK</option>
              <option value="DRN">DEER RUN</option>
              <option value="BYV">BAYVIEW</option>
              <option value="WLD">WILDWOOD</option>
              <option value="MLR">MILLRISE</option>
              <option value="HKS">HOTCHKISS</option>
              <option value="HSN">HASKAYNE</option>
              <option value="HSD">HOMESTEAD</option>
              <option value="SET">SETON</option>
              <option value="CRA">CRANSTON</option>
              <option value="REN">RENFREW</option>
              <option value="CHA">CHAPARRAL</option>
              <option value="ACA">ACADIA</option>
              <option value="COU">COUNTRY HILLS</option>
              <option value="BDO">BONAVISTA DOWNS</option>
              <option value="WGT">WESTGATE</option>
              <option value="NEB">NEW BRIGHTON</option>
              <option value="LEG">LEGACY</option>
              <option value="CAR">CARRINGTON</option>
              <option value="ABT">AMBLETON</option>
              <option value="SVR">SYMONS VALLEY RANCH</option>
              <option value="GLR">GLACIER RIDGE</option>
              <option value="KSH">KEYSTONE HILLS</option>
              <option value="RSN">REDSTONE</option>
              <option value="WSP">WEST SPRINGS</option>
              <option value="PUM">PUMP HILL</option>
              <option value="GDL">GLENDALE</option>
              <option value="MCT">MCKENZIE TOWNE</option>
              <option value="CRE">CRESCENT HEIGHTS</option>
              <option value="LKB">LAKE BONAVISTA</option>
              <option value="DDG">DOUGLASDALE/GLEN</option>
              <option value="VAL">VALLEY RIDGE</option>
              <option value="UND">UNIVERSITY DISTRICT</option>
              <option value="GAW">GARRISON WOODS</option>
              <option value="SCE">SCENIC ACRES</option>
              <option value="HAW">HAWKWOOD</option>
              <option value="SIL">SILVER SPRINGS</option>
              <option value="SKR">SKYVIEW RANCH</option>
              <option value="CNS">CORNERSTONE</option>
              <option value="FPK">FISH CREEK PARK</option>
              <option value="PCK">PINE CREEK</option>
              <option value="MAH">MAHOGANY</option>
              <option value="RVW">RANGEVIEW</option>
              <option value="RAN">RANCHLANDS</option>
              <option value="LIV">LIVINGSTON</option>
              <option value="HAM">HAMPTONS</option>
              <option value="CIT">CITADEL</option>
              <option value="ROX">ROXBORO</option>
              <option value="SHN">SHAWNESSY</option>
              <option value="RIC">RICHMOND</option>
              <option value="UNI">UNIVERSITY HEIGHTS</option>
              <option value="FAL">FALCONRIDGE</option>
              <option value="CHK">CHINOOK PARK</option>
              <option value="WWO">WOLF WILLOW</option>
              <option value="YKV">YORKVILLE</option>
              <option value="FLN">FOREST LAWN</option>
              <option value="WIL">WILLOW PARK</option>
              <option value="WIN">WINSTON HEIGHTS/MOUNTVIEW</option>
              <option value="ABB">ABBEYDALE</option>
              <option value="MON">MONTGOMERY</option>
              <option value="HAR">HARVEST HILLS</option>
              <option value="OGD">OGDEN</option>
              <option value="PEN">PENBROOKE MEADOWS</option>
              <option value="SHS">SHAWNEE SLOPES</option>
              <option value="BNF">BANFF TRAIL</option>
              <option value="SPH">SPRINGBANK HILL</option>
              <option value="PKH">PARKHILL</option>
              <option value="NHV">NORTH HAVEN</option>
              <option value="BRD">BRIDGELAND/RIVERSIDE</option>
              <option value="LKV">LAKEVIEW</option>
              <option value="VIS">VISTA HEIGHTS</option>
              <option value="GLA">GLAMORGAN</option>
              <option value="EYA">ELBOYA</option>
              <option value="CLI">CLIFF BUNGALOW</option>
              <option value="RIV">RIVERBEND</option>
              <option value="CHN">CHINATOWN</option>
              <option value="TEM">TEMPLE</option>
              <option value="BRA">BRAESIDE</option>
              <option value="WND">WINDSOR PARK</option>
              <option value="BOW">BOWNESS</option>
              <option value="WHI">WHITEHORN</option>
              <option value="PAN">PANORAMA HILLS</option>
              <option value="PKD">PARKDALE</option>
              <option value="RMT">ROSEMONT</option>
              <option value="MPL">MAPLE RIDGE</option>
              <option value="SHW">SHERWOOD</option>
              <option value="BRE">BRENTWOOD</option>
              <option value="SCA">SCARBORO</option>
              <option value="BRI">BRIDLEWOOD</option>
              <option value="POI">POINT MCKAY</option>
              <option value="RUT">RUTLAND PARK</option>
              <option value="RAM">RAMSAY</option>
              <option value="MRL">MARLBOROUGH</option>
              <option value="MAN">MANCHESTER</option>
              <option value="GAG">GARRISON GREEN</option>
              <option value="MPK">MARLBOROUGH PARK</option>
              <option value="SPR">SPRUCE CLIFF</option>
              <option value="PKL">PARKLAND</option>
              <option value="CAS">CASTLERIDGE</option>
              <option value="DAL">DALHOUSIE</option>
              <option value="PAL">PALLISER</option>
              <option value="ALB">ALBERT PARK/RADISSON HEIGHTS</option>
              <option value="NGM">NORTH GLENMORE PARK</option>
              <option value="AUB">AUBURN BAY</option>
              <option value="MAF">MAYFAIR</option>
              <option value="ALT">ALTADORE</option>
              <option value="QPK">QUEENS PARK VILLAGE</option>
              <option value="CHW">CHARLESWOOD</option>
              <option value="CED">CEDARBRAE</option>
              <option value="SVO">SILVERADO</option>
              <option value="OPH">OSPREY HILL</option>
              <option value="CRM">CRESTMONT</option>
              <option value="KCA">KINCORA</option>
              <option value="GRE">GREENWOOD/GREENBRIAR</option>
              <option value="EAG">EAGLE RIDGE</option>
              <option value="GPK">GLENMORE PARK</option>
              <option value="DNW">DOWNTOWN WEST END</option>
              <option value="LMR">LOWER MOUNT ROYAL</option>
              <option value="BNK">BANKVIEW</option>
              <option value="BLN">BELTLINE</option>
              <option value="HIL">HILLHURST</option>
              <option value="SNA">SUNALTA</option>
              <option value="NOL">NOLAN HILL</option>
              <option value="MEA">MEADOWLARK PARK</option>
              <option value="COV">COVENTRY HILLS</option>
              <option value="MDH">MEDICINE HILL</option>
              <option value="ROY">ROYAL OAK</option>
              <option value="EVE">EVERGREEN</option>
              <option value="KEL">KELVIN GROVE</option>
              <option value="KIN">KINGSLAND</option>

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