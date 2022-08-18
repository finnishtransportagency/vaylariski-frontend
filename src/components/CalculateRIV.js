import {useForm} from "react-hook-form";
import { getDefaultNormalizer } from "@testing-library/react";
import { useEffect, useState, useContext } from "react";

import DisplayRIVResults from "./DisplayRIVResults";
import BoatContext from "./Boat";
import RIVResultContext from './RIVResult';
import UserInputForm from "./UserInputForm";
import FairwayContext from './Fairway';

const boatDefault = {
    speed: '',
    draft: '',
    beam: '',
    length: '',
    manoeuvrability: 'good',
};


function CalculateRIV() {
  const [boat, setBoat] = useState(boatDefault);
  const [RIVResults, setRIVResults] = useState([]);
  const [fairway, setFairway ] = useState('Helsinki');



  return (
    <BoatContext.Provider value={{ boat, setBoat }}>
      <RIVResultContext.Provider value={{ RIVResults, setRIVResults }}>
        <FairwayContext.Provider value= {{ fairway, setFairway }} >
          <UserInputForm />
          <DisplayRIVResults />
        </FairwayContext.Provider>
      </RIVResultContext.Provider>
    </BoatContext.Provider>
    );
  }

export default CalculateRIV;

