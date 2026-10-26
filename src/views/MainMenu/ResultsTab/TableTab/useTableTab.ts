import { useEffect, useState } from 'react';
import { useRisk } from '../../../../contexts/NewRiskContext.tsx';
import { useUserSelection } from '../../../../contexts/NewUserSelectionContext.tsx';
import { RivResultProperty } from '../../../../types/RivResultProperty.ts';
import { DataRow, Filter } from './TableTab.tsx';
import { SelectedColumn } from '../../../../components/CustomSelectionBox/CustomSelectionBox.tsx';
import { RowData } from '../../../../components/CustomTable/CustomTable.tsx';
import { RivResultProperties } from '../../../../types/RivResultProperties.ts';

export function useTableTab() {
  const { results } = useRisk();
  const { selectedRiskPointIndex, selectRiskPointIndex } = useUserSelection();

  const [filters, setFilters] = useState<Filter[]>(
    updateFilterLabels(
      Object.values(RivResultProperty).map((prop) => ({
        id: prop,
        label: '',
        operator: '≤',
        limit: undefined,
      }))
    )
  );
  const allRows: DataRow[] = results.map((el) => ({
    ...el,
    id: el.point_index,
  }));

  const [rows, setRows] = useState<DataRow[]>([]);

  // Visible rows and columns based on selected visibleColumn
  const [columns, setColumns] = useState<
    (SelectedColumn & {
      header: string;
      width: number;
      resizable: boolean;
      sortable: boolean;
    })[]
  >([]);

  function updateFilterLabels(filters: Filter[]): Filter[] {
    return filters.map((filter: Filter) => ({
      ...filter,
      label: filter.limit
        ? `${filter.id} ${filter.operator}' '${filter.limit}`
        : `${filter.id} any value`,
    }));
  }

  function updateFilters(filters: Filter[]) {
    setFilters(updateFilterLabels(filters));
  }

  function applyFilters(rows: DataRow[], filters: Filter[]): DataRow[] {
    return rows.filter((row) =>
      filters.every((filter) => {
        if (!filter.limit) {
          return true;
        }
        const value = row[filter.id];
        switch (filter.operator) {
          case '≤':
            return value <= filter.limit;
          case '≥':
            return value >= filter.limit;
          case '=':
            return value == filter.limit;
          default:
            return true;
        }
      })
    );
  }

  function onSelectionChange(selected: SelectedColumn[]) {
    setColumns(
      selected.map((column) => ({
        ...column,
        resizable: true,
        sortable: true,
        header: column.name,
        width: 340,
      }))
    );
  }

  function handleTableClick(row: RowData<RivResultProperties>) {
    selectRiskPointIndex(row.id);
  }

  useEffect(() => {
    setRows(applyFilters(allRows, filters));
  }, [filters]);

  return {
    rows,
    handleTableClick,
    columns,
    filters,
    selectedRowId: selectedRiskPointIndex,
    onSelectionChange,
    updateFilters,
    applyFilters,
  };
}
