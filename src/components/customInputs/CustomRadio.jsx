import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormLabel,
} from "@mui/material";
import { useContext } from "react";
import UserInputContext from "../../contexts/UserInput";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";

/**
 *
 * @param {{
 *  formik: any,
 *  formikName: string,
 *  defaultValue: string | number,
 *  buttonPropsArr: {
 *    value: string | number,
 *    label: string,
 *    labelHelperText?: string}[],
 *  formLabelText?: string,
 *  }} props
 * @returns {JSX.Element}
 */
export default function CustomRadio({
  formik,
  formikName,
  formLabelText = null,
  defaultValue,
  buttonPropsArr,
}) {
  const { userInput } = useContext(UserInputContext);
  return (
    <Grid item xs={12}>
      {formLabelText ? (
        <FormLabel style={{ fontSize: 16 }} id={`${formikName}-group-label`}>
          {formLabelText}
        </FormLabel>
      ) : null}

      <RadioGroup
        row
        aria-labelledby={`${formikName}-group-label`}
        name={formikName}
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
        value={formikName.split(".").reduce((a, b) => a[b], formik.values)}
        defaultValue={defaultValue}
        onChange={(e) => {
          setOneLastUsedParameter(userInput, formikName, e.target.value);
          formik.setFieldValue(formikName, e.target.value);
        }}
      >
        {buttonPropsArr.map((p) => {
          return (
            <FormControlLabel
              key={`${formikName}.${p.value}`}
              value={p.value}
              control={<Radio />}
              label={
                <span style={{ fontSize: 14 }}>
                  {p.label}
                  {p.labelHelperText ? (
                    <>
                      <br />
                      <Typography
                        style={{ fontSize: 14 }}
                        color="textSecondary"
                        gutterBottom
                      >
                        {p.labelHelperText}
                      </Typography>
                    </>
                  ) : null}
                </span>
              }
            />
          );
        })}
      </RadioGroup>
    </Grid>
  );
}
