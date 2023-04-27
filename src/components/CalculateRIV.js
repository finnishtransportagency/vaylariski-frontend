import { useEffect, useState } from "react";

import DisplayRIVResultsTableView from "../views/DisplayRIVResultsTableView";
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
import DisplayRIVResultsDiagramView from "views/DisplayRIVResultsDiagramView";
import RIVResultsTabsComponent from "./RIVResultsTabsComponent";

const userInputDefault = {
  boat: {
    length: 210,
    speed: "moderate",
    beam: 30,
    draft: 10,
    manoeuvrability: "moderate",
  },
  navline: {
    VAYLAT: "",
    starting_gdo_gid: "",
    navline: [
      {
        coordinates: [],
        width: 10,
      },
    ],
    calculation_params: {
      operating_conditions: {
        wind_speed: "moderate",
        cross_current_speed: "negligible",
        longitudinal_current_speed: "negligible",
        wave_height: "low",
      },
      other: {
        traffic_volume: "low",
        traffic_complexity: "low",
        visibility: 1852,
        light_pollution: "negligible",
      },
      type: "outer",
      number_of_lanes: 2,
      bottom_surface: "smooth_and_soft",
      channel_edge: "gentle_slope",
      aids_to_navigation: "excellent",
      bend_radius: "inf",
      bend_angle: 0,
      distance_between_bends: "inf",
    },
  },
  weightfactors: {
    WF_channel: 4,
    WF_bend: 4,
    WF_s_bend: 4,
    WF_traffic_complexity: 4,
    WF_reduced_visibility: 3,
    WF_light_pollution: 2,
  },
  bank_clearance_wf: {
    edge_category_gentle_fast: 0.2,
    edge_category_gentle_moderate: 0.1,
    edge_category_gentle_slow: 0.1,
    edge_category_sloping_fast: 0.7,
    edge_category_sloping_moderate: 0.5,
    edge_category_sloping_slow: 0.3,
    edge_category_steep_fast: 1.3,
    edge_category_steep_moderate: 1,
    edge_category_steep_slow: 0.5,
  },
  channel_depth_wf: {
    deep_inner_channel: 0,
    medium_deep_inner_channel: 0.2,
    shallow_inner_channel: 0.4,
    deep_outer_channel: 0,
    medium_deep_outer_channel: 0.1,
    shallow_outer_channel: 0.2,
  },
  wind_wf: {
    mild_wind_fast_vessel: 0.1,
    mild_wind_moderate_vessel: 0.2,
    mild_wind_slow_vessel: 0.3,
    moderate_wind_fast_vessel: 0.3,
    moderate_wind_moderate_vessel: 0.4,
    moderate_wind_slow_vessel: 0.6,
    strong_wind_fast_vessel: 0.5,
    strong_wind_moderate_vessel: 0.7,
    strong_wind_slow_vessel: 1.1,
  },
  navline_angle_params: [],

  PF_bend_parameters: {
    bend_ratio_lim_1: 0.6,
    bend_ratio_lim_2: 1.0,
    bend_ratio_lim_3: 1.6,
    bend_ratio_lim_4: 2.0,

    PF_bend_radius_1: 4,
    PF_bend_radius_2: 3,
    PF_bend_radius_3: 2,
    PF_bend_radius_4: 1,
    PF_bend_radius_5: 0,

    bend_angle_lim_1: 30,
    bend_angle_lim_2: 50,
    bend_angle_lim_3: 60,
    bend_angle_lim_4: 70,

    PF_bend_angle_1: 0.0,
    PF_bend_angle_2: 0.5,
    PF_bend_angle_3: 1.0,
    PF_bend_angle_4: 1.5,
    PF_bend_angle_5: 2.0,
  },
  calculation_interval: 10
};

function CalculateRIV() {
  const [RIVResults, setRIVResults] = useState([]);
  const [userInput, setUserInput] = useState(userInputDefault);
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

  useEffect(() => {
    console.log(RIVTrafficLight);
  }, [RIVTrafficLight]);

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
                <NotificationComponent />
                <LoadingSpinner />
                <ParameterTabsComponent />
                <MapView />
                <RIVResultsTabsComponent />
                {/* <DisplayRIVResultsTableView/>
                <DisplayRIVResultsDiagramView /> */}
              </WayareaPolygonContext.Provider>
            </NotificationContext.Provider>
          </SpinnerVisibilityContext.Provider>
        </RIVTrafficLightContext.Provider>
      </UserInputContext.Provider>
    </RIVResultContext.Provider>
  );
}

export default CalculateRIV;
