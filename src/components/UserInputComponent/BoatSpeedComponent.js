import {
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

export default function BoatSpeedComponent(props) {
  const { formik } = props;
  const [selected, setSelected] = useState("moderate");

  return (
    <Grid container spacing={1} paddingBottom={2}>
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
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
          value={selected}
          defaultValue="moderate"
          onChange={(e) => {
            formik.setFieldValue(props.name, e.target.value);
            setSelected(e.target.value);
          }}
        >
          <FormControlLabel
            value="slow"
            control={<Radio />}
            label={
              <>
                Hidas
                <br />
                <Typography
                  style={{ fontSize: 14 }}
                  color="textSecondary"
                  gutterBottom
                >
                  {"5 ≤ v < 8"}
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="moderate"
            control={<Radio />}
            label={
              <>
                Keskiverto
                <br />
                <Typography
                  style={{ fontSize: 14 }}
                  color="textSecondary"
                  gutterBottom
                >
                  {"8 ≤ v < 12"}
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="fast"
            control={<Radio />}
            label={
              <>
                Nopea
                <br />
                <Typography
                  style={{ fontSize: 14 }}
                  color="textSecondary"
                  gutterBottom
                >
                  {"v ≥ 12"}
                </Typography>
              </>
            }
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );
}
