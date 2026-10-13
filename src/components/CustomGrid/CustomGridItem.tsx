import { ReactNode } from 'react';
import Item from '@mui/material/Grid';

type Props = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly size?: number;
};

export function CustomGridItem({ children, size = 12 }: Props) {
  return <Item size={size}>{children}</Item>;
}
