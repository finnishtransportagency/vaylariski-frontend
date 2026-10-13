import { Backdrop, CircularProgress } from '@mui/material';

import { useSpinner } from '../../contexts/SpinnerContext.tsx';

export default function LoadingSpinner() {
  const { spinnerVisibility } = useSpinner();

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={spinnerVisibility}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
