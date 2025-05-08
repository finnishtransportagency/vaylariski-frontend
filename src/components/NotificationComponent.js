import { useContext } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import NotificationContext from "../contexts/NotificationContext.js";

export default function NotificationComponent() {
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationStatus({ ...notificationStatus, visible: false });
  };

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
          sx={{ width: "100%" }}
          data-cy-id="alert-id"
        >
          {notificationStatus.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
