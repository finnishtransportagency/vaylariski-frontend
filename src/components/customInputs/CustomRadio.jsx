import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormLabel,
  Tooltip,
} from "@mui/material";
import ConditionalWrapper from "components/ConditionalWrapper";

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
            <ConditionalWrapper
              condition={p.disabled}
              wrapper={(children) => (
                <Tooltip placement="right" arrow title={p.tooltip}>
                  {children}
                </Tooltip>
              )}
              key={`${formikName}.${p.value}`}
            >
              <FormControlLabel
                value={p.value}
                disabled={p.disabled}
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
            </ConditionalWrapper>
          );
        })}
      </RadioGroup>
    </Grid>
  );
}
