import {useForm} from "react-hook-form";
import axios from "axios";
import { getDefaultNormalizer } from "@testing-library/react";
import { useEffect, useState } from "react";
import DisplayRIVResults from "./DisplayRIVResults";


function CalculateRIV() {
  //Kysyy input arvot käyttäjältä
  const {register,handleSubmit,formState:{errors}} =useForm();
  const onSubmit = (data) => fetchRiskValue(data); //Input arvot laskennalle
  const [RIVResults, setRIVResults] = useState([]);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/"
  });

  //Kutsuu calculate_risk endpointtia parametreillä
  const fetchRiskValue = async (data) => {
    const path = 'fairway/calculate_risk'
    console.log('You clicked me!' + JSON.stringify(data));
    const response = await api.post(path, data);
    console.log(response.data);
    setRIVResults(response.data.RIV)
  }

  useEffect(() => {
    console.log(RIVResults);
  }, [RIVResults]);


  return (
    <>
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
          />
        </label>
      </div>
      <div>
        <label>
        Beam (m):
          <input {...register("boat.beam", {valueAsNumber: true})}
          type="number"
          required
          />
        </label>
      </div>
      <div>
        <label>
        Draft (m):
          <input {...register("boat.draft", {valueAsNumber: true})}
          type="number"
          required
          />
        </label>
      </div>
      <div>
        <label>
          Length (m):
          <input {...register("boat.length", {valueAsNumber: true})}
          type="number"
          required
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

    <DisplayRIVResults rows={RIVResults}  />
    </>
    );
  }

export default CalculateRIV;

