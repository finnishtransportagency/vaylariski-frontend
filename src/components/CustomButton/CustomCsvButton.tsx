import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import {
  ColumnData,
  GetFunction,
  RowData,
} from '../CustomTable/CustomTable.tsx';

export type Props<T, V> = {
  readonly fileName: string;
  readonly columns: ColumnData<V>[];
  readonly rows: RowData<T>[];
  readonly getValue: GetFunction<T, V>;
};

function getCsvValue<T, V>(
  column: ColumnData<V>,
  row: RowData<T>,
  getValue: GetFunction<T, V>
): string {
  const value = getValue(column.key, row);
  if (typeof value === 'number') {
    // changing points to commas for excel
    return value.toString().replace(/\./g, ',');
  }
  if (value === null || typeof value === 'undefined') {
    // empty cells to nan because of excel
    return 'nan';
  }
  return `${value.toString()}`;
}

function getFileNameWithDate(fileName: string) {
  return `${fileName}_${new Date().toISOString()}.csv`;
}

export function CustomCsvButton<T, V>({
  fileName,
  columns,
  rows,
  getValue,
}: Props<T, V>) {
  // NOTE: CSVLink is unable to properly add the headers to the data, despite claiming support for it, so we need to do it all manually
  const disabled = rows.length < 1 || columns.length < 1;
  const data: string[][] = [];
  data.push(columns.map((col) => col.name));
  rows.forEach((row) => {
    data.push(columns.map((col) => getCsvValue(col, row, getValue)));
  });

  return (
    <Button
      variant="contained"
      disabled={disabled}
      sx={{ mb: 1, mt: 1, ml: 1 }}
    >
      <CSVLink
        data={data}
        filename={getFileNameWithDate(fileName)}
        separator={';'}
        style={{ color: 'white' }}
      >
        <DownloadIcon />
        Lataa CSV
      </CSVLink>
    </Button>
  );
}
