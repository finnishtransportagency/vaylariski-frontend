import { Grid, Typography, InputLabel, Select, MenuItem } from "@mui/material";

export default function TrafficFactorsComponent(props) {
  const { formik } = props;
  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Vesiliikenteeseen vaikuttavat tekijät
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.aids_to_navigation">
          Turvalaitteet (ATN)
        </InputLabel>
        <Select
          labelId="navline.calculation_params.aids_to_navigation"
          id="navline.calculation_params.aids_to_navigation"
          value={formik.values.navline.calculation_params.aids_to_navigation}
          size="small"
          fullWidth
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.aids_to_navigation",
              e.target.value
            );
          }}
        >
          <MenuItem value={"excellent"}>Erinomainen</MenuItem>
          <MenuItem value={"good"}>Hyvä</MenuItem>
          <MenuItem value={"moderate"}>Keskiverto</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.other.light_pollution">
          Taustavalon voimakkuus
        </InputLabel>
        <Select
          labelId="navline.calculation_params.other.light_pollution"
          id="navline.calculation_params.other.light_pollution"
          value={formik.values.navline.calculation_params.other.light_pollution}
          size="small"
          fullWidth
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.other.light_pollution",
              e.target.value
            );
          }}
        >
          <MenuItem value={"negligible"}>Olematon</MenuItem>
          <MenuItem value={"low"}>Heikko</MenuItem>
          <MenuItem value={"moderate"}>Keskiverto</MenuItem>
          <MenuItem value={"heavy"}>Voimakas</MenuItem>
          <MenuItem value={"very_heavy"}>Todella voimakas</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.other.traffic_volume">
          Liikenteen määrä
        </InputLabel>
        <Select
          labelId="navline.calculation_params.other.traffic_volume"
          id="navline.calculation_params.other.traffic_volume"
          value={formik.values.navline.calculation_params.other.traffic_volume}
          size="small"
          fullWidth
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.other.traffic_volume",
              e.target.value
            );
          }}
        >
          <MenuItem value={"negligible"}>Olematon</MenuItem>
          <MenuItem value={"low"}>Matala</MenuItem>
          <MenuItem value={"moderate"}>Keskiverto</MenuItem>
          <MenuItem value={"heavy"}>Runsas</MenuItem>
          <MenuItem value={"very_heavy"}>Todella runsas</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.other.traffic_complexity">
          Liikenteen monimutkaisuus
        </InputLabel>
        <Select
          labelId="navline.calculation_params.other.traffic_complexity"
          id="navline.calculation_params.other.traffic_complexity"
          value={
            formik.values.navline.calculation_params.other.traffic_complexity
          }
          size="small"
          fullWidth
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.other.traffic_complexity",
              e.target.value
            );
          }}
        >
          <MenuItem value={"negligible"}>Olematon</MenuItem>
          <MenuItem value={"low"}>Matala</MenuItem>
          <MenuItem value={"moderate"}>Keskiverto</MenuItem>
          <MenuItem value={"high"}>Monimutkainen</MenuItem>
          <MenuItem value={"very_high"}>Erittäin monimutkainen</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
}
