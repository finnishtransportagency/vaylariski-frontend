import { Button } from '@mui/material';

export type Props = {
  readonly type?: 'submit';
  readonly label: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
};

export function CustomTextButton({
  type,
  label,
  onClick,
  disabled = false,
}: Props) {
  return (
    <Button
      variant="contained"
      sx={{ ml: 1, mt: 1, mb: 1 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
