import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NotificationContext from "contexts/NotificationContext";
import { forwardRef, useContext, useState } from "react";


export default function NotificationComponent() {
  const {notificationStatus, setNotificationStatus} = useContext(NotificationContext);

  const handleClick = () => {
    setNotificationStatus({...notificationStatus, visible: true});
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationStatus({...notificationStatus, visible: false});
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={notificationStatus.visible} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={notificationStatus.severity}
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          {notificationStatus.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
