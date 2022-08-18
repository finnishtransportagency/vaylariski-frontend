import {useForm} from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import apiClient from "../http-common";

import BoatContext from "./Boat";
import RIVResultContext from "./RIVResult";


function UserInputForm() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const onSubmit = (data) => fetchRiskValue(data); //Input arvot laskennalle
  const { boat, setBoat } = useContext(BoatContext)
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);


  //Kutsuu calculate_risk endpointtia parametreillä
  const fetchRiskValue = async (data) => {
    const path = 'fairway/calculate_risk'
    console.log('You clicked me!' + JSON.stringify(data));
    const response = await apiClient.post(path, data);
    console.log(response.data);
    setRIVResults(response.data.RIV)
  }

  // For debugging, print state to console
  useEffect(() => {
    console.log(RIVResults);
  }, [RIVResults]);

  useEffect(() => {
    console.log(boat);
  }, [boat]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Enter fairway</p>
      <div>
        <label>Fairway: </label>
        <select{...register("fairway")}>
          <option defaultValue="Helsinki">Helsinki</option>
          <option value="Oulu">Oulu</option>
          <option value="Rauma">Rauma</option>
          <option value="Saimaa">Saimaa</option>
          <option value="Turku">Turku</option>
        </select>
      </div>
      <p>Enter boat parameters</p>
      <div>
        <label>
        Speed (knots):
          <input {...register("boat.speed", {valueAsNumber: true})}
          type="number"
          required
          value={boat.speed} onChange={(ev) => setBoat({...boat, speed: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>
        Beam (m):
          <input {...register("boat.beam", {valueAsNumber: true})}
          type="number"
          required
          value={boat.beam} onChange={(ev) => setBoat({...boat, beam: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>
        Draft (m):
          <input {...register("boat.draft", {valueAsNumber: true})}
          type="number"
          required
          value={boat.draft} onChange={(ev) => setBoat({...boat, draft: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>
          Length (m):
          <input {...register("boat.length", {valueAsNumber: true})}
          type="number"
          required
          value={boat.length} onChange={(ev) => setBoat({...boat, length: ev.target.value})}
          />
        </label>
      </div>

      <div>
      <label>Manoeuvrability: </label>
      <select{...register("boat.manoeuvrability")}>
          <option defaultValue="good">good</option>
          <option value="moderate">moderate</option>
          <option value="poor">poor</option>
      </select>
      </div>

    <button
      type="submit"
      onClick={handleSubmit}
      >Submit
      </button>
    </form>
  );
}

export default UserInputForm;

