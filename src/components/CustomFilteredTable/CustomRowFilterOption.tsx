import { Grid } from '@mui/material';
import { Filter } from './CustomRowFilterModal.tsx';
import { CustomText } from '../CustomText/CustomText.tsx';
import CustomNumber from '../CustomNumber/CustomNumber.tsx';
import { CustomIconButton } from '../CustomButton/CustomIconButton.tsx';

type Props<V> = {
  readonly filter: Filter<V>;
  readonly setFilter: (filter: Filter<V>) => void;
};

export default function CustomRowFilterOption<V>({
  filter,
  setFilter,
}: Props<V>) {
  return (
    <>
      <Grid
        container
        size={12}
        sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}
      >
        <Grid size={2}>
          <CustomNumber
            id={`${filter.key}-lower`}
            value={filter.lowerLimit}
            setValue={(value) => {
              setFilter({ ...filter, lowerLimit: value });
            }}
            textAlign="center"
          />
        </Grid>
        <Grid size={1}>
          <CustomText label=" ≤ " style="big" textAlign="center" />
        </Grid>
        <Grid size={4}>
          <CustomText label={filter.name} style="big" textAlign="center" />
        </Grid>
        <Grid size={1}>
          <CustomText label=" ≤ " style="big" textAlign="center" />
        </Grid>
        <Grid size={2}>
          <CustomNumber
            id={`${filter.key}-upper`}
            value={filter.upperLimit}
            setValue={(value) => {
              setFilter({ ...filter, upperLimit: value });
            }}
            textAlign="center"
          />
        </Grid>
        <Grid size={1}>
          {(!!filter.lowerLimit || !!filter.upperLimit) && (
            <CustomIconButton
              icon="clear"
              onClick={() =>
                setFilter({
                  ...filter,
                  lowerLimit: undefined,
                  upperLimit: undefined,
                })
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
