import { TextField, Grid, Tooltip, InputLabel } from "@mui/material";

const formikValueCategory = "bank_clearance_wf";
const formikValuePrefix = "edge_category";
const categorys = ["fast", "moderate", "slow"];
const edges = ["gentle", "sloping", "steep"];

const label = (id, category) => {
  let labelText = "";
  switch (category) {
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
  return (
    <InputLabel style={{ fontSize: 14 }} id={`${formikValueCategory}.${id}`}>
      {labelText}
    </InputLabel>
  );
};

const input = (id, formik) => {
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

const cell = (edge, category, formik) => {
  const id = `${formikValuePrefix}_${edge}_${category}`;
  return (
    <Grid item xs={4} key={id}>
      {label(id, category)}
      {input(id, formik)}
    </Grid>
  );
};
const row = (edges, category, formik) => {
  return (
    <Grid
      container
      item
      alignItems="flex-end"
      spacing={1}
      key={`${formikValueCategory}.${category}`}
    >
      {edges.map((edge) => {
        return cell(edge, category, formik);
      })}
    </Grid>
  );
};

export const table = (formik) => {
  return (
    <Grid container item spacing={1} paddingBottom={2}>
      {categorys.map((category) => {
        return row(edges, category, formik);
      })}
    </Grid>
  );
};
