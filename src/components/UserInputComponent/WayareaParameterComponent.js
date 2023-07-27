import {
  Grid,
  Typography,
  Tooltip,
  InputLabel,
  TextField,
} from "@mui/material";
import CustomMultipleSelect from "components/customInputs/CustomMultipleSelect";

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
          value: 1,
          label: "Kaksisuuntainen väylä",
        },
        {
          value: 2,
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
      <Grid item xs={6}>
        <InputLabel id="navline.calculation_params.other.visibility">
          Näkyvyys (m)
        </InputLabel>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.navline?.calculation_params?.other?.visibility}
        >
          <span>
            <TextField
              id="navline.calculation_params.visibility"
              error={
                !!formik.errors?.navline?.calculation_params?.other?.visibility
              }
              inputProps={{
                step: "0.1",
              }}
              size="small"
              fullWidth
              type="number"
              value={formik.values.navline.calculation_params.other.visibility}
              onChange={(e) => {
                formik.setFieldValue(
                  "navline.calculation_params.other.visibility",
                  e.target.value
                );
              }}
            />
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
