import {
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import RIVTrafficLightContext from "contexts/RIVTrafficLightContext";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function RIVTrafficLightsComponent() {
  const { RIVTrafficLight, setRIVTraffiLight } = useContext(
    RIVTrafficLightContext
  );
  const [tempRIVTrafficLight, setTempRIVTrafficLight] =
    useState(RIVTrafficLight);

  return (
    <CardContent>
      <Tooltip
        placement="right"
        arrow
        title="Piste esitetään harmaana, jos siltä puuttuu leveys tai syvyys, mikä vaikuttaa lopulliseen riskiarvoon."
      >
        <Typography
          sx={{ fontSize: 16, fontWeight: 550, width: "fit-content" }}
          color="textSecondary"
          gutterBottom
        >
          Riskiarvojen esitysvärien raja-arvot:{" "}
          <span>
            <AiOutlineInfoCircle />
          </span>
        </Typography>
      </Tooltip>

      <Grid container item xs={9} sx={{ paddingBottom: 1 }}>
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
            <label>{"≤ RIV"}</label>
          </Box>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={() => {
          setRIVTraffiLight(tempRIVTrafficLight);
        }}
      >
        Aseta / Piirrä
      </Button>
      {/* Tarkista onko syvyys tai leveys np.NaN jos on niin laita trafficlight vihreäksi*/}
    </CardContent>
  );
}
