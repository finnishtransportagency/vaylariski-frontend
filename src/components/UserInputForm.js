import {useForm} from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import apiClient from "../http-common";

import BoatContext from "../contexts/Boat";
import RIVResultContext from "../contexts/RIVResult";
import FairwayContext from "../contexts/Fairway";
import UserInputContext from "../contexts/UserInput";


function UserInputForm() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const onSubmit = (data) => fetchRiskValue(data); //Input arvot laskennalle
  const { boat, setBoat } = useContext(BoatContext)
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { fairway, setFairway } = useContext(FairwayContext);
  const { userInput, setUserInput } = useContext(UserInputContext);

  //Kutsuu calculate_risk endpointtia parametreillä
  const fetchRiskValue = async (data) => {

    const path = 'fairway/calculate_risk'
    console.log('You clicked me!' + JSON.stringify(data));
    const response = await apiClient.post(path, data);
    console.log(response.data);
    setRIVResults(response.data.RIV)
  }

  // For debugging, print state to console
  // useEffect(() => {
  //   console.log(RIVResults);
  // }, [RIVResults]);

  // useEffect(() => {
  //   console.log(boat);
  // }, [boat]);

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  const handleManoeuvrabilityChange = (event) => {
    // setUserInput({...userInput, [manoeuvrability: event.target.value})
  };

  const handleFairwayChange = (ev) => {
    setFairway(ev.target.value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Enter boat parameters</p>
      <div>
        <label>Speed (knots):
          <input {...register("userInput.boat.speed", {valueAsNumber: true})}
          type="number"
          required
          // value={boat.speed} onChange={(ev) => setBoat({...boat, speed: ev.target.value})}
          value={userInput.boat.speed}
          onChange={(ev) => setUserInput({...userInput.boat.speed, speed: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Length (m):
          <input {...register("userInput.boat.length", {valueAsNumber: true})}
          type="number"
          required
          // value={boat.speed} onChange={(ev) => setUserInput({...userInput.boat, length: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Beam (m):
          <input {...register("userInput.boat.beam", {valueAsNumber: true})}
          type="number"
          required
          // value={boat.speed} onChange={(ev) => setUserInput({...userInput.boat, beam: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Draft (m):
          <input {...register("userInput.boat.draft", {valueAsNumber: true})}
          type="number"
          required
          // value={boat.speed} onChange={(ev) => setUserInput({...userInput.boat, draft: ev.target.value})}
          />
        </label>
      </div>
      <div>
      <label>Manoeuvrability: </label>
        <select{...register("userInput.boat.manoeuvrability")} onChange={handleManoeuvrabilityChange}>
            <option defaultValue="good">good</option>
            <option value="moderate">moderate</option>
            <option value="poor">poor</option>
        </select>
        Turn rate:
        <input {...( {valueAsNumber: true}, {placeholder:"C_tr"})}/>
        Manoeuvrability coefficient:
        <input {...( {valueAsNumber: true}, {placeholder:"C_m"})}/>
      </div>

      <p>Enter fairway</p>
      <div>
        <label>VAYLAT id:
          <input {...register("navilinja.VAYLAT", {valueAsNumber: true})}
          placeholder="VAYLAT"
          type="number"
          required
          // value={navilinja.VAYLAT} onChange={(ev) => setUserInput({...navilinja, VAYLAT: ev.target.value})}
          />
        </label>
      </div>

      <div>
        <label>Type: </label>
        <select{...register("calculation_params.type")}>
            <option defaultValue="inner">inner</option>
            <option value="outer">outer</option>
        </select>
      </div>
      <div>
        <label>Number of lanes: </label>
        <select{...register("calculation_params.number_of_lanes")}>
            <option defaultValue={1}>One-way channel</option>
            <option value={2}>Two-way channel</option>
        </select>
      </div>
      <div>
        <label>Bottom surface: </label>
        <select{...register("calculation_params.bottom_surface")}>
            <option defaultValue="smooth_and_soft">smooth_and_soft</option>
            <option value="rough_and_hard">rough_and_hard</option>
        </select>
      </div>
      <div>
        <label>Channel edge: </label>
          <select{...register("calculation_params.channel_edge")}>
              <option defaultValue="gentle_slope">gentle_slope</option>
              <option value="sloping_edges">sloping_edges</option>
              <option value="steep_and_hard">steep_and_hard</option>
          </select>
      </div>
      <div>
        <label>Aids to navigation: </label>
        <select{...register("calculation_params.aids_to_navigation")}>
            <option defaultValue="excellent">excellent</option>
            <option value="good">good</option>
            <option value="moderate">moderate</option>
        </select>
      </div>

      <div>
        <label>Traffic volume: </label>
          <select{...register("other.traffic_volume")}>
              <option defaultValue="negligible">negligible</option>
              <option defaultValue="low">low</option>
              <option value="moderate">moderate</option>
              <option value="heavy">heavy</option>
              <option value="very_heavy">very_heavy</option>
          </select>
      </div>
      <div>
        <label>Traffic complexity: </label>
          <select{...register("other.traffic_complexity")}>
              <option defaultValue="negligible">negligible</option>
              <option defaultValue="low">low</option>
              <option value="moderate">moderate</option>
              <option value="heavy">heavy</option>
              <option value="very_heavy">very_heavy</option>
          </select>
      </div>
      <div>
        <label>Visibility (m):
          <input {...register("other.visibility", {valueAsNumber: true})}
          type="number"
          defaultValue={1852}
          required
          // value={boat.length} onChange={(ev) => setBoat({...boat, length: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Light pollution: </label>
          <select{...register("other.light_pollution")}>
              <option defaultValue="negligible">negligible</option>
              <option defaultValue="low">low</option>
              <option value="moderate">moderate</option>
              <option value="heavy">heavy</option>
              <option value="very_heavy">very_heavy</option>
          </select>
      </div>

      <p>Operating conditions</p>
      <div>
        <label>Wind speed (m/s):
          <input {...register("calculation_params.operating_conditions.wind_speed", {valueAsNumber: true})}
          type="number"
          defaultValue={17}
          required
          // value={boat.length} onChange={(ev) => setBoat({...boat, length: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Cross current speed: </label>
        <select{...register("calculation_params.operating_conditions.cross_current_speed")}>
            <option defaultValue="negligible">negligible</option>
            <option value="low">low</option>
        </select>
      </div>
      <div>
        <label>Longitudinal current speed: </label>
        <select{...register("calculation_params.operating_conditions.longitudinal_current_speed")}>
            <option defaultValue="negligible">low</option>
            <option value="moderate">moderate</option>
            <option value="strong">strong</option>
        </select>
      </div>
      <div>
        <label>Wave height: </label>
        <select{...register("calculation_params.operating_conditions.wave_height")}>
            <option defaultValue="low">low</option>
            <option value="moderate">moderate</option>
            <option value="high">high</option>
        </select>
      </div>

      <p>Enter weightfactors</p>
      <div>
        <label>
          WF channel:
          <input {...register("weightfactors.WF_channel", {valueAsNumber: true})}
          type="number"
          defaultValue={4}
          required
          />
        </label>
      </div>
      <div>
        <label>
          WF bend:
          <input {...register("weightfactors.WF_bend", {valueAsNumber: true})}
          type="number"
          defaultValue={4}
          required
          />
        </label>
      </div>
      <div>
        <label>
          WF S-bend:
          <input {...register("weightfactors.WF_s_bend", {valueAsNumber: true})}
          type="number"
          defaultValue={4}
          required
          />
        </label>
      </div>
      <div>
        <label>
          WF traffic complexity:
          <input {...register("weightfactors.WF_traffic_complexity", {valueAsNumber: true})}
          type="number"
          defaultValue={4}
          required
          />
        </label>
      </div>
      <div>
        <label>
          WF reduced visibility:
          <input {...register("weightfactors.WF_reduced_visibility", {valueAsNumber: true})}
          type="number"
          defaultValue={3}
          required
          />
        </label>
      </div>
      <div>
        <label>
          WF light pollution:
          <input {...register("weightfactors.WF_light_pollution", {valueAsNumber: true})}
          type="number"
          defaultValue={2}
          required
          />
        </label>
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

