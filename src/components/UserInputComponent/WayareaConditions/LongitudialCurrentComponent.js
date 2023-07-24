import {
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

export default function LongitudialCurrentComponent(props) {
  const { formik } = props;
  const [selected, setSelected] = useState("moderate");

  const buttonInfo = [
    {
      value: "negligible",
      label: "Olematon",
      range: "0 ≤ v < 0.2",
    },
    {
      value: "moderate",
      label: "Keskiverto",
      range: "0.2 ≤ v < 0.5",
    },
    {
      value: "strong",
      label: "Voimakas",
      range: "v ≥ 3",
    },
  ];

  const radioButtons = () => {
    return buttonInfo.map((o) => {
      return (
        <FormControlLabel
          key={`navline.calculation_params.operating_conditions.longitudinal_current_speed.${o.value}`}
          value={o.value}
          control={<Radio />}
          label={
            <>
              {o.label}
              <br />
              <Typography
                style={{ fontSize: 14 }}
                color="textSecondary"
                gutterBottom
              >
                {o.range}
              </Typography>
            </>
          }
        />
      );
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 16,
            verticalAlign: "middle",
          }}
          color="textSecondary"
          gutterBottom
          component="span"
        >
          Pitkittäisvirtaus (v [solmu])
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          row
          name={
            "navline.calculation_params.operating_conditions.longitudinal_current_speed"
          }
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
          value={selected}
          defaultValue="negligible"
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.operating_conditions.longitudinal_current_speed",
              e.target.value
            );
            setSelected(e.target.value);
          }}
        >
          {radioButtons()}
        </RadioGroup>
      </Grid>
    </>
  );
}
