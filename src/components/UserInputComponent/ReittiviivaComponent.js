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
import SelectedReittiviivaContext from "contexts/SelectedReittiviivaContext";
import SelectedReittiviivaChangedContext from "../../contexts/SelectedReittiviivaChangedContext";

export default function ReittiviivaComponent(props) {
  const formatInputString = (reittiviiva) =>
    reittiviiva ? `${reittiviiva}` : "";

  const { name, formik } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(name);
  const [allReittiviiva, setAllReittiviiva] = useState([]);

  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedReittiviiva, setSelectedReittiviiva } = useContext(
    SelectedReittiviivaContext
  );
  const { setSelectedReittiviivaChanged } = useContext(
    SelectedReittiviivaChangedContext
  );
  const [reittiviivaInputString, setReittiviivaInputString] = useState(
    formatInputString(selectedReittiviiva)
  );

  useEffect(() => {console.log(reittiviivaInputString)}, [reittiviivaInputString])

  function setChosenReittiviivaFormikValue(value) {
    formik.setFieldValue("routename", value || "");
  }

  useEffect(() => {
    const path = "reittiviiva/reittiviiva_names";
    apiClient
      .get(path)
      .then((response) => setAllReittiviiva(response.data))
      .catch((err) => {
        console.log(err);
        setNotificationStatus({
          severity: "error",
          message: err.message,
          visible: true,
        });
      });
  }, []);

  const handleReittiviivaInputStringChange = (value) => {
    setReittiviivaInputString(value);
    if (value === "") {
      setChosenReittiviivaFormikValue(null);
      setSelectedReittiviiva(null);
      setSelectedReittiviivaChanged(true);
    }
  };

  const handleMenuItemClick = (event, newValue) => {
    console.log("newValue", newValue)
    setChosenReittiviivaFormikValue(newValue);
    setSelectedReittiviiva(newValue);
    setSelectedReittiviivaChanged(true);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setReittiviivaInputString(newValue ? formatInputString(newValue) : "");
  };

  return (
    <Grid container spacing={1} paddingBottom={2}>
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
            {/* <Tooltip
              placement="right"
              arrow
              title={!formik.dirty ? "Reitti vaaditaan" : meta.error}
              id="reittiviiva-tooltip"
            > */}
            <Autocomplete
              id="routename"
              data-cy-id="routename.id"
              disablePortal
              options={allReittiviiva}
              getOptionLabel={(option) =>
                option ? formatInputString(option) : ""
              }
              onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
              inputValue={reittiviivaInputString}
              onInputChange={(ev, newInputValue, reason) => {
                if (reason === "input")
                  handleReittiviivaInputStringChange(newInputValue);
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
            {/* </Tooltip> */}
          </Grid>
        </Form.Group>
      </Grid>
    </Grid>
  );
}
