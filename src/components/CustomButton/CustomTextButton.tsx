import { Button } from '@mui/material';

export type Props = {
  readonly type?: 'submit';
  readonly label: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly className?: string;
};

export function CustomTextButton({
  type,
  label,
  onClick,
  className,
  disabled = false,
}: Props) {
  return (
    <Button
      className={className}
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
