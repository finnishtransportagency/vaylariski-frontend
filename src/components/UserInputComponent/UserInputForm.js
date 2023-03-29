import { useState } from "react";

import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  Grid,
  Menu,
  popoverClasses,
  TextField,
} from "@mui/material";
import { Field } from "formik";

import { AiOutlineInfoCircle } from "react-icons/ai";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BoatMenuComponent from "./BoatMenuComponent";
import WayareaComponent from "./WayareaComponent";
import PropTypes from "prop-types";
import { padding } from "@mui/system";

function UserInputForm(props) {
  const { children, tabValue, tabIndex, formik, ...other } = props;

  // const [vaylatInputValue, setVaylatInputValue] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringDepth, setIsHoveringDepth] = useState(false);
  const [isHoveringWind, setIsHoveringWind] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState({});
  const [selectedWayarea, setSelectedWayarea] = useState({});

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleMouseOverDepth = () => {
    setIsHoveringDepth(true);
  };
  const handleMouseOutDepth = () => {
    setIsHoveringDepth(false);
  };
  const handleMouseOverWind = () => {
    setIsHoveringWind(true);
  };
  const handleMouseOutWind = () => {
    setIsHoveringWind(false);
  };

  // This is passed to BoatMenuComponent, which then calls it
  function setDefaultBoatValues(newBoat) {
    console.log('setDefaultBoatValues', newBoat);
    if (newBoat) {
      setSelectedBoat(newBoat);
      formik.setFieldValue("boat.draft", newBoat.SYVAYS);
      formik.setFieldValue("boat.length", newBoat.PITUUS);
      formik.setFieldValue("boat.beam", newBoat.LEVEYS);
    } else {
      setSelectedBoat({});
      formik.setFieldValue("boat.draft", "");
      formik.setFieldValue("boat.length", "");
      formik.setFieldValue("boat.beam", "");
    }
  }
  function setDefaultWayareaName(wayarea) {
    console.log(wayarea);
    if (wayarea) {
      setSelectedWayarea(wayarea);
      formik.setFieldValue("navline.VAYLAT", wayarea.VAYLAT);
    } else {
      setSelectedWayarea({});
      formik.setFieldValue("navline.VAYLAT", "");
    }
  }

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <Grid container spacing={1} style={{ padding: 20 }}>
          <Grid item xs={3.99}>
            <Grid container spacing={1} paddingBottom={2} paddingRight={1} paddingLeft={2}>
              <Grid container spacing={1} paddingBottom={2}> {/*väylämenu*/}
                <Grid item xs={12}>
                  <WayareaComponent
                    setDefaultWayareaName={setDefaultWayareaName}
                    name="navline.VAYLAT"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    S-mutkan laskenta{" "}
                  </Typography>
                  <label htmlFor="navline.starting_gdo_gid">
                    Ensimmäinen navigointilinjan tunnus (GDO_GID):
                  </label>
                  <Field
                    component="input"
                    name="navline.starting_gdo_gid"
                    type="number"
                    style={{
                      width: 100,
                    }}
                  ></Field>
                  <Typography color="textSecondary" style={{ fontSize: 14 }}>
                    Jos halutaan laskea s-mutkan suora, annetaan navigointilinjan
                    ensimmäinen GDO_GID. Esim. Oulun väylällä (100) ensimmäinen GDO_GID on
                    227903 ja Turun väylällä (3255) ensimmäinen GDO_GID on 204344.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}> {/*Laivamenu */}
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Valitse alus
                  </Typography>
                  {/* Menu selector for default boat values */}
                  <BoatMenuComponent
                    setDefaultBoatValues={setDefaultBoatValues}
                    name="boat"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}> {/* Laivan koko*/}
                <Grid item xs={3}>
                  <label htmlFor="boat.length">Pituus (m):</label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    component="input"
                    name="boat.length"
                    type="number"
                    required
                    style={{
                      width: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <label htmlFor="boat.beam">Leveys (m):</label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    component="input"
                    name="boat.beam"
                    type="number"
                    required
                    style={{
                      width: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <label htmlFor="boat.draft">Syväys (m):</label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    component="input"
                    name="boat.draft"
                    type="number"
                    required
                    style={{
                      width: 100,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}> {/*Laivan tiedot*/}
                <Grid item>
                  <Typography style={{ fontSize: 14 }}>
                    Väylän tunnus: {selectedBoat.JNRO}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: 14 }}>
                    Väylän nimi: {selectedBoat.VAY_NIMISU}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: 14 }}>
                    Koko: {selectedBoat.KOKO}
                  </Typography>
                </Grid>
                {/* <Grid item>     EI YHTÄÄN ARVOA TÄLLE?!
                  <Typography style={{ fontSize: 14 }}>
                    RUNKO_TKERROIN: {selectedBoat.RUNKO_TKERROIN}
                  </Typography>
                </Grid> */}
                <Grid item>
                  <Typography style={{ fontSize: 14 }}>
                    Selite: {selectedBoat.SELITE}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}>{/* Ohjailtavuus */}
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label htmlFor="">Aluksen ohjailtavuusluokka</label>
                  </Typography>
                </Grid>
                <Grid item>
                  <label htmlFor="boat.manoeuvrability">
                    <Field
                      component="input"
                      name="boat.manoeuvrability"
                      type="radio"
                      value="good"
                      id="good"
                    />
                    Hyvä
                  </label>
                </Grid>
                <Grid item>
                  <label htmlFor="boat.manoeuvrability">
                    <Field
                      component="input"
                      type="radio"
                      name="boat.manoeuvrability"
                      value="moderate"
                      id="moderate"
                    />
                    Keskiverto
                  </label>
                </Grid>
                <Grid item>
                  <label htmlFor="boat.manoeuvrability">
                    <Field
                      component="input"
                      type="radio"
                      name="boat.manoeuvrability"
                      value="poor"
                      id="poor"
                    />
                    Heikko
                  </label>

                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}>{/* Nopeusluokka */}
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Aluksen nopeusluokka
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="boat.speed">
                    <Field
                      type="radio"
                      name="boat.speed"
                      value="fast"
                      id="fast"
                    />
                    Nopea
                  </label>
                </Grid>
                <Grid item xs={8}>
                  <label>{"v ≥ "}</label>
                  <input
                    disabled
                    type="number"
                    required
                    style={{
                      width: 80,
                      backgroundColor: "#ced6d8",
                    }}
                    placeholder="nopeus"
                    defaultValue={12}
                  />
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="boat.speed">
                    <Field
                      type="radio"
                      name="boat.speed"
                      value="moderate"
                      id="moderate"
                    />
                    Keskiverto
                  </label>
                </Grid>
                <Grid item xs={8}>
                  <input
                    disabled
                    type="number"
                    required
                    style={{
                      width: 80,
                      backgroundColor: "#ced6d8",
                    }}
                    placeholder="nopeus"
                    defaultValue={8}
                  />
                  <label>{"≤ v <"}</label>
                  <input
                    disabled
                    type="number"
                    required
                    style={{
                      width: 80,
                      backgroundColor: "#ced6d8",
                    }}
                    placeholder="nopeus"
                    defaultValue={12}
                  />
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="boat.speed">
                    <Field
                      name="boat.speed"
                      type="radio"
                      value="slow"
                      id="slow"
                    />
                    Hidas
                  </label>
                </Grid>
                <Grid item xs={8}>
                  <input
                    disabled
                    type="number"
                    required
                    style={{
                      width: 80,
                      backgroundColor: "#ced6d8",
                    }}
                    placeholder="nopeus"
                    defaultValue={5}
                  />
                  <label>{"≤ v <"}</label>
                  <input
                    disabled
                    type="number"
                    required
                    style={{
                      width: 80,
                      backgroundColor: "#ced6d8",
                    }}
                    placeholder="nopeus"
                    defaultValue={8}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs={3.99}>
            {/* Väylän parametrit */}
            <Grid container spacing={1} paddingBottom={2} paddingRight={1} paddingLeft={2}>
              {/* Tyyppi jne. */}
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >Väylän parametrit
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="navline.calculation_params.type">
                    {" "}
                    Tyyppi:{" "}
                  </label>
                </Grid>
                <Grid item xs={8}>
                  <Field
                    component="select"
                    name="navline.calculation_params.type"
                  >
                    <option value="inner">Väylän sisäosa</option>
                    <option value="outer">Väylän ulko-osa</option>
                  </Field>
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="navline.calculation_params.number_of_lanes">
                    {" "}
                    Kaistat:{" "}
                  </label>
                </Grid>
                <Grid item xs={8}>
                  <Field
                    component="select"
                    name="navline.calculation_params.number_of_lanes"
                  >
                    <option value={2}>Kaksinen väylä</option>
                    <option value={1}>Yksisuuntainen väylä</option>
                  </Field>
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="navline.calculation_params.bottom_surface">
                    {" "}Pohja:{" "}
                  </label>
                </Grid>
                <Grid item xs={8}>
                  <Field
                    component="select"
                    name="navline.calculation_params.bottom_surface"
                  >
                    <option value="smooth_and_soft">Sileä ja pehmeä</option>
                    <option value="rough_and_hard">Epätasainen ja kova</option>
                  </Field>
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="navline.calculation_params.other.visibility">
                    {" "}
                    Näkyvyys (m):{" "}
                  </label>
                </Grid>
                <Grid item xs={8}>
                  <Field
                    component="input"
                    name="navline.calculation_params.other.visibility"
                    type="number"
                    required
                    style={{
                      width: 100,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Väylän syvyyden painokerroin
                  </Typography>
                  <div>
                    <div
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <AiOutlineInfoCircle />
                    </div>
                    {isHovering && (
                      <Typography
                        style={{ fontSize: 14 }}
                        color="black"
                        gutterBottom
                      >
                        {" "}
                        Syvyyden painokerroin kerrotaan aluksen leveydellä
                        alla näkyvien määritysten perusteella, joihin
                        vaikuttaa väylän syvyys ja aluksen syväys. Laskennassa
                        voi käyttää oletusarvoja tai määrittää uudet
                        painokertoimet.
                      </Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <label> Väylän sisäosa: </label>
                </Grid>
                <Grid item xs={6}>
                  <label> Väylän ulko-osa: </label>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <label style={{ fontSize: 14 }}>
                      syvyys ≥ 1.5 * syväys
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="channel_depth_wf.deep_inner_channel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 130,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>
                      1.15*syväys ≤ syvyys 1.5*syväys
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="channel_depth_wf.medium_deep_inner_channel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 130,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>
                      {"syvyys < 1.15*syväys"}
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="channel_depth_wf.shallow_inner_channel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 130,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <label style={{ fontSize: 14 }}>
                      syvyys ≥ 1.5 * syväys
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="channel_depth_wf.deep_outer_channel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 130,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>
                      1.25*syväys ≤ syvyys 1.5*syväys
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="channel_depth_wf.medium_deep_outer_channel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 130,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>
                      {"syvyys < 1.25*syväys"}
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="channel_depth_wf.shallow_outer_channel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 130,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Väylän reuna ja reunan painokerroin
                  </Typography>
                  <div>
                    <div
                      onMouseOver={handleMouseOverDepth}
                      onMouseOut={handleMouseOutDepth}
                    >
                      <AiOutlineInfoCircle />
                    </div>
                    {isHoveringDepth && (
                      <Typography
                        style={{ fontSize: 14 }}
                        color="black"
                        gutterBottom
                      >
                        <label>
                          {" "}
                          Riskiarvon laskentaan valitaan väylän reunan tyyppi.
                          Alla on esitetty myös reunan painokertoimet joihin
                          vaikuttaa reunan tyyppi sekä aluksen nopeusluokka.
                          Painokerroin ja aluksen leveys kerrotaan
                          laskennassa. Laskennassa voi käyttää oletusarvoja
                          tai määrittää uudet painokertoimet.
                        </label>
                      </Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="navline.calculation_params.channel_edge">
                    <Field
                      type="radio"
                      name="navline.calculation_params.channel_edge"
                      value="gentle_slope"
                      id="gentle_slope"
                    />
                    Loiva kaltevuus
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <label>
                    <Field
                      type="radio"
                      name="navline.calculation_params.channel_edge"
                      value="sloping_edges"
                      id="sloping_edges"
                    />
                    Viistot reunat
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <label>
                    <Field
                      type="radio"
                      name="navline.calculation_params.channel_edge"
                      value="steep_and_hard"
                      id="steep_and_hard"
                    />
                    Jyrkkä ja kova
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <label style={{ fontSize: 14 }}>nopea</label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_gentle_fast"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>keskiverto</label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_gentle_moderate"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>hidas</label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_gentle_slow"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
                <Grid item xs={4}>

                  <div>
                    <label
                      htmlFor="bank_clearance_wf.edge_category_sloping_fast"
                      style={{ fontSize: 14 }}
                    >
                      nopea
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_sloping_fast"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>keskiverto</label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_sloping_moderate"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>hidas</label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_sloping_slow"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
                <Grid item xs={4}>

                  <div>
                    <label
                      htmlFor="bank_clearance_wf.edge_category_steep_fast"
                      style={{ fontSize: 14 }}
                    >
                      nopea
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_steep_fast"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>keskiverto</label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_steep_moderate"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label style={{ fontSize: 14 }}>hidas</label>
                  </div>
                  <Field
                    component="input"
                    name="bank_clearance_wf.edge_category_steep_slow"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingBottom={2}>
                {/* ATN */}
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Vesiliikenteeseen vaikuttavat tekijät
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="navline.calculation_params.aids_to_navigation">
                    {" "}
                    Turvalaitteet (ATN):{" "}
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component="select"
                    name="navline.calculation_params.aids_to_navigation"
                  >
                    <option value="excellent">Erinomainen</option>
                    <option value="good">Hyvä</option>
                    <option value="moderate">Keskiverto</option>
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="navline.calculation_params.light_pollution">
                    {" "}
                    Taustavalon voimakkuus:{" "}
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component="select"
                    name="navline.calculation_params.light_pollution"
                  >
                    <option value="negligible">Olematon</option>
                    <option value="low">Heikko</option>
                    <option value="moderate">Keskiverto</option>
                    <option value="strong">Voimakas</option>
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="navline.calculation_params.other.traffic_volume">
                    {" "}
                    Liikenteen määrä:{" "}
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component="select"
                    name="navline.calculation_params.other.traffic_volume"
                  >
                    <option value="negligible">Olematon</option>
                    <option value="low">Matala</option>
                    <option value="moderate">Keskiverto</option>
                    <option value="heavy">Runsas</option>
                    <option value="very_heavy">Todella runsas</option>
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="navline.calculation_params.other.traffic_complexity">
                    {" "}
                    Liikenteen monimutkaisuus:{" "}
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component="select"
                    name="navline.calculation_params.other.traffic_complexity"
                  >
                    <option value="negligible">Olematon</option>
                    <option value="low">Matala</option>
                    <option value="moderate">Keskiverto</option>
                    <option value="high">Monimutkainen</option>
                    <option value="very_high">Erittäin monimutkainen</option>
                  </Field>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs={3.99}>
            {/* Vesiliikenteen olosuhteet */}
            <Grid container spacing={1} paddingBottom={2} paddingRight={1} paddingLeft={2}>
              {/* Tuuli */}
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 550 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Vesiliikenteen olosuhteet
                  </Typography>
                  {/* Tuuli */}

                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label>
                      Tuulen nopeusluokka sekä tuulen painokertoimet:
                    </label>
                  </Typography>
                  <div>
                    <div
                      onMouseOver={handleMouseOverWind}
                      onMouseOut={handleMouseOutWind}
                    >
                      <AiOutlineInfoCircle />
                    </div>
                    {isHoveringWind && (
                      <Typography
                        style={{ fontSize: 14 }}
                        color="black"
                        gutterBottom
                      >
                        <label>
                          {" "}
                          Riskiarvon laskentaan valitaan tuulen
                          nopeusluokka. Alla on esitetty myös tuulen
                          painokertoimet joihin vaikuttaa tuulen
                          nopeusluokka sekä aluksen nopeusluokka.
                          Painokerroin ja aluksen leveys kerrotaan
                          laskennassa. Laskennassa voi käyttää oletusarvoja
                          tai määrittää uudet painokertoimet.
                        </label>
                      </Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xs={4} >
                  <label htmlFor="navline.calculation_params.operating_conditions.wind_speed">
                    <Field
                      component="input"
                      type="radio"
                      name="navline.calculation_params.operating_conditions.wind_speed"
                      value="mild"
                      id="mild"
                    />
                    Heikko
                  </label>
                  <Typography
                    style={{ fontSize: 14 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    {"Tuuli < 7 m/s "}
                  </Typography>
                  <div>
                    <label
                      htmlFor="wind_wf.mild_wind_fast_vessel"
                      style={{ fontSize: 14 }}
                    >
                      nopea
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.mild_wind_fast_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label
                      htmlFor="wind_wf.mild_wind_moderate_vessel"
                      style={{ fontSize: 14 }}
                    >
                      keskiverto
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.mild_wind_moderate_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label
                      htmlFor="wind_wf.mild_wind_slow_vessel"
                      style={{ fontSize: 14 }}
                    >
                      hidas
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.mild_wind_slow_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="navline.calculation_params.operating_conditions.wind_speed">
                    <Field
                      component="input"
                      type="radio"
                      name="navline.calculation_params.operating_conditions.wind_speed"
                      value="moderate"
                      id="moderate"
                    />
                    Keskiverto
                  </label>
                  <Typography
                    style={{ fontSize: 14 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    {"Tuuli 7 -17 m/s"}
                  </Typography>
                  <div>
                    <label style={{ fontSize: 14 }}>nopea</label>
                  </div>
                  <Field
                    component="input"
                    type="number"
                    step="0.01"
                    name="wind_wf.moderate_wind_fast_vessel"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label
                      htmlFor="wind_wf.moderate_wind_moderate_vessel"
                      style={{ fontSize: 14 }}
                    >
                      keskiverto
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.moderate_wind_moderate_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label
                      htmlFor="wind_wf.moderate_wind_slow_vessel"
                      style={{ fontSize: 14 }}
                    >
                      hidas
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.moderate_wind_slow_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="navline.calculation_params.operating_conditions.wind_speed">
                    <Field
                      component="input"
                      type="radio"
                      name="navline.calculation_params.operating_conditions.wind_speed"
                      value="strong"
                      id="strong"
                    />
                    Voimakas
                  </label>
                  <Typography
                    style={{ fontSize: 14 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    {"Tuuli > 17 m/s"}
                  </Typography>
                  <div>
                    <label
                      htmlFor="wind_wf.strong_wind_fast_vessel"
                      style={{ fontSize: 14 }}
                    >
                      nopea
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.strong_wind_fast_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label
                      htmlFor="wind_wf.strong_wind_moderate_vessel"
                      style={{ fontSize: 14 }}
                    >
                      keskiverto
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.strong_wind_moderate_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                  <div>
                    <label
                      htmlFor="wind_wf.strong_wind_slow_vessel"
                      style={{ fontSize: 14 }}
                    >
                      hidas
                    </label>
                  </div>
                  <Field
                    component="input"
                    name="wind_wf.strong_wind_slow_vessel"
                    type="number"
                    step="0.01"
                    required
                    style={{
                      width: 100,
                    }}
                    placeholder="painokerroin"
                  />
                </Grid>
              </Grid>
              {/* Poikkivirtaus */}
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Poikkivirtaus:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Arvovälit poikkivirtauksen nopeudelle v [solmu]:
                  </Typography>
                </Grid>
                <Grid container spacing={1} paddingBottom={2}>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.cross_current_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.cross_current_speed"
                        value="negligible"
                        id="negligible"
                      />
                      Olematon
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wneg_lower"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={0.0}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                    <label>{"≤ v <"}</label>
                    <Field
                      disabled
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wneg_upper"
                      type="number"
                      step="0.01"
                      placeholder="nopeus"
                      defaultValue={0.2}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.cross_current_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.cross_current_speed"
                        value="low"
                        id="low"
                      />
                      Heikko
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wneg_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={0.2}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                    <label>{"≤ v <"}</label>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wlow_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={0.5}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.cross_current_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.cross_current_speed"
                        value="moderate"
                        id="moderate"
                      />
                      Keskiverto
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wlow_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={0.5}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                    <label>{"≤ v <"}</label>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wmod_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={1.5}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.cross_current_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.cross_current_speed"
                        value="strong"
                        id="strong"
                      />
                      Voimakas
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wmod_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={1.5}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                    <label>{"≤ v <"}</label>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.cross_current_Wstrong_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={2}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Pitkittäisvirtaus */}
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Pitkittäisvirtaus:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Arvovälit pitkittäisvirtauksen nopeudelle v [solmu]:
                  </Typography>
                </Grid>
                <Grid container spacing={1} paddingBottom={2}>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.longitudinal_current_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.longitudinal_current_speed"
                        value="negligible"
                        id="negligible"
                      />
                      Olematon
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.longitudinal_current_Wneg_lower"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={0}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                    <label>{"≤ v <"}</label>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.longitudinal_current_Wneg_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={1.5}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.longitudinal_current_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.longitudinal_current_speed"
                        value="moderate"
                        id="moderate"
                      />
                      Keskiverto
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.longitudinal_current_Wneg_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={1.5}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                    <label>{"≤ v <"}</label>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.longitudinal_current_Wmod_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={3}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.longitudinal_current_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.longitudinal_current_speed"
                        value="strong"
                        id="strong"
                      />
                      Voimakas
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <label>{"v ≥ "}</label>
                    <Field
                      component="input"
                      name="navline.calculation_params.operating_conditions.longitudinal_current_Wmod_upper"
                      type="number"
                      step="0.01"
                      disabled
                      placeholder="nopeus"
                      defaultValue={3}
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Aallon korkeus */}
              <Grid container spacing={1} paddingBottom={2}>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Aallon korkeus:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Arvovälit korkeudelle h [m]:
                  </Typography>
                </Grid>
                <Grid container spacing={1} paddingBottom={2}>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.wave_height">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.wave_height"
                        value="low"
                        id="low"
                      />
                      Matala
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <input
                      type="number"
                      disabled
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                      placeholder="aallon korkeus"
                      defaultValue={0.0}
                    />
                    <label>{"≤ h <"}</label>
                    <input
                      type="number"
                      disabled
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                      placeholder="aallon korkeus"
                      defaultValue={1.0}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.wave_height">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.wave_height"
                        value="moderate"
                        id="moderate"
                      />
                      Keskiverto
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <input
                      type="number"
                      disabled
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                      placeholder="aallon korkeus"
                      defaultValue={1.0}
                    />
                    <label>{"≤ h ≤"}</label>
                    <input
                      type="number"
                      disabled
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                      placeholder="aallon korkeus"
                      defaultValue={3.0}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.wave_height">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.wave_height"
                        value="high"
                        id="high"
                      />
                      Korkea
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <label>{"h > "}</label>
                    <input
                      type="number"
                      disabled
                      style={{
                        width: 80,
                        backgroundColor: "#ced6d8",
                      }}
                      placeholder="aallon korkeus"
                      defaultValue={3.0}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3.99}>
            <Grid container spacing={1} paddingBottom={2}>
              <Grid item xs={12}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 550 }}
                  color="textSecondary"
                  gutterBottom
                >
                  Mutkan painokertoimet
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  style={{ fontSize: 14, fontWeight: 550 }}
                  color="textSecondary"
                  gutterBottom
                >
                  PF<span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span> ja sen raja-arvot
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="PF_bend_parameters">
                  {" "}
                  PF<span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span> on painokerroin mutkan jyrkkyydelle suhteessa säteeseen, aluksen kääntösäteeseen ja alukseen pituuteen.
                  BSI = R<span style={{ verticalAlign: "sub", fontSize: 12 }}>b</span> /
                  C<span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span> * L, kun R on säde,
                  C<span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span> on kerroin, joka ilmaisee aluksen kääntösäteen ja
                  L on aluksen pituus. {" "}
                </label>
              </Grid>

              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_radius_1"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <label>{"BSI < "}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_1"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_radius_2"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_1"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
                <label>{"≤ BSI <"}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_2"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_radius_3"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_2"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
                <label>{"≤ BSI <"}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_3"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_radius_4"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_3"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
                <label>{"≤ BSI <"}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_4"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_radius_5"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <label>{"BSI ≥ "}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_ratio_lim_4"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  style={{ fontSize: 14, fontWeight: 550 }}
                  color="textSecondary"
                  gutterBottom
                >
                  PF<span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span> ja sen raja-arvot
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="PF_bend_parameters">
                  {" "}
                  PF<span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span> on painokerroin mutkan jyrkkyydelle suhteessa suuntakulmaan (α){" "}
                </label>
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_angle_1"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <label>{"α < "}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_1"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_angle_2"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_1"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
                <label>{"≤ α <"}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_2"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_angle_3"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_2"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
                <label>{"≤ α <"}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_3"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />

              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_angle_4"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_3"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
                <label>{"≤ α <"}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_4"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>{"PF"}
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
                </label>
                <Field
                  component="input"
                  name="PF_bend_parameters.PF_bend_angle_5"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <label>{" α ≥ "}</label>
                <Field
                  component="input"
                  name="PF_bend_parameters.bend_angle_lim_4"
                  type="number"
                  step="0.1"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <label>
                  {" "}
                  Kulman jyrkkyyden painokerroin lasketaan summasta
                  PF<span style={{ verticalAlign: "sub", fontSize: 12 }}>bend</span> =
                  PF<span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>+
                  PF<span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
                  {" "}
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          {/* Riskiarvojen painokerttoimet */}
          <Grid item xs={5}>
            <Typography
              style={{ fontSize: 16, fontWeight: 550 }}
              color="textSecondary"
              gutterBottom
            >
              <label>Riskiarvojen painokertoimet:</label>
            </Typography>
            <Grid container spacing={1} paddingBottom={2}>
              <Grid item xs={9}>
                <label htmlFor="weightfactors.WF_channel">
                  Väylä (WF channel):
                </label>
              </Grid>
              <Grid item xs={3}>
                <Field
                  component="input"
                  name="weightfactors.WF_channel"
                  type="number"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <label htmlFor="weightfactors.WF_bend">
                  Mutka (WF bend):
                </label>
              </Grid>
              <Grid item xs={3}>
                <Field
                  component="input"
                  name="weightfactors.WF_bend"
                  type="number"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <label htmlFor="weightfactors.WF_s_bend">
                  S-mutka (WF S-bend):
                </label>
              </Grid>
              <Grid item xs={3}>
                <Field
                  component="input"
                  name="weightfactors.WF_s_bend"
                  type="number"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <label htmlFor="weightfactors.WF_traffic_complexity">
                  Liikenteen monimutkaisuus (WF traffic complexity):
                </label>
              </Grid>
              <Grid item xs={3}>
                <Field
                  component="input"
                  name="weightfactors.WF_traffic_complexity"
                  type="number"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <label htmlFor="weightfactors.WF_reduced_visibility">
                  Heikentynyt näkyvyys (WF reduced visibility):
                </label>
              </Grid>
              <Grid item xs={3}>
                <Field
                  component="input"
                  name="weightfactors.WF_reduced_visibility"
                  type="number"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <label htmlFor="weightfactors.WF_light_pollution">
                  Taustavalon voimakkuus (WF light pollution):
                </label>
              </Grid>
              <Grid item xs={3}>
                <Field
                  component="input"
                  name="weightfactors.WF_light_pollution"
                  type="number"
                  required
                  style={{
                    width: 60,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Lähetä
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default UserInputForm;

UserInputForm.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
  formik: PropTypes.object,
};
