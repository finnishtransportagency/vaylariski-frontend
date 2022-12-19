import { FormGroup, Stack, TextField, Typography } from "@mui/material";
import { useField } from "formik";
import { FormControlLabel } from "@mui/material";

export default function CustomInputField({
  label,
  name,
  type,
  required,
  style,
}) {
  const [field, meta] = useField(name);

  return (
    <Stack direction="row">
      <Typography>{label}</Typography>
      <TextField
        {...field}
        id={name}
        type={type}
        label={label}
        required={required}
        style={style}
      />
    </Stack>
  );
}
