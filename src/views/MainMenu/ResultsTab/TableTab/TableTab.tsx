import { RivResultProperty } from '../../../../types/RivResultProperty.ts';
import { RivResultProperties } from '../../../../types/RivResultProperties.ts';
import styles from './TableTab.module.css';
import { useRisk } from '../../../../contexts/NewRiskContext.tsx';
import { useUserSelection } from '../../../../contexts/NewUserSelectionContext.tsx';
import { TableColumns } from './TableColumns.ts';
import CustomFilteredTable from '../../../../components/CustomFilteredTable/CustomFilteredTable.tsx';

export default function TableTab() {
  const { selectedRiskPointIndex, selectRiskPointIndex } = useUserSelection();
  const { results } = useRisk();

  return (
    <CustomFilteredTable<RivResultProperties, RivResultProperty>
      className={styles.resultArea}
      rows={results.map((el) => ({
        ...el,
        id: el.point_index,
      }))}
      columns={TableColumns}
      onClick={(row) => selectRiskPointIndex(row.point_index)}
      selectedRowId={selectedRiskPointIndex}
      getValue={(columnKey, row) => row[columnKey]}
    />
  );
}
