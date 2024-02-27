import { Grid, Select, InputLabel, MenuItem } from "@mui/material";
import { useContext } from "react";
import UserInputContext from "../../contexts/UserInput";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";

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
  const { userInput } = useContext(UserInputContext);
  return (
    <Grid item xs={xs}>
      <InputLabel id={formikName} style={{ fontSize: 14 }}>
        {label}
      </InputLabel>
      <Select
        labelId={formikName}
        id={formikName}
        value={formikName.split(".").reduce((a, b) => a[b], formik.values)}
        size="small"
        style={{ fontSize: 14 }}
        fullWidth
        onChange={(e) => {
          setOneLastUsedParameter(userInput, formikName, e.target.value);
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
