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
import SelectedRoutelineLoadedContext from "contexts/SelectedRoutelineLoadedContext";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";

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
  const { selectedRoutelineLoaded, setSelectedRoutelineLoaded } = useContext(
    SelectedRoutelineLoadedContext
  );

  const loadRoute = (data) => {
    if (selectedRoutelineLoaded) {
      const v = data.find((r) => r === formik.values.routename);
      setRoutelineInputString(formatInputString(v));
      if (v) {
        // wayarea was loaded and found -> setting imput fields
        setSelectedRouteline(v);
        setChosenRoutelineFormikValue(v);
      } else {
        // was loaded to null/"", or not found -> set imput fields to empty
        setSelectedRouteline(null);
        setChosenRoutelineFormikValue(null);
      }
      // done
      setSelectedRoutelineLoaded(false);
    }
  };

  function setChosenRoutelineFormikValue(value) {
    setOneLastUsedParameter(formik.values, "routename", value || "");
    formik.setFieldValue("routename", value || "");
  }

  useEffect(() => {
    const path = "routeline/routeline_names";
    apiClient
      .get(path)
      .then((response) => {
        setAllRouteline(response.data);
        loadRoute(response.data);
      })
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
    }
  };

  const handleMenuItemClick = (event, newValue) => {
    setChosenRoutelineFormikValue(newValue);
    setSelectedRouteline(newValue);
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
              title={!formik.values.routename ? "Reitti vaaditaan" : meta.error}
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
                    error={!!meta.error || !formik.values.routename}
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
