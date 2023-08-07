import { Grid, Typography } from "@mui/material";
import CustomMultipleSelect from "components/customInputs/CustomMultipleSelect";

export default function TrafficFactorsComponent(props) {
  const { formik } = props;

  const selectProps = [
    {
      formikName: "navline.calculation_params.aids_to_navigation",
      label: "Turvalaitteet (ATN)",
      options: [
        {
          value: "excellent",
          label: "Erinomainen",
        },
        {
          value: "good",
          label: "Hyvä",
        },
        {
          value: "moderate",
          label: "Keskiverto",
        },
      ],
    },
    {
      formikName: "navline.calculation_params.other.light_pollution",
      label: "Taustavalon voimakkuus",
      options: [
        {
          value: "negligible",
          label: "Olematon",
        },
        {
          value: "low",
          label: "Heikko",
        },
        {
          value: "moderate",
          label: "Keskiverto",
        },
        {
          value: "heavy",
          label: "Voimakas",
        },
        {
          value: "very_heavy",
          label: "Todella voimakas",
        },
      ],
    },

    {
      formikName: "navline.calculation_params.other.traffic_volume",
      label: "Liikenteen määrä",
      options: [
        {
          value: "negligible",
          label: "Olematon",
        },
        {
          value: "low",
          label: "Matala",
        },
        {
          value: "moderate",
          label: "Keskiverto",
        },
        {
          value: "heavy",
          label: "Runsas",
        },
        {
          value: "very_heavy",
          label: "Todella runsas",
        },
      ],
    },
    {
      formikName: "navline.calculation_params.other.traffic_complexity",
      label: "Liikenteen monimutkaisuus",
      options: [
        {
          value: "negligible",
          label: "Olematon",
        },
        {
          value: "low",
          label: "Matala",
        },
        {
          value: "moderate",
          label: "Keskiverto",
        },
        {
          value: "high",
          label: "Monimutkainen",
        },
        {
          value: "very_high",
          label: "Erittäin monimutkainen",
        },
      ],
    },
  ];

  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Vesiliikenteeseen vaikuttavat tekijät
        </Typography>
      </Grid>
      <CustomMultipleSelect formik={formik} selectProps={selectProps} />
    </Grid>
  );
}
