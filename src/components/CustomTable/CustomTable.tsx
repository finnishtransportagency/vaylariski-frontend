import 'react-data-grid/lib/styles.css';
import { useEffect, useRef, useState } from 'react';
import {
  CellMouseArgs,
  CellMouseEvent,
  DataGrid,
  DataGridHandle,
  SortColumn,
} from 'react-data-grid';
import styles from './CustomTable.module.css';
import useCustomTable, { CustomSortColumn } from './useCustomTable.ts';
import { CustomText } from '../CustomText/CustomText.tsx';

export type ColumnData<V> = {
  readonly key: V;
  readonly name: string;
};

export type RowData<T> = {
  readonly id: number;
} & T;

export type GetFunction<T, V> = (
  columnKey: V,
  row: RowData<T>
) => string | boolean | number;

type Props<T, V> = {
  readonly className: string;
  readonly columns: ColumnData<V>[];
  readonly rows: RowData<T>[];
  readonly onClick: (row: RowData<T>) => void;
  readonly selectedRowId?: number;
  readonly getValue: GetFunction<T, V>;
};

export function CustomTable<T, V extends string>({
  className,
  columns,
  rows,
  onClick,
  selectedRowId,
  getValue,
}: Props<T, V>) {
  if (rows.length < 1) {
    return (
      <CustomText
        label="Ei tuloksia"
        textAlign="center"
        verticalAlign="middle"
        style="big"
      />
    );
  }

  const { sortRows } = useCustomTable();

  const gridRef = useRef<DataGridHandle>(null);
  const [sortColumn, setSortColumn] = useState<CustomSortColumn<V>>();
  const [sortedRows, setSortedRows] = useState<RowData<T>[]>(
    sortRows(getValue, rows, sortColumn)
  );

  useEffect(() => {
    setSortedRows(sortRows(getValue, rows, sortColumn));
  }, [sortColumn]);

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
      sortColumns={sortColumn ? [sortColumn] : []}
      onSortColumnsChange={(newSortColumns: SortColumn[]) => {
        if (newSortColumns.length < 1) {
          setSortColumn(undefined);
        } else {
          // Disables multi-column sorting
          const { columnKey, direction } = newSortColumns.slice(-1)[0];
          setSortColumn({ columnKey: columnKey as V, direction });
        }
      }}
      onCellClick={(args: CellMouseArgs<RowData<T>>, _: CellMouseEvent) =>
        onClick(args.row)
      }
      rowClass={(row: NoInfer<RowData<T>>) =>
        row.id == selectedRowId ? styles.selectedRowBgColor : ''
      }
      defaultColumnOptions={{
        resizable: true,
        sortable: true,
      }}
    />
  );
}
