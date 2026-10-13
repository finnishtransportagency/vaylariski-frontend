import { FormControlLabel, Switch } from '@mui/material';

type Props = {
  readonly id: string;
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
};

export function CustomSwitch({ id, label, checked, onChange }: Props) {
  return (
    <FormControlLabel
      control={
        <Switch
          id={id}
          size="small"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          slotProps={{ input: { 'aria-label': 'controlled' } }}
        />
      }
      label={label}
    />
  );
}
