import {
  TextField,
  Typography,
  Grid,
  Tooltip,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function PFBend1Component(props) {
  const { formik } = props;
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  //TODO: writin 1.3 doesnt work on inputs
  //TODO: all labels are the same
  //TODO: map
  const label = () => {
    return (
      <InputLabel style={{ fontSize: 14 }}>
        PF
        <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
      </InputLabel>
    );
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Mutkan painokertoimet
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 14, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          PF
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span> ja
          sen raja-arvot
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              placement="right"
              arrow
              title={
                <label style={{ fontSize: 14 }}>
                  PF
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>
                    bend1
                  </span>{" "}
                  on painokerroin mutkan jyrkkyydelle suhteessa säteeseen,
                  aluksen kääntösäteeseen ja alukseen pituuteen.
                  <br />
                  BSI = R
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>
                    b
                  </span>{" "}
                  / C
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span>{" "}
                  * L, kun R on säde, C
                  <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span>{" "}
                  on kerroin, joka ilmaisee aluksen kääntösäteen ja L on aluksen
                  pituus.{" "}
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

      <Grid container item paddingBottom={2} spacing={1}>
        <Grid container item alignItems="flex-end" spacing={1}>
          <Grid item xs={2}>
            {label()}
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.PF_bend_radius_1}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.PF_bend_radius_1"
                  error={!!formik.errors?.PF_bend_parameters?.PF_bend_radius_1}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.PF_bend_radius_1}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.PF_bend_radius_1",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2}></Grid>
          <Grid item xs={2} paddingBottom={0.5} justifySelf="center">
            <Typography style={{ fontSize: 15, textAlign: "center" }}>
              &nbsp;&nbsp;{"BSI < "}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_1}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_1"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_1}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_1}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_1",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item alignItems="flex-end" spacing={1}>
          <Grid item xs={2}>
            {label()}
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.PF_bend_radius_2}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.PF_bend_radius_2"
                  error={!!formik.errors?.PF_bend_parameters?.PF_bend_radius_2}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.PF_bend_radius_2}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.PF_bend_radius_2",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_1}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_1"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_1}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_1}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_1",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} paddingBottom={0.5} justifySelf="center">
            <Typography style={{ fontSize: 15, textAlign: "center" }}>
              {"≤ BSI <"}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_2}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_2"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_2}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_2}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_2",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item alignItems="flex-end" spacing={1}>
          <Grid item xs={2}>
            {label()}
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.PF_bend_radius_3}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.PF_bend_radius_3"
                  error={!!formik.errors?.PF_bend_parameters?.PF_bend_radius_3}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.PF_bend_radius_3}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.PF_bend_radius_3",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_2}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_2"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_2}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_2}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_2",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} paddingBottom={0.5} justifySelf="center">
            <Typography style={{ fontSize: 15, textAlign: "center" }}>
              {"≤ BSI <"}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_3}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_3"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_3}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_3}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_3",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item alignItems="flex-end" spacing={1}>
          <Grid item xs={2}>
            {label()}
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.PF_bend_radius_4}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.PF_bend_radius_4"
                  error={!!formik.errors?.PF_bend_parameters?.PF_bend_radius_4}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.PF_bend_radius_4}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.PF_bend_radius_4",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_3}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_3"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_3}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_3}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_3",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} paddingBottom={0.5} justifySelf="center">
            <Typography style={{ fontSize: 15, textAlign: "center" }}>
              {"≤ BSI <"}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_4}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_4"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_4}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_4}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_4",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item alignItems="flex-end" spacing={1}>
          <Grid item xs={2}>
            {label()}
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.PF_bend_radius_5}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.PF_bend_radius_5"
                  error={!!formik.errors?.PF_bend_parameters?.PF_bend_radius_5}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.PF_bend_radius_5}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.PF_bend_radius_5",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Tooltip
              placement="right"
              arrow
              title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_4}
            >
              <span>
                <TextField
                  id="PF_bend_parameters.bend_ratio_lim_4"
                  error={!!formik.errors?.PF_bend_parameters?.bend_ratio_lim_4}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{
                    step: "0.1",
                  }}
                  type="number"
                  value={formik.values.PF_bend_parameters.bend_ratio_lim_4}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "PF_bend_parameters.bend_ratio_lim_4",
                      Number(e.target.value)
                    );
                  }}
                />
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={2} paddingBottom={0.5} justifySelf="center">
            <Typography style={{ fontSize: 15, textAlign: "center" }}>
              {"≤ BSI"}&nbsp;&nbsp;
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </>
  );
}
