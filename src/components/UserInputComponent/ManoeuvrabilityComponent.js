import { useState } from "react";
import { FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Form from "react-bootstrap/Form";
import Select from "@mui/material/Select";

export default function ManoeuvrabilityComponent(props) {
  const [C_manoeuvrability, SetC_manoeuvrability] = useState(1.5);
  const options = [
    ["Hyvä", "Twin-propeller ships, RoPax ships, and cruise ships", 1.3],
    [
      "Keskiverto",
      "Container ships, car carriers, RoRo ships, LNG ships, and LPG ships",
      1.5,
    ],
    ["Heikko", "Tankers, bulk carriers", 1.8],
  ];

  const handleChange = (event) => {
    SetC_manoeuvrability(event.target.value);
    props.formik.setFieldValue("boat.C_manoeuvrability", event.target.value);
  };
  const MenuOptions = () => {
    return options.map((e) => (
      <MenuItem
        key={e[2]}
        value={e[2]}
      >{`${e[2]} - (${e[0]}) - (${e[1]})`}</MenuItem>
    ));
  };

  return (
    <Form.Group>
      <Select
        sx={{ width: "100%", height: 40 }}
        style={{ backgroundColor: "white" }}
        id={name}
        value={C_manoeuvrability}
        onChange={handleChange}
      >
        {MenuOptions()}
      </Select>
      <FormHelperText>Aluksen ohjailtavuusluokka</FormHelperText>
    </Form.Group>
  );
}
