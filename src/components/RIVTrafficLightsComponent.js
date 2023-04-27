import { CardContent, Typography, Grid, Box } from "@mui/material";
import RIVTrafficLightContext from "contexts/RIVTrafficLightContext";
import { useContext } from "react";

export default function RIVTrafficLightsComponent(params) {
  const { RIVTrafficLight, setRIVTraffiLight } = useContext(RIVTrafficLightContext);

  return (
    <CardContent>
      <Typography style={{ fontSize: 16, fontWeight:550 }} color="textSecondary" gutterBottom>
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
          <Box sx={{ bgcolor: "yellow", color: "black", p: 1 }}>Keltainen</Box>
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
          <Box sx={{ bgcolor: "red", color: "white", p: 1 }}>Punainen</Box>
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
        <Grid item xs={2.5}>
          <Box sx={{bgcolor: "gray", color: "black", p: 1}}>Harmaa</Box>
        </Grid>
        <Grid item xs={9.5}>
          <label>Piste esitetään harmaana, jos siltä puuttuu leveys tai syvyys, mikä vaikuttaa lopulliseen riskiarvoon.</label>
        </Grid>
        {/* Tarkista onko syvyys tai leveys np.NaN jos on niin laita trafficlight vihreäksi*/}
        
      </Grid>
    </CardContent>
  );
}

