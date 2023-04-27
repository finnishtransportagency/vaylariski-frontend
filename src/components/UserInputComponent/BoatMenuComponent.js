import { Autocomplete, Button, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import Form from 'react-bootstrap/Form';
import { useField } from "formik";

export default function BoatMenuComponent(props) {
  const { name, ...other } = props;
  const [field, meta] = useField(name);
  const [defaultBoats, setDefaultBoats] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [boatInputValue, setBoatInputValue] = useState("");

  const open = Boolean(anchorEl);
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const path = "get_all_default_ships";
    try {
      apiClient.get(path).then((response) => setDefaultBoats(response.data));
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

  // useEffect(() => {
  //   console.log(defaultBoats);
  // }, [defaultBoats]);

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
            option ? `${option.JNRO} - ${option.VAY_NIMISU}, pituus: ${option.PITUUS}, leveys: ${option.LEVEYS},  syväys: ${option.SYVAYS}`: ""
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
