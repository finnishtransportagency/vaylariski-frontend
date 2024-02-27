import { Grid, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import UserInputContext from "../../contexts/UserInput";
import { useContext } from "react";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";

export default function FairwayWidth(props) {
  const { formik } = props;
  const { userInput } = useContext(UserInputContext);

  return (
    <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={
              formik.values.navline.calculation_params.use_new_width_calculation
            }
            onChange={(e) => {
              setOneLastUsedParameter(
                userInput,
                "navline.calculation_params.use_new_width_calculation",
                e.target.checked
              );

              formik.setFieldValue(
                "navline.calculation_params.use_new_width_calculation",
                e.target.checked
              );
            }}
            inputProps={{
              "aria-label": "controlled",
            }}
          />
        }
        label={
          <Typography style={{ fontSize: 14 }} color="textSecondary">
            {"Käytä uutta leveyslaskentaa"}
          </Typography>
        }
      />
    </Grid>
  );
}
