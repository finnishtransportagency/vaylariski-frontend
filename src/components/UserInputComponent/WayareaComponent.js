import {
  Button,
  Menu,
  MenuItem,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from 'react-bootstrap/Form';

export default function WayareaNameComponent(props) {
  const { name, ...other } = props;
  const [field, meta] = useField(name);
  const [defaultWayarea, setDefaultWayarea] = useState([]);
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);
  const [vaylatInputValue, setVaylatInputValue] = useState("");

  useEffect(() => {
    console.log("vaylatInputValue", vaylatInputValue);
  }, [vaylatInputValue]);

  useEffect(() => {
    const path = "wayarea_names";
    try {
      apiClient.get(path).then((response) => setDefaultWayarea(response.data));
    } catch (err) {
      console.log(err);
      setNotificationStatus({
        severity: "error",
        message: err.message,
        visible: true,
      });
    } finally {
    }
  }, []);

  function handleMenuItemClick(event, newValue) {
    console.log(newValue);
    props.setDefaultWayareaName(newValue);
  }

  return (
    <Form.Group className={meta.error && "has-error"}>
      <Typography style={{ fontSize: 16, fontWeight:550}} color="textSecondary" gutterBottom>
        Valitse väylä:
      </Typography>
      <Typography
        style={{ fontSize: 14 }}
        color="textSecondary"
        gutterBottom
      >
        VAYLAT id/nimi:{" "}
      </Typography>
      <Autocomplete
        id="navilinja.VAYLAT"
        freeSolo
        disablePortal
        options={defaultWayarea}
        getOptionLabel={(option) =>
          option ? `${option.VAYLAT} - ${option.Nimi}` : ""
        }
        onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
        inputValue={vaylatInputValue}
        onInputChange={(ev, newInputValue) =>
          setVaylatInputValue(newInputValue)
        }
        sx={{ width: 350 }}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: "white" }}
            {...params}
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
