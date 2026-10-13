import { ErrorMessage, FormikValues } from 'formik';
import { FormControl, TextField } from '@mui/material';
import { useCustomForm } from '../../contexts/CustomFormContext.tsx';

type Props<T, V> = {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly getValue: (value: T) => V;
};

export function CustomFormText<T extends FormikValues, V>({
  id,
  name,
  label,
  getValue,
}: Props<T, V>) {
  const { onChange, values } = useCustomForm<T, V>();

  return (
    <FormControl
      required
      sx={{ ml: 1, mt: 1, mb: 1, minWidth: 50, fontSize: 14 }}
    >
      <TextField
        label={label}
        id={id}
        name={name}
        variant="outlined"
        value={getValue(values as T)}
        onChange={(e) => {
          if (e.target.value) {
            onChange(e.target.value as V);
          }
        }}
        size="small"
      />
      <ErrorMessage name={name} component="div" />
    </FormControl>
  );
}
