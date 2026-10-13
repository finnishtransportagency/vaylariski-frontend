import { ErrorMessage, FormikValues } from 'formik';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useCustomForm } from '../../contexts/CustomFormContext.tsx';

export type SelectItem<V> = {
  readonly id: string;
  readonly value: V;
  readonly name: string;
};

type Props<T, V> = {
  readonly id: string;
  readonly name: string;
  readonly label?: string;
  readonly items: SelectItem<V>[];
  readonly getValue: (value: T) => V;
};

export function CustomFormSelect<T extends FormikValues, V>({
  id,
  name,
  label,
  getValue,
  items,
}: Props<T, V>) {
  const { onChange, values } = useCustomForm<T, V>();

  return (
    <FormControl
      required
      sx={{ mt: 1, mb: 1, minWidth: 250, fontSize: 14 }}
      size="small"
    >
      {label && (
        <InputLabel id={`${id}-label`} style={{ backgroundColor: 'white' }}>
          {label}
        </InputLabel>
      )}
      <Select
        labelId={label ? `${id}-label` : undefined}
        id={id}
        name={name}
        value={getValue(values as T)}
        onChange={(event) => {
          if (event.target.value) {
            onChange(event.target.value as V);
          }
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.value as any}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={name} component="div" />
    </FormControl>
  );
}
