import { Button, Backdrop, CircularProgress } from "@mui/material";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import { useContext, useState } from "react";


export default function LoadingSpinner() {
  const { spinnerVisible, setSpinnerVisible } = useContext(SpinnerVisibilityContext);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={spinnerVisible}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}