import { Button, Menu, MenuItem, Autocomplete, TextField } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";

export default function WayareaNameComponent(props) {
  const [defaultWayarea, setDefaultWayarea] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);
  const [vaylatInputValue, setVaylatInputValue] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log('vaylatInputValue',vaylatInputValue);
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

  function handleMenuItemClick(event) {
    // Select index from event
    const newIndexVal = event.target.value;
    // Select boat from list based on index
    const wayarea = defaultWayarea[newIndexVal];
    // Set it as selected
    setSelectedIndex(newIndexVal);
    // Calls parent component's (UserInputForm) function with new boat
    props.setDefaultWayareaName(wayarea);
    handleClose();
  }
  function lol(event, newValue) {
    console.log( newValue);
    props.setDefaultWayareaName(newValue);
  };

  return (
    <>
      <Button
        id="select-wayarea-button"
        onClick={handleClick}
        variant="contained"
      >
        Valitse väyläalue
      </Button>
      <Menu
        id="select-wayarea-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {defaultWayarea.map((wayarea, index) => (
          <MenuItem
            key={index}
            value={index}
            selected={index === selectedIndex}
            onClick={handleMenuItemClick}
          >
            VAYLAT: {wayarea.VAYLAT}, Nimi: {wayarea.Nimi}
          </MenuItem>
        ))}
      </Menu>
      <Autocomplete
        freeSolo
        disablePortal
        options={defaultWayarea}
        getOptionLabel={(option) => option ? `VAYLAT ${option.VAYLAT}; Nimi: ${option.Nimi}` : "" }
        onChange={(ev, newValue) =>
          lol(ev, newValue)
        }
        inputValue={vaylatInputValue}
        onInputChange={(ev, newInputValue) =>
          setVaylatInputValue(newInputValue)
        }
        sx={{ width: 350 }}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: "white" }}
            {...params}
            label="Väylän nimi/id"
            required
          />
        )}
      />
    </>
  );
}
