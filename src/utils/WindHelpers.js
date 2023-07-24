import { TextField, Grid, Tooltip, InputLabel } from "@mui/material";

const formikValueCategory = "wind_wf";
const boatSpeedOptions = ["fast", "moderate", "slow"];
const windOptions = ["mild", "moderate", "strong"];

const getFinnishBoatSpeedText = (boatSpeed) => {
  let result = "";
  switch (boatSpeed) {
    case boatSpeedOptions[0]:
      result = "Nopea";
      break;
    case boatSpeedOptions[1]:
      result = "Keskiverto";
      break;
    case boatSpeedOptions[2]:
      result = "Hidas";
      break;
  }
  return result;
};

const getFinnishEdgeText = (wind) => {
  let result = "";
  switch (wind) {
    case windOptions[0]:
      result = "Heikko tuuli";
      break;
    case windOptions[1]:
      result = "Keskiverto tuuli";
      break;
    case windOptions[2]:
      result = "Voimakas tuuli";
      break;
  }
  return result;
};

const label = (id, boatSpeed, edge) => {
  const labelText = `${getFinnishEdgeText(edge)}, ${getFinnishBoatSpeedText(
    boatSpeed
  )} alus`;

  return (
    <InputLabel style={{ fontSize: 14 }} id={`${formikValueCategory}.${id}`}>
      {labelText}
    </InputLabel>
  );
};

const input = (id, formik, helperText = "") => {
  return (
    <>
      <Tooltip
        placement="right"
        arrow
        title={formik.errors?.[formikValueCategory]?.[id]}
      >
        <span>
          <TextField
            id={`${formikValueCategory}.${id}`}
            error={!!formik.errors?.[formikValueCategory]?.[id]}
            InputProps={{ sx: { height: 30 } }}
            fullWidth
            inputProps={{
              step: "0.01",
            }}
            helperText={helperText}
            type="number"
            value={formik.values[formikValueCategory][id]}
            onChange={(e) => {
              formik.setFieldValue(
                `${formikValueCategory}.${id}`,
                e.target.value
              );
            }}
          />
        </span>
      </Tooltip>
    </>
  );
};

const cell = (edge, boatSpeed, formik) => {
  const id = `${edge}_wind_${boatSpeed}_vessel`;
  return (
    <Grid item xs={4} key={id}>
      {label(id, boatSpeed, edge)}
      {input(id, formik)}
    </Grid>
  );
};
const row = (windOptions, boatSpeed, formik) => {
  return (
    <Grid
      container
      item
      alignItems="flex-end"
      spacing={1}
      key={`${formikValueCategory}.${boatSpeed}`}
    >
      {windOptions.map((edge) => {
        return cell(edge, boatSpeed, formik);
      })}
    </Grid>
  );
};

export const table = (formik) => {
  return (
    <Grid container item spacing={1} paddingBottom={2}>
      {boatSpeedOptions.map((boatSpeed) => {
        return row(windOptions, boatSpeed, formik);
      })}
    </Grid>
  );
};

export const simpleInput = (formik) => {
  const boatSpeed = formik.values.boat.speed;
  const selectedWindSpeed =
    formik.values.navline.calculation_params.operating_conditions.wind_speed;

  const id = `${selectedWindSpeed}_wind_${boatSpeed}_vessel`;
  return (
    <Grid item xs={6}>
      <InputLabel style={{ fontSize: 14 }} id={`${formikValueCategory}.${id}`}>
        Tuulen painokerroin
      </InputLabel>
      {input(
        id,
        formik,
        `Valittu aluksen nopeusluokka: ${getFinnishBoatSpeedText(boatSpeed)}`
      )}
    </Grid>
  );
};
