import {useForm} from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import apiClient from "../http-common";

import BoatContext from "../contexts/Boat";
import RIVResultContext from "../contexts/RIVResult";
import FairwayContext from "../contexts/Fairway";
import UserInputContext from "../contexts/UserInput";
import { Grid, Menu, popoverClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function UserInputForm() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const onSubmit = (data) => fetchRiskValue(data); //Input arvot laskennalle
  const { boat, setBoat } = useContext(BoatContext)
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { fairway, setFairway } = useContext(FairwayContext);
  const { userInput, setUserInput } = useContext(UserInputContext);

  //Kutsuu calculate_risk endpointtia parametreillä
  const fetchRiskValue = async () => {
    const path = 'fairway/calculate_risk'
    console.log('You clicked me!' + JSON.stringify(userInput));
    const response = await apiClient.post(path, userInput);
    console.log(response.data);
    setRIVResults(response.data)
  }

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  const handleManoeuvrabilityChange = (event) => {
    setBoat({...boat, manoeuvrability: event.target.value})
  };

  const handleFairwayChange = (ev) => {
    setFairway(ev.target.value);
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const boat1 = {'Speed':10, 'Length':210, 'Beam':30, 'Draft':10, 'Manoeuvrability':'good'
  };
  const boat2 = {'Speed':10, 'Length':255, 'Beam':32, 'Draft':12, 'Manoeuvrability':'good'
  };
  const boat3 = {'Speed':10, 'Length':200, 'Beam':32, 'Draft':10, 'Manoeuvrability':'good'
  };
  const boat4 = {'Speed':10, 'Length':210, 'Beam':30, 'Draft':11, 'Manoeuvrability':'good'
  };
  const boat5 = {'Speed':10, 'Length':83, 'Beam':13, 'Draft':4, 'Manoeuvrability':'good'
  };

  const boatData = [
    boat1,
    boat2,
    boat3,
    boat4,
    boat5
  ]

  const handleMenuItemClick = (event, index) => {
    console.log(event.target.value); 
    setSelectedIndex(index);
    const newBoat = boatData[event.target.value];
    console.log('newboot', newBoat);
    setUserInput({...userInput, boat: {...userInput.boat, length: newBoat.Length}})
    setUserInput({...userInput, boat: {...userInput.boat, beam: newBoat.Beam}})
    setUserInput({...userInput, boat: {...userInput.boat, draft: newBoat.Draft}})
    setUserInput({...userInput, boat: {...userInput.boat, speed: newBoat.Speed}})
    setUserInput({...userInput, boat: {...userInput.boat, manoeuvrability: newBoat.Manoeuvrability}})
    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function TableBoat() {
    return (
      <div>
        <Select>
          {boatData.map((boat,index) => {
            return(

            <MenuItem
              key={index}
              selected={index === selectedIndex}
              onClick={(event, index) => handleMenuItemClick(event, index)}
              >
                Speed: {boat.Speed},
                Length: {boat.Length},
                Beam: {boat.Beam},
                Draft: {boat.Draft},
                Manoeuvrability: {boat.Manoeuvrability}
            </MenuItem>
            )
          })};
        </Select>
          </div>
          );
    }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
            <Grid item xs={4}>
              <p>Enter boat parameters</p>
              <p>Choose predefined boat parameters:</p>
              <TableBoat
              />

              {/* <div>
                 <label>Speed (knots):
                  <input {...register("userInput.boat.speed", {valueAsNumber: true})}
                    type="number"
                    required
                    value={userInput.boat.speed}
                    onChange={(ev) => setUserInput({...userInput, boat: {...userInput.boat, speed: ev.target.value}})}
                    />
                </label>
              </div>      */}
              {/* <div>
                <label>Length (m):
                  <input {...register("userInput.boat.length", {valueAsNumber: true})}
                  type="number"
                  required
                  value={userInput.boat.length}
                  onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,length: ev.target.value}})}
                  />
                </label>
              </div> */}
              {/* <div>
                <label>Beam (m):
                  <input {...register("userInput.boat.beam", {valueAsNumber: true})}
                  type="number"
                  required
                  value={userInput.boat.beam}
                  onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,beam: ev.target.value}})}
                  />
                </label>
              </div> */}
              {/* <div>
                <label>Draft (m):
                  <input {...register("userInput.boat.draft", {valueAsNumber: true})}
                  type="number"
                  required
                  value={userInput.boat.draft}
                  onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,draft: ev.target.value}})}
                  />
                </label>
              </div> */}
              {/* <div>
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
              </div> */}
            </Grid>
            <Grid item xs={4}>
            <p>Enter fairway parameters</p>
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
                        {...userInput.navilinja.calculation_params.other,visibility:ev.target.value}}}})}/>
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
           </Grid>
            <Grid item xs={4}>
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

            </Grid>
            <Grid item xs={4}>
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
            </Grid>
        </Grid>
      </Box>
    <button
      type="submit"
      onClick={handleSubmit}
      >Submit
      </button>
    </form>
  );
}

export default UserInputForm;

