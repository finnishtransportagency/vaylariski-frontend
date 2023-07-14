import { useState, useContext } from "react";

import { Button, Divider, Grid, Tooltip, IconButton } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Field } from "formik";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import BoatMenuComponent from "./BoatMenuComponent";
import WayareaComponent from "./WayareaComponent";
import BoatManoeuvrabilityComponent from "./BoatManoeuvrabilityComponent";
import PropTypes from "prop-types";
import GDOGIDMenuComponent from "./GDOGIDMenuComponent";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";
import BoatSpeedComponent from "./BoatSpeedComponent";
import PFBend1Component from "./PFBend1Component";
import PFBend2Component from "./PFBend2Component";

function UserInputForm(props) {
  const { tabValue, tabIndex, formik, ...other } = props;

  const { selectedWayareaWithNoGDOGID } = useContext(
    SelectedWayareaWithNoGDOGIDContext
  );

  const createTooltipFunctions = () => {
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
      setOpen(false);
    };
    const handleTooltipOpen = () => {
      setOpen((prevValue) => !prevValue);
    };

    return {
      open,
      handleTooltipClose,
      handleTooltipOpen,
    };
  };

  const tooltips = {
    depth: createTooltipFunctions(),
    edge: createTooltipFunctions(),
    wind: createTooltipFunctions(),
  };

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <>
          <Grid container spacing={1} style={{ padding: 20 }}>
            <Grid item xs={3.99}>
              <Grid
                container
                spacing={1}
                paddingBottom={2}
                paddingRight={2}
                paddingLeft={2}
              >
                <Grid container spacing={1} paddingBottom={2}>
                  {" "}
                  {/*väylämenu*/}
                  <Grid item xs={12}>
                    <WayareaComponent name="navline.VAYLAT" formik={formik} />
                  </Grid>
                </Grid>
                <Grid container spacing={1} paddingBottom={2}>
                  <Grid item xs={12}>
                    <GDOGIDMenuComponent
                      formik={formik}
                      name="navline.starting_gdo_gid"
                    />
                  </Grid>
                </Grid>
                {/*Laivamenu */}
                <BoatMenuComponent name="boat" formik={formik} />
                {/* Ctr and Cm parameters */}
                <Grid container spacing={1} paddingBottom={2}>
                  {/* Ohjailtavuus */}
                  <BoatManoeuvrabilityComponent formik={formik} />
                </Grid>
                <Grid container spacing={1} paddingBottom={2}>
                  {/* Nopeusluokka */}
                  <BoatSpeedComponent formik={formik} name="boat.speed" />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item xs={3.99}>
              {/* Väylän parametrit */}
              <Grid
                container
                spacing={1}
                paddingBottom={2}
                paddingRight={1}
                paddingLeft={2}
              >
                {/* Tyyppi jne. */}
                <Grid container spacing={1} paddingBottom={2}>
                  <Grid item xs={12}>
                    <Typography
                      style={{ fontSize: 16, fontWeight: 550 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Väylän parametrit
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
                      <option value={2}>Kaksisuuntainen väylä</option>
                      <option value={1}>Yksisuuntainen väylä</option>
                    </Field>
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.bottom_surface">
                      {" "}
                      Pohja:{" "}
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      component="select"
                      name="navline.calculation_params.bottom_surface"
                    >
                      <option value="smooth_and_soft">Sileä ja pehmeä</option>
                      <option value="rough_and_hard">
                        Epätasainen ja kova
                      </option>
                    </Field>
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.other.visibility">
                      {" "}
                      Näkyvyys (m):{" "}
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.navline?.calculation_params?.other
                          ?.visibility
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.navline?.calculation_params?.other
                              ?.visibility && "has-error"
                          }
                          component="input"
                          name="navline.calculation_params.other.visibility"
                          type="number"
                          required
                          style={{
                            width: 100,
                          }}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} paddingBottom={2}>
                  <Grid item xs={12}>
                    <Typography
                      component="span"
                      style={{
                        fontSize: 16,
                        fontWeight: 550,
                        verticalAlign: "middle",
                      }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Väylän syvyyden painokerroin
                      <ClickAwayListener
                        onClickAway={tooltips.depth.handleTooltipClose}
                      >
                        <Tooltip
                          placement="right"
                          arrow
                          title={
                            <label style={{ fontSize: 14 }}>
                              Syvyyden painokerroin kerrotaan aluksen leveydellä
                              alla näkyvien määritysten perusteella, joihin
                              vaikuttaa väylän syvyys ja aluksen syväys.
                              Laskennassa voi käyttää oletusarvoja tai määrittää
                              uudet painokertoimet.
                            </label>
                          }
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={tooltips.depth.handleTooltipClose}
                          open={tooltips.depth.open}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                        >
                          <IconButton
                            onClick={tooltips.depth.handleTooltipOpen}
                          >
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ClickAwayListener>
                    </Typography>
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

                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.channel_depth_wf?.deep_inner_channel
                      }
                    >
                      <span>
                        <Field
                          component="input"
                          className={
                            formik.errors?.channel_depth_wf
                              ?.deep_inner_channel && "has-error"
                          }
                          name="channel_depth_wf.deep_inner_channel"
                          type="number"
                          step="0.01"
                          required
                          style={{
                            width: 130,
                          }}
                          placeholder="painokerroin"
                        />
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>
                        1.15*syväys ≤ syvyys 1.5*syväys
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.channel_depth_wf
                          ?.medium_deep_inner_channel
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.channel_depth_wf
                              ?.medium_deep_inner_channel && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>
                        {"syvyys < 1.15*syväys"}
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.channel_depth_wf?.shallow_inner_channel
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.channel_depth_wf
                              ?.shallow_inner_channel && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <label style={{ fontSize: 14 }}>
                        syvyys ≥ 1.5 * syväys
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.channel_depth_wf?.deep_outer_channel
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.channel_depth_wf
                              ?.deep_outer_channel && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>
                        1.25*syväys ≤ syvyys 1.5*syväys
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.channel_depth_wf
                          ?.medium_deep_outer_channel
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.channel_depth_wf
                              ?.medium_deep_outer_channel && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>
                        {"syvyys < 1.25*syväys"}
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.channel_depth_wf?.shallow_outer_channel
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.channel_depth_wf
                              ?.shallow_outer_channel && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} paddingBottom={2}>
                  <Grid item xs={12}>
                    <Typography
                      component="span"
                      style={{
                        fontSize: 16,
                        fontWeight: 550,
                        verticalAlign: "middle",
                      }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Väylän reuna ja reunan painokerroin
                      <ClickAwayListener
                        onClickAway={tooltips.edge.handleTooltipClose}
                      >
                        <Tooltip
                          arrow
                          placement="right"
                          title={
                            <label style={{ fontSize: 14 }}>
                              Riskiarvon laskentaan valitaan väylän reunan
                              tyyppi. Alla on esitetty myös reunan
                              painokertoimet joihin vaikuttaa reunan tyyppi sekä
                              aluksen nopeusluokka. Painokerroin ja aluksen
                              leveys kerrotaan laskennassa. Laskennassa voi
                              käyttää oletusarvoja tai määrittää uudet
                              painokertoimet.
                            </label>
                          }
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={tooltips.edge.handleTooltipClose}
                          open={tooltips.edge.open}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                        >
                          <IconButton onClick={tooltips.edge.handleTooltipOpen}>
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ClickAwayListener>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.channel_edge">
                      <Field
                        type="radio"
                        name="navline.calculation_params.channel_edge"
                        value="gentle_slope"
                        id="gentle_slope"
                      />
                      <span
                        onClick={() =>
                          document.getElementById("gentle_slope").click()
                        }
                      >
                        {" Loiva kaltevuus"}
                      </span>
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
                      <span
                        onClick={() =>
                          document.getElementById("sloping_edges").click()
                        }
                      >
                        {" Viistot reunat"}
                      </span>
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
                      <span
                        onClick={() =>
                          document.getElementById("steep_and_hard").click()
                        }
                      >
                        {" Jyrkkä ja kova"}
                      </span>
                    </label>
                  </Grid>
                  <Grid item xs={4}>
                    <div>
                      <label style={{ fontSize: 14 }}>nopea</label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_gentle_fast
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_gentle_fast && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>keskiverto</label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_gentle_moderate
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_gentle_moderate && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>hidas</label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_gentle_slow
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_gentle_slow && "has-error"
                          }
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
                      </span>
                    </Tooltip>
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
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_sloping_fast
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_sloping_fast && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>keskiverto</label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_sloping_moderate
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_sloping_moderate && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>hidas</label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_sloping_slow
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_sloping_slow && "has-error"
                          }
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
                      </span>
                    </Tooltip>
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
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_steep_fast
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_steep_fast && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>keskiverto</label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_steep_moderate
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_steep_moderate && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label style={{ fontSize: 14 }}>hidas</label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.bank_clearance_wf
                          ?.edge_category_steep_slow
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.bank_clearance_wf
                              ?.edge_category_steep_slow && "has-error"
                          }
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
                      </span>
                    </Tooltip>
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
                    <label htmlFor="navline.calculation_params.other.light_pollution">
                      {" "}
                      Taustavalon voimakkuus:{" "}
                    </label>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component="select"
                      name="navline.calculation_params.other.light_pollution"
                    >
                      <option value="negligible">Olematon</option>
                      <option value="low">Heikko</option>
                      <option value="moderate">Keskiverto</option>
                      <option value="heavy">Voimakas</option>
                      <option value="very_heavy">Todella voimakas</option>
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
              <Grid
                container
                spacing={1}
                paddingBottom={2}
                paddingRight={1}
                paddingLeft={2}
              >
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
                      style={{
                        fontSize: 16,
                        verticalAlign: "middle",
                      }}
                      color="textSecondary"
                      gutterBottom
                      component="span"
                    >
                      Tuulen nopeusluokka sekä painokertoimet:
                      <ClickAwayListener
                        onClickAway={tooltips.wind.handleTooltipClose}
                      >
                        <Tooltip
                          arrow
                          placement="right"
                          title={
                            <label style={{ fontSize: 14 }}>
                              Riskiarvon laskentaan valitaan tuulen
                              nopeusluokka. Alla on esitetty myös tuulen
                              painokertoimet joihin vaikuttaa tuulen
                              nopeusluokka sekä aluksen nopeusluokka.
                              Painokerroin ja aluksen leveys kerrotaan
                              laskennassa. Laskennassa voi käyttää oletusarvoja
                              tai määrittää uudet painokertoimet.
                            </label>
                          }
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={tooltips.wind.handleTooltipClose}
                          open={tooltips.wind.open}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                        >
                          <IconButton onClick={tooltips.wind.handleTooltipOpen}>
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ClickAwayListener>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.wind_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.wind_speed"
                        value="mild"
                        id="mild-wind"
                      />
                      <span
                        onClick={() =>
                          document.getElementById("mild-wind").click()
                        }
                      >
                        {" Heikko"}
                      </span>
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
                    <Tooltip
                      placement="right"
                      arrow
                      title={formik.errors?.wind_wf?.mild_wind_fast_vessel}
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf?.mild_wind_fast_vessel &&
                            "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label
                        htmlFor="wind_wf.mild_wind_moderate_vessel"
                        style={{ fontSize: 14 }}
                      >
                        keskiverto
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={formik.errors?.wind_wf?.mild_wind_moderate_vessel}
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf?.mild_wind_moderate_vessel &&
                            "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label
                        htmlFor="wind_wf.mild_wind_slow_vessel"
                        style={{ fontSize: 14 }}
                      >
                        hidas
                      </label>
                    </div>{" "}
                    <Tooltip
                      placement="right"
                      arrow
                      title={formik.errors?.wind_wf?.mild_wind_slow_vessel}
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf?.mild_wind_slow_vessel &&
                            "has-error"
                          }
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
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.wind_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.wind_speed"
                        value="moderate"
                        id="moderate-wind"
                      />
                      <span
                        onClick={() =>
                          document.getElementById("moderate-wind").click()
                        }
                      >
                        {" Keskiverto"}
                      </span>
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
                    <Tooltip
                      placement="right"
                      arrow
                      title={formik.errors?.wind_wf?.moderate_wind_fast_vessel}
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf?.moderate_wind_fast_vessel &&
                            "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label
                        htmlFor="wind_wf.moderate_wind_moderate_vessel"
                        style={{ fontSize: 14 }}
                      >
                        keskiverto
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.wind_wf?.moderate_wind_moderate_vessel
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf
                              ?.moderate_wind_moderate_vessel && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label
                        htmlFor="wind_wf.moderate_wind_slow_vessel"
                        style={{ fontSize: 14 }}
                      >
                        hidas
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={formik.errors?.wind_wf?.moderate_wind_slow_vessel}
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf?.moderate_wind_slow_vessel &&
                            "has-error"
                          }
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
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <label htmlFor="navline.calculation_params.operating_conditions.wind_speed">
                      <Field
                        component="input"
                        type="radio"
                        name="navline.calculation_params.operating_conditions.wind_speed"
                        value="strong"
                        id="strong-wind"
                      />
                      <span
                        onClick={() =>
                          document.getElementById("strong-wind").click()
                        }
                      >
                        {" Voimakas"}
                      </span>
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
                    <Tooltip
                      placement="right"
                      arrow
                      title={formik.errors?.wind_wf?.strong_wind_fast_vessel}
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf?.strong_wind_fast_vessel &&
                            "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label
                        htmlFor="wind_wf.strong_wind_moderate_vessel"
                        style={{ fontSize: 14 }}
                      >
                        keskiverto
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        formik.errors?.wind_wf?.strong_wind_moderate_vessel
                      }
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf
                              ?.strong_wind_moderate_vessel && "has-error"
                          }
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
                      </span>
                    </Tooltip>
                    <div>
                      <label
                        htmlFor="wind_wf.strong_wind_slow_vessel"
                        style={{ fontSize: 14 }}
                      >
                        hidas
                      </label>
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title={formik.errors?.wind_wf?.strong_wind_slow_vessel}
                    >
                      <span>
                        <Field
                          className={
                            formik.errors?.wind_wf?.strong_wind_slow_vessel &&
                            "has-error"
                          }
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
                      </span>
                    </Tooltip>
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
                          id="negligible-cross-current"
                        />
                        <span
                          onClick={() =>
                            document
                              .getElementById("negligible-cross-current")
                              .click()
                          }
                        >
                          {" Olematon"}
                        </span>
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
                          id="low-cross-current"
                        />
                        <span
                          onClick={() =>
                            document.getElementById("low-cross-current").click()
                          }
                        >
                          {" Heikko"}
                        </span>
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
                          id="moderate-cross-current"
                        />
                        <span
                          onClick={() =>
                            document
                              .getElementById("moderate-cross-current")
                              .click()
                          }
                        >
                          {" Keskiverto"}
                        </span>
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
                          id="strong-cross-current"
                        />
                        <span
                          onClick={() =>
                            document
                              .getElementById("strong-cross-current")
                              .click()
                          }
                        >
                          {" Voimakas"}
                        </span>
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
                          id="negligible-long-current"
                        />
                        <span
                          onClick={() =>
                            document
                              .getElementById("negligible-long-current")
                              .click()
                          }
                        >
                          {" Olematon"}
                        </span>
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
                          id="moderate-long-current"
                        />
                        <span
                          onClick={() =>
                            document
                              .getElementById("moderate-long-current")
                              .click()
                          }
                        >
                          {" Keskiverto"}
                        </span>
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
                          id="strong-long-current"
                        />
                        <span
                          onClick={() =>
                            document
                              .getElementById("strong-long-current")
                              .click()
                          }
                        >
                          {" Voimakas"}
                        </span>
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
                          id="low-wave"
                        />
                        <span
                          onClick={() =>
                            document.getElementById("low-wave").click()
                          }
                        >
                          {" Matala"}
                        </span>
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
                          id="moderate-wave"
                        />
                        <span
                          onClick={() =>
                            document.getElementById("moderate-wave").click()
                          }
                        >
                          {" Keskiverto"}
                        </span>
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
                          id="high-wave"
                        />
                        <span
                          onClick={() =>
                            document.getElementById("high-wave").click()
                          }
                        >
                          {" Korkea"}
                        </span>
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
              <Grid
                id="abba"
                container
                spacing={1}
                paddingBottom={2}
                paddingRight={2}
                paddingLeft={2}
              >
                <Grid container spacing={1} paddingBottom={2}>
                  <PFBend1Component formik={formik} />
                  <PFBend2Component formik={formik} />
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
                  <Tooltip
                    placement="right"
                    arrow
                    title={formik.errors?.weightfactors?.WF_channel}
                  >
                    <span>
                      <Field
                        className={
                          formik.errors?.weightfactors?.WF_channel &&
                          "has-error"
                        }
                        component="input"
                        name="weightfactors.WF_channel"
                        type="number"
                        required
                        style={{
                          width: 60,
                        }}
                      />
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="weightfactors.WF_bend">
                    Mutka (WF bend):
                  </label>
                </Grid>
                <Grid item xs={3}>
                  <Tooltip
                    placement="right"
                    arrow
                    title={formik.errors?.weightfactors?.WF_bend}
                  >
                    <span>
                      <Field
                        className={
                          formik.errors?.weightfactors?.WF_bend && "has-error"
                        }
                        component="input"
                        name="weightfactors.WF_bend"
                        type="number"
                        required
                        style={{
                          width: 60,
                        }}
                      />
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="weightfactors.WF_s_bend">
                    S-mutka (WF S-bend):
                  </label>
                </Grid>
                <Grid item xs={3}>
                  <Tooltip
                    placement="right"
                    arrow
                    title={formik.errors?.weightfactors?.WF_s_bend}
                  >
                    <span>
                      <Field
                        className={
                          formik.errors?.weightfactors?.WF_s_bend && "has-error"
                        }
                        component="input"
                        name="weightfactors.WF_s_bend"
                        type="number"
                        required
                        style={{
                          width: 60,
                        }}
                      />
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="weightfactors.WF_traffic_complexity">
                    Liikenteen monimutkaisuus (WF traffic complexity):
                  </label>
                </Grid>
                <Grid item xs={3}>
                  <Tooltip
                    placement="right"
                    arrow
                    title={formik.errors?.weightfactors?.WF_traffic_complexity}
                  >
                    <span>
                      <Field
                        className={
                          formik.errors?.weightfactors?.WF_traffic_complexity &&
                          "has-error"
                        }
                        component="input"
                        name="weightfactors.WF_traffic_complexity"
                        type="number"
                        required
                        style={{
                          width: 60,
                        }}
                      />
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="weightfactors.WF_reduced_visibility">
                    Heikentynyt näkyvyys (WF reduced visibility):
                  </label>
                </Grid>
                <Grid item xs={3}>
                  <Tooltip
                    placement="right"
                    arrow
                    title={formik.errors?.weightfactors?.WF_reduced_visibility}
                  >
                    <span>
                      <Field
                        className={
                          formik.errors?.weightfactors?.WF_reduced_visibility &&
                          "has-error"
                        }
                        component="input"
                        name="weightfactors.WF_reduced_visibility"
                        type="number"
                        required
                        style={{
                          width: 60,
                        }}
                      />
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="weightfactors.WF_light_pollution">
                    Taustavalon voimakkuus (WF light pollution):
                  </label>
                </Grid>
                <Grid item xs={3}>
                  <Tooltip
                    placement="right"
                    arrow
                    title={formik.errors?.weightfactors?.WF_light_pollution}
                  >
                    <span>
                      <Field
                        className={
                          formik.errors?.weightfactors?.WF_light_pollution &&
                          "has-error"
                        }
                        component="input"
                        name="weightfactors.WF_light_pollution"
                        type="number"
                        required
                        style={{
                          width: 60,
                        }}
                      />
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              placement="bottom"
              arrow
              id="submit-button-tooltip"
              title={
                !(formik.isValid && formik.dirty) ||
                selectedWayareaWithNoGDOGID ? (
                  <label style={{ fontSize: 14 }}>
                    <span data-cy-id="submit-button-tooltip-span">
                      Korjaa seuraavat asiat lähettääksesi arvot:
                      <br />
                      {!formik.dirty ? (
                        <>
                          - VAYLAT id vaaditaan
                          <br />
                        </>
                      ) : (
                        Object.values(formik.errors).map((obj) => {
                          let msg = null;
                          Object.values(obj).forEach((err_msg) => {
                            msg = (
                              <span key={err_msg}>
                                - {err_msg}
                                <br />
                              </span>
                            );
                          });
                          return msg;
                        })
                      )}
                      {selectedWayareaWithNoGDOGID && (
                        <>- Valitulle väylälle ei löydy navigointilinjoja</>
                      )}
                    </span>
                  </label>
                ) : null
              }
            >
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ minWidth: "1" }}
                  disabled={
                    !(formik.isValid && formik.dirty) ||
                    selectedWayareaWithNoGDOGID
                  } //formik.dirty is needed to disable on initial load
                  data-cy-id="submit-button"
                >
                  <span style={{ marginRight: "0.2em" }}>Lähetä</span>
                  {!(formik.isValid && formik.dirty) ||
                  selectedWayareaWithNoGDOGID ? (
                    <AiOutlineInfoCircle data-cy-id="submit-disable-icon" />
                  ) : null}
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </>
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
