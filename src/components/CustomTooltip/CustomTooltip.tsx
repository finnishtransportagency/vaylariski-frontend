import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import { ReactNode, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type Props = {
  readonly children: ReactNode;
};

export function CustomTooltip({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Tooltip
        placement="right"
        arrow
        title={<label style={{ fontSize: 14 }}>{children}</label>}
        onClose={() => setOpen(false)}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <IconButton
          onClick={() => {
            setOpen((prevValue) => !prevValue);
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
}
