import {
  Autocomplete,
  TextField,
  Typography,
  Grid,
  Tooltip,
  InputLabel,
  Switch,
} from "@mui/material";
import { Field } from "formik";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import Form from "react-bootstrap/Form";
import SelectedBoatContext from "contexts/SelectedBoatContext";
import userInputDefault from "constants/UserInputDefault";

export default function BendParametersComponent(props) {
  const { formik } = props;
  const [length, setLength] = useState(formik.values.boat.length);
  const [beam, setBeam] = useState(formik.values.boat.beam);
  const [draft, setDraft] = useState(formik.values.boat.draft);

  function setChosenBoatFormikValue(newBoat) {
    if (newBoat) {
      formik.setValues({
        ...formik.values,
        boat: {
          ...formik.values.boat,
          length: newBoat.PITUUS ? newBoat.PITUUS : "",
          beam: newBoat.LEVEYS ? newBoat.LEVEYS : "",
          draft: newBoat.SYVAYS ? newBoat.SYVAYS : "",
        },
      });
    } else {
      formik.setValues({
        ...formik.values,
        boat: {
          ...formik.values.boat,
          length: userInputDefault.boat.length,
          beam: userInputDefault.boat.beam,
          draft: userInputDefault.boat.draft,
        },
      });
    }
  }

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
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <label htmlFor="PF_bend_parameters">
          {" "}
          PF
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span> on
          painokerroin mutkan jyrkkyydelle suhteessa säteeseen, aluksen
          kääntösäteeseen ja alukseen pituuteen. BSI = R
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>b</span> / C
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span> * L,
          kun R on säde, C
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span> on
          kerroin, joka ilmaisee aluksen kääntösäteen ja L on aluksen pituus.{" "}
        </label>
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
