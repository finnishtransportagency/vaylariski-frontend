import { useState } from 'react';
import {
  ColumnData,
  CustomTable,
  GetFunction,
  RowData,
} from '../CustomTable/CustomTable.tsx';
import { Grid } from '@mui/material';
import styles from './CustomFilteredTable.module.css';
import { CustomCsvButton } from '../CustomButton/CustomCsvButton.tsx';
import CustomColumnSelectionModal from './CustomColumnSelectionModal.tsx';
import CustomRowFilterModal, { NumberFilter } from './CustomRowFilterModal.tsx';

export type FilteredColumnData<V> = ColumnData<V> & {
  readonly isDefault: boolean;
  readonly isFiltered: boolean;
};

export type ShownColumn<V> = ColumnData<V> & {
  readonly show: boolean;
};

export type ShownRow<T> = RowData<T> & {
  readonly show: boolean;
};

type Props<T, V> = {
  readonly className: string;
  readonly columns: FilteredColumnData<V>[];
  readonly rows: RowData<T>[];
  readonly onClick: (row: RowData<T>) => void;
  readonly selectedRowId?: number;
  readonly getValue: GetFunction<T, V>;
};

export default function CustomFilteredTable<T, V extends string>({
  className,
  columns,
  rows,
  onClick,
  selectedRowId,
  getValue,
}: Props<T, V>) {
  const [showColumns, setShowColumns] = useState<ShownColumn<V>[]>(
    columns.map((col) => ({ ...col, show: col.isDefault }))
  );
  const [showRows, setShowRows] = useState<ShownRow<T>[]>(
    rows.map((row) => ({ ...row, show: true }))
  );

  const filters: NumberFilter<V>[] = columns
    .filter((col) => col.isFiltered)
    .map((col) => ({ name: col.name, key: col.key }));

  return (
    <Grid container size={12} className={className}>
      <Grid container size={12} className={styles.headerElement}>
        <Grid size={4}>
          {/* Note: Downloads only the data visible on the table */}
          <CustomCsvButton<T, V>
            fileName="vaylakohtainen_riski"
            columns={showColumns.filter((col) => col.show)}
            rows={showRows.filter((row) => row.show)}
            getValue={getValue}
          />
        </Grid>
        <Grid size={4}>
          <CustomColumnSelectionModal
            label="Valitse sarakkeet"
            columns={showColumns}
            toggleColumn={(key, show) => {
              setShowColumns(
                showColumns.map((col) => {
                  if (col.key === key) return { ...col, show };
                  return col;
                })
              );
            }}
          />
        </Grid>
        <Grid size={4}>
          <CustomRowFilterModal<T, V>
            label="Suodata rivejä"
            filters={filters}
            rows={showRows}
            setRows={setShowRows}
            getValue={getValue}
          />
        </Grid>
      </Grid>
      <Grid size={12} className={styles.tableElement}>
        <CustomTable<T, V>
          className={styles.customTable}
          rows={showRows.filter((row) => row.show)}
          columns={showColumns.filter((col) => col.show)}
          onClick={onClick}
          selectedRowId={selectedRowId}
          getValue={getValue}
        />
      </Grid>
    </Grid>
  );
}
