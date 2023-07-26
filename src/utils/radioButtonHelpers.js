import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";

/**
 * @param {*} formik
 * @param {string} formikName
 * @param {*} defaultValue
 * @param {{ value: *, label: string, labelHelperText: string | null }[]} buttonPropsArr
 * @returns {JSX.Element}
 */
export default function radioButtons(
  formik,
  formikName,
  defaultValue,
  buttonPropsArr
) {
  return (
    <Grid item xs={12}>
      <RadioGroup
        row
        name={formikName}
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
        value={formik.values[formikName]}
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
}
