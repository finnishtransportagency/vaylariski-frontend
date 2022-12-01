import {useForm} from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import apiClient from "../http-common";

import BoatContext from "../contexts/Boat";
import RIVResultContext from "../contexts/RIVResult";
import FairwayContext from "../contexts/Fairway";
import UserInputContext from "../contexts/UserInput";
import { Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
 


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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item sx={12}>
          <Box sx={{ flexGrow: 100 }}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                {/* Laivan koko */}
                <Card
                  style={{
                    width: 600,
                    backgroundColor: 'rgb(181, 220, 255)',
                    marginTop: 5, 
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight:5 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              style={{ fontSize: 16 }}
                              color="textSecondary"
                              gutterBottom>
                              <label>Aluksen parametrit:</label>
                            </Typography>
                          </Grid>
                        </Grid>                    
                        <Grid container spacing={1}>
                          <Grid item xs={2}>
                            <label>Pituus (m):</label>
                          </Grid>
                          <Grid item xs={4}>
                            <input {...register("userInput.boat.length", {valueAsNumber: true})}
                              type="number"
                              required
                              value={userInput.boat.length}
                              onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,length: ev.target.value}})}
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={2}>
                            <label>Leveys (m):</label>
                          </Grid>
                          <Grid item xs={4}>
                            <input {...register("userInput.boat.beam", {valueAsNumber: true})}
                            type="number"
                            required
                            value={userInput.boat.beam}
                            onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,beam: ev.target.value}})}
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={2}>
                            <label>Syväys (m):</label>
                          </Grid>
                          <Grid item xs={4}>
                            <input {...register("userInput.boat.draft", {valueAsNumber: true})}
                              type="number"
                              required
                              value={userInput.boat.draft}
                              onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,draft: ev.target.value}})}
                              />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>   
                </Card>
                {/* Liikehdintäkyky */}
                <Card
                  style={{
                    width: 600,
                    backgroundColor: 'rgb(181, 220, 255)',
                    marginTop: 5, 
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight:5 }}>
                  <CardContent>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom>
                      <label>Aluksen liikehdintäkyky:</label>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom>
                          <label>Luokka:</label>
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom>
                          <label>Kääntönopeus (C_tr):</label>
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom>
                          <label>Manoeuvrability (C_m):</label>
                        </Typography>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <input type="radio" value="good" id="good"
                          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,manoeuvrability: ev.target.value}})}/>
                          <label for="good">Hyvä</label>
                        </Grid>
                        <Grid item xs={4}>
                          <input {...register("userInput.weightfactors.C_turning_radius", {valueAsNumber: true})}
                          type="number"
                          required
                          placeholder="C_tr"
                          defaultValue={4}
                          value={userInput.weightfactors.C_turning_radius}
                          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,C_turning_radius: ev.target.value}})}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <input {...register("userInput.weightfactors.C_manoeuvrability", {valueAsNumber: true})}
                            type="float"
                            required
                            placeholder="C_m"
                            defaultValue={1.3}
                            value={userInput.weightfactors.C_manoeuvrability}
                            onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,C_manoeuvrability: ev.target.value}})}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <input type="radio" value="moderate" id="moderate"
                          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,manoeuvrability: ev.target.value}})}/>
                          <label for="moderate">Keskiverto</label>
                        </Grid>
                        <Grid item xs={4}>
                          <input {...register("userInput.weightfactors.C_turning_radius", {valueAsNumber: true})}
                          type="number"
                          required
                          placeholder="C_tr"
                          defaultValue={5}
                          value={userInput.weightfactors.C_turning_radius}
                          onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,C_turning_radius: ev.target.value}})}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <input {...register("userInput.weightfactors.C_manoeuvrability", {valueAsNumber: true})}
                            type="float"
                            required
                            placeholder="C_m"
                            defaultValue={1.5}
                            value={userInput.weightfactors.C_manoeuvrability}
                            onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,C_manoeuvrability: ev.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={3}>
                          <input type="radio" value="poor" id="poor"                        
                          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,manoeuvrability: ev.target.value}})}/>
                          <label for="poor">Heikko</label>
                        </Grid>
                        <Grid item xs={4}>
                          <input {...register("userInput.weightfactors.C_turning_radius", {valueAsNumber: true})}
                            type="number"
                            required
                            placeholder="C_tr"
                            defaultValue={6}
                            value={userInput.weightfactors.C_turning_radius}
                            onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,C_turning_radius: ev.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={4}>
                          <input {...register("userInput.weightfactors.C_manoeuvrability", {valueAsNumber: true})}
                              type="float"
                              required
                              placeholder="C_m"
                              defaultValue={1.8}
                              value={userInput.weightfactors.C_manoeuvrability}
                              onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,C_manoeuvrability: ev.target.value}})}
                            />
                        </Grid>
                      </Grid>              
                    </Grid>
                  </CardContent>
                </Card>
                {/* Nopeusluokat */}
                <Card
                  style={{
                    width: 600,
                    backgroundColor: 'rgb(181, 220, 255)',
                    marginTop: 5, 
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight:5 }}>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom>
                          <label>Aluksen nopeusluokka:</label>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom>
                          <label>Arvovälit nopeusluokille v [knots]:</label>
                        </Typography>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <input type="radio" value="fast" id="fast"                        
                          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,speed: ev.target.value}})}/>
                          <label for="fast">Nopea</label>
                        </Grid>
                        <Grid item xs={8}>
                          <label>{'v ≥ '}</label>
                          <input type="number" required
                            placeholder="nopeus"
                            defaultValue={12}/>
                        </Grid>
                        <Grid item xs={3}>
                          <input type="radio" value="moderate" id="moderate"
                          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,speed: ev.target.value}})}/>
                          <label for="moderate">Keskiverto</label>
                        </Grid>
                        <Grid item xs={8}>
                          <input type="number" required
                            placeholder="nopeus"
                            defaultValue={8}/> 
                          <label>{'≤ v <'}</label>
                          <input type="number" required
                            placeholder="nopeus"
                            defaultValue={12}/>
                        </Grid>
                        <Grid item xs={3}>
                          <input type="radio" value="slow" id="slow"                        
                          onChange={(ev) => setUserInput({...userInput,boat: {...userInput.boat,speed: ev.target.value}})}/>
                          <label for="slow">Hidas</label>
                        </Grid>
                        <Grid item xs={8}>
                          <input type="number" required
                            placeholder="nopeus"
                            defaultValue={5}/>
                            <label>{'≤ v <'}</label>
                          <input type="number" required
                            placeholder="nopeus"
                            defaultValue={8}/>
                        </Grid>
                      </Grid>              
                    </Grid>
                  </CardContent>
                </Card>
                {/* Riskiarvojen painokerttoimet */}
                <Card
                  style={{
                    width: 600,
                    backgroundColor: 'rgb(181, 220, 255)',
                    marginTop: 5, 
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight:5 }}>
                  <CardContent>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom>
                      <label>Riskiarvojen painokertoimet:</label>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={3.5}>
                        <label>WF channel:</label>
                      </Grid>
                      <Grid item xs={8}>
                        <input {...register("userInput.weightfactors.WF_channel", {valueAsNumber: true})}
                        type="number"
                        required
                        value={userInput.weightfactors.WF_channel}
                        onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_channel: ev.target.value}})}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3.5}>
                        <label>WF bend:</label>
                      </Grid>
                      <Grid item xs={8}>
                        <input {...register("userInput.weightfactors.WF_bend", {valueAsNumber: true})}
                        type="number"
                        required
                        value={userInput.weightfactors.WF_bend}
                        onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_bend: ev.target.value}})}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3.5}>
                        <label>WF S-bend:</label>
                      </Grid>
                      <Grid item xs={8}>
                        <input {...register("userInput.weightfactors.WF_s_bend", {valueAsNumber: true})}
                        type="number"
                        required
                        value={userInput.weightfactors.WF_s_bend}
                        onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_s_bend: ev.target.value}})}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3.5}>
                        <label>WF traffic complexity:</label>
                      </Grid>
                      <Grid item xs={8}>
                        <input {...register("userInput.weightfactors.WF_traffic_complexity", {valueAsNumber: true})}
                        type="number"
                        required
                        value={userInput.weightfactors.WF_traffic_complexity}
                        onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_traffic_complexity: ev.target.value}})}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3.5}>
                        <label>WF reduced visibility:</label>
                      </Grid>
                      <Grid item xs={8}>
                        <input {...register("userInput.weightfactors.WF_reduced_visibility", {valueAsNumber: true})}
                        type="number"
                        required
                        value={userInput.weightfactors.WF_reduced_visibility}
                        onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_reduced_visibility: ev.target.value}})}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3.5}>
                        <label>WF light pollution:</label>
                      </Grid>
                      <Grid item xs={8}>
                        <input {...register("userInput.weightfactors.WF_light_pollution", {valueAsNumber: true})}
                        type="number"
                        required
                        value={userInput.weightfactors.WF_light_pollution}
                        onChange={(ev) => setUserInput({...userInput,weightfactors: {...userInput.weightfactors,WF_light_pollution: ev.target.value}})}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {/* Esitysvärit */}
                <Card
                  style={{
                      width: 600,
                      backgroundColor: 'rgb(181, 220, 255)',
                      marginTop: 5, 
                      marginBottom: 5,
                      marginLeft: 5,
                      marginRight:5
                    }}>
                  <CardContent>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom>
                      Riskiarvojen esitysvärien raja-arvot:
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={2}>
                        <Box sx={{ bgcolor: 'success.main', color: 'success.contrastText', p: 1 }}>
                          Vihreä
                        </Box>
                      </Grid>
                      <Grid item xs={10}>
                      <input
                        type="number"
                        required
                        />
                      <label>{'≤ RIV <'}</label>
                      <input
                        type="number"
                        required
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Box sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', p: 1 }}>
                          Keltainen
                        </Box>
                      </Grid>
                      <Grid item xs={10}>
                      <input
                        type="number"
                        required
                        />
                      <label>{'≤ RIV <'}</label>                      
                      <input
                        type="number"
                        required
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Box sx={{ bgcolor: 'error.main', color: 'error.contrastText', p: 1 }}>
                          Punainen
                        </Box>
                      </Grid>
                      <Grid item xs={10}>
                      <input
                        type="number"
                        required
                        />
                      <label>{'≤ RIV <'}</label>     
                      <input
                        type="number"
                        required
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>    
                {/* Väylän parametrit */}
                <Card
                  style={{
                    width: 600,
                    backgroundColor: 'rgb(181, 220, 255)',
                    marginTop: 5, 
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight:5 }}>
                  <CardContent>
                    <label>Väylän id (VAYLAT):
                      <input {...register("navilinja.VAYLAT", {valueAsNumber: true})}
                      placeholder="VAYLAT"
                      type="number"
                      required
                      value={userInput.navilinja.VAYLAT}
                      onChange={(ev) => setUserInput({...userInput,navilinja: {...userInput.navilinja,VAYLAT: ev.target.value}})}
                      />
                    </label>
                  </CardContent>
                  <CardContent>
                    <Grid container spacing={1}>
                      <CardContent>
                        <Grid container spacing={1}>
                          <Grid item xs={6.5}>
                            <Typography
                              style={{ fontSize: 16 }}
                              color="textSecondary"
                              gutterBottom>
                              <label>Väylän parametrit:</label>
                            </Typography>
                          </Grid>
                          <Grid item xs={4.5}>
                            {/* <Typography
                              style={{ fontSize: 16 }}
                              color="textSecondary"
                              gutterBottom>
                              <label>Painokertoimet:</label>
                            </Typography> */}
                          </Grid>
                          <Grid container spacing={1}>
                            <Grid item xs={2.5}>
                              <label> Tyyppi: </label>
                            </Grid>
                            <Grid item xs={9.5}>
                              <select{...register("userInput.navilinja.calculation_params.type")}
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,type: ev.target.value}}})} >
                                <option defaultValue="inner">Sisävesiväylä</option>
                                <option value="outer">Ulkovesiväylä</option>
                              </select>
                            </Grid>
                            <Grid item xs={2.5}>
                              <label> Kaistat: </label>
                            </Grid>
                            <Grid item xs={4}>
                              <select{...register("userInput.navilinja.calculation_params.number_of_lanes")}
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,number_of_lanes: ev.target.value}}})} >
                                <option defaultValue={1}>Yksisuuntainen väylä</option>
                                <option value={2}>Kaksisuuntainen väylä</option>
                              </select>
                            </Grid>
                            <Grid item xs={5}>

                            </Grid>
                            <Grid item xs={2.5}>
                              <label> Pohja: </label>
                            </Grid>
                            <Grid item xs={4}>
                              <select{...register("userInput.navilinja.calculation_params.bottom_surface")}
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,bottom_surface: ev.target.value}}})} >
                                <option defaultValue="rough_and_hard">Rosoinen ja kova</option>
                                <option value="smooth_and_soft">Sileä ja pehmeä</option>
                              </select>
                            </Grid>
                            <Grid item xs={5}>
                              {/* <input type="number" 
                              required
                              placeholder="W"/> */}
                            </Grid>
                            <Grid item xs={2.5}>
                              <label> Näkyvyys (m): </label>
                            </Grid>
                            <Grid item xs={4}>
                              <input {...register("userInput.navilinja.calculation_params.other.visibility", {valueAsNumber: true})}
                                type="number"
                                required
                                value={userInput.navilinja.calculation_params.other.visibility}
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,other:
                                      {...userInput.navilinja.calculation_params.other,visibility:ev.target.value}}}})}/>
                            </Grid>
                            <Grid item xs={5}>
                              {/* <input type="number" required
                              placeholder="W"/> */}
                            </Grid>
                          </Grid>              
                        </Grid>
                      </CardContent>
                      <Card
                        style={{
                          width: 600,
                          backgroundColor: 'rgb(181, 220, 255)',
                          marginTop: 5, 
                          marginBottom: 5,
                          marginLeft: 5,
                          marginRight:5 }}>
                        <CardContent>
                          <Typography
                            style={{ fontSize: 16 }}
                            color="textSecondary"
                            gutterBottom>
                            <label>Väylän syvyyden painokerroin:</label>
                          </Typography>
                          <Typography
                            style={{ fontSize: 12 }}
                            color="textSecondary"
                            gutterBottom>
                              <label> Syvyyden painokerroin kerrotaan aluksen leveydellä alla näkyvien 
                              määritysten perusteella, joihin vaikuttaa väylän syvyys ja aluksen syväys. 
                              Laskennassa voi käyttää oletusarvoja tai määrittää uudet painokertoimet.
                            </label>
                          </Typography>
                          
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <label> Sisävesiväylä </label>
                            </Grid>
                            <Grid item xs={6}>
                              <label> Ulkovesiväylä </label>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField type="number" required
                                placeholder="painokerroin * aluksen leveys"
                                defaultValue={0.0}
                                size="small"
                                variant="filled"
                                label="syvyys ≥ 1.5 * syväys"/>
                              <TextField type="number" required
                                placeholder="W_moderate"
                                defaultValue={0.2}
                                size="small"
                                variant="filled"
                                label="1.15*syväys ≤ syvyys  1.5*syväys"/>
                              <TextField type="number" required
                                placeholder="W_moderate"
                                defaultValue={0.4}
                                size="small"
                                variant="filled"
                                label="syvyys < 1.15*syväys"/>
                            </Grid>                            
                            <Grid item xs={6}>
                              <TextField type="number" required
                                placeholder="W_fast"
                                defaultValue={0.0}
                                size="small"
                                variant="filled"
                                label="syvyys ≥ 1.5 * syväys"/>
                              <TextField type="number" required
                                placeholder="W_moderate"
                                defaultValue={0.1}
                                size="small"
                                variant="filled"
                                label="1.25*syväys ≤ syvyys  1.5*syväys"/>
                            <TextField type="number" required
                                placeholder="W_moderate"
                                defaultValue={0.2}
                                size="small"
                                variant="filled"
                                label="syvyys < 1.25*syväys"/>
                            </Grid>
                          </Grid> 
                        </CardContent>
                      </Card>
                      <Card
                        style={{
                          width: 600,
                          backgroundColor: 'rgb(181, 220, 255)',
                          marginTop: 5, 
                          marginBottom: 5,
                          marginLeft: 5,
                          marginRight:5 }}>
                        <CardContent>
                          <Typography
                            style={{ fontSize: 16 }}
                            color="textSecondary"
                            gutterBottom>
                            Väylän reuna ja reunan painokerroin:
                          </Typography>
                          <Typography
                            style={{ fontSize: 12 }}
                            color="textSecondary"
                            gutterBottom>
                            <label>Riskiarvon laskentaan valitaan väylän reunan tyyppi. 
                              Alla on esitetty myös reunan painokertoimet joihin vaikuttaa reunan tyyppi 
                              sekä aluksen nopeusluokka. Painokerroin ja aluksen leveys kerrotaan laskennassa. 
                              Laskennassa voi käyttää oletusarvoja tai määrittää uudet painokertoimet.</label>
                          </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <input type="radio" value="gentle_slope" id="gentle_slope"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,channel_edge: ev.target.value}}})} />
                                <label for="gentle_slope">Loiva kaltevuus</label>
                                <TextField type="number" required
                                  placeholder="W_fast"
                                  defaultValue={0.2}
                                  size="small"
                                  variant="filled"
                                  label="nopea"/>
                                <TextField type="number" required
                                  placeholder="W_moderate"
                                  defaultValue={0.1}
                                  size="small"
                                  variant="filled"
                                  label="keskiverto"/>
                                <TextField type="number" required
                                  placeholder="W_slow"
                                  defaultValue={0.0}
                                  size="small"
                                  variant="filled"
                                  label="hidas"/>
                              </Grid>
                              <Grid item xs={4}>
                                <input type="radio" value="sloping_edges" id="sloping_edges"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,sloping_edges: ev.target.value}}})} />
                                <label for="sloping_edges">Viistot reunat</label>
                                <TextField type="number" required
                                  placeholder="W_fast"
                                  defaultValue={0.7}
                                  size="small"
                                  variant="filled"
                                  label="nopea"/>
                                <TextField type="number" required
                                  placeholder="W_moderate"
                                  defaultValue={0.5}
                                  size="small"
                                  variant="filled"
                                  label="keskiverto"/>
                                <TextField type="number" required
                                  placeholder="W_slow"
                                  defaultValue={0.3}
                                  size="small"
                                  variant="filled"
                                  label="hidas"/>
                              </Grid>
                              <Grid item xs={4}>
                                <input type="radio" value="steep_and_hard" id="steep_and_hard"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,steep_and_hard: ev.target.value}}})} />
                                <label for="steep_and_hard">Jyrkkä ja kova</label>
                                <TextField type="number" required
                                  placeholder="W_fast"
                                  defaultValue={1.3}
                                  size="small"
                                  variant="filled"
                                  label="nopea"/>
                                <TextField type="number" required
                                  placeholder="W_moderate"
                                  defaultValue={1.0}
                                  size="small"
                                  variant="filled"
                                  label="keskiverto"/>
                                <TextField type="number" required
                                  placeholder="W_slow"
                                  defaultValue={0.5}
                                  size="small"
                                  variant="filled"
                                  label="hidas"/>
                              </Grid>
                            </Grid> 
                        </CardContent>
                      </Card>
                      <CardContent>
                        <Grid container spacing={0}>
                          <Grid container spacing={1}>
                            <Grid item xs={5}>
                              <label> ATN: </label>
                            </Grid>
                            <Grid item xs={5}>
                              <select{...register("userInput.navilinja.calculation_params.aids_to_navigation")}
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,aids_to_navigation: ev.target.value}}})} >
                                <option defaultValue="excellent">Erinomainen</option>
                                <option value="good">Hyvä</option>
                                <option value="moderate">Keskiverto</option>
                              </select>
                            </Grid>
                            <Grid item xs={5}>
                              <label> Liikenteen määrä: </label>
                            </Grid>
                            <Grid item xs={4}>
                              <select{...register("userInput.navilinja.calculation_params.other.traffic_volume")}
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,other:
                                        {...userInput.navilinja.calculation_params.other,traffic_volume:ev.target.value}}}})} >
                                  <option defaultValue="negligible">Olematon</option>
                                  <option value="low">Matala</option>
                                  <option value="moderate">Keskiverto</option>
                                  <option value="heavy">Runsas</option>
                                  <option value="very_heavy">Todella runsas</option>
                                </select>
                            </Grid>
                            <Grid item xs={5}>
                              <label> Liikenteen monimutkaisuus: </label>
                            </Grid>
                            <Grid item xs={4}>
                              <select{...register("userInput.navilinja.calculation_params.other.traffic_complexity")}
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,other:
                                      {...userInput.navilinja.calculation_params.other,traffic_complexity:ev.target.value}}}})} >
                                <option defaultValue="negligible">Olematon</option>
                                <option value="low">Matala</option>
                                <option value="moderate">Keskiverto</option>
                                <option value="heavy">Monimutkainen</option>
                                <option value="very_heavy">Erittäin monimutkainen</option>
                              </select>
                            </Grid>
                            <Grid item xs={5}>
                              <label> Keinovalon määrä: </label>
                            </Grid>
                            <Grid item xs={5}>
                              <select{...register("userInput.navilinja.calculation_params.light_pollution")}
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,light_pollution: ev.target.value}}})} >
                                <option defaultValue="strong">Voimakas</option>
                                <option value="moderate">Keskiverto</option>
                                <option value="low">Heikko</option>
                                <option value="negligible">Olematon</option>
                              </select>
                            </Grid>
                          </Grid>              
                        </Grid>
                      </CardContent>   
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                {/* Merenkulun olosuhteet */}
                <Card
                  style={{
                    width: 600,
                    backgroundColor: 'rgb(181, 220, 255)',
                    marginTop: 5, 
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight:5 }}>
                  <CardContent>
                    <Grid container spacing={0}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom>
                      Merenkulun olosuhteet:
                    </Typography>
                      {/* Tuuli */}
                      <Card
                        style={{
                          width: 600,
                          backgroundColor: 'rgb(181, 220, 255)',
                          marginTop: 5, 
                          marginBottom: 5,
                          marginLeft: 5,
                          marginRight:5 }}>
                        <CardContent>
                          <Typography
                            style={{ fontSize: 16 }}
                            color="textSecondary"
                            gutterBottom>
                            <label>Tuulen nopeusluokka sekä tuulen painokertoimet:</label>
                          </Typography>
                          <Typography
                            style={{ fontSize: 12 }}
                            color="textSecondary"
                            gutterBottom>
                            <label>Riskiarvon laskentaan valitaan tuulen nopeusluokka. 
                              Alla on esitetty myös tuulen painokertoimet joihin vaikuttaa tuulen nopeusluokka
                              sekä aluksen nopeusluokka. Painokerroin ja aluksen leveys kerrotaan laskennassa. 
                              Laskennassa voi käyttää oletusarvoja tai määrittää uudet painokertoimet.
                            </label>
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <input type="radio" value="mild" id="mild"
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,channel_edge: ev.target.value}}})} />
                              <label for="mild">Heikko</label>
                              <Typography
                                style={{ fontSize: 12 }}
                                color="textSecondary"
                                gutterBottom>
                                <label>{"Tuulen nopeus < 7 m/s"}</label>
                              </Typography>
                              <TextField type="number" required
                                placeholder="W_fast"
                                defaultValue={0.1}
                                size="small"
                                variant="filled"
                                label="nopea"/>
                              <TextField type="number" required
                                placeholder="W_moderate"
                                defaultValue={0.2}
                                size="small"
                                variant="filled"
                                label="keskiverto"/>
                              <TextField type="number" required
                                placeholder="W_slow"
                                defaultValue={0.3}
                                size="small"
                                variant="filled"
                                label="hidas"/>
                            </Grid>
                            <Grid item xs={4}>
                              <input type="radio" value="sloping_edges" id="sloping_edges"
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,sloping_edges: ev.target.value}}})} />
                              <label for="sloping_edges">Keskiverto</label>
                              <Typography
                                style={{ fontSize: 12 }}
                                color="textSecondary"
                                gutterBottom>
                                <label>{"Tuulen nopeus 7 -17 m/s"}</label>
                              </Typography>
                              <TextField type="number" required
                                placeholder="W_fast"
                                defaultValue={0.3}
                                size="small"
                                variant="filled"
                                label="nopea"/>
                              <TextField type="number" required
                                placeholder="W_moderate"
                                defaultValue={0.4}
                                size="small"
                                variant="filled"
                                label="keskiverto"/>
                              <TextField type="number" required
                                placeholder="W_slow"
                                defaultValue={0.6}
                                size="small"
                                variant="filled"
                                label="hidas"/>
                            </Grid>
                            <Grid item xs={4}>
                              <input type="radio" value="steep_and_hard" id="steep_and_hard"
                                onChange={(ev) => setUserInput({...userInput,navilinja:
                                  {...userInput.navilinja,calculation_params:
                                    {...userInput.navilinja.calculation_params,steep_and_hard: ev.target.value}}})} />
                              <label for="steep_and_hard">Voimakas</label>
                              <Typography
                                style={{ fontSize: 12 }}
                                color="textSecondary"
                                gutterBottom>
                                <label>{"Tuulen nopeus > 17 m/s"}</label>
                              </Typography>
                              <TextField type="number" required
                                placeholder="W_fast"
                                defaultValue={0.5}
                                size="small"
                                variant="filled"
                                label="nopea"/>
                              <TextField type="number" required
                                placeholder="W_moderate"
                                defaultValue={0.7}
                                size="small"
                                variant="filled"
                                label="keskiverto"/>
                              <TextField type="number" required
                                placeholder="W_slow"
                                defaultValue={1.1}
                                size="small"
                                variant="filled"
                                label="hidas"/>
                            </Grid>
                          </Grid> 
                        </CardContent>
                      </Card>
                      {/* Poikkivirtaus */}
                      <Card
                        style={{
                          width: 600,
                          backgroundColor: 'rgb(181, 220, 255)',
                          marginTop: 5, 
                          marginBottom: 5,
                          marginLeft: 5,
                          marginRight:5 }}>
                        <CardContent>
                          <Grid container spacing={1}>
                            <Grid item xs={3}>
                              <Typography
                                style={{ fontSize: 16 }}
                                color="textSecondary"
                                gutterBottom>
                                <label>Poikkivirtaus:</label>
                              </Typography>
                            </Grid>
                            <Grid item xs={9}>
                              <Typography
                                style={{ fontSize: 16 }}
                                color="textSecondary"
                                gutterBottom>
                                <label>Arvovälit poikkivirtauksen nopeudelle v [knots]:</label>
                              </Typography>
                            </Grid>
                            <Grid container spacing={1}>
                              <Grid item xs={3}>
                                <input type="radio" value="negligible" id="negligible"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,cross_current_speed:ev.target.value}}}})} />
                                <label for="negligible">Olematon</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={0.0}/> 
                                <label>{'≤ v <'}</label>  
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={0.2}/> 
                              </Grid>
                              <Grid item xs={3}>
                                <input type="radio" value="low" id="low"                        
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,cross_current_speed:ev.target.value}}}})} />
                                <label for="low">Heikko</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={0.2}/> 
                                <label>{'≤ v <'}</label> 
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={0.5}/>
                              </Grid>
                              <Grid item xs={3}>
                                <input type="radio" value="moderate" id="moderate"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,cross_current_speed:ev.target.value}}}})} />
                                <label for="moderate">Keskiverto</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={0.5}/> 
                                <label>{'≤ v <'}</label>  
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={1.5}/> 
                              </Grid>
                              <Grid item xs={3}>
                                <input type="radio" value="strong" id="strong"                        
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,cross_current_speed:ev.target.value}}}})} />
                                <label for="strong">Voimakas</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={1.5}/>
                                <label>{'≤ v <'}</label> 
                                <input type="number" required
                                placeholder="W"
                                defaultValue={2.0}/> 
                              </Grid>
                            </Grid>              
                          </Grid>
                        </CardContent>
                      </Card>
                      {/* Pitkittäisvirtaus */}
                      <Card
                        style={{
                          width: 600,
                          backgroundColor: 'rgb(181, 220, 255)',
                          marginTop: 5, 
                          marginBottom: 5,
                          marginLeft: 5,
                          marginRight:5 }}>
                        <CardContent>
                          <Grid container spacing={1}>
                            <Grid item xs={3}>
                              <Typography
                                style={{ fontSize: 16 }}
                                color="textSecondary"
                                gutterBottom>
                                Pitkittäisvirtaus:
                              </Typography>
                            </Grid>
                            <Grid item xs={9}>
                              <Typography
                                style={{ fontSize: 16 }}
                                color="textSecondary"
                                gutterBottom>
                                <label>Arvovälit pitkittäisvirtauksen nopeudelle v [knots]:</label>
                              </Typography>
                            </Grid>
                            <Grid container spacing={1}>
                              <Grid item xs={3}>
                                <input type="radio" value="negligible" id="negligible"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,longitudinal_current_speed:ev.target.value}}}})}/>
                                <label for="negligible">Olematon</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={0.0}/> 
                                <label>{'≤ v <'}</label> 
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={1.5}/>
                              </Grid>
                              <Grid item xs={3}>
                                <input type="radio" value="moderate" id="moderate"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,longitudinal_current_speed:ev.target.value}}}})}/>                                <label for="moderate">Keskiverto</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={1.5}/> 
                                <label>{'≤ v <'}</label>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={3.0}/> 
                              </Grid>
                              <Grid item xs={3}>
                                <input type="radio" value="strong" id="strong"                        
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,longitudinal_current_speed:ev.target.value}}}})}/>
                                <label for="strong">Voimakas</label>
                              </Grid>
                              <Grid item xs={9}>
                                <label>{'v ≥ '}</label>
                                <input type="number" required
                                  placeholder="W"
                                  defaultValue={3.0}/>
                              </Grid>
                            </Grid>              
                          </Grid>
                        </CardContent>
                      </Card>
                      {/* Aallon korkeus */}
                      <Card
                        style={{
                          width: 600,
                          backgroundColor: 'rgb(181, 220, 255)',
                          marginTop: 5, 
                          marginBottom: 5,
                          marginLeft: 5,
                          marginRight:5 }}>
                        <CardContent>
                          <Grid container spacing={1}>
                            <Grid item xs={3}>
                              <Typography
                                style={{ fontSize: 16 }}
                                color="textSecondary"
                                gutterBottom>
                                Aallon korkeus:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                style={{ fontSize: 16 }}
                                color="textSecondary"
                                gutterBottom>
                                Arvovälit korkeudelle h [m]:
                              </Typography>
                            </Grid>
                            <Grid container spacing={1}>
                              <Grid item xs={3}>
                                <input type="radio" value="negligible" id="negligible"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,wave_height:ev.target.value}}}})}/>
                                <label for="negligible">Matala</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="aallon korkeus"
                                  defaultValue={0.0}/> 
                                <label>{'≤ h <'}</label> 
                                <input type="number" required
                                  placeholder="aallon korkeus"
                                  defaultValue={1.0}/>
                              </Grid>
                              <Grid item xs={3}>
                                <input type="radio" value="moderate" id="moderate"
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,wave_height:ev.target.value}}}})}/>
                                <label for="moderate">Keskiverto</label>
                              </Grid>
                              <Grid item xs={9}>
                                <input type="number" required
                                  placeholder="aallon korkeus"
                                  defaultValue={1.0}/>
                                <label>{'≤ h ≤'}</label>
                                <input type="number" required
                                  placeholder="aallon korkeus"
                                  defaultValue={3.0}/>
                              </Grid>
                              <Grid item xs={3}>
                                <input type="radio" value="strong" id="strong"                        
                                  onChange={(ev) => setUserInput({...userInput,navilinja:
                                    {...userInput.navilinja,calculation_params:
                                      {...userInput.navilinja.calculation_params,operating_conditions:
                                        {...userInput.navilinja.calculation_params.operating_conditions,wave_height:ev.target.value}}}})}/>
                                <label for="strong">Voimakas</label>
                              </Grid>
                              <Grid item xs={9}>
                                <label>{'h > '}</label>
                                <input type="number" required
                                  placeholder="aallon korkeus"
                                  defaultValue={3.0}/> 
                              </Grid>
                            </Grid>              
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    <button
      type="submit"
      onClick={handleSubmit}
      >Submit
      </button>
    </form>
  );
}

export default UserInputForm;
