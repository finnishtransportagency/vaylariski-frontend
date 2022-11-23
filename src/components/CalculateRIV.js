import {useForm} from "react-hook-form";
import { getDefaultNormalizer } from "@testing-library/react";
import { useEffect, useState, useContext } from "react";

import DisplayRIVResults from "./DisplayRIVResults";
import BoatContext from "../contexts/Boat";
import RIVResultContext from '../contexts/RIVResult';
import UserInputForm from "./UserInputForm";
import FairwayContext from '../contexts/Fairway';
import UserInputContext from "../contexts/UserInput";

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
      speed: 10,
      beam: 30,
      draft: 10,
      manoeuvrability: 'good'
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
        wind_speed: 17,
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
  }
}

function CalculateRIV() {
  const [boat, setBoat] = useState(boatDefault);
  const [RIVResults, setRIVResults] = useState([]);
  const [fairway, setFairway ] = useState('Helsinki');
  const [userInput, setUserInput] = useState(userInputDefault)


  return (
    <BoatContext.Provider value={{ boat, setBoat }}>
      <RIVResultContext.Provider value={{ RIVResults, setRIVResults }}>
        <FairwayContext.Provider value= {{ fairway, setFairway }} >
          <UserInputContext.Provider value= {{userInput, setUserInput}}>
            <UserInputForm />
            <DisplayRIVResults />
          </UserInputContext.Provider>
        </FairwayContext.Provider>
      </RIVResultContext.Provider>
    </BoatContext.Provider>
    );
  }

export default CalculateRIV;

