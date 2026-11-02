import { Dialog, List, ListItem, Modal } from '@mui/material';
import { ShownColumn } from './CustomFilteredTable.tsx';
import { useState } from 'react';
import { CustomTextButton } from '../CustomButton/CustomTextButton.tsx';
import styles from './CustomColumnSelectionModal.module.css';

type Props<V> = {
  readonly label: string;
  readonly columns: ShownColumn<V>[];
  readonly toggleColumn: (key: V, show: boolean) => void;
};

export default function CustomColumnSelectionModal<V extends string>({
  label,
  columns,
  toggleColumn,
}: Props<V>) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <CustomTextButton label={label} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableScrollLock={true}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <List>
          {columns.map((col) => (
            <ListItem key={col.key}>
              <CustomTextButton
                label={col.name}
                variant={col.show ? 'contained' : 'outlined'}
                onClick={() => toggleColumn(col.key, !col.show)}
                className={styles.selectionButton}
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
