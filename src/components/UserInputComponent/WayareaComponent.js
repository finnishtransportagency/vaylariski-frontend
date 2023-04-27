import {
  Button,
  Menu,
  MenuItem,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from 'react-bootstrap/Form';
import VaylatInputValueContext from "contexts/VaylatInputValueContext";

export default function WayareaNameComponent(props) {
  const {
    name,
    defaultWayareaList,
    setDefaultWayareaList,
    vaylatInputValue,
    setVaylatInputValue,
    ...other
  } = props;
  const [field, meta] = useField(name);

  useEffect(() => {
    console.log("wayareacomp : vaylatInputValue", vaylatInputValue);
  }, [vaylatInputValue]);

  function handleMenuItemClick(event, newValue) {
    console.log(newValue);
    props.setDefaultWayareaName(newValue);
  }

  function handleOnInputChange(event, newInputValue, reason) {
    console.log("newinputti", newInputValue);
    setVaylatInputValue(newInputValue);

  }


  return (
    <Form.Group className={meta.error && "has-error"}>
      <Typography
        style={{ fontSize: 16, fontWeight: 550 }}
        color="textSecondary"
        gutterBottom
      >
        Valitse väylä
      </Typography>
      <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
        VAYLAT id/nimi:{" "}
      </Typography>
      <Autocomplete
        id="navline.VAYLAT"
        disablePortal
        options={defaultWayareaList}
        clearOnBlur={false}
        getOptionLabel={(option) =>
          option ? `${option.VAYLAT} - ${option.Nimi}` : ""
        }
        onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
        inputValue={vaylatInputValue}
        onInputChange={(event, newInputValue, reason) =>
          handleOnInputChange(event, newInputValue, reason)
        }
        sx={{ width: 350 }}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: "white" }}
            {...params}
            size="small"
            required
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
