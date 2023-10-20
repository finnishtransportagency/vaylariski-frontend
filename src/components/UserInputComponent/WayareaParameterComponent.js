import { Grid, Typography } from "@mui/material";
import CustomMultipleSelect from "components/customInputs/CustomMultipleSelect";
import CustomNumber from "components/customInputs/CustomNumber";

export default function WayareaParameterComponent(props) {
  const { formik } = props;
  const selectProps = [
    {
      formikName: "navline.calculation_params.type",
      label: "Tyyppi",
      options: [
        {
          value: "inner",
          label: "Väylän sisäosa",
        },
        {
          value: "outer",
          label: "Väylän ulko-osa",
        },
      ],
    },
    {
      formikName: "navline.calculation_params.number_of_lanes",
      label: "Kaistat",
      options: [
        {
          value: 2,
          label: "Kaksisuuntainen väylä",
        },
        {
          value: 1,
          label: "Yksisuuntainen väylä",
        },
      ],
    },
    {
      formikName: "navline.calculation_params.bottom_surface",
      label: "Pohja",
      options: [
        {
          value: "smooth_and_soft",
          label: "Sileä ja pehmeä",
        },
        {
          value: "rough_and_hard",
          label: "Epätasainen ja kova",
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
          Väylän parametrit
        </Typography>
      </Grid>
      <CustomMultipleSelect formik={formik} selectProps={selectProps} />
      <CustomNumber
        formik={formik}
        formikName={"navline.calculation_params.other.visibility"}
        label={"Näkyvyys (m)"}
        xs={6}
        step={0.1}
        size="small"
      />
    </Grid>
  );
}
