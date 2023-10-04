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
import { Slider } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

function CalculateRIV() {
  const [RIVResults, setRIVResults] = useState([]);
  const [userInput, setUserInput] = useState(userInputDefault);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedWayarea, setSelectedWayarea] = useState(null);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [selectedGDOGIDString, setSelectedGDOGIDString] = useState("");
  const [selectedWayareaWithNoGDOGID, setSelectedWayareaWithNoGDOGID] =
    useState(true);

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

  const [sliderValue, setSliderValue] = useState(50);
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

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
                  <SelectedWayareaWithNoGDOGIDContext.Provider
                    value={{
                      selectedWayareaWithNoGDOGID,
                      setSelectedWayareaWithNoGDOGID,
                    }}
                  >
                    <GDOGIDListContext.Provider
                      value={{ selectedGDOGIDString, setSelectedGDOGIDString }}
                    >
                      <SelectedBoatContext.Provider
                        value={{ selectedBoat, setSelectedBoat }}
                      >
                        <SelectedIndexContext.Provider
                          value={{ selectedRowIndex, setSelectedRowIndex }}
                        >
                          <MapPointClickedContext.Provider
                            value={{ mapPointClicked, setMapPointClicked }}
                          >
                            <TableRowClickedContext.Provider
                              value={{ tableRowClicked, setTableRowClicked }}
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
                                  <Allotment
                                    onDragEnd={() => {
                                      setSliderValue(Math.random());
                                    }}
                                  >
                                    <div
                                      className="parameter-and-riv-wrapper"
                                      style={{
                                        height: `${100}%`,
                                      }}
                                    >
                                      <div className="parameter-wrapper">
                                        <ParameterTabsComponent />
                                      </div>
                                      <div className="riv-wrapper">
                                        <RIVResultsTabsComponent />
                                      </div>
                                    </div>
                                    <div
                                      className="map-wrapper "
                                      style={{
                                        height: "100%",
                                      }}
                                    >
                                      <MapView sliderValue={sliderValue} />
                                    </div>
                                  </Allotment>
                                </div>
                              </DiagramPointClickedContext.Provider>
                            </TableRowClickedContext.Provider>
                          </MapPointClickedContext.Provider>
                        </SelectedIndexContext.Provider>
                      </SelectedBoatContext.Provider>
                    </GDOGIDListContext.Provider>
                  </SelectedWayareaWithNoGDOGIDContext.Provider>
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
