import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";


export default function BoatMenuComponent(props) {
  const boat1 = {'speed':10, 'length':210, 'beam':30, 'draft':10, 'manoeuvrability':'good'
  };
  const boat2 = {'speed':10, 'length':255, 'beam':32, 'draft':12, 'manoeuvrability':'good'
  };
  const boat3 = {'speed':10, 'length':200, 'beam':32, 'draft':10, 'manoeuvrability':'good'
  };
  const boat4 = {'speed':10, 'length':210, 'beam':30, 'draft':11, 'manoeuvrability':'good'
  };
  const boat5 = {'speed':10, 'length':83, 'beam':13, 'draft':4, 'manoeuvrability':'good'
  };

  const boatData = [
    boat1,
    boat2,
    boat3,
    boat4,
    boat5
  ]
  const [selectedIndex, setSelectedIndex ] = useState(0);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  function handleMenuItemClick(event) {
    // Select index from event
    const newIndexVal = event.target.value;
    // Select boat from list based on index
    const newBoat = boatData[newIndexVal];
    // Set it as selected
    setSelectedIndex(newIndexVal);
    // Calls parent component's (UserInputForm) function with new boat
    props.setDefaultBoatValues(newBoat);
    handleClose();
  };


  return (
    <>
      <Button
        id="select-boat-button"
        onClick={handleClick}
        variant="contained"
      >
      Valitse oletuslaiva
      </Button>
      <Menu
        id="select-boat-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        >
          {boatData.map((boat, index) => (
            <MenuItem
              key={index}
              value={index}
              selected={index === selectedIndex}
              onClick={handleMenuItemClick}
              >
                Speed: {boat.speed},
                Length: {boat.length},
                Beam: {boat.beam},
                Draft: {boat.draft},
                Manoeuvrability: {boat.manoeuvrability}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};