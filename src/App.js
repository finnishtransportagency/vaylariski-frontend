import { useState } from "react";
import CalculateRIV from "./components/CalculateRIV";
import "./App.css";
import { Header } from "components/Header";
import { Routes, Route } from "react-router-dom";
import MapView2 from "views/MapView2";
import RIVResultContext from "contexts/RIVResult";
import RIVTrafficLightContext from "contexts/RIVTrafficLightContext";
import WayareaPolygonContext from "contexts/WayareaPolygonContext";
import userInputDefault from "constants/UserInputDefault";
import DiagramPointClickedContext from "contexts/DiagramPointClickedContext";
import MapPointClickedContext from "contexts/MapPointClickedContext";
import NotificationContext from "contexts/NotificationContext";
import SelectedBoatContext from "contexts/SelectedBoatContext";
import SelectedIndexContext from "contexts/SelectedIndexContext";
import SelectedWayareaContext from "contexts/SelectedWayareaContext";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import TableRowClickedContext from "contexts/TableRowClickedContext";
import UserInputContext from "contexts/UserInput";
import GDOGIDListContext from "contexts/SelectedGDOGIDContext";

function App() {
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

  return (
    <div
      className="App"
      style={{
        minWidth: 1210,
      }}
    >
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
                        value={{
                          selectedGDOGIDString,
                          setSelectedGDOGIDString,
                        }}
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
                                  <Header />
                                  <Routes>
                                    {/* Routes nest inside one another. Nested route paths build upon
                                        parent route paths, and nested route elements render inside
                                        parent route elements. See the note about <Outlet> below. */}
                                    <Route path="/">
                                      <Route index element={<CalculateRIV />} />
                                      <Route
                                        path="/map"
                                        element={
                                          <MapView2
                                            RIVResults={RIVResults}
                                            RIVTrafficLight={RIVTrafficLight}
                                            wayareaPolygons={wayareaPolygons}
                                            selectedRowIndex={selectedRowIndex}
                                            setSelectedRowIndex={
                                              setSelectedRowIndex
                                            }
                                            setMapPointClicked={
                                              setMapPointClicked
                                            }
                                            tableRowClicked={tableRowClicked}
                                            setTableRowClicked={
                                              setTableRowClicked
                                            }
                                            diagramPointClicked={
                                              diagramPointClicked
                                            }
                                            setDiagramPointClicked={
                                              setDiagramPointClicked
                                            }
                                          />
                                        }
                                      />
                                      {/* Using path="*"" means "match anything", so this route
                                          acts like a catch-all for URLs that we don't have explicit
                                          routes for. */}
                                      <Route
                                        path="*"
                                        element={<div>404: Not found</div>}
                                      />
                                    </Route>
                                  </Routes>
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
    </div>
  );
}

export default App;
