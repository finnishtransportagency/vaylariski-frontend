import { Grid, Typography } from "@mui/material";

import WindComponent from "./WindComponent.jsx";
import CrossCurrentCmponent from "./CrossCurrentCmponent.jsx";
import LongitudialCurrentComponent from "./LongitudialCurrentComponent.jsx";
import WaveHeightComponent from "./WaveHeightComponent.jsx";

export default function WayareaConditionsComponent(props) {
  const { formik } = props;

  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Vesiliikenteen olosuhteet
        </Typography>
      </Grid>
      <WindComponent formik={formik} />
      <Grid container item spacing={2}>
        <CrossCurrentCmponent formik={formik} />
        <LongitudialCurrentComponent formik={formik} />
        <WaveHeightComponent formik={formik} />
      </Grid>
    </Grid>
  );
}
