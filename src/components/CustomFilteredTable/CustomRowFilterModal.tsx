import { Dialog, Grid, List, ListItem } from '@mui/material';
import { CustomTextButton } from '../CustomButton/CustomTextButton.tsx';
import { ShownRow } from './CustomFilteredTable.tsx';
import { useEffect, useState } from 'react';
import { CustomText } from '../CustomText/CustomText.tsx';
import CustomRowFilterOption from './CustomRowFilterOption.tsx';
import { GetFunction } from '../CustomTable/CustomTable.tsx';

export type NumberFilter<V> = {
  readonly name: string;
  readonly key: V;
};

export type Filter<V> = NumberFilter<V> & {
  readonly lowerLimit?: number;
  readonly upperLimit?: number;
};

type Props<T, V> = {
  readonly label: string;
  readonly filters: NumberFilter<V>[];
  readonly rows: ShownRow<T>[];
  readonly setRows: (rows: ShownRow<T>[]) => void;
  readonly getValue: GetFunction<T, V>;
};

function isShown<T, V>(
  filters: Filter<V>[],
  row: ShownRow<T>,
  getValue: GetFunction<T, V>
): boolean {
  return filters.every((filter) => {
    const value = getValue(filter.key, row);
    if (typeof value !== 'number') {
      // For now, we don't support filtering other types than number
      return true;
    }
    if (typeof filter.lowerLimit === 'number' && value < filter.lowerLimit) {
      return false;
    }
    if (typeof filter.upperLimit === 'number' && value > filter.upperLimit) {
      return false;
    }
    return true;
  });
}

export default function CustomRowFilterModal<T, V extends string>({
  label,
  filters,
  rows,
  setRows,
  getValue,
}: Props<T, V>) {
  const [open, setOpen] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] = useState<Filter<V>[]>(
    filters.map((f) => ({
      ...f,
    }))
  );

  // Filters rows on change
  useEffect(() => {
    applyFilters();
  }, [currentFilters]);

  function applyFilters() {
    setRows(
      rows.map((r) => ({ ...r, show: isShown(currentFilters, r, getValue) }))
    );
  }

  function replaceFilter(filter: Filter<V>) {
    setCurrentFilters(
      currentFilters.map((f) => (f.key === filter.key ? filter : f))
    );
  }

  function clearAllFilters() {
    setCurrentFilters(
      currentFilters.map((f) => ({
        ...f,
        lowerLimit: undefined,
        upperLimit: undefined,
      }))
    );
  }

  return (
    <>
      <CustomTextButton
        label={label}
        disabled={rows.length < 1}
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableScrollLock={true}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <Grid
          container
          size={12}
          sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}
        >
          <Grid size={1} />
          <Grid size={2}>
            <CustomTextButton label="Suodata" onClick={applyFilters} />
          </Grid>
          <Grid size={1} />
          <Grid size={4}>
            <CustomText
              label={`Näytetään: ${rows.filter((r) => !!r.show).length}/${rows.length}`}
              style="big"
            />
          </Grid>
          <Grid size={1} />
          <Grid size={2}>
            <CustomTextButton label="Tyhjennä" onClick={clearAllFilters} />
          </Grid>
          <Grid size={1} />
          <Grid size={12}>
            <List>
              {currentFilters.map((filter) => (
                <ListItem key={filter.key}>
                  <CustomRowFilterOption
                    filter={filter}
                    setFilter={replaceFilter}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
