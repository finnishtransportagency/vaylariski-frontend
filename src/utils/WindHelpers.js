import { TextField, Grid, Tooltip, InputLabel } from "@mui/material";
import CustomNumber from "components/customInputs/CustomNumber";

const formikValueCategory = "wind_wf";
const boatSpeedOptions = ["fast", "moderate", "slow"];
const windOptions = ["mild", "moderate", "strong"];

const getFinnishBoatSpeedText = (boatSpeed) => {
  let result = "";
  switch (boatSpeed) {
    case boatSpeedOptions[0]:
      result = "nopea";
      break;
    case boatSpeedOptions[1]:
      result = "keskiverto";
      break;
    case boatSpeedOptions[2]:
      result = "hidas";
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
            FormHelperTextProps={{
              style: { fontSize: 14 },
            }}
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
  const labelText = `${getFinnishEdgeText(edge)}, ${getFinnishBoatSpeedText(
    boatSpeed
  )} alus`;
  return (
    <CustomNumber
      key={id}
      formik={formik}
      formikName={`${formikValueCategory}.${id}`}
      label={labelText}
      xs={4}
    />
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
    <CustomNumber
      formik={formik}
      formikName={`${formikValueCategory}.${id}`}
      label={"Tuulen kerroin"}
      helperText={`Valittu aluksen nopeusluokka: ${getFinnishBoatSpeedText(
        boatSpeed
      )}`}
      xs={8}
    />
  );
};
