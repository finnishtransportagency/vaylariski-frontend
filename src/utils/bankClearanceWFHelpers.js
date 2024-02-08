import { Grid } from "@mui/material";
import CustomNumber from "components/customInputs/CustomNumber";

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

const cell = (edge, boatSpeed, formik) => {
  const id = `${formikValuePrefix}_${edge}_${boatSpeed}`;
  const labelText = `${getFinnishEdgeText(edge)}, ${getFinnishBoatSpeedText(
    boatSpeed
  )}`;
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
    <CustomNumber
      formik={formik}
      formikName={`${formikValueCategory}.${id}`}
      label={"Reunan kerroin"}
      helperText={`Valittu aluksen nopeusluokka: ${getFinnishBoatSpeedText(
        boatSpeed
      )}`}
      xs={8}
    />
  );
};
