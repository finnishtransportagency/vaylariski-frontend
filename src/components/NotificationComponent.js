import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NotificationContext from "contexts/NotificationContext";
import { useContext } from "react";


export default function NotificationComponent() {
  const {notificationStatus, setNotificationStatus} = useContext(NotificationContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationStatus({...notificationStatus, visible: false});
  };

  return (
    <>
      <Snackbar open={notificationStatus.visible} autoHideDuration={60000} onClose={handleClose}>
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
