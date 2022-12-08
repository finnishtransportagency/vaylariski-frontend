import {useForm} from "react-hook-form";
import { getDefaultNormalizer } from "@testing-library/react";
import { useEffect, useState, useContext } from "react";

import DisplayRIVResults from "./DisplayRIVResults";
import BoatContext from "../contexts/Boat";
import RIVResultContext from '../contexts/RIVResult';
import UserInputForm from "./UserInputForm";
import FairwayContext from '../contexts/Fairway';
import UserInputContext from "../contexts/UserInput";
import RIVTrafficLightContext from "../contexts/RIVTrafficLightContext";
import Mapp from "./Mapp";

const boatDefault = {
    speed: '',
    draft: '',
    beam: '',
    length: '',
    manoeuvrability: 'good',
};

const userInputDefault = {
    boat: {
    length: 210,
    speed: 'moderate',
    beam: 30,
    draft: 10,
    manoeuvrability: 'moderate'
  },
  navilinja: {
    VAYLAT: 100,
    navilinja: [
      {
        coordinates: [],
        width: 10
      }
    ],
    calculation_params: {
      operating_conditions: {
        wind_speed: 'moderate',
        cross_current_speed: 'negligible',
        longitudinal_current_speed: 'negligible',
        wave_height: 'low'
      },
      other: {
        traffic_volume: 'low',
        traffic_complexity: 'low',
        visibility: 1852,
        light_pollution: 'negligible'
      },
      type: 'inner',
      number_of_lanes: 1,
      bottom_surface: 'rough_and_hard',
      channel_edge: 'gentle_slope',
      aids_to_navigation: 'excellent',
      bend_radius: 'inf',
      bend_angle: 0,
      distance_between_bends: 'inf'
    }
  },
  weightfactors: {
    WF_channel: 4,
    WF_bend: 4,
    WF_s_bend: 4,
    WF_traffic_complexity: 4,
    WF_reduced_visibility: 3,
    WF_light_pollution: 2
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
    edge_category_steep_slow: 0.5
  },
  channel_depth_wf: {
    deep_inner_channel: 0,
    medium_deep_inner_channel: 0.2,
    shallow_inner_channel: 0.4,
    deep_outer_channel: 0,
    medium_deep_outer_channel: 0.1,
    shallow_outer_channel: 0.2
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
    strong_wind_slow_vessel: 1.1
  },
  manoeuvrability_params: {
    C_manoeuvrability_good: 1.3,
    C_manoeuvrability_moderate: 1.5,
    C_manoeuvrability_poor: 1.8,
    C_turning_radius_good: 4,
    C_turning_radius_moderate: 5,
    C_turning_radius_poor: 6
  }
}

function CalculateRIV() {
  const [boat, setBoat] = useState(boatDefault);
  const [RIVResults, setRIVResults] = useState([]);
  const [fairway, setFairway ] = useState('Helsinki');
  const [userInput, setUserInput] = useState(userInputDefault)
  const [RIVTrafficLight, setRIVTraffiLight] = useState({
    green: 10,
    yellow: 30,
  });

  useEffect(() =>{
    console.log(RIVTrafficLight)
  }, [RIVTrafficLight])

  return (
    <BoatContext.Provider value={{ boat, setBoat }}>
      <RIVResultContext.Provider value={{ RIVResults, setRIVResults }}>
        <FairwayContext.Provider value= {{ fairway, setFairway }} >
          <UserInputContext.Provider value= {{userInput, setUserInput}}>
            <RIVTrafficLightContext.Provider value={{ RIVTrafficLight, setRIVTraffiLight }} >
              <UserInputForm />
              <DisplayRIVResults />
              <Mapp />
            </RIVTrafficLightContext.Provider>
          </UserInputContext.Provider>
        </FairwayContext.Provider>
      </RIVResultContext.Provider>
    </BoatContext.Provider>
    );
  }

export default CalculateRIV;

