import {useForm} from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import apiClient from "../http-common";

import BoatContext from "../contexts/Boat";
import RIVResultContext from "../contexts/RIVResult";
import FairwayContext from "../contexts/Fairway";
import UserInputContext from "../contexts/UserInput";
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';


function UserInputForm() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const onSubmit = (data) => fetchRiskValue(data); //Input arvot laskennalle
  const { boat, setBoat } = useContext(BoatContext)
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { fairway, setFairway } = useContext(FairwayContext);
  const { userInput, setUserInput } = useContext(UserInputContext);

  //Kutsuu calculate_risk endpointtia parametreillä
  const fetchRiskValue = async (data) => {
    const data1 = {
        "boat": {
          "length": 210,
          "speed": 10,
          "beam": 30,
          "draft": 10,
          "manoeuvrability": "good"
        },
        "navilinja": {
          "VAYLAT": 100,
          "navilinja": [
            {
              "coordinates": [
                "string"
              ],
              "width": 10
            }
          ],
          "calculation_params": {
            "operating_conditions": {
              "wind_speed": 17,
              "cross_current_speed": "negligible",
              "longitudinal_current_speed": "negligible",
              "wave_height": "low"
            },
            "other": {
              "traffic_volume": "low",
              "traffic_complexity": "low",
              "visibility": 1852,
              "light_pollution": "negligible"
            },
            "type": "inner",
            "number_of_lanes": 1,
            "bottom_surface": "rough_and_hard",
            "channel_edge": "gentle_slope",
            "aids_to_navigation": "excellent",
            "bend_radius": "inf",
            "bend_angle": 0,
            "distance_between_bends": "inf"
          }
        },
        "weightfactors": {
          "WF_channel": 4,
          "WF_bend": 4,
          "WF_s_bend": 4,
          "WF_traffic_complexity": 4,
          "WF_reduced_visibility": 3,
          "WF_light_pollution": 2
        }
      }

    const path = 'fairway/calculate_risk'
    console.log('You clicked me!' + JSON.stringify(data));
    const response = await apiClient.post(path, data1);
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
    setBoat({...boat, manoeuvrability: event.target.value})
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
          value={userInput.boat.speed} 
          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,speed: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>Length (m):
          <input {...register("userInput.boat.length", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.boat.length} 
          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,length: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>Beam (m):
          <input {...register("userInput.boat.beam", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.boat.beam} 
          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,beam: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>Draft (m):
          <input {...register("userInput.boat.draft", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.boat.draft} 
          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,draft: ev.target.value}})}
          />
        </label>
      </div>
      <div>
      <label>Manoeuvrability: </label>
        <select{...register("userInput.boat.manoeuvrability")} 
          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,manoeuvrability: ev.target.value}})}>
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
          value={userInput.navilinja.VAYLAT} 
          onChange={(ev) => setUserInput({...userInput,navilinja: {...userInput.navilinja,VAYLAT: ev.target.value}})}
          />
        </label>
      </div> 
      
      <div>
        <label>Type: </label>
        <select{...register("userInput.navilinja.calculation_params.type")} 
          onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,type: ev.target.value}}})} >
          <option defaultValue="inner">inner</option>
          <option value="outer">outer</option>
        </select>
      </div>
      <div>
        <label>Number of lanes: </label>
        <select{...register("userInput.navilinja.calculation_params.number_of_lanes")}
          onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,number_of_lanes: ev.target.value}}})} >
            <option defaultValue={1}>One-way channel</option>
            <option value={2}>Two-way channel</option>
        </select>
      </div>
      <div>
        <label>Bottom surface: </label>
        <select{...register("userInput.navilinja.calculation_params.bottom_surface")}
          onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,bottom_surface: ev.target.value}}})} >
            <option defaultValue="rough_and_hard">rough_and_hard</option>
            <option value="smooth_and_soft">smooth_and_soft</option>
            
        </select>
      </div>
      <div>
        <label>Channel edge: </label>
          <select{...register("userInput.navilinja.calculation_params.channel_edge")}
            onChange={(ev) => setUserInput({...userInput,navilinja:
              {...userInput.navilinja,calculation_params:
                {...userInput.navilinja.calculation_params,channel_edge: ev.target.value}}})} >
            <option defaultValue="gentle_slope">gentle_slope</option>
            <option value="sloping_edges">sloping_edges</option>
            <option value="steep_and_hard">steep_and_hard</option>
          </select>
      </div>
      <div>
        <label>Aids to navigation: </label>
          <select{...register("userInput.navilinja.calculation_params.aids_to_navigation")}
            onChange={(ev) => setUserInput({...userInput,navilinja:
              {...userInput.navilinja,calculation_params:
                {...userInput.navilinja.calculation_params,aids_to_navigation: ev.target.value}}})} >
            <option defaultValue="excellent">excellent</option>
            <option value="good">good</option>
            <option value="moderate">moderate</option>
        </select>
      </div>

      <div>
        <label>Traffic volume: </label>
          <select{...register("userInput.navilinja.calculation_params.other.traffic_volume")}
            onChange={(ev) => setUserInput({...userInput,navilinja:
                {...userInput.navilinja,calculation_params:
                  {...userInput.navilinja.calculation_params,other:
                    {...userInput.navilinja.calculation_params.other,traffic_volume:ev.target.value}}}})} >
              <option defaultValue="negligible">negligible</option>
              <option defaultValue="low">low</option>
              <option value="moderate">moderate</option>
              <option value="heavy">heavy</option>
              <option value="very_heavy">very_heavy</option>
          </select>
      </div>
      <div>
        <label>Traffic complexity: </label>
          <select{...register("userInput.navilinja.calculation_params.other.traffic_complexity")}
            onChange={(ev) => setUserInput({...userInput,navilinja:
              {...userInput.navilinja,calculation_params:
                {...userInput.navilinja.calculation_params,other:
                  {...userInput.navilinja.calculation_params.other,traffic_complexity:ev.target.value}}}})} >
              <option defaultValue="negligible">negligible</option>
              <option defaultValue="low">low</option>
              <option value="moderate">moderate</option>
              <option value="heavy">heavy</option>
              <option value="very_heavy">very_heavy</option>
          </select>
      </div>
      <div>
        <label>Visibility (m):
          <input {...register("userInput.navilinja.calculation_params.other.visibility", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.navilinja.calculation_params.other.visibility} 
          onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,other:
                {...userInput.navilinja.calculation_params.other,visibility:ev.target.value}}}})} 
          />
        </label>
      </div>
      <div>
        <label>Light pollution: </label>
          <select{...register("userInput.navilinja.calculation_params.other.light_pollution")}
            onChange={(ev) => setUserInput({...userInput,navilinja:
                {...userInput.navilinja,calculation_params:
                  {...userInput.navilinja.calculation_params,other:
                    {...userInput.navilinja.calculation_params.other,light_pollution:ev.target.value}}}})}>
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
          <input {...register("userInput.navilinja.calculation_params.operating_conditions.wind_speed", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.navilinja.calculation_params.operating_conditions.wind_speed} 
          onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,operating_conditions:
                {...userInput.navilinja.calculation_params.operating_conditions,wind_speed:ev.target.value}}}})} 
          />
        </label>
      </div>
      <div>
        <label>Cross current speed: </label>
        <select{...register("userInput.navilinja.calculation_params.operating_conditions.cross_current_speed")}
          onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,operating_conditions:
                {...userInput.navilinja.calculation_params.operating_conditions,cross_current_speed:ev.target.value}}}})} >
            <option defaultValue="negligible">negligible</option>
            <option value="low">low</option>
        </select>
      </div>
      <div>
        <label>Longitudinal current speed: </label>
        <select{...register("userInput.navilinja.calculation_params.operating_conditions.longitudinal_current_speed")}
          onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,operating_conditions:
                {...userInput.navilinja.calculation_params.operating_conditions,longitudinal_current_speed:ev.target.value}}}})}>
            <option defaultValue="negligible">low</option>
            <option value="moderate">moderate</option>
            <option value="strong">strong</option>
        </select>
      </div>
      <div>
        <label>Wave height: </label>
        <select{...register("userInput.navilinja.calculation_params.operating_conditions.wave_height")}
        onChange={(ev) => setUserInput({...userInput,navilinja:
            {...userInput.navilinja,calculation_params:
              {...userInput.navilinja.calculation_params,operating_conditions:
                {...userInput.navilinja.calculation_params.operating_conditions,wave_height:ev.target.value}}}})}>
            <option defaultValue="low">low</option>
            <option value="moderate">moderate</option>
            <option value="high">high</option>
        </select>
      </div>

      <p>Enter weightfactors</p>
      <div>
        <label>
          WF channel:
          <input {...register("userInput.weightfactors.WF_channel", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.weightfactors.WF_channel} 
          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_channel: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>
          WF bend:
          <input {...register("userInput.weightfactors.WF_bend", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.weightfactors.WF_bend} 
          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_bend: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>
          WF S-bend:
          <input {...register("userInput.weightfactors.WF_s_bend", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.weightfactors.WF_s_bend} 
          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_s_bend: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>
          WF traffic complexity:
          <input {...register("userInput.weightfactors.WF_traffic_complexity", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.weightfactors.WF_traffic_complexity} 
          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_traffic_complexity: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>
          WF reduced visibility:
          <input {...register("userInput.weightfactors.WF_reduced_visibility", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.weightfactors.WF_reduced_visibility} 
          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_reduced_visibility: ev.target.value}})}
          />
        </label>
      </div>
      <div>
        <label>
          WF light pollution:
          <input {...register("userInput.weightfactors.WF_light_pollution", {valueAsNumber: true})}
          type="number"
          required
          value={userInput.weightfactors.WF_light_pollution} 
          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_light_pollution: ev.target.value}})}
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

