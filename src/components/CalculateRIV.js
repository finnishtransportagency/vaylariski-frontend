import {useForm} from "react-hook-form";
import { getDefaultNormalizer } from "@testing-library/react";
import { useEffect, useState, useContext } from "react";

import DisplayRIVResults from "./DisplayRIVResults";
import BoatContext from "./Boat";
import RIVResultContext from './RIVResult';
import UserInputForm from "./UserInputForm";

const boatDefault = {
    speed: '',
    draft: '',
    beam: '',
    length: '',
    manoeuvrability: ''
};


function CalculateRIV() {
  const [boat, setBoat] = useState(boatDefault);
  const [RIVResults, setRIVResults] = useState([]);



  return (
    <BoatContext.Provider value={{ boat, setBoat }}>
      <RIVResultContext.Provider value={{ RIVResults, setRIVResults }}>
        <UserInputForm />
        <DisplayRIVResults />
      </RIVResultContext.Provider>
    </BoatContext.Provider>
    );
  }

export default CalculateRIV;

