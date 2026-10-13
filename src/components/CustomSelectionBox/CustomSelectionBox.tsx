import { Box } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflow: 'scroll',
};

export type ColumnType = {
  readonly key: string;
  readonly name: string;
  readonly isDefault: boolean;
};

export type SelectedColumn = {
  readonly key: string;
  readonly name: string;
};

type SelectableColumn = {
  readonly key: string;
  readonly name: string;
  readonly isSelected: boolean;
};

type Props = {
  readonly initialColumns: ColumnType[];
  readonly onSelectionChange: (selected: SelectedColumn[]) => void;
};

export function CustomSelectionBox({
  initialColumns,
  onSelectionChange,
}: Props) {
  const [actualColumns, setActualColumns] = useState<SelectableColumn[]>(
    initialColumns.map((col) => ({
      ...col,
      isSelected: col.isDefault,
    }))
  );

  function toggleAllColumns(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setActualColumns(
        actualColumns.map((col) => ({ ...col, isVisible: true }))
      );
    } else {
      setActualColumns(
        actualColumns.map((col) => ({ ...col, isVisible: false }))
      );
    }
  }

  function toggleColumn(toggled: SelectableColumn) {
    setActualColumns(
      actualColumns.map((col) =>
        col.key == toggled.key
          ? {
              ...col,
              isSelected: !col.isSelected,
            }
          : col
      )
    );
  }

  useEffect(() => {
    onSelectionChange(actualColumns.filter((col) => col.isSelected));
  }, [actualColumns]);

  return (
    <Box sx={{ ...style }}>
      <div>
        <label>
          <input
            type="checkbox"
            checked={actualColumns.every((col) => col.isSelected)}
            onChange={toggleAllColumns}
          />
          &nbsp;Valitse kaikki
        </label>
        {actualColumns.map((column) => (
          <div key={column.key}>
            <label key={column.key}>
              <input
                type="checkbox"
                checked={column.isSelected}
                onChange={() => toggleColumn(column)}
              />
              &nbsp;{column.name}
            </label>
          </div>
        ))}
      </div>
    </Box>
  );
}
