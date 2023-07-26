import {
  Grid,
  Typography,
  Tooltip,
  InputLabel,
  TextField,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
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
  const boatDepth = (
    <em>
      S<span style={{ verticalAlign: "sub", fontSize: 12 }}>L</span>
    </em>
  );
  const wayareaDepth = (
    <em>
      S<span style={{ verticalAlign: "sub", fontSize: 12 }}>V</span>
    </em>
  );
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
                  Alla olevissa kentissä määritetään kertoimet, jotka
                  kerrottaessa aluksen leveydellä määrittävät syvyyden
                  painokertoimen. Kerroin eri navigointilinjan osille määräytyy
                  alla olevista vaihtoehdoista väylän tyypin, väylän syvyyden ja
                  aluksen syväyksen perusteella. Laskennassa voi käyttää
                  oletusarvoja tai määrittää uudet kertoimet kenttiin.
                  <br />
                  <em>
                    S
                    <span style={{ verticalAlign: "sub", fontSize: 12 }}>
                      V
                    </span>{" "}
                    = väylän syvyys, {boatDepth} = laivan syväys
                  </em>
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
      <Grid item container spacing={1}>
        <Grid item xs={12}>
          <Typography color="textSecondary">Väylän sisäosa</Typography>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            style={{ fontSize: 14 }}
            id={"channel_depth_wf.deep_inner_channel"}
          >
            {wayareaDepth}
            {" ≥ 1.5 × "}
            {boatDepth}
          </InputLabel>
          <Tooltip
            placement="right"
            arrow
            title={formik.errors?.channel_depth_wf?.deep_inner_channel}
          >
            <span>
              <TextField
                fullWidth
                id="channel_depth_wf.deep_inner_channel"
                error={!!formik.errors?.channel_depth_wf?.deep_inner_channel}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.01",
                }}
                type="number"
                value={formik.values.channel_depth_wf.deep_inner_channel}
                onChange={(e) => {
                  formik.setFieldValue(
                    "channel_depth_wf.deep_inner_channel",
                    e.target.value
                  );
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            style={{ fontSize: 14 }}
            id={"channel_depth_wf.medium_deep_inner_channel"}
          >
            1.15 × {boatDepth} ≤ {wayareaDepth} {"<"} 1.5 × {boatDepth}
          </InputLabel>
          <Tooltip
            placement="right"
            arrow
            title={formik.errors?.channel_depth_wf?.medium_deep_inner_channel}
          >
            <span>
              <TextField
                fullWidth
                id="channel_depth_wf.medium_deep_inner_channel"
                error={
                  !!formik.errors?.channel_depth_wf?.medium_deep_inner_channel
                }
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.01",
                }}
                type="number"
                value={formik.values.channel_depth_wf.medium_deep_inner_channel}
                onChange={(e) => {
                  formik.setFieldValue(
                    "channel_depth_wf.medium_deep_inner_channel",
                    e.target.value
                  );
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            style={{ fontSize: 14 }}
            id={"channel_depth_wf.shallow_inner_channel"}
          >
            {wayareaDepth} {"<"} 1.15 × {boatDepth}
          </InputLabel>
          <Tooltip
            placement="right"
            arrow
            title={formik.errors?.channel_depth_wf?.shallow_inner_channel}
          >
            <span>
              <TextField
                fullWidth
                id="channel_depth_wf.shallow_inner_channel"
                error={!!formik.errors?.channel_depth_wf?.shallow_inner_channel}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.01",
                }}
                type="number"
                value={formik.values.channel_depth_wf.shallow_inner_channel}
                onChange={(e) => {
                  formik.setFieldValue(
                    "channel_depth_wf.shallow_inner_channel",
                    e.target.value
                  );
                }}
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item container spacing={1}>
        <Grid item xs={12}>
          <Typography color="textSecondary">Väylän ulko-osa</Typography>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            style={{ fontSize: 14 }}
            id={"channel_depth_wf.deep_outer_channel"}
          >
            {wayareaDepth}
            {" ≥ 1.5 × "}
            {boatDepth}
          </InputLabel>
          <Tooltip
            placement="right"
            arrow
            title={formik.errors?.channel_depth_wf?.deep_outer_channel}
          >
            <span>
              <TextField
                fullWidth
                id="channel_depth_wf.deep_outer_channel"
                error={!!formik.errors?.channel_depth_wf?.deep_outer_channel}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.01",
                }}
                type="number"
                value={formik.values.channel_depth_wf.deep_outer_channel}
                onChange={(e) => {
                  formik.setFieldValue(
                    "channel_depth_wf.deep_outer_channel",
                    e.target.value
                  );
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            style={{ fontSize: 14 }}
            id={"channel_depth_wf.medium_deep_outer_channel"}
          >
            1.25 × {boatDepth} ≤ {wayareaDepth} {"<"} 1.5 × {boatDepth}
          </InputLabel>
          <Tooltip
            placement="right"
            arrow
            title={formik.errors?.channel_depth_wf?.medium_deep_outer_channel}
          >
            <span>
              <TextField
                fullWidth
                id="channel_depth_wf.medium_deep_outer_channel"
                error={
                  !!formik.errors?.channel_depth_wf?.medium_deep_outer_channel
                }
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.01",
                }}
                type="number"
                value={formik.values.channel_depth_wf.medium_deep_outer_channel}
                onChange={(e) => {
                  formik.setFieldValue(
                    "channel_depth_wf.medium_deep_outer_channel",
                    e.target.value
                  );
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            style={{ fontSize: 14 }}
            id={"channel_depth_wf.shallow_outer_channel"}
          >
            {wayareaDepth} {"<"} 1.25 × {boatDepth}
          </InputLabel>
          <Tooltip
            placement="right"
            arrow
            title={formik.errors?.channel_depth_wf?.shallow_outer_channel}
          >
            <span>
              <TextField
                fullWidth
                id="channel_depth_wf.shallow_outer_channel"
                error={!!formik.errors?.channel_depth_wf?.shallow_outer_channel}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.01",
                }}
                type="number"
                value={formik.values.channel_depth_wf.shallow_outer_channel}
                onChange={(e) => {
                  formik.setFieldValue(
                    "channel_depth_wf.shallow_outer_channel",
                    e.target.value
                  );
                }}
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}
