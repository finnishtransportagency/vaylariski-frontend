import { Grid, Typography } from "@mui/material";
import CustomRadio from "components/customInputs/CustomRadio";

export default function BoatSpeedComponent(props) {
  const { formik } = props;
  const RadioButtonPropsArr = [
    {
      value: "slow",
      label: "Hidas",
      labelHelperText: "5 ≤ v < 8",
    },
    {
      value: "moderate",
      label: "Keskiverto",
      labelHelperText: "8 ≤ v < 12",
    },
    {
      value: "fast",
      label: "Nopea",
      labelHelperText: "v ≥ 12",
    },
  ];

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
      <CustomRadio
        formik={formik}
        formikName={props.name}
        defaultValue={RadioButtonPropsArr[1].value}
        buttonPropsArr={RadioButtonPropsArr}
      />
    </Grid>
  );
}
