import { Typography, Grid, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import PFBend1Component from "./PFBend1Component";
import PFBend2Component from "./PFBend2Component";

export default function PFBendComponent(props) {
  const { formik } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  const tooltiptTitle = (
    <label style={{ fontSize: 14 }}>
      Mutkan jyrkkyyden painokerroin lasketaan summasta PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend</span> = PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>+ PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
    </label>
  );

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Mutkan painokertoimet
          <ClickAwayListener onClickAway={handleClose}>
            <Tooltip
              placement="right"
              arrow
              title={tooltiptTitle}
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton onClick={handleOpen}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Typography>
      </Grid>
      <PFBend1Component formik={formik} />
      <PFBend2Component formik={formik} />
    </Grid>
  );
}
