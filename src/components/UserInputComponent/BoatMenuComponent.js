import { Autocomplete, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import Form from "react-bootstrap/Form";
import SelectedBoatContext from "contexts/SelectedBoatContext";

export default function BoatMenuComponent(props) {
  const [defaultBoats, setDefaultBoats] = useState([]);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedBoat, setSelectedBoat } = useContext(SelectedBoatContext);

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
    }
  }, []);

  function handleMenuItemClick(event, newValue) {
    // Calls parent component's (UserInputForm) function with new boat
    props.setDefaultBoatValues(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setSelectedBoat(
      newValue
        ? `${newValue.JNRO} - ${newValue.VAY_NIMISU}, pituus: ${newValue.PITUUS}, leveys: ${newValue.LEVEYS},  syväys: ${newValue.SYVAYS}`
        : ""
    );
  }

  return (
    <>
      <Form.Group>
        <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
          Alus:{" "}
        </Typography>
        <Autocomplete
          id="boat"
          disablePortal
          options={defaultBoats}
          getOptionLabel={(option) =>
            option
              ? `${option.JNRO} - ${option.VAY_NIMISU}, pituus: ${option.PITUUS}, leveys: ${option.LEVEYS},  syväys: ${option.SYVAYS}`
              : ""
          }
          onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
          inputValue={selectedBoat}
          onInputChange={(ev, newInputValue, reason) => {
            if (reason === "input") setSelectedBoat(newInputValue);
          }}
          sx={{ width: 350 }}
          renderInput={(params) => (
            <TextField style={{ backgroundColor: "white" }} {...params} />
          )}
        />
      </Form.Group>
    </>
  );
}
