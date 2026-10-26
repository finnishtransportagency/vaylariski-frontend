import 'react-data-grid/lib/styles.css';
import { useEffect, useRef, useState } from 'react';
import {
  DataGrid,
  DataGridHandle,
  SortColumn,
  type Column,
} from 'react-data-grid';
import { Direction } from '@mui/system';
import styles from './CustomTable.module.css';

export type RowData<T> = {
  readonly id: number;
} & T;

type Props<T> = {
  readonly className: string;
  readonly direction?: Direction;
  readonly columns: Column<RowData<T>>[];
  readonly rows: RowData<T>[];
  readonly onClick: (row: RowData<T>) => void;
  readonly selectedRowId?: number;
};

function sortRows<T>(
  rows: RowData<T>[],
  sortByColumns: SortColumn[]
): RowData<T>[] {
  if (sortByColumns.length < 1) {
    return rows;
  }
  // Sort only by the first column
  const { columnKey, direction } = sortByColumns[0];

  // TODO: Add proper sorting

  console.error(`Cannot currently sort rows by ${columnKey} and ${direction}`);
  return rows;
}

export function CustomTable<T>({
  className,
  direction,
  columns,
  rows,
  onClick,
  selectedRowId,
}: Props<T>) {
  const gridRef = useRef<DataGridHandle>(null);
  const [sortByColumns, setSortByColumns] = useState<SortColumn[]>([]);
  const [sortedRows, setSortedRows] = useState<RowData<T>[]>(
    sortRows<T>(rows, sortByColumns)
  );

  useEffect(() => {
    setSortedRows(sortRows<T>(rows, sortByColumns));
  }, [sortByColumns]);

  // Scroll to selected table row
  if (gridRef.current && selectedRowId) {
    const idx = rows.findIndex((row) => row.id === selectedRowId);
    gridRef.current.scrollToCell({ idx: 0, rowIdx: idx });
  }

  return (
    <DataGrid<RowData<T>>
      className={className}
      ref={gridRef}
      columns={columns}
      rows={sortedRows}
      sortColumns={sortByColumns}
      onSortColumnsChange={(newColumns: SortColumn[]) =>
        setSortByColumns(newColumns.slice(-1))
      }
      direction={direction}
      // onCellClick={(cell: DataGridProps<RowData<T>>) => onClick(cell.rows)}
      rowClass={(row: any) =>
        row.id == selectedRowId ? styles.selectedRowBgColor : ''
      }
    />
  );
}
