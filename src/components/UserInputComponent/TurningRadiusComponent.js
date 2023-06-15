import { useState } from "react";
import { FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Form from "react-bootstrap/Form";
import Select from "@mui/material/Select";

export default function TurningRadiusComponent(props) {
  const [C_turning_radius, SetC_turning_radius] = useState(5);
  const options = [
    ["LNG ships, passenger ships", 4],
    [
      "Cargo ships, small bulk carriers, VLCCs, small tankers, refrigerated cargo carriers, ferry boats",
      5,
    ],
    [
      "Small cargo ships, Panamax container ships, very large bulk carriers, Panamax bulk carriers",
      6,
    ],
    ["Post-Panamax container ships", 7],
  ];

  const handleChange = (event) => {
    SetC_turning_radius(event.target.value);
    props.formik.setFieldValue("boat.C_turning_radius", event.target.value);
  };
  const MenuOptions = () => {
    return options.map((e) => (
      <MenuItem key={e[1]} value={e[1]}>{`${e[1]} - (${e[0]})`}</MenuItem>
    ));
  };

  return (
    <Form.Group>
      <Select
        sx={{ width: "100%", height: 40 }}
        style={{ backgroundColor: "white" }}
        id={name}
        value={C_turning_radius}
        onChange={handleChange}
      >
        {MenuOptions()}
      </Select>
      <FormHelperText>Aluksen kääntösädettä kuvaava parametri</FormHelperText>
    </Form.Group>
  );
}
