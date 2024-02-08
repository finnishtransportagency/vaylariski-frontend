import {
  Autocomplete,
  TextField,
  Typography,
  Tooltip,
  Grid,
  InputLabel,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from "react-bootstrap/Form";
import SelectedRoutelineContext from "contexts/SelectedRoutelineContext";
import SelectedRoutelineChangedContext from "../../contexts/SelectedRoutelineChangedContext";

export default function RoutelineComponent(props) {
  const formatInputString = (routeline) => (routeline ? `${routeline}` : "");

  const { name, formik } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(name);
  const [allRouteline, setAllRouteline] = useState([]);

  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedRouteline, setSelectedRouteline } = useContext(
    SelectedRoutelineContext
  );
  const { setSelectedRoutelineChanged } = useContext(
    SelectedRoutelineChangedContext
  );
  const [routelineInputString, setRoutelineInputString] = useState(
    formatInputString(selectedRouteline)
  );

  function setChosenRoutelineFormikValue(value) {
    formik.setFieldValue("routename", value || "");
  }

  useEffect(() => {
    const path = "routeline/routeline_names";
    apiClient
      .get(path)
      .then((response) => setAllRouteline(response.data))
      .catch((err) => {
        console.log(err);
        setNotificationStatus({
          severity: "error",
          message: err.message,
          visible: true,
        });
      });
  }, []);

  const handleRoutelineInputStringChange = (value) => {
    setRoutelineInputString(value);
    if (value === "") {
      setChosenRoutelineFormikValue(null);
      setSelectedRouteline(null);
      setSelectedRoutelineChanged(true);
    }
  };

  const handleMenuItemClick = (event, newValue) => {
    setChosenRoutelineFormikValue(newValue);
    setSelectedRouteline(newValue);
    setSelectedRoutelineChanged(true);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setRoutelineInputString(newValue ? formatInputString(newValue) : "");
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
              Valitse reitti
            </Typography>
            <InputLabel style={{ fontSize: 14 }} id={"routename.id"}>
              Reitin nimi
            </InputLabel>
            <Tooltip
              placement="right"
              arrow
              title={!formik.dirty ? "Reitti vaaditaan" : meta.error}
              id="routeline-tooltip"
            >
              <Autocomplete
                id="routename"
                data-cy-id="routename.id"
                disablePortal
                options={allRouteline}
                getOptionLabel={(option) =>
                  option ? formatInputString(option) : ""
                }
                onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
                inputValue={routelineInputString}
                onInputChange={(ev, newInputValue, reason) => {
                  if (reason === "input")
                    handleRoutelineInputStringChange(newInputValue);
                }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    error={!!meta.error || !formik.dirty}
                    style={{ backgroundColor: "white" }}
                    {...params}
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
