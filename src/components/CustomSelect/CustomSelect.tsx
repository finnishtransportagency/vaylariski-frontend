import { Select, InputLabel, MenuItem } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  readonly id: string;
  readonly label: string | ReactNode;
  readonly options: {
    readonly value: string | number;
    readonly label: string;
  }[];
  readonly value?: string | number;
  readonly onChange: (value?: string | number) => void;
};

export default function CustomSelect({
  id,
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <>
      <InputLabel id={`${id}-label`} style={{ fontSize: 14 }}>
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        size="small"
        style={{ fontSize: 14 }}
        fullWidth
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((p) => (
          <MenuItem key={`${id}.${p.value}`} value={p.value}>
            {p.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
