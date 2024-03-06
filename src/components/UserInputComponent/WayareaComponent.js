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
import SelectedWayareaContext from "contexts/SelectedWayareaContext";
import SelectedWayareaChangedContext from "../../contexts/SelectedWayareaChangedContext";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";
import SelectedWayareaLoadedContext from "contexts/SelectedWayareaLoadedContext";

export default function WayareaComponent(props) {
  const formatInputString = (wayarea) =>
    wayarea ? `${wayarea.VAYLAT} - ${wayarea.NIMIFI}` : "";

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
  const { selectedWayareaLoaded, setSelectedWayareaLoaded } = useContext(
    SelectedWayareaLoadedContext
  );

  const loadWayarea = (data) => {
    if (selectedWayareaLoaded === 1) {
      const v = data.find((v) => v.VAYLAT == formik.values.vaylat);
      setWayareaInputString(formatInputString(v));
      if (v) {
        // wayarea was loaded and found -> setting imput fields
        setSelectedWayarea(v);
        setChosenWayareaFormikValue(v);
      } else {
        // was loaded to null/"", or not found -> set imput fields to empty
        setSelectedWayarea(null);
        setChosenWayareaFormikValue(null);
      }
      //both cases changes the field
      setSelectedWayareaChanged(true);

      // proceed load GDIOOGID
      setSelectedWayareaLoaded(2);
    }
  };

  function setChosenWayareaFormikValue(wayarea) {
    const value = wayarea?.VAYLAT || "";
    setOneLastUsedParameter(formik.values, "vaylat", value);
    formik.setFieldValue("vaylat", value);
  }

  useEffect(() => {
    const path = "wayarea_names";
    apiClient
      .get(path)
      .then((response) => {
        setAllWayareas(response.data);
        loadWayarea(response.data);
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
              title={!formik.values.vaylat ? "VAYLAT id vaaditaan" : meta.error}
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
                    error={!!meta.error || !formik.values.vaylat}
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
