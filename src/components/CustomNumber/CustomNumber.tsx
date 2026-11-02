import { TextField } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  readonly id: string;
  readonly label?: string | ReactNode;
  readonly value?: number;
  readonly setValue?: (value?: number) => void;
  readonly step?: number | string;
  readonly disabled?: boolean;
  readonly textAlign?: 'center';
};

export default function CustomNumber({
  id,
  label,
  value,
  setValue,
  step = 0.01,
  disabled = false,
  textAlign = undefined,
}: Props) {
  const isDisabled = disabled || typeof setValue === 'undefined';
  return (
    <TextField
      label={label ?? undefined}
      disabled={isDisabled}
      id={id}
      error={false}
      size={'small'}
      fullWidth
      sx={{
        input: {
          textAlign: textAlign,
        },
      }}
      slotProps={{
        htmlInput: {
          step: step,
          style: { fontSize: 14 },
        },
      }}
      type={isDisabled || !value ? 'text' : 'number'}
      value={value ?? ''}
      onChange={(e) => {
        setValue?.(e.target.value ? Number(e.target.value) : undefined);
      }}
      data-cy-id={`${id}-input`}
    />
  );
}
