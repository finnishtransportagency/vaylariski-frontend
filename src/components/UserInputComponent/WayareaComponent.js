import {
  Autocomplete,
  TextField,
  Typography,
  Tooltip,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from "react-bootstrap/Form";
import SelectedWayareaContext from "contexts/SelectedWayareaContext";
import SelectedWayareaChangedContext from "../../contexts/SelectedWayareaChangedContext";

export default function WayareaComponent(props) {
  const formatInputString = (wayarea) =>
    wayarea ? `${wayarea.VAYLAT} - ${wayarea.Nimi}` : "";

  const { name, formik } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(name);
  const [allWayareas, setAllWayareas] = useState([]);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedWayarea, setSelectedWayarea } = useContext(
    SelectedWayareaContext
  );
  const { setSelectedWayareaChanged } = useContext(
    SelectedWayareaChangedContext
  );
  const [wayareaInputString, setWayareaInputString] = useState(
    formatInputString(selectedWayarea)
  );

  function setChosenWayareaFormikValue(wayarea) {
    formik.setFieldValue("vaylat", wayarea?.VAYLAT || "");
  }

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

  const handleWayareaInputStringChange = (value) => {
    setWayareaInputString(value);
    if (value === "") {
      setChosenWayareaFormikValue(null);
      setSelectedWayarea(null);
      setSelectedWayareaChanged(true);
    }
  };

  const handleMenuItemClick = (event, newValue) => {
    setChosenWayareaFormikValue(newValue);
    setSelectedWayarea(newValue);
    setSelectedWayareaChanged(true);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setWayareaInputString(newValue ? formatInputString(newValue) : "");
  };

  return (
    <Grid container spacing={1} paddingTop={2}>
      <Grid item xs={12}>
        <Form.Group>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 16, fontWeight: 550 }}
              color="textSecondary"
              gutterBottom
            >
              Valitse navigointilinja
            </Typography>
            <InputLabel style={{ fontSize: 14 }} id={"vaylat.id"}>
              VAYLAT id - nimi
            </InputLabel>
            <Tooltip
              placement="right"
              arrow
              title={!formik.dirty ? "VAYLAT id vaaditaan" : meta.error}
              id="wayarea-tooltip"
            >
              <Autocomplete
                id="vaylat"
                data-cy-id="vaylat.id"
                disablePortal
                options={allWayareas}
                getOptionLabel={(option) =>
                  option ? formatInputString(option) : ""
                }
                onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
                inputValue={wayareaInputString}
                onInputChange={(ev, newInputValue, reason) => {
                  if (reason === "input")
                    handleWayareaInputStringChange(newInputValue);
                }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    error={!!meta.error || !formik.dirty}
                    style={{ backgroundColor: "white" }}
                    {...params}
                    // required
                  />
                )}
              />
            </Tooltip>
          </Grid>
        </Form.Group>
      </Grid>
    </Grid>
  );
}
