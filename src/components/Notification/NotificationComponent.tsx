import { Snackbar, SnackbarCloseReason } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNotification } from '../../contexts/NotificationContext.tsx';

export default function NotificationComponent() {
  const { notificationStatus, setNotificationStatus } = useNotification();

  function handleClose(event: unknown, reason?: SnackbarCloseReason) {
    if (reason === 'clickaway') {
      return;
    }
    setNotificationStatus({ ...notificationStatus, visible: false });
  }

  return (
    <>
      <Snackbar
        open={notificationStatus.visible}
        autoHideDuration={60000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={notificationStatus.severity}
          onClose={handleClose}
          sx={{ width: '100%' }}
          data-cy-id="alert-id"
        >
          {notificationStatus.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
