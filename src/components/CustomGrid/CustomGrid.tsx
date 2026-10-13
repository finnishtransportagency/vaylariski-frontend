import { Grid } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
  readonly size?: number;
  readonly className?: string;
};

export function CustomGrid({ children, size, className }: Props) {
  return (
    <Grid
      container
      spacing={1}
      size={size}
      sx={{ paddingBottom: 2 }}
      className={className}
    >
      {children}
    </Grid>
  );
}
