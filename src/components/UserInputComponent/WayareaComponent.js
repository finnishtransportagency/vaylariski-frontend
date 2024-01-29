import { Autocomplete, TextField, Typography, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from "react-bootstrap/Form";

export default function WayareaNameComponent(props) {
  const { name } = props;
  const [field, meta] = useField(name);
  const [defaultWayarea, setDefaultWayarea] = useState([]);
  const { setNotificationStatus } = useContext(NotificationContext);
  const [vaylatInputValue, setVaylatInputValue] = useState("");

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
    }
  }, []);

  function handleMenuItemClick(event, newValue) {
    props.setDefaultWayareaName(newValue);
  }

  console.log(defaultWayarea);

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
            options={defaultWayarea}
            getOptionLabel={(option) =>
              option ? `${option.VAYLAT} - ${option.NIMIFI}` : ""
            }
            onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
            inputValue={vaylatInputValue}
            onInputChange={(ev, newInputValue) =>
              setVaylatInputValue(newInputValue)
            }
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
