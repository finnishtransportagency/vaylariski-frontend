import { Grid, Typography, MenuItem, InputLabel, Select } from "@mui/material";
import { Field } from "formik";
import { useState } from "react";

export default function BoatSpeedComponent(props) {
  const { formik } = props;
  const [selected, setSelected] = useState("moderate");

  const options = [
    { value: "slow", info: "Hidas (5 ≤ v < 8)" },
    { value: "moderate", info: "Keskiverto (8 ≤ v < 12)" },
    { value: "fast", info: "Nopea (v ≥ 12)" },
  ];

  return (
    <>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Aluksen nopeusluokka
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <InputLabel style={{ fontSize: 14 }} id={props.name}>
          Valitse aluksen nopeusluokka
        </InputLabel>
        <Select
          fullWidth
          size="small"
          labelId={props.name}
          id={props.name}
          value={selected}
          onChange={(e) => {
            formik.setFieldValue(props.name, e.target.value);
            setSelected(e.target.value);
          }}
        >
          {options.map((e) => (
            <MenuItem key={e.vlaue} value={e.value}>
              {e.info}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <label htmlFor="boat.speed">
          <Field type="radio" name="boat.speed" value="fast" id="fast-speed" />
          <span onClick={() => document.getElementById("fast-speed").click()}>
            {" Nopea"}
          </span>
        </label>
      </Grid>
      <Grid item xs={8}>
        <label>{"v ≥ "}</label>
        <input
          disabled
          type="number"
          required
          style={{
            width: 80,
            backgroundColor: "#ced6d8",
          }}
          placeholder="nopeus"
          defaultValue={12}
        />
      </Grid>
      <Grid item xs={4}>
        <label htmlFor="boat.speed">
          <Field
            type="radio"
            name="boat.speed"
            value="moderate"
            id="moderate-speed"
          />
          <span
            onClick={() => document.getElementById("moderate-speed").click()}
          >
            {" Keskiverto"}
          </span>
        </label>
      </Grid>
      <Grid item xs={8}>
        <input
          disabled
          type="number"
          required
          style={{
            width: 80,
            backgroundColor: "#ced6d8",
          }}
          placeholder="nopeus"
          defaultValue={8}
        />
        <label>{"≤ v <"}</label>
        <input
          disabled
          type="number"
          required
          style={{
            width: 80,
            backgroundColor: "#ced6d8",
          }}
          placeholder="nopeus"
          defaultValue={12}
        />
      </Grid>
      <Grid item xs={4}>
        <label htmlFor="boat.speed">
          <Field name="boat.speed" type="radio" value="slow" id="slow-speed" />
          <span onClick={() => document.getElementById("slow-speed").click()}>
            {" Hidas"}
          </span>
        </label>
      </Grid>
      <Grid item xs={8}>
        <input
          disabled
          type="number"
          required
          style={{
            width: 80,
            backgroundColor: "#ced6d8",
          }}
          placeholder="nopeus"
          defaultValue={5}
        />
        <label>{"≤ v <"}</label>
        <input
          disabled
          type="number"
          required
          style={{
            width: 80,
            backgroundColor: "#ced6d8",
          }}
          placeholder="nopeus"
          defaultValue={8}
        />
      </Grid>
    </>
  );
}
