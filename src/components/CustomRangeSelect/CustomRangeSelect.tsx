import { ReactNode } from 'react';
import CustomNumber from '../CustomNumber/CustomNumber.tsx';
import { CustomText } from '../CustomText/CustomText.tsx';
import { Grid } from '@mui/material';

type Props = {
  readonly unit: ReactNode;
  readonly lowerLimit?: number;
  readonly value: number;
  readonly upperLimit?: number;
};

export function CustomRangeSelect({
  unit,
  lowerLimit,
  value,
  upperLimit,
}: Props) {
  let range: ReactNode;
  let limit: number;
  if (upperLimit) {
    // Show only the upper limit to reduce duplicate information on UI
    limit = upperLimit;
    range = (
      <>
        {unit}
        {' < '}
      </>
    );
  } else if (lowerLimit) {
    // Show variables always on the right side to stay consistent within UI
    limit = lowerLimit;
    range = (
      <>
        {unit}
        {' ≥ '}
      </>
    );
  } else {
    return <></>;
  }

  return (
    <Grid container size={12}>
      <Grid size={3}>
        <CustomNumber id="value" label={''} step={0.1} value={value} />
      </Grid>
      <Grid size={0.5}>
        <CustomText label=": " style="medium" textAlign="center" />
      </Grid>
      <Grid size={3} />
      <Grid size={2.5}>
        <CustomText label={range} style="medium" textAlign="center" />
      </Grid>
      <Grid size={3}>
        <CustomNumber id="limit" step={0.1} label="" value={limit} />
      </Grid>
    </Grid>
  );
}
