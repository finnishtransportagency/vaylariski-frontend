import {
  Autocomplete,
  TextField,
  Typography,
  Grid,
  Tooltip,
  InputLabel,
  Switch,
  IconButton,
} from "@mui/material";
import { Field } from "formik";
import { useContext, useEffect, useState } from "react";
import userInputDefault from "constants/UserInputDefault";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function BendParametersComponent(props) {
  const { formik } = props;
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
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
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_radius_1}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_radius_1 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_radius_1"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <label>{"BSI < "}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_1}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_1 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_1"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_radius_2}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_radius_2 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_radius_2"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <Tooltip
          placement="left"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_1}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_1 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_1"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
        <label>{"≤ BSI <"}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_2}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_2 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_2"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_radius_3}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_radius_3 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_radius_3"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <Tooltip
          placement="left"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_2}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_2 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_2"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
        <label>{"≤ BSI <"}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_3}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_3 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_3"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_radius_4}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_radius_4 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_radius_4"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <Tooltip
          placement="left"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_3}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_3 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_3"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
        <label>{"≤ BSI <"}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_4}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_4 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_4"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_radius_5}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_radius_5 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_radius_5"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <label>{"BSI ≥ "}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_ratio_lim_4}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_ratio_lim_4 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_ratio_lim_4"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>

      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 14, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          PF
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span> ja
          sen raja-arvot
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <label htmlFor="PF_bend_parameters">
          {" "}
          PF
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span> on
          painokerroin mutkan jyrkkyydelle suhteessa suuntakulmaan (α){" "}
        </label>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_angle_1}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_angle_1 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_angle_1"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <label>{"α < "}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_1}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_1 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_1"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_angle_2}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_angle_2 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_angle_2"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <Tooltip
          placement="left"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_1}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_1 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_1"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
        <label>{"≤ α <"}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_2}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_2 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_2"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_angle_3}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_angle_3 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_angle_3"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <Tooltip
          placement="left"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_2}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_2 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_2"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
        <label>{"≤ α <"}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_3}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_3 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_3"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_angle_4}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_angle_4 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_angle_4"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <Tooltip
          placement="left"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_3}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_3 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_3"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
        <label>{"≤ α <"}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_4}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_4 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_4"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <label>
          {"PF"}
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
        </label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.PF_bend_angle_5}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.PF_bend_angle_5 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.PF_bend_angle_5"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={7}>
        <label>{" α ≥ "}</label>
        <Tooltip
          placement="right"
          arrow
          title={formik.errors?.PF_bend_parameters?.bend_angle_lim_4}
        >
          <span>
            <Field
              className={
                formik.errors?.PF_bend_parameters?.bend_angle_lim_4 &&
                "has-error"
              }
              component="input"
              name="PF_bend_parameters.bend_angle_lim_4"
              type="number"
              step="0.1"
              required
              style={{
                width: 60,
              }}
            />
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <label>
          {" "}
          Kulman jyrkkyyden painokerroin lasketaan summasta PF
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend</span> = PF
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>+ PF
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>{" "}
        </label>
      </Grid>
    </>
  );
}
