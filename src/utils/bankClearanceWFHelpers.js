import { TextField, Grid, Tooltip, InputLabel } from "@mui/material";

const formikValueCategory = "bank_clearance_wf";
const formikValuePrefix = "edge_category";
const boatSpeedOptions = ["fast", "moderate", "slow"];
const edgeOptions = ["gentle", "sloping", "steep"];

const getFinnishBoatSPeedText = (boatSpeed) => {
  let labelText = "";
  switch (boatSpeed) {
    case "fast":
      labelText = "Nopea";
      break;
    case "moderate":
      labelText = "Keskiverto";
      break;
    case "slow":
      labelText = "Hidas";
      break;
  }
  return labelText;
};

const label = (id, boatSpeed) => {
  const labelText = getFinnishBoatSPeedText(boatSpeed);
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
  const id = `${formikValuePrefix}_${edge}_${boatSpeed}`;
  return (
    <Grid item xs={4} key={id}>
      {label(id, boatSpeed)}
      {input(id, formik)}
    </Grid>
  );
};
const row = (edges, boatSpeed, formik) => {
  return (
    <Grid
      container
      item
      alignItems="flex-end"
      spacing={1}
      key={`${formikValueCategory}.${boatSpeed}`}
    >
      {edges.map((edge) => {
        return cell(edge, boatSpeed, formik);
      })}
    </Grid>
  );
};

export const table = (formik) => {
  return (
    <Grid container item spacing={1} paddingBottom={2}>
      {boatSpeedOptions.map((boatSpeed) => {
        return row(edgeOptions, boatSpeed, formik);
      })}
    </Grid>
  );
};

export const simpleInput = (formik) => {
  const boatSpeed = formik.values.boat.speed;
  const selectedChannelEdge =
    formik.values.navline.calculation_params.channel_edge;
  let edge = "";
  switch (selectedChannelEdge) {
    case "gentle_slope":
      edge = edgeOptions[0];
      break;
    case "sloping_edges":
      edge = edgeOptions[1];
      break;
    case "steep_and_hard":
      edge = edgeOptions[2];
      break;
  }

  const id = `${formikValuePrefix}_${edge}_${boatSpeed}`;
  return (
    <Grid item xs={6}>
      <InputLabel style={{ fontSize: 14 }} id={`${formikValueCategory}.${id}`}>
        Reunan painokerroin
      </InputLabel>
      {input(
        id,
        formik,
        `Valittu aluksen nopeusluokka: ${getFinnishBoatSPeedText(boatSpeed)}`
      )}
    </Grid>
  );
};
