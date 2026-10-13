import { useEffect, useState } from 'react';
import { useRisk } from '../../../../contexts/NewRiskContext.tsx';
import { useUserSelection } from '../../../../contexts/NewUserSelectionContext.tsx';
import { useNotification } from '../../../../contexts/NotificationContext.tsx';
import { RivResultProperty } from '../../../../types/RivResultProperty.ts';
import { DataRow, Filter } from './TableTab.tsx';
import { SelectedColumn } from '../../../../components/CustomSelectionBox/CustomSelectionBox.tsx';
import { RowData } from '../../../../components/CustomTable/CustomTable.tsx';
import { RivResultProperties } from '../../../../types/RivResultProperties.ts';

export function useTableTab() {
  const { RIVResult } = useRisk();
  const {
    mapPointClicked,
    setMapPointClicked,
    selectedRowId,
    setSelectedRowId,
    setTableRowClicked,
  } = useUserSelection();
  const { setNotificationStatus } = useNotification();

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
  const [allRows, setAllRows] = useState<DataRow[]>([]);
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
    setTableRowClicked(true);
    setSelectedRowId(row.id);
  }

  useEffect(() => {
    if (mapPointClicked) {
      setMapPointClicked(false);
    }
  }, [selectedRowId]);

  useEffect(() => {
    if (!RIVResult) {
      setAllRows([]);
      return;
    }
    const rowResults: DataRow[] = RIVResult.features.map((el) => ({
      ...el.properties,
      id: `${el.properties.point_index}`,
    }));

    if (rowResults[0].draft_is_greater_than_depth) {
      setNotificationStatus({
        severity: 'warning',
        message: 'Laivan syväys on suurempi kuin väylän syvyys!',
        visible: true,
      });
      setAllRows([]);
    } else {
      setAllRows(rowResults);
    }
  }, [RIVResult]);

  useEffect(() => {
    setRows(applyFilters(allRows, filters));
  }, [allRows, filters]);

  return {
    rows,
    handleTableClick,
    columns,
    filters,
    selectedRowId,
    onSelectionChange,
    updateFilters,
    applyFilters,
  };
}
