import { Autocomplete, TextField, Typography, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from "react-bootstrap/Form";
import SelectedWayareaContext from "contexts/SelectedWayareaContext";

export default function WayareaNameComponent(props) {
  const { name } = props;
  const [field, meta] = useField(name);
  const [allWayareas, setAllWayareas] = useState([]);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { setSelectedWayarea } = useContext(SelectedWayareaContext);
  const [wayareaInputString, setWayareaInputString] = useState("");

  useEffect(() => {
    const path = "wayarea_names";
    apiClient
      .get(path)
      .then((response) => setAllWayareas(response.data))
      .catch((err) => {
        console.log(err);
        setNotificationStatus({
          severity: "error",
          message: err.message,
          visible: true,
        });
      });
  }, []);

  const formatInputString = (wayarea) => `${wayarea.VAYLAT} - ${wayarea.Nimi}`;

  const handleMenuItemClick = (event, newValue) => {
    props.setChosenWayareaFormikValue(newValue);
    setSelectedWayarea(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setWayareaInputString(newValue ? formatInputString(newValue) : "");
  };

  return (
    <Form.Group>
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
      <Tooltip placement="right" arrow title={meta.error}>
        <Autocomplete
          id="navline.VAYLAT"
          disablePortal
          options={allWayareas}
          getOptionLabel={(option) => (option ? formatInputString(option) : "")}
          onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
          inputValue={wayareaInputString}
          onInputChange={(ev, newInputValue, reason) => {
            if (reason === "input") setWayareaInputString(newInputValue);
          }}
          sx={{ width: 350 }}
          renderInput={(params) => (
            <TextField
              error={!!meta.error}
              style={{ backgroundColor: "white" }}
              {...params}
              required
            />
          )}
        />
      </Tooltip>
    </Form.Group>
  );
}
