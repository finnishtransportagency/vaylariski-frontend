import { InputLabel, Tooltip, TextField } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  readonly id: string;
  readonly label: string | ReactNode;
  readonly helperText?: string;
  readonly step?: number | string;
  readonly disabled?: boolean;
  readonly value?: number;
  readonly setValue?: (value?: number) => void;
};

export default function CustomNumber({
  id,
  label,
  helperText = '',
  step = 0.01,
  value,
  disabled = false,
  setValue,
}: Props) {
  return (
    <>
      {label ? (
        <InputLabel style={{ fontSize: 14 }} id={`${id}-label`}>
          {label}
        </InputLabel>
      ) : null}
      <Tooltip placement="right" arrow title={'TODO'}>
        <span>
          <TextField
            disabled={disabled || typeof setValue === 'undefined'}
            id={id}
            error={false}
            size={'small'}
            fullWidth
            slotProps={{
              htmlInput: {
                step: step,
                style: { fontSize: 14 },
              },
            }}
            helperText={helperText}
            type={
              disabled || typeof setValue === 'undefined' ? 'text' : 'number'
            }
            value={value}
            onChange={(e) => {
              setValue?.(e.target.value ? Number(e.target.value) : undefined);
            }}
            data-cy-id={`${id}-input`}
          />
        </span>
      </Tooltip>
    </>
  );
}
