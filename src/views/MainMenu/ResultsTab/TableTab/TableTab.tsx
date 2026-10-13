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
import { TableColumns } from './TableColumns.ts';

export type Filter = Item<RivResultProperty> & {
  readonly operator: '≤' | '≥' | '=';
  readonly limit?: string | number;
};

export type DataRow = RowData<RivResultProperties>;

export default function TableTab() {
  const {
    rows,
    handleTableClick,
    columns,
    filters,
    selectedRowId,
    onSelectionChange,
    updateFilters,
  } = useTableTab();
  const { csvData, selectCsvData } = useCSV();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    selectCsvData(rows);
  }, [rows]);

  return (
    <div className="riv-tab-container">
      <div className="riv-tab-content">
        <div
          role="TabPanelComponent"
          id={`simple-tabpanel-0`}
          aria-labelledby={`simple-tab-0`}
          className="riv-diagram-tab-component"
        >
          <div>
            {/* Export CSV */}
            <CustomCsvButton
              label="Lataa CSV"
              fileName="vaylakohtainen_riski.csv"
              data={csvData}
            />
            {/* Select column */}
            <CustomIconButton
              icon="week"
              label="Valitse sarakkeet"
              onClick={() => setOpen(true)}
            />
            <CustomModal open={open} onClose={() => setOpen(false)}>
              <CustomSelectionBox
                initialColumns={TableColumns}
                onSelectionChange={onSelectionChange}
              />
            </CustomModal>
            {/* Add filters */}
            <CustomIconButton
              icon="filter"
              label="Lisää suodatus"
              onClick={() => setShowForm(true)}
            />
            {showForm && (
              <CustomForm<Filter>
                initialValue={{
                  id: RivResultProperty.GDO_GID,
                  label: 'Default',
                  operator: '≤',
                  limit: undefined,
                }}
                onSubmit={(filter: Filter) => {
                  updateFilters([...filters, filter]);
                  setShowForm(false);
                }}
              >
                <CustomFormSelect<Filter, RivResultProperty>
                  label="Valitse parametri"
                  id="filterConstant"
                  name="filterConstant"
                  getValue={(values: Filter) => values.id}
                  items={Object.values(RivResultProperty)
                    .sort()
                    .map((prop) => ({
                      id: prop,
                      name: prop.toString(),
                      value: prop,
                    }))}
                />
                <CustomFormSelect<Filter, '≤' | '≥' | '='>
                  id="filterOperator"
                  name="filterOperator"
                  getValue={(values: Filter) => values.operator}
                  items={[
                    { id: '≤', name: '≤', value: '≤' },
                    { id: '≥', name: '≥', value: '≥' },
                    { id: '=', name: '=', value: '=' },
                  ]}
                />
                <CustomFormText<Filter, string | number | undefined>
                  id="filterValue"
                  name="filterValue"
                  label="Arvo *"
                  getValue={(values: Filter) => values.limit}
                />
                <CustomFormSubmit label="Käytä" />
                <CustomTextButton
                  label="Poista"
                  onClick={() => setShowForm(false)}
                />
              </CustomForm>
            )}
            <CustomList
              items={filters}
              removeItemLabel="Poista suodatus"
              removeItem={(item: Item<RivResultProperty>) => {
                updateFilters(
                  filters.filter((value: Filter) => value.id != item.id)
                );
              }}
            />
          </div>
          <CustomTable<RivResultProperties>
            className="riv-table"
            rows={rows}
            columns={columns}
            onClick={handleTableClick}
            selectedRowId={selectedRowId}
          />
        </div>
      </div>
    </div>
  );
}
