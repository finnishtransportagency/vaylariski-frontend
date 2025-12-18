import { useState, useRef } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import LoadingSpinner from "./LoadingSpinner.jsx";
import NotificationComponent from "./NotificationComponent.jsx";
import ParameterTabsComponent from "./ParameterTabsComponent.jsx";
import RIVResultsTabsComponent from "./RIVResultsTabsComponent.jsx";
import userInputDefault from "../constants/UserInputDefault.js";
import AllGDOGIDSContext from "../contexts/AllGDOGIDSContext.js";
import CalculationIntervalContext from "../contexts/CalculationIntervalContext.js";
import DiagramPointClickedContext from "../contexts/DiagramPointClickedContext.js";
import GDOGIDListContext from "../contexts/SelectedGDOGIDContext.js";
import MapPointClickedContext from "../contexts/MapPointClickedContext.js";
import NotificationContext from "../contexts/NotificationContext.js";
import PreviousRIVResultsContext from "../contexts/PreviousRIVResultsContext.js";
import RIVResultContext from "../contexts/RIVResult.js";
import RIVTrafficLightContext from "../contexts/RIVTrafficLightContext.js";
import SelectedBoatContext from "../contexts/SelectedBoatContext.js";
import SelectedBoatLoadedContext from "../contexts/SelectedBoatLoadedContext.js";
import SelectedCalculationTypeContext from "../contexts/SelectedCalculationTypeContext.js";
import SelectedIndexContext from "../contexts/SelectedIndexContext.js";
import SelectedRoutelineChangedContext from "../contexts/SelectedRoutelineChangedContext.js";
import SelectedRoutelineContext from "../contexts/SelectedRoutelineContext.js";
import SelectedRoutelineLoadedContext from "../contexts/SelectedRoutelineLoadedContext.js";
import SelectedWayareaChangedContext from "../contexts/SelectedWayareaChangedContext.js";
import SelectedWayareaContext from "../contexts/SelectedWayareaContext.js";
import SelectedWayareaLoadedContext from "../contexts/SelectedWayareaLoadedContext.js";
import SelectedWayareaWithNoGDOGIDContext from "../contexts/SelectedWayareaWithNoGDOGIDContext.js";
import SpinnerVisibilityContext from "../contexts/SpinnerVisibilityContext.js";
import TableRowClickedContext from "../contexts/TableRowClickedContext.js";
import UserInputContext from "../contexts/UserInput.js";
import WayareaPolygonContext from "../contexts/WayareaPolygonContext.js";
import MapView from "../views/MapView.jsx";

