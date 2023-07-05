import { Autocomplete, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import Form from "react-bootstrap/Form";
import SelectedBoatContext from "contexts/SelectedBoatContext";

export default function BoatMenuComponent(props) {
  const [defaultBoats, setDefaultBoats] = useState([]);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { setSelectedBoat } = useContext(SelectedBoatContext);
  const [boatInputString, setBoatInputString] = useState("");

  useEffect(() => {
    const path = "get_all_default_ships";
    apiClient
      .get(path)
      .then((response) => setDefaultBoats(response.data))
      .catch((err) => {
        console.log(err);
        setNotificationStatus({
          severity: "error",
          message: err.message,
          visible: true,
        });
      });
  }, []);

  const formatInputString = (boat) =>
    `${boat.JNRO} - ${boat.VAY_NIMISU}, pituus: ${boat.PITUUS}, leveys: ${boat.LEVEYS},  syväys: ${boat.SYVAYS}`;

  function handleMenuItemClick(event, newValue) {
    // Calls parent component's (UserInputForm) function with new boat
    props.setChosenBoatFormikValue(newValue);
    setSelectedBoat(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setBoatInputString(newValue ? formatInputString(newValue) : "");
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
          getOptionLabel={(option) => (option ? formatInputString(option) : "")}
          onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
          inputValue={boatInputString}
          onInputChange={(ev, newInputValue, reason) => {
            if (reason === "input") setBoatInputString(newInputValue);
          }}
          sx={{ width: "99%" }}
          size="small"
          renderInput={(params) => (
            <TextField style={{ backgroundColor: "white" }} {...params} />
          )}
        />
      </Form.Group>
    </>
  );
}
