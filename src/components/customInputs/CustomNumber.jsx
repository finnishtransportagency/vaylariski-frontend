import { InputLabel, Tooltip, TextField, Grid } from "@mui/material";

/**
 *
 * @param {{
 *  formik: any,
 *  formikName: string,
 *  label?: string | JSX.Element,
 *  helperText?: string,
 *  xs?: number,
 *  step?: number | string,
 *  value?: number | string
 *  disabled?: boolean
 *  size?: "medium" | "small" | "tiny"
 *  }} props
 * @returns {JSX.Element}
 */
export default function CustomNumber({
  formik,
  formikName,
  label,
  helperText = "",
  xs = 4,
  step = 0.01,
  value = formikName.split(".").reduce((a, b) => a[b], formik.values),
  disabled = false,
  size = "small",
}) {
  return (
    <Grid item xs={xs}>
      {label ? (
        <InputLabel style={{ fontSize: 14 }} id={formikName}>
          {label}
        </InputLabel>
      ) : null}
      <Tooltip
        placement="right"
        arrow
        title={formikName.split(".").reduce((a, b) => a?.[b], formik.errors)}
      >
        <span>
          <TextField
            disabled={disabled}
            id={formikName}
            error={
              !!formikName.split(".").reduce((a, b) => a?.[b], formik.errors)
            }
            size={size === "tiny" ? null : size}
            InputProps={size === "tiny" ? { sx: { height: 30 } } : {}}
            fullWidth
            inputProps={{
              step: step,
              style: { fontSize: 14 },
            }}
            helperText={helperText}
            FormHelperTextProps={{
              style: { fontSize: 14 },
            }}
            type={disabled ? "text" : "number"}
            value={value}
            onChange={(e) => {
              formik.setFieldValue(
                formikName,
                !isNaN(e.target.value) ? Number(e.target.value) : ""
              );
            }}
          />
        </span>
      </Tooltip>
    </Grid>
  );
}
