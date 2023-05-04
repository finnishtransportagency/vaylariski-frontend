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
    selectedWayarea,
    ...other
  } = props;

  const [field, meta] = useField(name);
  const [vaylatInputValue, setVaylatInputValue] = useState( Object.keys(selectedWayarea).length !== 0 ? `${selectedWayarea.VAYLAT} - ${selectedWayarea.Nimi}`: "" );

  useEffect(() => {
    console.log("wayareacomp : vaylatInputValue", vaylatInputValue);
  }, [vaylatInputValue]);

  useEffect(() => {
    console.log("wayareacomp : selectedWayarea", selectedWayarea);
  }, [selectedWayarea]);

  function handleMenuItemClick(event, newValue) {
    console.log('handleMenuItemClick', newValue);
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
