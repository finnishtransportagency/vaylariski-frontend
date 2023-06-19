import { CardContent, Typography, Grid, Box, Button } from "@mui/material";
import RIVTrafficLightContext from "contexts/RIVTrafficLightContext";
import { useState } from "react";
import { useContext } from "react";

export default function RIVTrafficLightsComponent() {
  const { RIVTrafficLight, setRIVTraffiLight } = useContext(
    RIVTrafficLightContext
  );
  const [tempRIVTrafficLight, setTempRIVTrafficLight] =
    useState(RIVTrafficLight);

  return (
    <CardContent>
      <Typography
        style={{ fontSize: 16, fontWeight: 550 }}
        color="textSecondary"
        gutterBottom
      >
        Riskiarvojen esitysvärien raja-arvot:
      </Typography>
      <Grid container item xs={9}>
        <Grid
          container
          item
          xs
          justifyContent="space-evenly"
          sx={{
            bgcolor: "green",
            color: "success.contrastText",
            p: 1,
          }}
        >
          <Box>
            <label>{"RIV <"}</label>
            <input
              type="float"
              required
              value={tempRIVTrafficLight.green}
              onChange={(ev) =>
                setTempRIVTrafficLight({
                  ...tempRIVTrafficLight,
                  green: Number(ev.target.value),
                })
              }
              style={{
                width: 100,
              }}
            />
          </Box>
        </Grid>
        <Grid
          container
          item
          xs
          justifyContent="space-evenly"
          sx={{ bgcolor: "yellow", color: "black", p: 1 }}
        >
          <Box>
            <input
              type="float"
              required
              value={tempRIVTrafficLight.green}
              onChange={(ev) =>
                setTempRIVTrafficLight({
                  ...tempRIVTrafficLight,
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
              value={tempRIVTrafficLight.yellow}
              onChange={(ev) =>
                setTempRIVTrafficLight({
                  ...tempRIVTrafficLight,
                  yellow: Number(ev.target.value),
                })
              }
              style={{
                width: 100,
              }}
            />
          </Box>
        </Grid>
        <Grid
          container
          item
          xs
          justifyContent="space-evenly"
          sx={{ bgcolor: "red", color: "white", p: 1 }}
        >
          <Box>
            <label>{"RIV ≥"}</label>
            <input
              type="float"
              required
              value={tempRIVTrafficLight.yellow}
              onChange={(ev) =>
                setTempRIVTrafficLight({
                  ...tempRIVTrafficLight,
                  yellow: Number(ev.target.value),
                })
              }
              style={{
                width: 100,
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={9}>
        <Grid
          justifyContent="space-evenly"
          container
          item
          xs={4}
          sx={{ bgcolor: "gray", color: "black", p: 1 }}
        >
          <label>
            Piste esitetään harmaana, jos siltä puuttuu leveys tai syvyys, mikä
            vaikuttaa lopulliseen riskiarvoon.
          </label>
        </Grid>
        <Grid
          item
          xs={4}
          container
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={() => {
              setRIVTraffiLight(tempRIVTrafficLight);
            }}
          >
            Aseta / Piirrä
          </Button>
        </Grid>
        {/* Tarkista onko syvyys tai leveys np.NaN jos on niin laita trafficlight vihreäksi*/}
      </Grid>
    </CardContent>
  );
}
