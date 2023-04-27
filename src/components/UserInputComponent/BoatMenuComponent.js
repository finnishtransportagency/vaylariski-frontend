import {
  Autocomplete,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";

export default function BoatMenuComponent(props) {
  const {
    name,
    defaultBoats,
    setDefaultBoats,
    selectedIndex,
    setSelectedIndex,
    boatInputValue,
    setBoatInputValue,
    ...other
  } = props;
  const [field, meta] = useField(name);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };


  function handleMenuItemClick(event, newValue) {
    console.log(event, newValue);
    // Calls parent component's (UserInputForm) function with new boat
    props.setDefaultBoatValues(newValue);
    handleClose();
  }

  return (
    <>
      <Form.Group className={meta.error && "has-error"}>
        <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
          Alus:{" "}
        </Typography>
        <Autocomplete
          id="boat"
          disablePortal
          options={defaultBoats}
          clearOnBlur={false}
          getOptionLabel={(option) =>
            option
              ? `${option.JNRO} - ${option.VAY_NIMISU}, pituus: ${option.PITUUS}, leveys: ${option.LEVEYS},  syväys: ${option.SYVAYS}`
              : ""
          }
          onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
          inputValue={boatInputValue}
          onInputChange={(ev, newInputValue) =>
            setBoatInputValue(newInputValue)
          }
          sx={{ width: 350 }}
          renderInput={(params) => (
            <TextField
              style={{ backgroundColor: "white" }}
              {...params}
              size="small"
            />
          )}
        />
        {meta.touched && meta.error && (
          <small className="react-form-message react-form-message-error">
            {meta.error}
          </small>
        )}
      </Form.Group>
    </>
  );
}
