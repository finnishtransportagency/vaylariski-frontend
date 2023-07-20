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
  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item container spacing={0}>
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
                    syvyys ja aluksen syväys. Laskennassa voi käyttää
                    oletusarvoja tai määrittää uudet painokertoimet.
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
        <Grid item xs={12}>
          <Typography component="span" color="textSecondary">
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>y</span> =
              syvyys
            </em>
            ,{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span> =
              syväys
            </em>
          </Typography>
        </Grid>
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
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>y</span>
            </em>
            {" ≥ 1.5 × "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>
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
            1.15 ×{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>{" "}
            ≤{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>y</span>
            </em>{" "}
            {"<"} 1.5 ×{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>
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
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>y</span>
            </em>{" "}
            {"<"} 1.15 ×{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>
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
          <Typography color="textSecondary">Väylän sisäosa</Typography>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            style={{ fontSize: 14 }}
            id={"channel_depth_wf.deep_outer_channel"}
          >
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>y</span>
            </em>
            {" ≥ 1.5 × "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>
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
            1.25 ×{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>{" "}
            ≤{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>y</span>
            </em>{" "}
            {"<"} 1.5 ×{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>
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
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>y</span>
            </em>{" "}
            {"<"} 1.25 ×{" "}
            <em>
              S<span style={{ verticalAlign: "sub", fontSize: 12 }}>ä</span>
            </em>
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
