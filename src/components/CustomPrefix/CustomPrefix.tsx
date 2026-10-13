import { Grid } from '@mui/material';
import CustomNumber from '../CustomNumber/CustomNumber.tsx';
import { CustomText } from '../CustomText/CustomText.tsx';
import { ReactNode } from 'react';

type Props = {
  readonly id: string;
  readonly value: number;
  readonly children: ReactNode;
};

export function CustomRangeMultiplier({ id, value, children }: Props) {
  return (
    <Grid container size={12}>
      <Grid size={3}>
        <CustomNumber id={id} label="" value={value} />
      </Grid>
      <Grid size={0.5}>
        <CustomText label=": " style="medium" textAlign="center" />
      </Grid>
      <Grid size={8.5}>
        <CustomText label={children} style="medium" textAlign="center" />
      </Grid>
    </Grid>
  );
}
