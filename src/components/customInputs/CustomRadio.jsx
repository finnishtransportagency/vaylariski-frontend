import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormLabel,
} from "@mui/material";

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
