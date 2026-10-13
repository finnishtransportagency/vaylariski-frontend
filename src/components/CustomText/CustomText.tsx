import { Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  readonly label: string | ReactNode;
  readonly style: 'big' | 'medium';
  readonly verticalAlign?: 'middle';
  readonly textAlign?: 'center';
};

export function CustomText({ label, style, verticalAlign, textAlign }: Props) {
  var fontSize, fontWeight;
  switch (style) {
    case 'big':
      fontSize = 16;
      fontWeight = 550;
      break;
    case 'medium':
      fontSize = 14;
      fontWeight = 275;
      break;
    default:
      return <></>;
  }

  return (
    <Typography
      style={{ fontSize, fontWeight, verticalAlign, textAlign }}
      color="textSecondary"
      gutterBottom
    >
      {label}
    </Typography>
  );
}
