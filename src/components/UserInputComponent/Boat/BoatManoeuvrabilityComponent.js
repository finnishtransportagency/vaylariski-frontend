import { Typography, Grid, InputLabel } from "@mui/material";

import ManoeuvrabilityComponent from "./ManoeuvrabilityComponent";
import TurningRadiusComponent from "./TurningRadiusComponent";

export default function BoatManoeuvrabilityComponent(props) {
  const { formik } = props;
  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          <label htmlFor="">Aluksen ohjailtavuusluokka</label>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <InputLabel style={{ fontSize: 14 }} id={"boat.C_manoeuvrability"}>
          Aluksen ohjailtavuusparametri C
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>M</span>
        </InputLabel>
        <ManoeuvrabilityComponent
          name="boat.C_manoeuvrability"
          formik={formik}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel style={{ fontSize: 14 }} id={"boat.C_turning_radius"}>
          Aluksen kääntösädettä kuvaava parametri C
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span>
        </InputLabel>
        <TurningRadiusComponent name="boat.C_turning_radius" formik={formik} />
      </Grid>
    </Grid>
  );
}
