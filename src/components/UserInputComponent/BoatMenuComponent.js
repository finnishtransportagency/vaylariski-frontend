import { Button, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";

export default function BoatMenuComponent(props) {

  const [defaultBoats, setDefaultBoats] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
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
    const path = 'get_all_default_ships';
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

  function handleMenuItemClick(event) {
    // Select index from event
    const newIndexVal = event.target.value;
    // Select boat from list based on index
    const newBoat = defaultBoats[newIndexVal];
    // Set it as selected
    setSelectedIndex(newIndexVal);
    // Calls parent component's (UserInputForm) function with new boat
    props.setDefaultBoatValues(newBoat);
    handleClose();
  }

  return (
    <>
      <Button id="select-boat-button" onClick={handleClick} variant="contained">
        Valitse oletuslaiva
      </Button>
      <Menu
        id="select-boat-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {defaultBoats.map((boat, index) => (
          <MenuItem
            key={index}
            value={index}
            selected={index === selectedIndex}
            onClick={handleMenuItemClick}
          >
            Väylän tunnus: {boat.JNRO}, Leveys: {boat.LEVEYS},
            Syväys: {boat.SYVAYS}, Pituus: {boat.PITUUS},
            Nimi: {boat.VAY_NIMISU},
            {/* RUNKO_TKERROIN: {boat.RUNKO_TKERROIN}, */}
            Selite: {boat.SELITE}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
