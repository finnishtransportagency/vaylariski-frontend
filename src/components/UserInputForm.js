import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import apiClient from "../http-common";

import BoatContext from "../contexts/Boat";
import RIVResultContext from "../contexts/RIVResult";
import FairwayContext from "../contexts/Fairway";
import UserInputContext from "../contexts/UserInput";
import RIVTrafficLightContext from "../contexts/RIVTrafficLightContext";
import {
  Autocomplete,
  FormControl,
  Grid,
  Menu,
  popoverClasses,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { AiOutlineInfoCircle } from "react-icons/ai";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import BoatMenuComponent from "./BoatMenuComponent";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import NotificationContext from "contexts/NotificationContext";
import { VAYLATids } from "../constants/VAYLAT_ids.js";

function UserInputForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data) => fetchRiskValue(data); //Input arvot laskennalle
  const { boat, setBoat } = useContext(BoatContext);
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { fairway, setFairway } = useContext(FairwayContext);
  const { userInput, setUserInput } = useContext(UserInputContext);
  const { RIVTrafficLight, setRIVTraffiLight } = useContext(
    RIVTrafficLightContext
  );
  const { spinnerVisible, setSpinnerVisible } = useContext(
    SpinnerVisibilityContext
  );
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);
  const [style, setStyle] = useState({ display: "none" });
  const [vaylatInputValue, setVaylatInputValue ] = useState('');

  //Kutsuu calculate_risk endpointtia parametreillä
  const fetchRiskValue = async () => {
    const path = "fairway/calculate_risk";
    console.log("You clicked me!" + JSON.stringify(userInput));
    // Empty previous results
    setRIVResults([]);
    // Set spinner
    setSpinnerVisible(true);
    try {
      const response = await apiClient.post(path, userInput);
      setRIVResults(response.data);
    } catch (err) {
      console.log(err);
      setNotificationStatus({
        severity: "error",
        message: err.message,
        visible: true,
      });
    } finally {
      setSpinnerVisible(false);
    }
  };

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const [isHoveringDepth, setIsHoveringDepth] = useState(false);
  const handleMouseOverDepth = () => {
    setIsHoveringDepth(true);
  };
  const handleMouseOutDepth = () => {
    setIsHoveringDepth(false);
  };
  const [isHoveringWind, setIsHoveringWind] = useState(false);
  const handleMouseOverWind = () => {
    setIsHoveringWind(true);
  };
  const handleMouseOutWind = () => {
    setIsHoveringWind(false);
  };

  useEffect(() => {
    console.log("userInput muuttui", userInput);
  }, [userInput]);

  // This is passed to BoatMenuComponent, which then calls it
  function setDefaultBoatValues(newBoat) {
    setUserInput({ ...userInput, boat: newBoat });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          {/* Laivan koko */}
          <Card
            style={{
              width: 500,
              backgroundColor: "rgb(181, 220, 255)",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
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
                        <label>Aluksen parametrit:</label>
                      </Typography>
                      {/* Menu selector for default boat values */}
                      <BoatMenuComponent
                        setDefaultBoatValues={setDefaultBoatValues}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <label>Pituus (m):</label>
                    </Grid>
                    <Grid item xs={4}>
                      <input
                        {...register("userInput.boat.length", {
                          valueAsNumber: true,
                        })}
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        value={userInput.boat.length}
                        onChange={(ev) =>
                          setUserInput({
                            ...userInput,
                            boat: {
                              ...userInput.boat,
                              length: ev.target.value,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <label>Leveys (m):</label>
                    </Grid>
                    <Grid item xs={4}>
                      <input
                        {...register("userInput.boat.beam", {
                          valueAsNumber: true,
                        })}
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        value={userInput.boat.beam}
                        onChange={(ev) =>
                          setUserInput({
                            ...userInput,
                            boat: { ...userInput.boat, beam: ev.target.value },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <label>Syväys (m):</label>
                    </Grid>
                    <Grid item xs={4}>
                      <input
                        {...register("userInput.boat.draft", {
                          valueAsNumber: true,
                        })}
                        type="number"
                        required
                        style={{
                          width: 100,
                        }}
                        value={userInput.boat.draft}
                        onChange={(ev) =>
                          setUserInput({
                            ...userInput,
                            boat: { ...userInput.boat, draft: ev.target.value },
                          })
                        }
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
              width: 500,
              backgroundColor: "rgb(181, 220, 255)",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <CardContent>
              <Typography
                style={{ fontSize: 16 }}
                color="textSecondary"
                gutterBottom
              >
                <label>Aluksen liikehdintäkyky:</label>
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label>Luokka:</label>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label>Kääntönopeus (C_tr):</label>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label>Manoeuvrability (C_m):</label>
                  </Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      name="manoeuvrability_radio"
                      value="good"
                      id="good"
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          boat: {
                            ...userInput.boat,
                            manoeuvrability: ev.target.value,
                          },
                        })
                      }
                    />
                    <label>Hyvä</label>
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      {...register(
                        "userInput.manoeuvrability_params.C_turning_radius_good",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="C_tr"
                      value={
                        userInput.manoeuvrability_params.C_turning_radius_good
                      }
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          manoeuvrability_params: {
                            ...userInput.manoeuvrability_params,
                            C_turning_radius_good: ev.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      {...register(
                        "userInput.manoeuvrability_params.C_manoeuvrability_good",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="C_m"
                      value={
                        userInput.manoeuvrability_params.C_manoeuvrability_good
                      }
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          manoeuvrability_params: {
                            ...userInput.manoeuvrability_params,
                            C_manoeuvrability_good: ev.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      name="manoeuvrability_radio"
                      value="moderate"
                      id="moderate"
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          boat: {
                            ...userInput.boat,
                            manoeuvrability: ev.target.value,
                          },
                        })
                      }
                    />
                    <label>Keskiverto</label>
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      {...register(
                        "userInput.manoeuvrability_params.C_turning_radius_moderate",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="C_tr"
                      value={
                        userInput.manoeuvrability_params
                          .C_turning_radius_moderate
                      }
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          manoeuvrability_params: {
                            ...userInput.manoeuvrability_params,
                            C_turning_radius_moderate: ev.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      {...register(
                        "userInput.manoeuvrability_params.C_manoeuvrability_moderate",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="C_m"
                      value={
                        userInput.manoeuvrability_params
                          .C_manoeuvrability_moderate
                      }
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          manoeuvrability_params: {
                            ...userInput.manoeuvrability_params,
                            C_manoeuvrability_moderate: ev.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      name="manoeuvrability_radio"
                      value="poor"
                      id="poor"
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          boat: {
                            ...userInput.boat,
                            manoeuvrability: ev.target.value,
                          },
                        })
                      }
                    />
                    <label>Heikko</label>
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      {...register(
                        "userInput.manoeuvrability_params.C_turning_radius_poor",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="C_tr"
                      value={
                        userInput.manoeuvrability_params.C_turning_radius_poor
                      }
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          manoeuvrability_params: {
                            ...userInput.manoeuvrability_params,
                            C_turning_radius_poor: ev.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      {...register(
                        "userInput.manoeuvrability_params.C_manoeuvrability_poor",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="C_m"
                      value={
                        userInput.manoeuvrability_params.C_manoeuvrability_poor
                      }
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          manoeuvrability_params: {
                            ...userInput.manoeuvrability_params,
                            C_manoeuvrability_poor: ev.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Nopeusluokat */}
          <Card
            style={{
              width: 500,
              backgroundColor: "rgb(181, 220, 255)",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
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
                    <label>Aluksen nopeusluokka:</label>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    style={{ fontSize: 16 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label>Arvovälit nopeusluokille v [knots]:</label>
                  </Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <input
                      type="radio"
                      name="vessel_speed_radio"
                      value="fast"
                      id="fast"
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          boat: { ...userInput.boat, speed: ev.target.value },
                        })
                      }
                    />
                    <label>Nopea</label>
                  </Grid>
                  <Grid item xs={8}>
                    <label>{"v ≥ "}</label>
                    <input
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="nopeus"
                      defaultValue={12}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      type="radio"
                      name="vessel_speed_radio"
                      value="moderate"
                      id="moderate"
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          boat: { ...userInput.boat, speed: ev.target.value },
                        })
                      }
                    />
                    <label>Keskiverto</label>
                  </Grid>
                  <Grid item xs={8}>
                    <input
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="nopeus"
                      defaultValue={8}
                    />
                    <label>{"≤ v <"}</label>
                    <input
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="nopeus"
                      defaultValue={12}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <input
                      type="radio"
                      name="vessel_speed_radio"
                      value="slow"
                      id="slow"
                      onChange={(ev) =>
                        setUserInput({
                          ...userInput,
                          boat: { ...userInput.boat, speed: ev.target.value },
                        })
                      }
                    />
                    <label>Hidas</label>
                  </Grid>
                  <Grid item xs={8}>
                    <input
                      type="number"
                      required
                      style={{
                        width: 100,
                      }}
                      placeholder="nopeus"
                      defaultValue={5}
                    />
                    <label>{"≤ v <"}</label>
                    <input
                      type="number"
                      required
                      style={{
                        width: 100,
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
              width: 500,
              backgroundColor: "rgb(181, 220, 255)",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
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
                  <label>Väylä (WF channel):</label>
                </Grid>
                <Grid item xs={2}>
                  <input
                    {...register("userInput.weightfactors.WF_channel", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    required
                    style={{
                      width: 60,
                    }}
                    value={userInput.weightfactors.WF_channel}
                    onChange={(ev) =>
                      setUserInput({
                        ...userInput,
                        weightfactors: {
                          ...userInput.weightfactors,
                          WF_channel: ev.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={9.5}>
                  <label>Mutka (WF bend):</label>
                </Grid>
                <Grid item xs={2}>
                  <input
                    {...register("userInput.weightfactors.WF_bend", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    required
                    style={{
                      width: 60,
                    }}
                    value={userInput.weightfactors.WF_bend}
                    onChange={(ev) =>
                      setUserInput({
                        ...userInput,
                        weightfactors: {
                          ...userInput.weightfactors,
                          WF_bend: ev.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={9.5}>
                  <label>S-mutka (WF S-bend):</label>
                </Grid>
                <Grid item xs={2}>
                  <input
                    {...register("userInput.weightfactors.WF_s_bend", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    required
                    style={{
                      width: 60,
                    }}
                    value={userInput.weightfactors.WF_s_bend}
                    onChange={(ev) =>
                      setUserInput({
                        ...userInput,
                        weightfactors: {
                          ...userInput.weightfactors,
                          WF_s_bend: ev.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={9.5}>
                  <label>
                    Liikenteen monimutkaisuus (WF traffic complexity):
                  </label>
                </Grid>
                <Grid item xs={2}>
                  <input
                    {...register(
                      "userInput.weightfactors.WF_traffic_complexity",
                      { valueAsNumber: true }
                    )}
                    type="number"
                    required
                    style={{
                      width: 60,
                    }}
                    value={userInput.weightfactors.WF_traffic_complexity}
                    onChange={(ev) =>
                      setUserInput({
                        ...userInput,
                        weightfactors: {
                          ...userInput.weightfactors,
                          WF_traffic_complexity: ev.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={9.5}>
                  <label>WF reduced visibility:</label>
                </Grid>
                <Grid item xs={2}>
                  <input
                    {...register(
                      "userInput.weightfactors.WF_reduced_visibility",
                      { valueAsNumber: true }
                    )}
                    type="number"
                    required
                    style={{
                      width: 60,
                    }}
                    value={userInput.weightfactors.WF_reduced_visibility}
                    onChange={(ev) =>
                      setUserInput({
                        ...userInput,
                        weightfactors: {
                          ...userInput.weightfactors,
                          WF_reduced_visibility: ev.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={9.5}>
                  <label>Keinovalon määrä (WF light pollution):</label>
                </Grid>
                <Grid item xs={2}>
                  <input
                    {...register("userInput.weightfactors.WF_light_pollution", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    required
                    style={{
                      width: 60,
                    }}
                    value={userInput.weightfactors.WF_light_pollution}
                    onChange={(ev) =>
                      setUserInput({
                        ...userInput,
                        weightfactors: {
                          ...userInput.weightfactors,
                          WF_light_pollution: ev.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Esitysvärit */}
          <Card
            style={{
              width: 500,
              backgroundColor: "rgb(181, 220, 255)",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <CardContent>
              <Typography
                style={{ fontSize: 16 }}
                color="textSecondary"
                gutterBottom
              >
                Riskiarvojen esitysvärien raja-arvot:
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={2.5}>
                  <Box
                    sx={{
                      bgcolor: "green",
                      color: "success.contrastText",
                      p: 1,
                    }}
                  >
                    Vihreä
                  </Box>
                </Grid>
                <Grid item xs={9.5}>
                  <input
                    type="float"
                    required
                    defaultValue={0}
                    style={{
                      width: 100,
                    }}
                  />
                  <label>{"≤ RIV <"}</label>
                  <input
                    type="float"
                    required
                    value={RIVTrafficLight.green}
                    onChange={(ev) =>
                      setRIVTraffiLight({
                        ...RIVTrafficLight,
                        green: Number(ev.target.value),
                      })
                    }
                    style={{
                      width: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <Box sx={{ bgcolor: "yellow", color: "black", p: 1 }}>
                    Keltainen
                  </Box>
                </Grid>
                <Grid item xs={9.5}>
                  <input
                    type="float"
                    required
                    value={RIVTrafficLight.green}
                    onChange={(ev) =>
                      setRIVTraffiLight({
                        ...RIVTrafficLight,
                        green: Number(ev.target.value),
                      })
                    }
                    style={{
                      width: 100,
                    }}
                  />
                  <label>{"≤ RIV <"}</label>
                  <input
                    type="float"
                    required
                    value={RIVTrafficLight.yellow}
                    onChange={(ev) =>
                      setRIVTraffiLight({
                        ...RIVTrafficLight,
                        yellow: Number(ev.target.value),
                      })
                    }
                    style={{
                      width: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <Box sx={{ bgcolor: "red", color: "white", p: 1 }}>
                    Punainen
                  </Box>
                </Grid>
                <Grid item xs={9.5}>
                  <label>{"RIV ≥ "}</label>
                  <input
                    type="float"
                    required
                    value={RIVTrafficLight.yellow}
                    onChange={(ev) =>
                      setRIVTraffiLight({
                        ...RIVTrafficLight,
                        yellow: Number(ev.target.value),
                      })
                    }
                    style={{
                      width: 100,
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
              width: 500,
              backgroundColor: "rgb(181, 220, 255)",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <CardContent>
              <Controller
                control={control}
                name={"VAYLAT_id"}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    freeSolo
                    disablePortal
                    id="combo-box-demo"
                    options={VAYLATids}
                    value={userInput.navilinja.VAYLAT}
                    onChange={(ev, newValue) =>
                      setUserInput({
                        ...userInput,
                        navilinja: {
                          ...userInput.navilinja,
                          VAYLAT: newValue,
                        },
                      })
                    }
                    inputValue={vaylatInputValue}
                    onInputChange={(ev, newInputValue) =>
                      setVaylatInputValue(newInputValue)
                    }
                    sx={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField style={{backgroundColor: 'white'}} {...params} label="VAYLAT id" />
                    )}
                  />
                )}
              />
              {/* <label>
                Väylän id (VAYLAT):
                <input
                  placeholder="VAYLAT"
                  type="number"
                  required
                  style={{
                    width: 100,
                  }}
                />
              </label> */}
            </CardContent>
            <CardContent>
              <Grid container spacing={1}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={6.5}>
                      <Typography
                        style={{ fontSize: 16 }}
                        color="textSecondary"
                        gutterBottom
                      >
                        <label>Väylän parametrit:</label>
                      </Typography>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <label> Tyyppi: </label>
                      </Grid>
                      <Grid item xs={9}>
                        <select
                          {...register(
                            "userInput.navilinja.calculation_params.type"
                          )}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  type: ev.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option defaultValue="inner">Sisävesiväylä</option>
                          <option value="outer">Ulkovesiväylä</option>
                        </select>
                      </Grid>
                      <Grid item xs={3}>
                        <label> Kaistat: </label>
                      </Grid>
                      <Grid item xs={9}>
                        <select
                          {...register(
                            "userInput.navilinja.calculation_params.number_of_lanes"
                          )}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  number_of_lanes: ev.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option defaultValue={1}>Yksisuuntainen väylä</option>
                          <option value={2}>Kaksisuuntainen väylä</option>
                        </select>
                      </Grid>
                      <Grid item xs={3}>
                        <label> Pohja: </label>
                      </Grid>
                      <Grid item xs={9}>
                        <select
                          {...register(
                            "userInput.navilinja.calculation_params.bottom_surface"
                          )}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  bottom_surface: ev.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option defaultValue="rough_and_hard">
                            Rosoinen ja kova
                          </option>
                          <option value="smooth_and_soft">
                            Sileä ja pehmeä
                          </option>
                        </select>
                      </Grid>
                      <Grid item xs={3}>
                        <label> Näkyvyys (m): </label>
                      </Grid>
                      <Grid item xs={9}>
                        <input
                          {...register(
                            "userInput.navilinja.calculation_params.other.visibility",
                            { valueAsNumber: true }
                          )}
                          type="number"
                          required
                          style={{
                            width: 100,
                          }}
                          value={
                            userInput.navilinja.calculation_params.other
                              .visibility
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  other: {
                                    ...userInput.navilinja.calculation_params
                                      .other,
                                    visibility: ev.target.value,
                                  },
                                },
                              },
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                <Card
                  style={{
                    width: 500,
                    backgroundColor: "rgb(181, 220, 255)",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  <CardContent>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      <label>Väylän syvyyden painokerroin:</label>
                    </Typography>
                    <div>
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
                            <label>
                              {" "}
                              Syvyyden painokerroin kerrotaan aluksen leveydellä
                              alla näkyvien määritysten perusteella, joihin
                              vaikuttaa väylän syvyys ja aluksen syväys.
                              Laskennassa voi käyttää oletusarvoja tai määrittää
                              uudet painokertoimet.
                            </label>
                          </Typography>
                        )}
                      </div>
                    </div>
                    <Grid container spacing={1}>
                      <Grid item xs={5}>
                        <label> Sisävesiväylä </label>
                      </Grid>
                      <Grid item xs={6}>
                        <label> Ulkovesiväylä </label>
                      </Grid>
                      <Grid item xs={5}>
                        <div>
                          <label style={{ fontSize: 10 }}>
                            syvyys ≥ 1.5 * syväys
                          </label>
                        </div>
                        <input
                          {...register(
                            "userInput.channel_depth_wf.deep_inner_channel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.channel_depth_wf.deep_inner_channel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              channel_depth_wf: {
                                ...userInput.channel_depth_wf,
                                deep_inner_channel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>
                            1.15*syväys ≤ syvyys 1.5*syväys
                          </label>
                        </div>
                        <input
                          {...register(
                            "userInput.channel_depth_wf.medium_deep_inner_channel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.channel_depth_wf.medium_deep_inner_channel
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              channel_depth_wf: {
                                ...userInput.channel_depth_wf,
                                medium_deep_inner_channel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>
                            {"syvyys < 1.15*syväys"}
                          </label>
                        </div>
                        <input
                          {...register(
                            "userInput.channel_depth_wf.shallow_inner_channel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.channel_depth_wf.shallow_inner_channel
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              channel_depth_wf: {
                                ...userInput.channel_depth_wf,
                                shallow_inner_channel: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <label style={{ fontSize: 10 }}>
                            syvyys ≥ 1.5 * syväys
                          </label>
                        </div>
                        <input
                          {...register(
                            "userInput.channel_depth_wf.deep_outer_channel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.channel_depth_wf.deep_outer_channel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              channel_depth_wf: {
                                ...userInput.channel_depth_wf,
                                deep_outer_channel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>
                            1.25*syväys ≤ syvyys 1.5*syväys
                          </label>
                        </div>
                        <input
                          {...register(
                            "userInput.channel_depth_wf.medium_deep_outer_channel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.channel_depth_wf.medium_deep_outer_channel
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              channel_depth_wf: {
                                ...userInput.channel_depth_wf,
                                medium_deep_outer_channel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>
                            {"syvyys < 1.25*syväys"}
                          </label>
                        </div>
                        <input
                          {...register(
                            "userInput.channel_depth_wf.shallow_outer_channel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.channel_depth_wf.shallow_outer_channel
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              channel_depth_wf: {
                                ...userInput.channel_depth_wf,
                                shallow_outer_channel: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    width: 500,
                    backgroundColor: "rgb(181, 220, 255)",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  <CardContent>
                    <Typography
                      style={{ fontSize: 16 }}
                      color="textSecondary"
                      gutterBottom
                    >
                      Väylän reuna ja reunan painokerroin:
                    </Typography>
                    <div>
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
                              Riskiarvon laskentaan valitaan väylän reunan
                              tyyppi. Alla on esitetty myös reunan
                              painokertoimet joihin vaikuttaa reunan tyyppi sekä
                              aluksen nopeusluokka. Painokerroin ja aluksen
                              leveys kerrotaan laskennassa. Laskennassa voi
                              käyttää oletusarvoja tai määrittää uudet
                              painokertoimet.
                            </label>
                          </Typography>
                        )}
                      </div>
                    </div>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <input
                          type="radio"
                          name="channel_edge_radio"
                          value="gentle_slope"
                          id="gentle_slope"
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  channel_edge: ev.target.value,
                                },
                              },
                            })
                          }
                        />
                        <label>Loiva kaltevuus</label>
                        <div>
                          <label style={{ fontSize: 10 }}>nopea</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_gentle_fast",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf
                              .edge_category_gentle_fast
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_gentle_fast: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>keskiverto</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_gentle_moderate",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf
                              .edge_category_gentle_moderate
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_gentle_moderate: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>hidas</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_gentle_slow",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf
                              .edge_category_gentle_slow
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_gentle_slow: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <input
                          type="radio"
                          name="channel_edge_radio"
                          value="sloping_edges"
                          id="sloping_edges"
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  sloping_edges: ev.target.value,
                                },
                              },
                            })
                          }
                        />
                        <label>Viistot reunat</label>
                        <div>
                          <label style={{ fontSize: 10 }}>nopea</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_sloping_fast",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf
                              .edge_category_sloping_fast
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_sloping_fast: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>keskiverto</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_sloping_moderate",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf
                              .edge_category_sloping_moderate
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_sloping_moderate: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>hidas</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_sloping_slow",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf
                              .edge_category_sloping_slow
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_sloping_slow: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <input
                          type="radio"
                          name="channel_edge_radio"
                          value="steep_and_hard"
                          id="steep_and_hard"
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  steep_and_hard: ev.target.value,
                                },
                              },
                            })
                          }
                        />
                        <label>Jyrkkä ja kova</label>
                        <div>
                          <label style={{ fontSize: 10 }}>nopea</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_steep_fast",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf.edge_category_steep_fast
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_steep_fast: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>keskiverto</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_steep_moderate",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf
                              .edge_category_steep_moderate
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_steep_moderate: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>hidas</label>
                        </div>
                        <input
                          {...register(
                            "userInput.bank_clearance_wf.edge_category_steep_slow",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.bank_clearance_wf.edge_category_steep_slow
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              bank_clearance_wf: {
                                ...userInput.bank_clearance_wf,
                                edge_category_steep_slow: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <CardContent>
                  <Grid container spacing={0}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <label> ATN: </label>
                      </Grid>
                      <Grid item xs={5}>
                        <select
                          {...register(
                            "userInput.navilinja.calculation_params.aids_to_navigation"
                          )}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  aids_to_navigation: ev.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option defaultValue="excellent">Erinomainen</option>
                          <option value="good">Hyvä</option>
                          <option value="moderate">Keskiverto</option>
                        </select>
                      </Grid>
                      <Grid item xs={6}>
                        <label> Liikenteen määrä: </label>
                      </Grid>
                      <Grid item xs={4}>
                        <select
                          {...register(
                            "userInput.navilinja.calculation_params.other.traffic_volume"
                          )}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  other: {
                                    ...userInput.navilinja.calculation_params
                                      .other,
                                    traffic_volume: ev.target.value,
                                  },
                                },
                              },
                            })
                          }
                        >
                          <option defaultValue="negligible">Olematon</option>
                          <option value="low">Matala</option>
                          <option value="moderate">Keskiverto</option>
                          <option value="heavy">Runsas</option>
                          <option value="very_heavy">Todella runsas</option>
                        </select>
                      </Grid>
                      <Grid item xs={6}>
                        <label> Liikenteen monimutkaisuus: </label>
                      </Grid>
                      <Grid item xs={4}>
                        <select
                          {...register(
                            "userInput.navilinja.calculation_params.other.traffic_complexity"
                          )}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  other: {
                                    ...userInput.navilinja.calculation_params
                                      .other,
                                    traffic_complexity: ev.target.value,
                                  },
                                },
                              },
                            })
                          }
                        >
                          <option defaultValue="negligible">Olematon</option>
                          <option value="low">Matala</option>
                          <option value="moderate">Keskiverto</option>
                          <option value="heavy">Monimutkainen</option>
                          <option value="very_heavy">
                            Erittäin monimutkainen
                          </option>
                        </select>
                      </Grid>
                      <Grid item xs={6}>
                        <label> Keinovalon määrä: </label>
                      </Grid>
                      <Grid item xs={5}>
                        <select
                          {...register(
                            "userInput.navilinja.calculation_params.light_pollution"
                          )}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  light_pollution: ev.target.value,
                                },
                              },
                            })
                          }
                        >
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
          {/* Vesiliikenteen olosuhteet */}
          <Card
            style={{
              width: 500,
              backgroundColor: "rgb(181, 220, 255)",
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
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
                    width: 500,
                    backgroundColor: "rgb(181, 220, 255)",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
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
                    </div>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <input
                          type="radio"
                          name="wind_radio"
                          value="mild"
                          id="mild"
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  operating_conditions: {
                                    ...userInput.navilinja.calculation_params
                                      .operating_conditions,
                                    wind_speed: ev.target.value,
                                  },
                                },
                              },
                            })
                          }
                        />
                        <label>Heikko</label>
                        <Typography
                          style={{ fontSize: 12 }}
                          color="textSecondary"
                          gutterBottom
                        >
                          <label>{"Tuulen nopeus < 7 m/s"}</label>
                        </Typography>
                        <div>
                          <label style={{ fontSize: 10 }}>nopea</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.mild_wind_fast_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.mild_wind_fast_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                mild_wind_fast_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>keskiverto</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.mild_wind_moderate_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.mild_wind_moderate_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                mild_wind_moderate_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>hidas</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.mild_wind_slow_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.mild_wind_slow_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                mild_wind_slow_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <input
                          type="radio"
                          name="wind_radio"
                          value="moderate"
                          id="moderate"
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  operating_conditions: {
                                    ...userInput.navilinja.calculation_params
                                      .operating_conditions,
                                    wind_speed: ev.target.value,
                                  },
                                },
                              },
                            })
                          }
                        />
                        <label>Keskiverto</label>
                        <Typography
                          style={{ fontSize: 12 }}
                          color="textSecondary"
                          gutterBottom
                        >
                          <label>{"Tuulen nopeus 7 -17 m/s"}</label>
                        </Typography>
                        <div>
                          <label style={{ fontSize: 10 }}>nopea</label>
                        </div>
                        <input
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.moderate_wind_fast_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                moderate_wind_fast_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>keskiverto</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.moderate_wind_moderate_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={
                            userInput.wind_wf.moderate_wind_moderate_vessel
                          }
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                moderate_wind_moderate_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>hidas</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.moderate_wind_slow_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.moderate_wind_slow_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                moderate_wind_slow_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <input
                          type="radio"
                          name="wind_radio"
                          value="strong"
                          id="strong"
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              navilinja: {
                                ...userInput.navilinja,
                                calculation_params: {
                                  ...userInput.navilinja.calculation_params,
                                  operating_conditions: {
                                    ...userInput.navilinja.calculation_params
                                      .operating_conditions,
                                    wind_speed: ev.target.value,
                                  },
                                },
                              },
                            })
                          }
                        />
                        <label>Voimakas</label>
                        <Typography
                          style={{ fontSize: 12 }}
                          color="textSecondary"
                          gutterBottom
                        >
                          <label>{"Tuulen nopeus > 17 m/s"}</label>
                        </Typography>
                        <div>
                          <label style={{ fontSize: 10 }}>nopea</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.strong_wind_fast_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.strong_wind_fast_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                strong_wind_fast_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>keskiverto</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.strong_wind_moderate_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.strong_wind_moderate_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                strong_wind_moderate_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                        <div>
                          <label style={{ fontSize: 10 }}>hidas</label>
                        </div>
                        <input
                          {...register(
                            "userInput.wind_wf.strong_wind_slow_vessel",
                            { valueAsNumber: true }
                          )}
                          type="float"
                          required
                          style={{
                            width: 100,
                          }}
                          placeholder="painokerroin"
                          value={userInput.wind_wf.strong_wind_slow_vessel}
                          onChange={(ev) =>
                            setUserInput({
                              ...userInput,
                              wind_wf: {
                                ...userInput.wind_wf,
                                strong_wind_slow_vessel: ev.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {/* Poikkivirtaus */}
                <Card
                  style={{
                    width: 500,
                    backgroundColor: "rgb(181, 220, 255)",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom
                        >
                          <label>Poikkivirtaus:</label>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          style={{ fontSize: 16 }}
                          color="textSecondary"
                          gutterBottom
                        >
                          <label>
                            Arvovälit poikkivirtauksen nopeudelle v [knots]:
                          </label>
                        </Typography>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <input
                            type="radio"
                            name="cross_current_radio"
                            value="negligible"
                            id="negligible"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_speed: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Olematon</label>
                        </Grid>
                        <Grid item xs={9}>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wneg_lower",
                              { valueAsNumber: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={0.0}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions.cross_current_neg_lower
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_neg_lower: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>{"≤ v <"}</label>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wneg_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={0.2}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions.cross_current_Wneg_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_Wneg_upper: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <input
                            type="radio"
                            name="cross_current_radio"
                            value="low"
                            id="low"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_speed: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Heikko</label>
                        </Grid>
                        <Grid item xs={9}>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wneg_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={0.2}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions.cross_current_Wneg_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_Wneg_upper: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>{"≤ v <"}</label>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wlow_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={0.5}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions.cross_current_Wlow_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_Wlow_upper: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <input
                            type="radio"
                            name="cross_current_radio"
                            value="moderate"
                            id="moderate"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_speed: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Keskiverto</label>
                        </Grid>
                        <Grid item xs={9}>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wlow_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={0.5}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions.cross_current_Wlow_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_Wlow_upper: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>{"≤ v <"}</label>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wmod_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={1.5}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions.cross_current_Wmod_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_Wmod_upper: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <input
                            type="radio"
                            name="cross_current_radio"
                            value="strong"
                            id="strong"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_speed: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Voimakas</label>
                        </Grid>
                        <Grid item xs={9}>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wmod_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={1.5}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions.cross_current_Wmod_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_Wmod_upper: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>{"≤ v <"}</label>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.cross_current_Wstrong_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={2}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions
                                .cross_current_Wstrong_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      cross_current_Wstrong_upper:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {/* Pitkittäisvirtaus */}
                <Card
                  style={{
                    width: 500,
                    backgroundColor: "rgb(181, 220, 255)",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
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
                          <label>
                            Arvovälit pitkittäisvirtauksen nopeudelle v [knots]:
                          </label>
                        </Typography>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <input
                            type="radio"
                            name="longitudinal_current_radio"
                            value="negligible"
                            id="negligible"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_speed:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Olematon</label>
                        </Grid>
                        <Grid item xs={8}>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.longitudinal_current_Wneg_lower",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={0}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions
                                .longitudinal_current_Wneg_lower
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_Wneg_lower:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>{"≤ v <"}</label>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.longitudinal_current_Wneg_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={1.5}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions
                                .longitudinal_current_Wneg_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_Wneg_upper:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <input
                            type="radio"
                            name="longitudinal_current_radio"
                            value="moderate"
                            id="moderate"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_speed:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Keskiverto</label>
                        </Grid>
                        <Grid item xs={8}>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.longitudinal_current_Wneg_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={1.5}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions
                                .longitudinal_current_Wneg_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_Wneg_upper:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>{"≤ v <"}</label>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.longitudinal_current_Wmod_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={3}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions
                                .longitudinal_current_Wmod_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_Wmod_upper:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <input
                            type="radio"
                            name="longitudinal_current_radio"
                            value="strong"
                            id="strong"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_speed:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Voimakas</label>
                        </Grid>
                        <Grid item xs={8}>
                          <label>{"v ≥ "}</label>
                          <input
                            {...register(
                              "userInput.navilinja.calculation_params.operating_conditions.longitudinal_current_Wmod_upper",
                              { valueAsfloat: true }
                            )}
                            type="float"
                            required
                            placeholder="nopeus"
                            defaultValue={3}
                            style={{
                              width: 100,
                            }}
                            value={
                              userInput.navilinja.calculation_params
                                .operating_conditions
                                .longitudinal_current_Wmod_upper
                            }
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      longitudinal_current_Wmod_upper:
                                        ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {/* Aallon korkeus */}
                <Card
                  style={{
                    width: 500,
                    backgroundColor: "rgb(181, 220, 255)",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
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
                      <Grid item xs={6}>
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
                          <input
                            type="radio"
                            name="wave_height_radio"
                            value="low"
                            id="low"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      wave_height: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Matala</label>
                        </Grid>
                        <Grid item xs={8}>
                          <input
                            type="number"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="aallon korkeus"
                            defaultValue={0.0}
                          />
                          <label>{"≤ h <"}</label>
                          <input
                            type="number"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="aallon korkeus"
                            defaultValue={1.0}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <input
                            type="radio"
                            name="wave_height_radio"
                            value="moderate"
                            id="moderate"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      wave_height: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Keskiverto</label>
                        </Grid>
                        <Grid item xs={8}>
                          <input
                            type="number"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="aallon korkeus"
                            defaultValue={1.0}
                          />
                          <label>{"≤ h ≤"}</label>
                          <input
                            type="number"
                            required
                            style={{
                              width: 100,
                            }}
                            placeholder="aallon korkeus"
                            defaultValue={3.0}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <input
                            type="radio"
                            name="wave_height_radio"
                            value="high"
                            id="high"
                            onChange={(ev) =>
                              setUserInput({
                                ...userInput,
                                navilinja: {
                                  ...userInput.navilinja,
                                  calculation_params: {
                                    ...userInput.navilinja.calculation_params,
                                    operating_conditions: {
                                      ...userInput.navilinja.calculation_params
                                        .operating_conditions,
                                      wave_height: ev.target.value,
                                    },
                                  },
                                },
                              })
                            }
                          />
                          <label>Korkea</label>
                        </Grid>
                        <Grid item xs={8}>
                          <label>{"h > "}</label>
                          <input
                            type="number"
                            required
                            style={{
                              width: 100,
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
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default UserInputForm;
