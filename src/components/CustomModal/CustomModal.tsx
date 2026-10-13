import { Modal } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
};

export function CustomModal({ open, onClose, children }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      disableScrollLock={true}
    >
      <>{children}</>
    </Modal>
  );
}
