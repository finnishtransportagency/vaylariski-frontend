import {
  Autocomplete,
  TextField,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
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
  const { name, formik } = props;
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

  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  function setChosenGDOGIDFormikValue(gdo_gid) {
    if (gdo_gid) {
      formik.setFieldValue("navline.starting_gdo_gid", gdo_gid);
    } else {
      formik.setFieldValue("navline.starting_gdo_gid", "");
    }
  }

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
    setChosenGDOGIDFormikValue(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setSelectedGDOGIDString(newValue?.toString() ?? "");
  };

  const handleInputChange = (newValue) => {
    setSelectedGDOGIDString(newValue);

    if (allGDOGIDs.includes(Number(newValue)) || newValue === "") {
      setInvalidFieldInput(false);
      setChosenGDOGIDFormikValue(newValue);
    } else setInvalidFieldInput(true);
  };

  return (
    <Form.Group>
      <Typography
        style={{
          fontSize: 16,
          fontWeight: 550,
          verticalAlign: "middle",
        }}
        color="textSecondary"
        gutterBottom
        component="span"
      >
        S-mutkan laskenta
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            placement="right"
            arrow
            title={
              <label style={{ fontSize: 14 }}>
                Jos halutaan laskea s-mutkan suora, annetaan navigointilinjan
                ensimmäinen GDO_GID. Esim. Oulun väylällä (100) ensimmäinen
                GDO_GID on 227903 ja Turun väylällä (3255) ensimmäinen GDO_GID
                on 204344.
              </label>
            }
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <IconButton onClick={handleTooltipOpen}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      </Typography>
      <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
        Ensimmäinen navigointilinjan tunnus (GDO_GID):{" "}
      </Typography>
      <Tooltip
        placement="right"
        arrow
        id="gdo-gid-tooltip"
        title={
          meta.error
            ? meta.error //show meta.error
            : invalidFieldInput
            ? "Annettua arvoa ei löydy"
            : !selectedWayarea
            ? "Valitse ensin väylän tunnus" //no wayarea is selected
            : selectedWayareaWithNoGDOGID
            ? "Valitulle väylälle ei löydy tunnuksia" //wayarea with no GDOGIDs was selected
            : null
        }
      >
        <Autocomplete
          id="navline.starting_gdo_gid"
          data-cy-id="navline.starting_gdo_gid.id"
          disablePortal
          disabled={selectedWayareaWithNoGDOGID || !selectedWayarea}
          options={allGDOGIDs}
          getOptionLabel={(option) => option.toString() ?? ""}
          onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
          inputValue={selectedGDOGIDString}
          onInputChange={(ev, newInputValue, reason) => {
            if (reason === "input") handleInputChange(newInputValue);
          }}
          sx={{ width: "99%" }}
          size="small"
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
