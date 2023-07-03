import { Autocomplete, TextField, Typography, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from "react-bootstrap/Form";
import SelectedWayareaContext from "contexts/SelectedWayareaContext";
import SelectedGDOGIDContext from "contexts/SelectedGDOGIDContext";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";

export default function GDOGIDMenuComponent(props) {
  const { name } = props;
  const [field, meta] = useField(name);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { setSpinnerVisible } = useContext(SpinnerVisibilityContext);
  const [allGDOGIDs, setAllGDOGIDs] = useState([]);
  const { selectedWayarea } = useContext(SelectedWayareaContext);
  const { selectedGDOGIDString, setSelectedGDOGIDString } = useContext(
    SelectedGDOGIDContext
  );
  const { selectedWayareaWithNoGDOGID, setSelectedWayareaWithNoGDOGID } =
    useContext(SelectedWayareaWithNoGDOGIDContext);
  const [invalidFieldInput, setInvalidFieldInput] = useState(false);

  useEffect(() => {
    props.setChosenGDOGIDFormikValue();
    setSelectedGDOGIDString("");
    if (selectedWayarea) {
      setSpinnerVisible(true);

      const path = "gdo_gids_for_vaylat";
      apiClient
        .get(path, {
          params: {
            VAYLAT: selectedWayarea.VAYLAT,
          },
        })
        .then((response) => {
          if (!response.data.GDO_GID.length) {
            setSelectedWayareaWithNoGDOGID(true);
            setNotificationStatus({
              severity: "info",
              message: `Navigointilinjan tunnusta ei löytynyt valitulle väylälle id:llä ${selectedWayarea.VAYLAT}`,
              visible: true,
            });
          } else setSelectedWayareaWithNoGDOGID(false);
          setAllGDOGIDs(response.data.GDO_GID);
        })
        .catch((err) => {
          console.log(err);
          setNotificationStatus({
            severity: "error",
            message: err.message,
            visible: true,
          });
        })
        .finally(() => {
          setSpinnerVisible(false);
        });
    }
  }, [selectedWayarea]);

  const handleMenuItemClick = (event, newValue) => {
    props.setChosenGDOGIDFormikValue(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setSelectedGDOGIDString(newValue?.toString() ?? "");
  };

  const handleInputChange = (newValue) => {
    setSelectedGDOGIDString(newValue);

    if (allGDOGIDs.includes(Number(newValue)) || newValue === "") {
      setInvalidFieldInput(false);
      props.setChosenGDOGIDFormikValue(newValue);
    } else setInvalidFieldInput(true);
  };

  return (
    <Form.Group>
      <Typography
        style={{ fontSize: 16, fontWeight: 550 }}
        color="textSecondary"
        gutterBottom
      >
        S-mutkan laskenta{" "}
      </Typography>
      <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
        Ensimmäinen navigointilinjan tunnus (GDO_GID):{" "}
      </Typography>
      <Tooltip
        placement="right"
        arrow
        title={
          meta.error
            ? meta.error //show meta.error
            : invalidFieldInput
            ? "Annettu arvo ei ole osaa valikoimaa"
            : !selectedWayarea
            ? "Valitse väylä ensin" //no wayarea is selected
            : selectedWayareaWithNoGDOGID
            ? "Valitulle väylälle ei ole tunnuksia" //wayarea with no GDOGIDs was selected
            : null
        }
      >
        <Autocomplete
          id="navline.starting_gdo_gid"
          disablePortal
          disabled={selectedWayareaWithNoGDOGID || !selectedWayarea}
          options={allGDOGIDs}
          getOptionLabel={(option) => option.toString() ?? ""}
          onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
          inputValue={selectedGDOGIDString}
          onInputChange={(ev, newInputValue, reason) => {
            if (reason === "input") handleInputChange(newInputValue);
          }}
          sx={{ width: 350 }}
          renderInput={(params) => (
            <TextField
              error={!!meta.error || invalidFieldInput}
              type="number"
              style={{ backgroundColor: "white" }}
              {...params}
            ></TextField>
          )}
        />
      </Tooltip>
    </Form.Group>
  );
}
