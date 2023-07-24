import {
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

export default function WaveHeightComponent(props) {
  const { formik } = props;
  const [selected, setSelected] = useState("moderate");

  const buttonInfo = [
    {
      value: "low",
      label: "Matala",
      range: "0 ≤ h < 1",
    },
    {
      value: "moderate",
      label: "Keskiverto",
      range: "1 ≤ h < 3",
    },
    {
      value: "high",
      label: "Korkea",
      range: "h > 3",
    },
  ];

  const radioButtons = () => {
    return buttonInfo.map((o) => {
      return (
        <FormControlLabel
          key={`navline.calculation_params.operating_conditions.wave_height.${o.value}`}
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
          Aallon korkeus (h [m])
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          row
          name={"navline.calculation_params.operating_conditions.wave_height"}
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
          value={selected}
          defaultValue="negligible"
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.operating_conditions.wave_height",
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
