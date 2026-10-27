import { useState } from 'react';
import {
  ColumnData,
  CustomTable,
  GetFunction,
  RowData,
} from '../CustomTable/CustomTable.tsx';
import { Grid } from '@mui/material';
import styles from './CustomFilteredTable.module.css';

export type FilteredColumnData<V> = ColumnData<V> & {
  readonly isDefault: boolean;
};

type ShownColumn<V> = ColumnData<V> & {
  readonly show: boolean;
};

type ShownRow<T> = RowData<T> & {
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
  return (
    <Grid container size={12} className={className}>
      <Grid size={12} className={styles.headerElement}>
        Otsikko
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
