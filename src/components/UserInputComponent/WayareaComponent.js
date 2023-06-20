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
  const { selectedWayarea, setSelectedWayarea } = useContext(
    SelectedWayareaContext
  );

  useEffect(() => {
    const path = "wayarea_names";
    try {
      apiClient.get(path).then((response) => setAllWayareas(response.data));
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
    props.setChosenWayareaFormikValue(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setSelectedWayarea(newValue ? `${newValue.VAYLAT} - ${newValue.Nimi}` : "");
  }

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
        <span>
          <Autocomplete
            id="navline.VAYLAT"
            disablePortal
            options={allWayareas}
            getOptionLabel={(option) =>
              option ? `${option.VAYLAT} - ${option.Nimi}` : ""
            }
            onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
            inputValue={selectedWayarea}
            onInputChange={(ev, newInputValue, reason) => {
              if (reason === "input") setSelectedWayarea(newInputValue);
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
        </span>
      </Tooltip>
    </Form.Group>
  );
}
/*
<Field
  component="select"
  name="calculation_interval"
  type="number"
  required
  style={{
    width: 100,
  }}
>
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
  <option value="50">50</option>
  <option value="60">60</option>
  <option value="70">70</option>
  <option value="80">80</option>
  <option value="90">90</option>
  <option value="100">100</option>
  <option value="1000">1000</option>
</Field>;

*/
