import { Grid, Select, InputLabel, MenuItem } from "@mui/material";

/**
 *
 * @param {{
 *  formik: any,
 *  formikName: string,
 *  label: string | JSX.Element,
 *  options: {
 *    value: string | number,
 *    label: string
 *  }[],
 *  xs?: number
 *  }} props
 * @returns {JSX.Element}
 */
export default function CustomSelect({
  formik,
  formikName,
  label,
  options,
  xs = 6,
}) {
  return (
    <Grid item xs={xs}>
      <InputLabel id={formikName}>{label}</InputLabel>
      <Select
        labelId={formikName}
        id={formikName}
        value={formikName.split(".").reduce((a, b) => a[b], formik.values)}
        size="small"
        fullWidth
        onChange={(e) => {
          formik.setFieldValue(formikName, e.target.value);
        }}
      >
        {options.map((p) => {
          return (
            <MenuItem key={`${formikName}.${p.value}`} value={p.value}>
              {p.label}
            </MenuItem>
          );
        })}
      </Select>
    </Grid>
  );
}
