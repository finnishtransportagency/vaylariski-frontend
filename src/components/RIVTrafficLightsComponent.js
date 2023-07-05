import {
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Tooltip,
  IconButton,
  Slider,
  Switch,
  TextField,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
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
  const [open, setOpen] = useState(false);
  const [showOld, setShowOld] = useState(false);

  const minDistance = 0;
  const maxSliderValue = 50;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxSliderValue - minDistance);
        setTempRIVTrafficLight({
          green: clamped + minDistance,
          yellow: clamped,
        });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setTempRIVTrafficLight({
          green: clamped - minDistance,
          yellow: clamped,
        });
      }
    } else {
      setTempRIVTrafficLight({
        green: newValue[0],
        yellow: newValue[1],
      });
    }
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <CardContent>
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
        Riskiarvojen esitysvärien raja-arvot:
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            placement="right"
            arrow
            title={
              <label style={{ fontSize: 14 }}>
                Piste esitetään harmaana, jos siltä puuttuu leveys tai syvyys,
                mikä vaikuttaa lopulliseen riskiarvoon.
              </label>
            }
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <IconButton onClick={handleTooltipOpen}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      </Typography>
      <Typography
        style={{
          fontSize: 14,
          fontWeight: 275,
          verticalAlign: "middle",
        }}
        color="textSecondary"
        gutterBottom
      >
        Näytä numeeriset inputit
        <Switch
          size="small"
          checked={showOld}
          onChange={(e) => setShowOld(e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Typography>
      {showOld ? (
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
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? "white"
                      : "red",
                }}
                InputProps={{ sx: { height: 30 } }}
                type="number"
                value={tempRIVTrafficLight.green}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    green: Number(ev.target.value),
                  })
                }
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
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? "white"
                      : "red",
                }}
                InputProps={{ sx: { height: 30 } }}
                type="number"
                value={tempRIVTrafficLight.green}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    green: Number(ev.target.value),
                  })
                }
              />
              <label>{"≤ RIV <"}</label>
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? "white"
                      : "red",
                }}
                InputProps={{ sx: { height: 30 } }}
                type="number"
                value={tempRIVTrafficLight.yellow}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    yellow: Number(ev.target.value),
                  })
                }
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
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? "white"
                      : "red",
                }}
                InputProps={{ sx: { height: 30 } }}
                type="number"
                value={tempRIVTrafficLight.yellow}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    yellow: Number(ev.target.value),
                  })
                }
              />
              <label>{"≤ RIV"}</label>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Slider
            sx={{
              width: 500,
              height: 10,
              "& .MuiSlider-rail": {
                background: `linear-gradient(90deg, green ${
                  (tempRIVTrafficLight.green / maxSliderValue) * 100
                }%, red ${
                  (tempRIVTrafficLight.green / maxSliderValue) * 100
                }%);`,
                opacity: 1,
              },
              "& .MuiSlider-track": {
                color: "yellow",
              },
              "& .MuiSlider-mark": {
                color: "black",
              },
              "& .MuiSlider-markLabel": {
                color: "black",
              },
            }}
            valueLabelDisplay="auto"
            value={[tempRIVTrafficLight.green, tempRIVTrafficLight.yellow]}
            step={1}
            marks={Array.from(Array(Math.round(maxSliderValue / 10) + 1).keys())
              .map((e) => e * 10)
              .map((i) => ({
                label: i,
                value: i,
              }))}
            min={0}
            max={maxSliderValue}
            onChange={handleChange}
          />
        </Grid>
      )}
      <Tooltip
        placement="right"
        arrow
        title={
          tempRIVTrafficLight.green > tempRIVTrafficLight.yellow ? (
            <label style={{ fontSize: 14 }}>raja-arvot ovat virheellisiä</label>
          ) : (
            ""
          )
        }
      >
        <span>
          <Button
            disabled={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
            variant="contained"
            onClick={() => {
              setRIVTraffiLight(tempRIVTrafficLight);
            }}
          >
            <span style={{ marginRight: "0.2em" }}>Aseta</span>
            {tempRIVTrafficLight.green > tempRIVTrafficLight.yellow ? (
              <AiOutlineInfoCircle />
            ) : null}
          </Button>
        </span>
      </Tooltip>
      {/* Tarkista onko syvyys tai leveys np.NaN jos on niin laita trafficlight vihreäksi*/}
    </CardContent>
  );
}
