import {
  Grid,
  Typography,
  Tooltip,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Field } from "formik";

export default function WayareaParameterComponent(props) {
  const { formik } = props;
  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Väylän parametrit
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.type">Tyyppi</InputLabel>
        <Select
          labelId="navline.calculation_params.type"
          id="navline.calculation_params.type"
          value={formik.values.navline.calculation_params.type}
          size="small"
          fullWidth
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.type",
              e.target.value
            );
          }}
        >
          <MenuItem value={"inner"}>Väylän sisäosa</MenuItem>
          <MenuItem value={"outer"}>Väylän ulko-osa</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.number_of_lanes">
          Kaistat
        </InputLabel>
        <Select
          labelId="navline.calculation_params.number_of_lanes"
          id="navline.calculation_params.number_of_lanes"
          value={formik.values.navline.calculation_params.number_of_lanes}
          size="small"
          fullWidth
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.number_of_lanes",
              e.target.value
            );
          }}
        >
          <MenuItem value={1}>Kaksisuuntainen väylä</MenuItem>
          <MenuItem value={2}>Yksisuuntainen väylä</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.bottom_surface">
          Pohja
        </InputLabel>
        <Select
          labelId="navline.calculation_params.bottom_surface"
          id="navline.calculation_params.bottom_surface"
          value={formik.values.navline.calculation_params.bottom_surface}
          size="small"
          fullWidth
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.bottom_surface",
              e.target.value
            );
          }}
        >
          <MenuItem value={"smooth_and_soft"}>Sileä ja pehmeä</MenuItem>
          <MenuItem value={"rough_and_hard"}>Epätasainen ja kova</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.other.visibility">
          Näkyvyys (m)
        </InputLabel>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.navline?.calculation_params?.other?.visibility}
        >
          <span>
            <TextField
              id="navline.calculation_params.visibility"
              error={
                !!formik.errors?.navline?.calculation_params?.other?.visibility
              }
              inputProps={{
                step: "0.1",
              }}
              size="small"
              fullWidth
              type="number"
              value={formik.values.navline.calculation_params.other.visibility}
              onChange={(e) => {
                formik.setFieldValue(
                  "navline.calculation_params.other.visibility",
                  e.target.value
                );
              }}
            />
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
