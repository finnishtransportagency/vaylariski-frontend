import { FormGroup, Stack, TextField, Typography } from "@mui/material";
import { Field, useField } from "formik";
import { FormControlLabel } from "@mui/material";

export default function CustomInputField({
  label,
  name,
  type,
  required,
  style,
  // defaultValue,
  // placeholder
}) {
  const [field, meta] = useField(name);

  return (
    <Stack direction="row">
      <label htmlFor={name}>{label}</label>
      <Field
        component="input"
        variant="outlined"
        {...field}
        id={name}
        type={type}
        label={label}
        required={required}
        style={style}
        // placeholder={placeholder}
        // defaultValue={defaultValue}
      />
    </Stack>
  );
}

export function CustomInputFieldNoFormik({
  label,
  name,
  type,
  required,
  style,
  ...options
}) {
  return (
    <Stack direction="row">
      <Typography>{label}</Typography>
      <TextField
        variant="outlined"
        id={name}
        type={type}
        label={label}
        required={required}
        style={style}
        {...options}
        // placeholder={placeholder}
        // defaultValue={defaultValue}
      />
    </Stack>
  );
}
