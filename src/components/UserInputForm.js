import {useForm} from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import apiClient from "../http-common";

import BoatContext from "../contexts/Boat";
import RIVResultContext from "../contexts/RIVResult";
import FairwayContext from "../contexts/Fairway";


function UserInputForm() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const onSubmit = (data) => fetchRiskValue(data); //Input arvot laskennalle
  const { boat, setBoat } = useContext(BoatContext)
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { fairway, setFairway } = useContext(FairwayContext);


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
  useEffect(() => {
    console.log(RIVResults);
  }, [RIVResults]);

  useEffect(() => {
    console.log(boat);
  }, [boat]);

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
          <input {...register("boat.speed", {valueAsNumber: true})}
          type="number"
          required
          value={boat.speed} onChange={(ev) => setBoat({...boat, speed: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Length (m):
          <input {...register("boat.length", {valueAsNumber: true})}
          type="number"
          required
          value={boat.length} onChange={(ev) => setBoat({...boat, length: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Beam (m):
          <input {...register("boat.beam", {valueAsNumber: true})}
          type="number"
          required
          value={boat.beam} onChange={(ev) => setBoat({...boat, beam: ev.target.value})}
          />
        </label>
      </div>
      <div>
        <label>Draft (m):
          <input {...register("boat.draft", {valueAsNumber: true})}
          type="number"
          required
          value={boat.draft} onChange={(ev) => setBoat({...boat, draft: ev.target.value})}
          />
        </label>
      </div>
      <div>
      <label>Manoeuvrability: </label>
        <select{...register("boat.manoeuvrability")} onChange={handleManoeuvrabilityChange}>
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
          // value={navilinja.VAYLAT} onChange={(ev) => setFairway({...fairway.navilinja, VAYLAT: ev.target.value})}
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
        <label>Bend radius: </label>
        <select{...register("calculation_params.bend_radius")}>
            <option defaultValue="inf">inf</option>
        </select>
      </div>
      <div>
        <label>Bend angle: </label>
        <select{...register("calculation_params.bend_angle")}>
            <option defaultValue={0}>0</option>
        </select>
      </div>
      <div>
        <label>Distance between bends: </label>
        <select{...register("calculation_params.distance_between_bends")}>
            <option defaultValue="inf">inf</option>
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
          <input {...register("wight_factors.WF_reduced_visibility", {valueAsNumber: true})}
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