function CalculateRIV() {
  const [RIVResults, setRIVResults] = useState([]);
  const [previousRIVResults, setPreviousRIVResults] = useState([]);
  const [userInput, setUserInput] = useState(
    JSON.parse(JSON.stringify(userInputDefault))
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedWayarea, setSelectedWayarea] = useState(null);
  const [selectedRouteline, setSelectedRouteline] = useState(null);
  const [selectedWayareaChanged, setSelectedWayareaChanged] = useState(false);
  const [selectedCalculationType, setSelectedCalculationType] = useState(false);
  const [selectedRoutelineChanged, setSelectedRoutelineChanged] =
    useState(false);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [selectedGDOGIDString, setSelectedGDOGIDString] = useState("");
  const [selectedWayareaWithNoGDOGID, setSelectedWayareaWithNoGDOGID] =
    useState(true);
  const [allGDOGIDs, setAllGDOGIDs] = useState([]);
  const [calculationInterval, setCalculationInterval] = useState(50);

  const [RIVTrafficLight, setRIVTraffiLight] = useState({
    green: 10,
    yellow: 30,
  });
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState({
    severity: "success",
    message: "This is a success message!",
    visible: false,
  });
  const [wayareaPolygons, setWayareaPolygons] = useState([]);
  const [mapPointClicked, setMapPointClicked] = useState(false);
  const [tableRowClicked, setTableRowClicked] = useState(false);
  const [diagramPointClicked, setDiagramPointClicked] = useState(false);
  const [selectedWayareaLoaded, setSelectedWayareaLoaded] = useState(0);
  const [selectedRoutelineLoaded, setSelectedRoutelineLoaded] = useState(false);
  const [selectedBoatLoaded, setSelectedBoatLoaded] = useState(false);

  const mapRef = useRef();

  return (
    <RIVResultContext.Provider value={{ RIVResults, setRIVResults }}>
      <UserInputContext.Provider value={{ userInput, setUserInput }}>
        <RIVTrafficLightContext.Provider
          value={{ RIVTrafficLight, setRIVTraffiLight }}
        >
          <SpinnerVisibilityContext.Provider
            value={{ spinnerVisible, setSpinnerVisible }}
          >
            <NotificationContext.Provider
              value={{ notificationStatus, setNotificationStatus }}
            >
              <WayareaPolygonContext.Provider
                value={{ wayareaPolygons, setWayareaPolygons }}
              >
                <SelectedCalculationTypeContext.Provider
                  value={{
                    selectedCalculationType,
                    setSelectedCalculationType,
                  }}
                >
                  <SelectedWayareaContext.Provider
                    value={{ selectedWayarea, setSelectedWayarea }}
                  >
                    <SelectedRoutelineContext.Provider
                      value={{ selectedRouteline, setSelectedRouteline }}
                    >
                      <PreviousRIVResultsContext.Provider
                        value={{ previousRIVResults, setPreviousRIVResults }}
                      >
                        <AllGDOGIDSContext.Provider
                          value={{ allGDOGIDs, setAllGDOGIDs }}
                        >
                          <SelectedWayareaLoadedContext.Provider
                            value={{
                              selectedWayareaLoaded,
                              setSelectedWayareaLoaded,
                            }}
                          >
                            <SelectedRoutelineLoadedContext.Provider
                              value={{
                                selectedRoutelineLoaded,
                                setSelectedRoutelineLoaded,
                              }}
                            >
                              <SelectedWayareaChangedContext.Provider
                                value={{
                                  selectedWayareaChanged,
                                  setSelectedWayareaChanged,
                                }}
                              >
                                <SelectedRoutelineChangedContext.Provider
                                  value={{
                                    selectedRoutelineChanged,
                                    setSelectedRoutelineChanged,
                                  }}
                                >
                                  <SelectedBoatLoadedContext.Provider
                                    value={{
                                      selectedBoatLoaded,
                                      setSelectedBoatLoaded,
                                    }}
                                  >
                                    <SelectedWayareaWithNoGDOGIDContext.Provider
                                      value={{
                                        selectedWayareaWithNoGDOGID,
                                        setSelectedWayareaWithNoGDOGID,
                                      }}
                                    >
                                      <CalculationIntervalContext.Provider
                                        value={{
                                          calculationInterval,
                                          setCalculationInterval,
                                        }}
                                      >
                                        <GDOGIDListContext.Provider
                                          value={{
                                            selectedGDOGIDString,
                                            setSelectedGDOGIDString,
                                          }}
                                        >
                                          <SelectedBoatContext.Provider
                                            value={{
                                              selectedBoat,
                                              setSelectedBoat,
                                            }}
                                          >
                                            <SelectedIndexContext.Provider
                                              value={{
                                                selectedRowIndex,
                                                setSelectedRowIndex,
                                              }}
                                            >
                                              <MapPointClickedContext.Provider
                                                value={{
                                                  mapPointClicked,
                                                  setMapPointClicked,
                                                }}
                                              >
                                                <TableRowClickedContext.Provider
                                                  value={{
                                                    tableRowClicked,
                                                    setTableRowClicked,
                                                  }}
                                                >
                                                  <DiagramPointClickedContext.Provider
                                                    value={{
                                                      diagramPointClicked,
                                                      setDiagramPointClicked,
                                                    }}
                                                  >
                                                    <NotificationComponent />
                                                    <LoadingSpinner />
                                                    <div>
                                                      <Allotment
                                                        onChange={() => {
                                                          mapRef.current.invalidateMapSize();
                                                        }}
                                                        className="main-wrapper"
                                                      >
                                                        <div className="parameter-and-riv-wrapper">
                                                          <div>
                                                            <ParameterTabsComponent />
                                                          </div>
                                                          <div className="riv-wrapper">
                                                            <RIVResultsTabsComponent />
                                                          </div>
                                                        </div>
                                                        <div className="map-wrapper">
                                                          <MapView
                                                            ref={mapRef}
                                                          />
                                                        </div>
                                                      </Allotment>
                                                    </div>
                                                  </DiagramPointClickedContext.Provider>
                                                </TableRowClickedContext.Provider>
                                              </MapPointClickedContext.Provider>
                                            </SelectedIndexContext.Provider>
                                          </SelectedBoatContext.Provider>
                                        </GDOGIDListContext.Provider>
                                      </CalculationIntervalContext.Provider>
                                    </SelectedWayareaWithNoGDOGIDContext.Provider>
                                  </SelectedBoatLoadedContext.Provider>
                                </SelectedRoutelineChangedContext.Provider>
                              </SelectedWayareaChangedContext.Provider>
                            </SelectedRoutelineLoadedContext.Provider>
                          </SelectedWayareaLoadedContext.Provider>
                        </AllGDOGIDSContext.Provider>
                      </PreviousRIVResultsContext.Provider>
                    </SelectedRoutelineContext.Provider>
                  </SelectedWayareaContext.Provider>
                </SelectedCalculationTypeContext.Provider>
              </WayareaPolygonContext.Provider>
            </NotificationContext.Provider>
          </SpinnerVisibilityContext.Provider>
        </RIVTrafficLightContext.Provider>
      </UserInputContext.Provider>
    </RIVResultContext.Provider>
  );
}

export default CalculateRIV;
