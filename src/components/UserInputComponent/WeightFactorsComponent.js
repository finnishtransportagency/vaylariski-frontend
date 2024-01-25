import { Grid, Typography } from "@mui/material";
import CustomNumber from "components/customInputs/CustomNumber";

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

  const cell = (id, name) => {
    return (
      <CustomNumber
        key={`weightfactors.${id}`}
        formik={formik}
        formikName={`weightfactors.${id}`}
        label={name}
        xs={6}
        step={1}
      />
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
          Riskiarvojen painokertoimet (WF)
        </Typography>
      </Grid>
      {inputIdsAndNAmes.map((e) => {
        return cell(e[0], e[1]);
      })}
    </Grid>
  );
}
