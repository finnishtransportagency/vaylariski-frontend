import {
  Autocomplete,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  Grid,
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
import SelectedWayareaChangedContext from "../../contexts/SelectedWayareaChangedContext";
import AllGDOGIDSContext from "../../contexts/AllGDOGIDSContext";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";
import SelectedWayareaLoadedContext from "contexts/SelectedWayareaLoadedContext";

export default function GDOGIDMenuComponent(props) {
  const { name, formik } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(name);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { setSpinnerVisible } = useContext(SpinnerVisibilityContext);
  const { allGDOGIDs, setAllGDOGIDs } = useContext(AllGDOGIDSContext);
  const { selectedWayarea } = useContext(SelectedWayareaContext);
  const { selectedWayareaChanged, setSelectedWayareaChanged } = useContext(
    SelectedWayareaChangedContext
  );
  const { selectedGDOGIDString, setSelectedGDOGIDString } = useContext(
    SelectedGDOGIDContext
  );
  const { selectedWayareaWithNoGDOGID, setSelectedWayareaWithNoGDOGID } =
    useContext(SelectedWayareaWithNoGDOGIDContext);
  const [invalidFieldInput, setInvalidFieldInput] = useState(false);
  const { selectedWayareaLoaded, setSelectedWayareaLoaded } = useContext(
    SelectedWayareaLoadedContext
  );

  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };

  function setChosenGDOGIDFormikValue(gdo_gid) {
    setOneLastUsedParameter(
      formik.values,
      "navline.starting_gdo_gid",
      String(gdo_gid)
    );
    formik.setFieldValue("navline.starting_gdo_gid", String(gdo_gid));
  }
  useEffect(() => {
    if (selectedWayareaLoaded === 2) {
      handleInputChange(String(formik.values.navline.starting_gdo_gid));
      setSelectedWayareaLoaded(0);
    }
  }, [allGDOGIDs]);

  useEffect(() => {
    if (selectedWayarea && selectedWayareaChanged) {
      if (selectedWayareaLoaded !== 2) {
        setChosenGDOGIDFormikValue("");
      }
      setSelectedGDOGIDString("");
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
          setSelectedWayareaChanged(false);
        });
    }
  }, [selectedWayarea, selectedWayareaChanged]);

  const handleMenuItemClick = (event, newValue) => {
    setInvalidFieldInput(false);
    setChosenGDOGIDFormikValue(newValue || "");
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
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
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
                    Jotta voidaan laskea S-mutka, eli kahden peräkkäisen
                    erisuuntaisen mutkan välinen etäisyys, on annettava
                    GDO_GID:ien järjestämistä varten navigointilinjan
                    ensimmäinen GDO_GID. Esim. Oulun väylällä (100) ensimmäinen
                    GDO_GID on 227903 ja Turun väylällä (3255) ensimmäinen
                    GDO_GID on 204344.
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
          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
          >
            Ensimmäinen navigointilinjan tunnus (GDO_GID)
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
      </Grid>
    </Grid>
  );
}
