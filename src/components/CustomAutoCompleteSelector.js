import {
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useField } from "formik";
import Form from "react-bootstrap/Form";

export default function CustomAutoCompleteSelectorComponent(props) {
  const { name, label, optionsList, selectedValue, ...other } =
    props;
  const [field, meta] = useField(name);
  const [inputValue, setInputValue] = useState(field.value.toString()); // Set input value from formik

  useEffect(() => {
    console.log('CustomAutoCompleteSelectorComponent - field.value', field.value, typeof field.value);
    console.log("CustomAutoCompleteSelectorComponent - inputValue", inputValue);
    console.log("CustomAutoCompleteSelectorComponent - selectedValue", selectedValue);
  }, [inputValue, selectedValue]);

  function handleOnChange(ev, newValue) {
    props.handleMenuItemClick(ev, newValue, name);
  }


  return (
    <Form.Group className={meta.error && "has-error"}>
      <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
        {label}
      </Typography>
      <Autocomplete
        id={name}
        disablePortal
        options={optionsList}
        value={selectedValue}
        clearOnBlur={false}
        getOptionLabel={(option) => (option ? option.toString() : "")}
        onChange={(ev, newValue) => handleOnChange(ev, newValue)}
        inputValue={inputValue}
        onInputChange={(ev, newInputValue, reason) => setInputValue(newInputValue)}
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
  );
}
