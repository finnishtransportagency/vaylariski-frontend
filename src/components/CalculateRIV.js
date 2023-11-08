import { useState } from "react";
import RIVResultContext from "../contexts/RIVResult";
import UserInputContext from "../contexts/UserInput";
import RIVTrafficLightContext from "contexts/RIVTrafficLightContext";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import LoadingSpinner from "./LoadingSpinner";
import NotificationComponent from "./NotificationComponent";
import NotificationContext from "contexts/NotificationContext";
import MapView from "../views/MapView";
import ParameterTabsComponent from "./ParameterTabsComponent";
import WayareaPolygonContext from "contexts/WayareaPolygonContext";
import RIVResultsTabsComponent from "./RIVResultsTabsComponent";
import SelectedIndexContext from "../contexts/SelectedIndexContext";
import MapPointClickedContext from "contexts/MapPointClickedContext";
import TableRowClickedContext from "contexts/TableRowClickedContext";
import DiagramPointClickedContext from "contexts/DiagramPointClickedContext";
import userInputDefault from "constants/UserInputDefault";
import SelectedWayareaContext from "contexts/SelectedWayareaContext";
import SelectedBoatContext from "contexts/SelectedBoatContext";
import GDOGIDListContext from "contexts/SelectedGDOGIDContext";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";
import CalculationIntervalContext from "../contexts/CalculationIntervalContext";
import SelectedWayareaChangedContext from "../contexts/SelectedWayareaChangedContext";
import AllGDOGIDSContext from "../contexts/AllGDOGIDSContext";

function CalculateRIV() {
  const [RIVResults, setRIVResults] = useState([]);
  const [userInput, setUserInput] = useState(userInputDefault);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedWayarea, setSelectedWayarea] = useState(null);
  const [selectedWayareaChanged, setSelectedWayareaChanged] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [selectedGDOGIDString, setSelectedGDOGIDString] = useState("");
  const [selectedWayareaWithNoGDOGID, setSelectedWayareaWithNoGDOGID] =
    useState(true);
  const [allGDOGIDs, setAllGDOGIDs] = useState([]);
  const [calculationInterval, setCalculationInterval] = useState(10);

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
                <SelectedWayareaContext.Provider
                  value={{ selectedWayarea, setSelectedWayarea }}
                >
                  <AllGDOGIDSContext.Provider
                    value={{ allGDOGIDs, setAllGDOGIDs }}
                  >
                    <SelectedWayareaChangedContext.Provider
                      value={{
                        selectedWayareaChanged,
                        setSelectedWayareaChanged,
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
                              value={{ selectedBoat, setSelectedBoat }}
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
                                      <div className="main-wrapper">
                                        <div className="parameter-and-riv-wrapper">
                                          <div className="parameter-wrapper">
                                            <ParameterTabsComponent />
                                          </div>
                                          <div className="riv-wrapper">
                                            <RIVResultsTabsComponent />
                                          </div>
                                        </div>
                                        <div className="map-wrapper ">
                                          <MapView />
                                        </div>
                                      </div>
                                    </DiagramPointClickedContext.Provider>
                                  </TableRowClickedContext.Provider>
                                </MapPointClickedContext.Provider>
                              </SelectedIndexContext.Provider>
                            </SelectedBoatContext.Provider>
                          </GDOGIDListContext.Provider>
                        </CalculationIntervalContext.Provider>
                      </SelectedWayareaWithNoGDOGIDContext.Provider>
                    </SelectedWayareaChangedContext.Provider>
                  </AllGDOGIDSContext.Provider>
                </SelectedWayareaContext.Provider>
              </WayareaPolygonContext.Provider>
            </NotificationContext.Provider>
          </SpinnerVisibilityContext.Provider>
        </RIVTrafficLightContext.Provider>
      </UserInputContext.Provider>
    </RIVResultContext.Provider>
  );
}

export default CalculateRIV;
