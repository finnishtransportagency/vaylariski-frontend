import { useState } from "react";

import {
  Autocomplete,
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
import { VAYLATids } from "../../constants/VAYLAT_ids.js";
import PropTypes from "prop-types";


function UserInputForm(props) {
  const { children, tabValue, tabIndex, formik, ...other } = props;

  const [vaylatInputValue, setVaylatInputValue] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringDepth, setIsHoveringDepth] = useState(false);
  const [isHoveringWind, setIsHoveringWind] = useState(false);

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
    formik.setFieldValue('boat.draft', newBoat.draft);
    formik.setFieldValue('boat.length', newBoat.length);
    formik.setFieldValue('boat.beam', newBoat.beam);
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
        <Grid container spacing={1}style={{
                width: 1210}}>
          <Grid item xs={4}>
            {/* Laivan koko */}
            <Card
              style={{
                // width: 400,
                backgroundColor: "rgb(181, 220, 255)",
                // marginTop: 5,
                // marginBottom: 5,
                // marginLeft: 5,
                // marginRight: 5,
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom
                        >
                          Aluksen parametrit:
                        </Typography>
                        {/* Menu selector for default boat values */}
                        <BoatMenuComponent
                          setDefaultBoatValues={setDefaultBoatValues}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <label htmlFor="boat.length">Pituus (m):</label>
                      </Grid>
                      <Grid item xs={4}>
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
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <label htmlFor="boat.beam">Leveys (m):</label>
                      </Grid>
                      <Grid item xs={4}>
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
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <label htmlFor="boat.draft">Syväys (m):</label>
                      </Grid>
                      <Grid item xs={4}>
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
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* Liikehdintäkyky */}
            <Card
              style={{
                // width: 400,
                backgroundColor: "rgb(181, 220, 255)",
                // marginTop: 5,
                // marginBottom: 5,
                // marginLeft: 5,
                // marginRight: 5,
              }}
            >
              <CardContent>
                <Typography
                  style={{ fontSize: 16 }}
                  color="textSecondary"
                  gutterBottom
                >
                  <label htmlFor="">Aluksen liikehdintäkyky:</label>
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={3.5}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Luokka:
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Kääntönopeus (C_tr):
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Manoeuvrability (C_m):
                    </Typography>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={3.5}>
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
                    <Grid item xs={4}>
                      <Field
                        component="input"
                        name="manoeuvrability_params.C_turning_radius_good"
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="C_tr"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        component="input"
                        name="manoeuvrability_params.C_manoeuvrability_good"
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="C_m"
                      />
                    </Grid>
                    <Grid item xs={3.5}>
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
                    <Grid item xs={4}>
                      <Field
                        component="input"
                        name="manoeuvrability_params.C_turning_radius_moderate"
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="C_tr"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        component="input"
                        name="manoeuvrability_params.C_manoeuvrability_moderate"
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="C_m"
                      />
                    </Grid>
                    <Grid item xs={3.5}>
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
                    <Grid item xs={4}>
                      <Field
                        component="input"
                        name="manoeuvrability_params.C_turning_radius_poor"
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="C_tr"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        component="input"
                        name="manoeuvrability_params.C_manoeuvrability_poor"
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="C_m"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* Nopeusluokat */}
            <Card
              style={{
                // width: 400,
                backgroundColor: "rgb(181, 220, 255)",
                // marginTop: 5,
                // marginBottom: 5,
                // marginLeft: 5,
                // marginRight: 5,
              }}
            >
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Aluksen nopeusluokka:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Arvovälit nopeusluokille v [knots]:
                    </Typography>
                  </Grid>
                  <Grid container spacing={1}>
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
                        type="number"
                        required
                        style={{
                          width: 80,
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
                        type="number"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="nopeus"
                        defaultValue={8}
                      />
                      <label>{"≤ v <"}</label>
                      <input
                        type="number"
                        required
                        style={{
                          width: 80,
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
                        type="number"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="nopeus"
                        defaultValue={5}
                      />
                      <label>{"≤ v <"}</label>
                      <input
                        type="number"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="nopeus"
                        defaultValue={8}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* Riskiarvojen painokerttoimet */}
            <Card
              style={{
                // width: 400,
                backgroundColor: "rgb(181, 220, 255)",
                // marginTop: 5,
                // marginBottom: 5,
                // marginLeft: 5,
                // marginRight: 5,
              }}
            >
              <CardContent>
                <Typography
                  style={{ fontSize: 16 }}
                  color="textSecondary"
                  gutterBottom
                >
                  <label>Riskiarvojen painokertoimet:</label>
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={9.5}>
                    <label htmlFor="weightfactors.WF_channel">
                      Väylä (WF channel):
                    </label>
                  </Grid>
                  <Grid item xs={2}>
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
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={9.5}>
                    <label htmlFor="weightfactors.WF_bend">
                      Mutka (WF bend):
                    </label>
                  </Grid>
                  <Grid item xs={2}>
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
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={9.5}>
                    <label htmlFor="weightfactors.WF_s_bend">
                      S-mutka (WF S-bend):
                    </label>
                  </Grid>
                  <Grid item xs={2}>
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
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={9.5}>
                    <label htmlFor="weightfactors.WF_traffic_complexity">
                      Liikenteen monimutkaisuus (WF traffic complexity):
                    </label>
                  </Grid>
                  <Grid item xs={2}>
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
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={9.5}>
                    <label htmlFor="weightfactors.WF_reduced_visibility">
                      WF reduced visibility:
                    </label>
                  </Grid>
                  <Grid item xs={2}>
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
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={9.5}>
                    <label htmlFor="weightfactors.WF_light_pollution">
                      Keinovalon määrä (WF light pollution):
                    </label>
                  </Grid>
                  <Grid item xs={2}>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            {/* Väylän parametrit */}
            <Card
              style={{
                // width: 400,
                backgroundColor: "rgb(181, 220, 255)",
                // marginTop: 5,
                // marginBottom: 5,
                // marginLeft: 5,
                // marginRight: 5,
              }}
            >
              <CardContent>
                <Autocomplete
                  freeSolo
                  disablePortal
                  name="navilinja.VAYLAT"
                  options={VAYLATids}
                  onChange={(ev, newValue) =>
                    formik.setFieldValue("navilinja.VAYLAT", newValue)
                  }
                  inputValue={vaylatInputValue}
                  onInputChange={(ev, newInputValue) =>
                    setVaylatInputValue(newInputValue)
                  }
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField
                      style={{ backgroundColor: "white" }}
                      {...params}
                      label="VAYLAT id"
                      required
                    />
                  )}
                />
              </CardContent>
              <CardContent>
                <Grid container spacing={1}>
                  {/* Väylän parametrit */}
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6.5}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom
                        >
                          Väylän parametrit:
                        </Typography>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <label htmlFor="navilinja.calculation_params.type">
                            {" "}
                            Tyyppi:{" "}
                          </label>
                        </Grid>
                        <Grid item xs={9}>
                          <Field
                            component="select"
                            name="navilinja.calculation_params.type"
                          >
                            <option value="inner">Sisävesiväylä</option>
                            <option value="outer">Ulkovesiväylä</option>
                          </Field>
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="navilinja.calculation_params.number_of_lanes">
                            {" "}
                            Kaistat:{" "}
                          </label>
                        </Grid>
                        <Grid item xs={9}>
                          <Field
                            component="select"
                            name="navilinja.calculation_params.number_of_lanes"
                          >
                          <option value={2}>
                            Kaksisuuntainen väylä
                          </option>
                          <option value={1}>
                            Yksisuuntainen väylä
                          </option>
                            
                          </Field>
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="navilinja.calculation_params.bottom_surface">
                            {" "}
                            Pohja:{" "}
                          </label>
                        </Grid>
                        <Grid item xs={9}>
                          <Field
                            name="navilinja.calculation_params.bottom_surface"
                            component="select"
                          >
                            <option defaultValue="smooth_and_soft">
                              Sileä ja pehmeä
                            </option>
                            <option value="rough_and_hard">
                              Rosoinen ja kova
                            </option>
                            
                          </Field>
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="navilinja.calculation_params.other.visibility">
                            {" "}
                            Näkyvyys (m):{" "}
                          </label>
                        </Grid>
                        <Grid item xs={9}>
                          <Field
                            component="input"
                            name="navilinja.calculation_params.other.visibility"
                            type="number"
                            required
                            style={{
                              width: 100,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Grid item xs={12}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Väylän syvyyden painokerroin:
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
                          color="textSecondary"
                          gutterBottom
                        >
                          {" "}
                          Syvyyden painokerroin kerrotaan aluksen leveydellä alla
                          näkyvien määritysten perusteella, joihin vaikuttaa
                          väylän syvyys ja aluksen syväys. Laskennassa voi käyttää
                          oletusarvoja tai määrittää uudet painokertoimet.
                        </Typography>
                      )}
                    </div>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <label> Sisävesiväylä </label>
                    </Grid>
                    <Grid item xs={6}>
                      <label> Ulkovesiväylä </label>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <label style={{ fontSize: 10 }}>
                          syvyys ≥ 1.5 * syväys
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="channel_depth_wf.deep_inner_channel"
                        type="float"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>
                          1.15*syväys ≤ syvyys 1.5*syväys
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="channel_depth_wf.medium_deep_inner_channel"
                        type="float"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>
                          {"syvyys < 1.15*syväys"}
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="channel_depth_wf.shallow_inner_channel"
                        type="float"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="painokerroin"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <label style={{ fontSize: 10 }}>
                          syvyys ≥ 1.5 * syväys
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="channel_depth_wf.deep_outer_channel"
                        type="float"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>
                          1.25*syväys ≤ syvyys 1.5*syväys
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="channel_depth_wf.medium_deep_outer_channel"
                        type="float"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>
                          {"syvyys < 1.25*syväys"}
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="channel_depth_wf.shallow_outer_channel"
                        type="float"
                        required
                        style={{
                          width: 80,
                        }}
                        placeholder="painokerroin"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Väylän reuna ja reunan painokerroin:
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
                          color="textSecondary"
                          gutterBottom
                        >
                          <label>
                            {" "}
                            Riskiarvon laskentaan valitaan väylän reunan tyyppi.
                            Alla on esitetty myös reunan painokertoimet joihin
                            vaikuttaa reunan tyyppi sekä aluksen nopeusluokka.
                            Painokerroin ja aluksen leveys kerrotaan laskennassa.
                            Laskennassa voi käyttää oletusarvoja tai määrittää
                            uudet painokertoimet.
                          </label>
                        </Typography>
                      )}
                    </div>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <label htmlFor="navilinja.calculation_params.channel_edge">
                        <Field
                          type="radio"
                          name="navilinja.calculation_params.channel_edge"
                          value="gentle_slope"
                          id="gentle_slope"
                        />
                        Loiva kaltevuus
                      </label>
                      <div>
                        <label style={{ fontSize: 10 }}>nopea</label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_gentle_fast"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>keskiverto</label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_gentle_moderate"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>hidas</label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_gentle_slow"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <label>
                        <Field
                          type="radio"
                          name="navilinja.calculation_params.channel_edge"
                          value="sloping_edges"
                          id="sloping_edges"
                        />
                        Viistot reunat
                      </label>
                      <div>
                        <label
                          htmlFor="bank_clearance_wf.edge_category_sloping_fast"
                          style={{ fontSize: 10 }}
                        >
                          nopea
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_sloping_fast"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>keskiverto</label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_sloping_moderate"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>hidas</label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_sloping_slow"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <label>
                        <Field
                          type="radio"
                          name="navilinja.calculation_params.channel_edge"
                          value="steep_and_hard"
                          id="steep_and_hard"
                        />
                        Jyrkkä ja kova
                      </label>
                      <div>
                        <label
                          htmlFor="bank_clearance_wf.edge_category_steep_fast"
                          style={{ fontSize: 10 }}
                        >
                          nopea
                        </label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_steep_fast"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>keskiverto</label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_steep_moderate"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                      <div>
                        <label style={{ fontSize: 10 }}>hidas</label>
                      </div>
                      <Field
                        component="input"
                        name="bank_clearance_wf.edge_category_steep_slow"
                        type="float"
                        required
                        style={{
                          width: 100,
                        }}
                        placeholder="painokerroin"
                      />
                    </Grid>
                  </Grid>

                  {/* ATN */}
                  <CardContent>
                    <Grid container spacing={0}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <label htmlFor="navilinja.calculation_params.aids_to_navigation">
                            {" "}
                            ATN:{" "}
                          </label>
                        </Grid>
                        <Grid item xs={5}>
                          <Field
                            component="select"
                            name="navilinja.calculation_params.aids_to_navigation"
                          >
                            <option defaultValue="excellent">
                              Erinomainen
                            </option>
                            <option value="good">Hyvä</option>
                            <option value="moderate">Keskiverto</option>
                          </Field>
                        </Grid>
                        <Grid item xs={6}>
                          <label htmlFor="navilinja.calculation_params.other.traffic_volume">
                            {" "}
                            Liikenteen määrä:{" "}
                          </label>
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            component="select"
                            name="navilinja.calculation_params.other.traffic_volume"
                          >
                            <option defaultValue="negligible">Olematon</option>
                            <option value="low">Matala</option>
                            <option value="moderate">Keskiverto</option>
                            <option value="heavy">Runsas</option>
                            <option value="very_heavy">Todella runsas</option>
                          </Field>
                        </Grid>
                        <Grid item xs={6}>
                          <label htmlFor="navilinja.calculation_params.other.traffic_complexity">
                            {" "}
                            Liikenteen monimutkaisuus:{" "}
                          </label>
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            component="select"
                            name="navilinja.calculation_params.other.traffic_complexity"
                          >
                            <option defaultValue="negligible">Olematon</option>
                            <option value="low">Matala</option>
                            <option value="moderate">Keskiverto</option>
                            <option value="high">Monimutkainen</option>
                            <option value="very_high">
                              Erittäin monimutkainen
                            </option>
                          </Field>
                        </Grid>
                        <Grid item xs={6}>
                          <label htmlFor="navilinja.calculation_params.light_pollution">
                            {" "}
                            Keinovalon määrä:{" "}
                          </label>
                        </Grid>
                        <Grid item xs={5}>
                          <Field
                            component="select"
                            name="navilinja.calculation_params.light_pollution"
                          >
                            <option defaultValue="negligible">Olematon</option>
                            <option value="low">Heikko</option>
                            <option value="moderate">Keskiverto</option>
                            <option value="strong">Voimakas</option>

                          </Field>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            {/* Vesiliikenteen olosuhteet */}
            <Card
              style={{
                // width: 400,
                backgroundColor: "rgb(181, 220, 255)",
                // marginTop: 5,
                // marginBottom: 5,
                // marginLeft: 5,
                // marginRight: 5,
              }}
            >
              <CardContent>
                <Grid container spacing={0}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Vesiliikenteen olosuhteet:
                  </Typography>
                  {/* Tuuli */}
                  <Card
                    style={{
                      // width: 400,
                      backgroundColor: "rgb(181, 220, 255)",
                      // marginTop: 5,
                      // marginBottom: 5,
                      // marginLeft: 5,
                      // marginRight: 5,
                    }}
                  >
                    <CardContent>
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
                            color="textSecondary"
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
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <label htmlFor="navilinja.calculation_params.operating_conditions.wind_speed">
                            <Field
                              component="input"
                              type="radio"
                              name="navilinja.calculation_params.operating_conditions.wind_speed"
                              value="mild"
                              id="mild"
                            />
                            Heikko
                          </label>
                          <Typography
                            style={{ fontSize: 12 }}
                            color="textSecondary"
                            gutterBottom
                          >
                            {"Tuulen nopeus < 7 m/s"}
                          </Typography>
                          <div>
                            <label
                              htmlFor="wind_wf.mild_wind_fast_vessel"
                              style={{ fontSize: 10 }}
                            >
                              nopea
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.mild_wind_fast_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                          <div>
                            <label
                              htmlFor="wind_wf.mild_wind_moderate_vessel"
                              style={{ fontSize: 10 }}
                            >
                              keskiverto
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.mild_wind_moderate_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                          <div>
                            <label
                              htmlFor="wind_wf.mild_wind_slow_vessel"
                              style={{ fontSize: 10 }}
                            >
                              hidas
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.mild_wind_slow_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <label htmlFor="navilinja.calculation_params.operating_conditions.wind_speed">
                            <Field
                              component="input"
                              type="radio"
                              name="navilinja.calculation_params.operating_conditions.wind_speed"
                              value="moderate"
                              id="moderate"                              
                            />
                            Keskiverto
                          </label>
                          <Typography
                            style={{ fontSize: 12 }}
                            color="textSecondary"
                            gutterBottom
                          >
                            {"Tuulen nopeus 7 -17 m/s"}
                          </Typography>
                          <div>
                            <label style={{ fontSize: 10 }}>nopea</label>
                          </div>
                          <Field
                            component="input"
                            type="float"
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
                              style={{ fontSize: 10 }}
                            >
                              keskiverto
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.moderate_wind_moderate_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                          <div>
                            <label
                              htmlFor="wind_wf.moderate_wind_slow_vessel"
                              style={{ fontSize: 10 }}
                            >
                              hidas
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.moderate_wind_slow_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <label htmlFor="navilinja.calculation_params.operating_conditions.wind_speed">
                            <Field
                              component="input"
                              type="radio"
                              name="navilinja.calculation_params.operating_conditions.wind_speed"
                              value="strong"
                              id="strong"
                            />
                            Voimakas
                          </label>
                          <Typography
                            style={{ fontSize: 12 }}
                            color="textSecondary"
                            gutterBottom
                          >
                            {"Tuulen nopeus > 17 m/s"}
                          </Typography>
                          <div>
                            <label
                              htmlFor="wind_wf.strong_wind_fast_vessel"
                              style={{ fontSize: 10 }}
                            >
                              nopea
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.strong_wind_fast_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                          <div>
                            <label
                              htmlFor="wind_wf.strong_wind_moderate_vessel"
                              style={{ fontSize: 10 }}
                            >
                              keskiverto
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.strong_wind_moderate_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                          <div>
                            <label
                              htmlFor="wind_wf.strong_wind_slow_vessel"
                              style={{ fontSize: 10 }}
                            >
                              hidas
                            </label>
                          </div>
                          <Field
                            component="input"
                            name="wind_wf.strong_wind_slow_vessel"
                            type="float"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="painokerroin"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {/* Poikkivirtaus */}
                  <Card
                    style={{
                      // width: 400,
                      backgroundColor: "rgb(181, 220, 255)",
                      // marginTop: 5,
                      // marginBottom: 5,
                      // marginLeft: 5,
                      // marginRight: 5,
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={1}>
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
                            Arvovälit poikkivirtauksen nopeudelle v [knots]:
                          </Typography>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.cross_current_speed">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.cross_current_speed"
                                value="negligible"
                                id="negligible"
                              />
                              Olematon
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wneg_lower"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={0.0}
                              style={{
                                width: 80,
                              }}
                            />
                            <label>{"≤ v <"}</label>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wneg_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={0.2}
                              style={{
                                width: 80,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.cross_current_speed">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.cross_current_speed"
                                value="low"
                                id="low"
                              />
                              Heikko
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wneg_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={0.2}
                              style={{
                                width: 80,
                              }}
                            />
                            <label>{"≤ v <"}</label>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wlow_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={0.5}
                              style={{
                                width: 80,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.cross_current_speed">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.cross_current_speed"
                                value="moderate"
                                id="moderate"
                              />
                              Keskiverto
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wlow_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={0.5}
                              style={{
                                width: 80,
                              }}
                            />
                            <label>{"≤ v <"}</label>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wmod_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={1.5}
                              style={{
                                width: 80,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.cross_current_speed">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.cross_current_speed"
                                value="strong"
                                id="strong"
                              />
                              Voimakas
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wmod_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={1.5}
                              style={{
                                width: 80,
                              }}
                            />
                            <label>{"≤ v <"}</label>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.cross_current_Wstrong_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={2}
                              style={{
                                width: 80,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {/* Pitkittäisvirtaus */}
                  <Card
                    style={{
                      // width: 400,
                      backgroundColor: "rgb(181, 220, 255)",
                      // marginTop: 5,
                      // marginBottom: 5,
                      // marginLeft: 5,
                      // marginRight: 5,
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={1}>
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
                            Arvovälit pitkittäisvirtauksen nopeudelle v [knots]:
                          </Typography>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.longitudinal_current_speed">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.longitudinal_current_speed"
                                value="negligible"
                                id="negligible"
                              />
                              Olematon
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.longitudinal_current_Wneg_lower"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={0}
                              style={{
                                width: 80,
                              }}
                            />
                            <label>{"≤ v <"}</label>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.longitudinal_current_Wneg_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={1.5}
                              style={{
                                width: 80,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.longitudinal_current_speed">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.longitudinal_current_speed"
                                value="moderate"
                                id="moderate"
                              />
                              Keskiverto
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.longitudinal_current_Wneg_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={1.5}
                              style={{
                                width: 80,
                              }}
                            />
                            <label>{"≤ v <"}</label>
                            <Field
                              component="input"
                              name="navilinja.calculation_params.operating_conditions.longitudinal_current_Wmod_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={3}
                              style={{
                                width: 80,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.longitudinal_current_speed">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.longitudinal_current_speed"
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
                              name="navilinja.calculation_params.operating_conditions.longitudinal_current_Wmod_upper"
                              type="float"
                              required
                              placeholder="nopeus"
                              defaultValue={3}
                              style={{
                                width: 80,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {/* Aallon korkeus */}
                  <Card
                    style={{
                      // width: 400,
                      backgroundColor: "rgb(181, 220, 255)",
                      // marginTop: 5,
                      // marginBottom: 5,
                      // marginLeft: 5,
                      // marginRight: 5,
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={1}>
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
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.wave_height">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.wave_height"
                                value="low"
                                id="low"
                              />
                              Matala
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <input
                              type="number"
                              required
                              style={{
                                width: 80,
                              }}
                              placeholder="aallon korkeus"
                              defaultValue={0.0}
                            />
                            <label>{"≤ h <"}</label>
                            <input
                              // component="input"
                              type="number"
                              required
                              style={{
                                width: 80,
                              }}
                              placeholder="aallon korkeus"
                              defaultValue={1.0}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.wave_height">
                              <Field
                                component="input"
                                type="radio"
                                name="wave_height_radio"
                                value="moderate"
                                id="moderate"
                              />
                              Keskiverto
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <input
                              // component="input"
                              type="number"
                              required
                              style={{
                                width: 80,
                              }}
                              placeholder="aallon korkeus"
                              defaultValue={1.0}
                            />
                            <label>{"≤ h ≤"}</label>
                            <input
                              // component="input"
                              type="number"
                              required
                              style={{
                                width: 80,
                              }}
                              placeholder="aallon korkeus"
                              defaultValue={3.0}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <label htmlFor="navilinja.calculation_params.operating_conditions.wave_height">
                              <Field
                                component="input"
                                type="radio"
                                name="navilinja.calculation_params.operating_conditions.wave_height"
                                value="high"
                                id="high"
                              />
                              Korkea
                            </label>
                          </Grid>
                          <Grid item xs={8}>
                            <label>{"h > "}</label>
                            <input
                              // component="input"
                              type="number"
                              required
                              style={{
                                width: 80,
                              }}
                              placeholder="aallon korkeus"
                              defaultValue={3.0}
                            />
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
      )}
    </div>
  );
}

export default UserInputForm;

UserInputForm.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
  formik: PropTypes.object
};
