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
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import { useField } from "formik";
import Form from "react-bootstrap/Form";
import SelectedWayareaContext from "contexts/SelectedWayareaContext";

export default function WayareaComponent(props) {
  const { name, formik } = props;
  const [field, meta] = useField(name);
  const [allWayareas, setAllWayareas] = useState([]);
  const [open, setOpen] = useState(false);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { setSelectedWayarea } = useContext(SelectedWayareaContext);
  const [wayareaInputString, setWayareaInputString] = useState("");
  const [calculationInterval, setCalculationInterval] = useState(10);
  const calculationIntervalOptions = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 250, 500, 750, 1000,
  ];

  function setChosenWayareaFormikValue(wayarea) {
    formik.setFieldValue("navline.VAYLAT", wayarea?.VAYLAT || "");
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

  const handleChange = (event) => {
    setCalculationInterval(event.target.value);
    formik.setFieldValue("calculation_interval", event.target.value);
  };
  const MenuOptions = () => {
    return calculationIntervalOptions.map((e) => (
      <MenuItem key={e} value={e}>
        {e}
      </MenuItem>
    ));
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };

  const formatInputString = (wayarea) => `${wayarea.VAYLAT} - ${wayarea.Nimi}`;

  const handleMenuItemClick = (event, newValue) => {
    setChosenWayareaFormikValue(newValue);
    setSelectedWayarea(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setWayareaInputString(newValue ? formatInputString(newValue) : "");
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
              Valitse väylä
            </Typography>
            <InputLabel style={{ fontSize: 14 }} id={"navline.VAYLAT.id"}>
              VAYLAT id/nimi
            </InputLabel>
            <Tooltip
              placement="right"
              arrow
              title={meta.error}
              id="wayarea-tooltip"
            >
              <Autocomplete
                id="navline.VAYLAT"
                data-cy-id="navline.VAYLAT.id"
                disablePortal
                options={allWayareas}
                getOptionLabel={(option) =>
                  option ? formatInputString(option) : ""
                }
                onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
                inputValue={wayareaInputString}
                onInputChange={(ev, newInputValue, reason) => {
                  if (reason === "input") setWayareaInputString(newInputValue);
                }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    error={!!meta.error}
                    style={{ backgroundColor: "white" }}
                    {...params}
                    required
                  />
                )}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Typography
              id={"calculation_interval"}
              component="span"
              style={{
                fontSize: 14,
                verticalAlign: "middle",
              }}
              color="textSecondary"
            >
              Pisteiden väli (m)
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  placement="right"
                  arrow
                  title={
                    <label style={{ fontSize: 14 }}>
                      Valitse laskentapisteiden välinen etäisyys
                      navigointilinjalla. Oletusarvo on 10 m.
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
            <Select
              required
              size={"small"}
              sx={{ width: "100%", height: 40 }}
              style={{ backgroundColor: "white" }}
              id={"calculation_interval"}
              value={calculationInterval}
              onChange={handleChange}
            >
              {MenuOptions()}
            </Select>
          </Grid>
        </Form.Group>
      </Grid>
    </Grid>
  );
}
