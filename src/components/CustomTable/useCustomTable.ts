import { SortDirection } from 'react-data-grid';
import { GetFunction, RowData } from './CustomTable.tsx';

export type CustomSortColumn<V> = {
  readonly columnKey: V;
  readonly direction: SortDirection;
};

export default function useCustomTable() {
  function sortRows<T, V>(
    getValue: GetFunction<T, V>,
    rows: RowData<T>[],
    sortColumn?: CustomSortColumn<V>
  ): RowData<T>[] {
    if (!sortColumn) {
      return rows;
    }
    const { columnKey, direction } = sortColumn;
    rows.sort((left: RowData<T>, right: RowData<T>) => {
      const leftValue = getValue(columnKey, left);
      const rightValue = getValue(columnKey, right);
      if (leftValue === rightValue) return 0;
      const leftFirst =
        typeof leftValue === 'boolean' ? leftValue : leftValue < rightValue;
      return direction === 'ASC' ? (leftFirst ? -1 : 1) : leftFirst ? 1 : -1;
    });
    return rows;
  }

  return { sortRows };
}
