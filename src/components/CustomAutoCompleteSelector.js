import {
  Button,
  Menu,
  MenuItem,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useField } from "formik";
import Form from 'react-bootstrap/Form';

export default function CustomAutoCompleteSelectorComponent(props) {
  const { name, label, optionsList, ...other } = props;
  const [field, meta] = useField(name);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   console.log("inputValue", inputValue);
  //   console.log("value", value);
  // }, [inputValue, value]);

  function handleOnChange(ev, newValue) {
    props.handleMenuItemClick(ev, newValue, name);
    setValue(newValue);
  }

  useEffect(()=> {
    if (optionsList === undefined || optionsList.length == 0) {
      setValue("");
    }
  }, [optionsList]);

  return (
    <Form.Group className={meta.error && "has-error"}>
      <Typography
        style={{ fontSize: 14 }}
        color="textSecondary"
        gutterBottom
      >
        {label}
      </Typography>
      <Autocomplete
        value={value}
        id={name}
        disablePortal
        options={optionsList}
        getOptionLabel={(option) =>
          option ? option.toString() : ""
        }
        onChange={(ev, newValue) => handleOnChange(ev, newValue)}
        inputValue={inputValue}
        onInputChange={(ev, newInputValue) =>
          setInputValue(newInputValue)
        }
        sx={{ width: 350 }}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: "white" }}
            {...params}
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
