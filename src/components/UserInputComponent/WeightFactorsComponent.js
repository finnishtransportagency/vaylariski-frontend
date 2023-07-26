import {
  Grid,
  Typography,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";

export default function WeightFactorsComponent(props) {
  const { formik } = props;
  const inputIdsAndNAmes = [
    ["WF_channel", "Väylä"],
    ["WF_bend", "Mutka"],
    ["WF_s_bend", "S-mutka"],
    ["WF_traffic_complexity", "Liikenteen monimutkaisuus"],
    ["WF_reduced_visibility", "Heikentynyt näkyvyys"],
    ["WF_light_pollution", "Taustavalon voimakkuus"],
  ];

  const input = (id) => {
    return (
      <Tooltip
        placement="right"
        arrow
        title={formik.errors?.weightfactors?.[id]}
      >
        <span>
          <TextField
            fullWidth
            id={`weightfactors.${id}`}
            error={!!formik.errors?.weightfactors?.[id]}
            InputProps={{ sx: { height: 30 } }}
            type="number"
            value={formik.values.weightfactors[id]}
            onChange={(e) => {
              formik.setFieldValue(
                `weightfactors.${id}`,
                Number(e.target.value)
              );
            }}
          />
        </span>
      </Tooltip>
    );
  };
  const label = (id, name) => {
    return (
      <InputLabel style={{ fontSize: 14 }} id={`weightfactors.${id}`}>
        {name}
      </InputLabel>
    );
  };
  const cell = (id, name) => {
    return (
      <Grid item xs={6} key={`weightfactors.${id}`}>
        {label(id, name)}
        {input(id)}
      </Grid>
    );
  };

  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Riskiarvojen painokertoimet
        </Typography>
      </Grid>
      {inputIdsAndNAmes.map((e) => {
        return cell(e[0], e[1]);
      })}
    </Grid>
  );
}