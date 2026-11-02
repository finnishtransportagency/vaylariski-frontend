import { useEffect, useState } from 'react';
import { RivResultProperty } from '../../../../types/RivResultProperty.ts';
import {
  CustomList,
  Item,
} from '../../../../components/CustomList/CustomList.tsx';
import {
  CustomTable,
  RowData,
} from '../../../../components/CustomTable/CustomTable.tsx';
import { RivResultProperties } from '../../../../types/RivResultProperties.ts';
import { useTableTab } from './useTableTab.ts';
import { useCSV } from '../../../../services/CSV/useCSV.ts';
import { CustomCsvButton } from '../../../../components/CustomButton/CustomCsvButton.tsx';
import { CustomIconButton } from '../../../../components/CustomButton/CustomIconButton.tsx';
import { CustomModal } from '../../../../components/CustomModal/CustomModal.tsx';
import { CustomSelectionBox } from '../../../../components/CustomSelectionBox/CustomSelectionBox.tsx';
import { CustomForm } from '../../../../components/CustomForm/CustomForm.tsx';
import { CustomFormSelect } from '../../../../components/CustomForm/CustomFormSelect.tsx';
import { CustomFormText } from '../../../../components/CustomForm/CustomFormText.tsx';
import { CustomFormSubmit } from '../../../../components/CustomForm/CustomFormSubmit.tsx';
import { CustomTextButton } from '../../../../components/CustomButton/CustomTextButton.tsx';
import styles from './TableTab.module.css';
import { useRisk } from '../../../../contexts/NewRiskContext.tsx';
import { ResultRow } from '../../../../types/ResultRow.ts';
import { useUserSelection } from '../../../../contexts/NewUserSelectionContext.tsx';
import { TableColumns } from './TableColumns.ts';
import { SortDirection } from 'react-data-grid';
import CustomFilteredTable from '../../../../components/CustomFilteredTable/CustomFilteredTable.tsx';

export type Filter = Item<RivResultProperty> & {
  readonly operator: '≤' | '≥' | '=';
  readonly limit?: string | number;
};

export type DataRow = RowData<RivResultProperties>;

export default function TableTab() {
  const { handleTableClick, columns, selectedRowId } = useTableTab();
  // const { csvData, selectCsvData } = useCSV();
  // const [showForm, setShowForm] = useState<boolean>(false);
  // const [open, setOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   selectCsvData(rows);
  // }, [rows]);

  const { results } = useRisk();
  const { selectRiskPointIndex } = useUserSelection();

  const rows: DataRow[] = results.map((el) => ({
    ...el,
    id: el.point_index,
  }));

  return (
    <CustomFilteredTable<RivResultProperties, RivResultProperty>
      className={styles.resultArea}
      rows={rows}
      columns={TableColumns}
      onClick={(row) => selectRiskPointIndex(row.point_index)}
      selectedRowId={selectedRowId}
      getValue={(columnKey, row) => row[columnKey]}
    />
  );
}
