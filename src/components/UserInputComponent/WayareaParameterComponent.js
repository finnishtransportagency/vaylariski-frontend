import { Grid, Typography, Tooltip } from "@mui/material";
import { Field } from "formik";

export default function WayareaParameterComponent(props) {
  const { formik } = props;
  return (
    <>
      {/* Tyyppi jne. */}
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
        <Grid item xs={4}>
          <label htmlFor="navline.calculation_params.type"> Tyyppi: </label>
        </Grid>
        <Grid item xs={8}>
          <Field component="select" name="navline.calculation_params.type">
            <option value="inner">Väylän sisäosa</option>
            <option value="outer">Väylän ulko-osa</option>
          </Field>
        </Grid>
        <Grid item xs={4}>
          <label htmlFor="navline.calculation_params.number_of_lanes">
            {" "}
            Kaistat:{" "}
          </label>
        </Grid>
        <Grid item xs={8}>
          <Field
            component="select"
            name="navline.calculation_params.number_of_lanes"
          >
            <option value={2}>Kaksisuuntainen väylä</option>
            <option value={1}>Yksisuuntainen väylä</option>
          </Field>
        </Grid>
        <Grid item xs={4}>
          <label htmlFor="navline.calculation_params.bottom_surface">
            {" "}
            Pohja:{" "}
          </label>
        </Grid>
        <Grid item xs={8}>
          <Field
            component="select"
            name="navline.calculation_params.bottom_surface"
          >
            <option value="smooth_and_soft">Sileä ja pehmeä</option>
            <option value="rough_and_hard">Epätasainen ja kova</option>
          </Field>
        </Grid>
        <Grid item xs={4}>
          <label htmlFor="navline.calculation_params.other.visibility">
            {" "}
            Näkyvyys (m):{" "}
          </label>
        </Grid>
        <Grid item xs={8}>
          <Tooltip
            placement="right"
            arrow
            title={
              formik.errors?.navline?.calculation_params?.other?.visibility
            }
          >
            <span>
              <Field
                className={
                  formik.errors?.navline?.calculation_params?.other
                    ?.visibility && "has-error"
                }
                component="input"
                name="navline.calculation_params.other.visibility"
                type="number"
                required
                style={{
                  width: 100,
                }}
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}
