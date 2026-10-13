import { AlertColor } from '@mui/material';

export type NotificationStatus = {
  readonly severity: AlertColor;
  readonly message: string;
  readonly visible: boolean;
};
