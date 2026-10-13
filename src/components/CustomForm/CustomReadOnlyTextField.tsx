import { TextField } from '@mui/material';

type Props = {
  readonly id: string;
  readonly label: string;
  readonly value?: string;
};

export function CustomReadOnlyTextField({ id, label, value }: Props) {
  return (
    <TextField
      id={id}
      label={label}
      defaultValue={value ?? '-'}
      slotProps={{ input: { readOnly: true } }}
    />
  );
}
