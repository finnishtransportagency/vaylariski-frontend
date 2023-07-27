import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
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
 *    labelHelperText?: string | null }[]
 *  }} props
 * @returns {JSX.Element}
 */
export const RadioButtons = ({
  formik,
  formikName,
  defaultValue,
  buttonPropsArr,
}) => {
  return (
    <Grid item xs={12}>
      <RadioGroup
        row
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
                <>
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
                </>
              }
            />
          );
        })}
      </RadioGroup>
    </Grid>
  );
};
