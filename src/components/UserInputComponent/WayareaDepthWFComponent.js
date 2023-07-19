import {
  Grid,
  Typography,
  Tooltip,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import { Field } from "formik";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";

export default function WayareaDepthWFComponent(props) {
  const { formik } = props;

  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          component="span"
          style={{
            fontSize: 16,
            fontWeight: 550,
            verticalAlign: "middle",
          }}
          color="textSecondary"
          gutterBottom
        >
          Väylän syvyyden painokerroin
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              placement="right"
              arrow
              title={
                <label style={{ fontSize: 14 }}>
                  Syvyyden painokerroin kerrotaan aluksen leveydellä alla
                  näkyvien määritysten perusteella, joihin vaikuttaa väylän
                  syvyys ja aluksen syväys. Laskennassa voi käyttää oletusarvoja
                  tai määrittää uudet painokertoimet.
                </label>
              }
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton onClick={handleTooltipOpen}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <label> Väylän sisäosa: </label>
      </Grid>
      <Grid item xs={6}>
        <label> Väylän ulko-osa: </label>
      </Grid>
      <Grid item xs={6}>
        <div>
          <label style={{ fontSize: 14 }}>syvyys ≥ 1.5 * syväys</label>
        </div>

        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.channel_depth_wf?.deep_inner_channel}
        >
          <span>
            <Field
              component="input"
              className={
                formik.errors?.channel_depth_wf?.deep_inner_channel &&
                "has-error"
              }
              name="channel_depth_wf.deep_inner_channel"
              type="number"
              step="0.01"
              required
              style={{
                width: 130,
              }}
              placeholder="painokerroin"
            />
          </span>
        </Tooltip>
        <div>
          <label style={{ fontSize: 14 }}>
            1.15*syväys ≤ syvyys 1.5*syväys
          </label>
        </div>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.channel_depth_wf?.medium_deep_inner_channel}
        >
          <span>
            <Field
              className={
                formik.errors?.channel_depth_wf?.medium_deep_inner_channel &&
                "has-error"
              }
              component="input"
              name="channel_depth_wf.medium_deep_inner_channel"
              type="number"
              step="0.01"
              required
              style={{
                width: 130,
              }}
              placeholder="painokerroin"
            />
          </span>
        </Tooltip>
        <div>
          <label style={{ fontSize: 14 }}>{"syvyys < 1.15*syväys"}</label>
        </div>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.channel_depth_wf?.shallow_inner_channel}
        >
          <span>
            <Field
              className={
                formik.errors?.channel_depth_wf?.shallow_inner_channel &&
                "has-error"
              }
              component="input"
              name="channel_depth_wf.shallow_inner_channel"
              type="number"
              step="0.01"
              required
              style={{
                width: 130,
              }}
              placeholder="painokerroin"
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <div>
          <label style={{ fontSize: 14 }}>syvyys ≥ 1.5 * syväys</label>
        </div>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.channel_depth_wf?.deep_outer_channel}
        >
          <span>
            <Field
              className={
                formik.errors?.channel_depth_wf?.deep_outer_channel &&
                "has-error"
              }
              component="input"
              name="channel_depth_wf.deep_outer_channel"
              type="number"
              step="0.01"
              required
              style={{
                width: 130,
              }}
              placeholder="painokerroin"
            />
          </span>
        </Tooltip>
        <div>
          <label style={{ fontSize: 14 }}>
            1.25*syväys ≤ syvyys 1.5*syväys
          </label>
        </div>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.channel_depth_wf?.medium_deep_outer_channel}
        >
          <span>
            <Field
              className={
                formik.errors?.channel_depth_wf?.medium_deep_outer_channel &&
                "has-error"
              }
              component="input"
              name="channel_depth_wf.medium_deep_outer_channel"
              type="number"
              step="0.01"
              required
              style={{
                width: 130,
              }}
              placeholder="painokerroin"
            />
          </span>
        </Tooltip>
        <div>
          <label style={{ fontSize: 14 }}>{"syvyys < 1.25*syväys"}</label>
        </div>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.channel_depth_wf?.shallow_outer_channel}
        >
          <span>
            <Field
              className={
                formik.errors?.channel_depth_wf?.shallow_outer_channel &&
                "has-error"
              }
              component="input"
              name="channel_depth_wf.shallow_outer_channel"
              type="number"
              step="0.01"
              required
              style={{
                width: 130,
              }}
              placeholder="painokerroin"
            />
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
