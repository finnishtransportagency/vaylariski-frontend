import { Select, InputLabel, MenuItem } from '@mui/material';
import { ReactNode } from 'react';

type Props<T> = {
  readonly id: string;
  readonly label: string | ReactNode;
  readonly options: {
    readonly value: T;
    readonly label: string;
  }[];
  readonly value?: T;
  readonly onChange: (value?: T) => void;
};

export default function CustomSelect<T>({
  id,
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <>
      <InputLabel id={`${id}-label`} style={{ fontSize: 14 }}>
        {label}
      </InputLabel>
      <Select<T>
        labelId={`${id}-label`}
        id={id}
        value={value}
        size="small"
        style={{ fontSize: 14 }}
        fullWidth
        onChange={(e) => {
          onChange(e.target.value as T);
        }}
      >
        {options.map((p) => (
          <MenuItem key={`${id}.${p.value}`} value={p.value as any}>
            {p.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
