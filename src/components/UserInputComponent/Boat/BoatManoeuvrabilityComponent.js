import { Typography, Grid } from "@mui/material";

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
      <ManoeuvrabilityComponent name="boat.C_manoeuvrability" formik={formik} />

      <TurningRadiusComponent name="boat.C_turning_radius" formik={formik} />
    </Grid>
  );
}
