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

function CalculateRIV() {
  const [RIVResults, setRIVResults] = useState([]);
  const [userInput, setUserInput] = useState(userInputDefault);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedWayarea, setSelectedWayarea] = useState(null);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [selectedGDOGID, setSelectedGDOGID] = useState("");

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
                  <GDOGIDListContext.Provider
                    value={{ selectedGDOGID, setSelectedGDOGID }}
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
                              <ParameterTabsComponent />
                              <MapView />
                              <RIVResultsTabsComponent />
                            </DiagramPointClickedContext.Provider>
                          </TableRowClickedContext.Provider>
                        </MapPointClickedContext.Provider>
                      </SelectedIndexContext.Provider>
                    </SelectedBoatContext.Provider>
                  </GDOGIDListContext.Provider>
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
