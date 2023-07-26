import { TextField, Grid, Tooltip, InputLabel } from "@mui/material";

const formikValueCategory = "bank_clearance_wf";
const formikValuePrefix = "edge_category";
const boatSpeedOptions = ["fast", "moderate", "slow"];
const edgeOptions = ["gentle", "sloping", "steep"];

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

const getFinnishEdgeText = (edge) => {
  let result = "";
  switch (edge) {
    case edgeOptions[0]:
      result = "Loiva kaltevuus";
      break;
    case edgeOptions[1]:
      result = "Viistot reunat";
      break;
    case edgeOptions[2]:
      result = "Jyrkkä ja kova";
      break;
  }
  return result;
};

const label = (id, boatSpeed, edge = "") => {
  const labelText = `${getFinnishEdgeText(edge)}, ${getFinnishBoatSpeedText(
    boatSpeed
  )}`;

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
  const id = `${formikValuePrefix}_${edge}_${boatSpeed}`;
  return (
    <Grid item xs={4} key={id}>
      {label(id, boatSpeed, edge)}
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
    <Grid item xs={7}>
      <InputLabel style={{ fontSize: 14 }} id={`${formikValueCategory}.${id}`}>
        Reunan painokerroin
      </InputLabel>
      {input(
        id,
        formik,
        `Valittu aluksen nopeusluokka: ${getFinnishBoatSpeedText(boatSpeed)}`
      )}
    </Grid>
  );
};
