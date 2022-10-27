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
      <p>Enter fairway</p>
      <div>
        <label>Fairway: </label>
        <select{...register("fairway")} onChange={handleFairwayChange}>
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
      <select{...register("boat.manoeuvrability")} onChange={handleManoeuvrabilityChange}>
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

