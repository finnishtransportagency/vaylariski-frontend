import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";


export default function BoatMenuComponent(props) {
  const boat1 = {'Speed':10, 'Length':210, 'Beam':30, 'Draft':10, 'Manoeuvrability':'good'
  };
  const boat2 = {'Speed':10, 'Length':255, 'Beam':32, 'Draft':12, 'Manoeuvrability':'good'
  };
  const boat3 = {'Speed':10, 'Length':200, 'Beam':32, 'Draft':10, 'Manoeuvrability':'good'
  };
  const boat4 = {'Speed':10, 'Length':210, 'Beam':30, 'Draft':11, 'Manoeuvrability':'good'
  };
  const boat5 = {'Speed':10, 'Length':83, 'Beam':13, 'Draft':4, 'Manoeuvrability':'good'
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
    const newIndexVal = event.target.value;
    // console.log('handleMenuItemClick!!',newIndexVal);
    const newBoat = boatData[newIndexVal];
    // console.log('newboot', newBoat);
    setSelectedIndex(newIndexVal);
    // Calls parent component's (UserInputForm) function
    props.setDefaultBoatValues(newBoat);
  };


  return (
    <>
      <Button
        id="select-boat-button"
        onClick={handleClick}
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
                Speed: {boat.Speed},
                Length: {boat.Length},
                Beam: {boat.Beam},
                Draft: {boat.Draft},
                Manoeuvrability: {boat.Manoeuvrability}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };