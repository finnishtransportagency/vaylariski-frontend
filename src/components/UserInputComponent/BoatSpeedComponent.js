import {
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

export default function BoatSpeedComponent(props) {
  const { formik } = props;
  const [selected, setSelected] = useState("moderate");

  return (
    <>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Aluksen nopeusluokka
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          row
          aria-labelledby={`${props.name}-group-label`}
          name={props.name}
          value={selected}
          defaultValue="moderate"
          onChange={(e) => {
            formik.setFieldValue(props.name, e.target.value);
            setSelected(e.target.value);
          }}
        >
          <Grid item xs={4}>
            <Tooltip
              placement="bottom"
              arrow
              title={<label style={{ fontSize: 14 }}>{"5 ≤ v < 8"}</label>}
            >
              <FormControlLabel
                value="slow"
                control={<Radio />}
                label="Hidas"
              />
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              placement="bottom"
              arrow
              title={<label style={{ fontSize: 14 }}>{"8 ≤ v < 12"}</label>}
            >
              <FormControlLabel
                value="moderate"
                control={<Radio />}
                label="Keskiverto"
              />
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              placement="bottom"
              arrow
              title={<label style={{ fontSize: 14 }}>{"v ≥ 12"}</label>}
            >
              <FormControlLabel
                value="fast"
                control={<Radio />}
                label="Nopea"
              />
            </Tooltip>
          </Grid>
        </RadioGroup>
      </Grid>
    </>
  );
}
