import {
  Autocomplete,
  TextField,
  Typography,
  Grid,
  Tooltip,
  InputLabel,
  Switch,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import Form from "react-bootstrap/Form";
import SelectedBoatContext from "contexts/SelectedBoatContext";
import userInputDefault from "constants/UserInputDefault";

export default function BoatMenuComponent(props) {
  const { formik } = props;
  const [defaultBoats, setDefaultBoats] = useState([]);
  const [length, setLength] = useState(formik.values.boat.length);
  const [beam, setBeam] = useState(formik.values.boat.beam);
  const [draft, setDraft] = useState(formik.values.boat.draft);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedBoat, setSelectedBoat } = useContext(SelectedBoatContext);
  const [boatInputString, setBoatInputString] = useState("");
  const [showOld, setShowOld] = useState(false);

  useEffect(() => {
    const path = "get_all_default_ships";
    apiClient
      .get(path)
      .then((response) => setDefaultBoats(response.data))
      .catch((err) => {
        console.log(err);
        setNotificationStatus({
          severity: "error",
          message: err.message,
          visible: true,
        });
      });
  }, []);

  const formatInputString = (boat) =>
    `${boat.JNRO} - ${boat.VAY_NIMISU}, pituus: ${boat.PITUUS}, leveys: ${boat.LEVEYS},  syväys: ${boat.SYVAYS}`;

  function handleMenuItemClick(event, newValue) {
    // Calls parent component's (UserInputForm) function with new boat
    setChosenBoatFormikValue(newValue);
    setSelectedBoat(newValue);
    if (newValue) {
      setLength(newValue.PITUUS ? newValue.PITUUS : "");
      setBeam(newValue.LEVEYS ? newValue.LEVEYS : "");
      setDraft(newValue.SYVAYS ? newValue.SYVAYS : "");
    } else {
      setLength(userInputDefault.boat.length);
      setBeam(userInputDefault.boat.beam);
      setDraft(userInputDefault.boat.draft);
    }

    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setBoatInputString(newValue ? formatInputString(newValue) : "");
  }

  function setChosenBoatFormikValue(newBoat) {
    if (newBoat) {
      formik.setValues({
        ...formik.values,
        boat: {
          ...formik.values.boat,
          length: newBoat.PITUUS ? newBoat.PITUUS : "",
          beam: newBoat.LEVEYS ? newBoat.LEVEYS : "",
          draft: newBoat.SYVAYS ? newBoat.SYVAYS : "",
        },
      });
    } else {
      formik.setValues({
        ...formik.values,
        boat: {
          ...formik.values.boat,
          length: userInputDefault.boat.length,
          beam: userInputDefault.boat.beam,
          draft: userInputDefault.boat.draft,
        },
      });
    }
  }

  return (
    <>
      <Grid container paddingBottom={2}>
        <Grid item xs={12}>
          <Typography
            style={{ fontSize: 16, fontWeight: 550 }}
            color="textSecondary"
            gutterBottom
          >
            Valitse alus
          </Typography>
          {/* Menu selector for default boat values */}
          <Form.Group>
            <Typography
              style={{ fontSize: 14 }}
              color="textSecondary"
              gutterBottom
            >
              Alus:{" "}
            </Typography>
            <Autocomplete
              id="boat"
              disablePortal
              options={defaultBoats}
              getOptionLabel={(option) =>
                option ? formatInputString(option) : ""
              }
              onChange={(ev, newValue) => handleMenuItemClick(ev, newValue)}
              inputValue={boatInputString}
              onInputChange={(ev, newInputValue, reason) => {
                if (reason === "input") setBoatInputString(newInputValue);
              }}
              size="small"
              renderInput={(params) => (
                <TextField style={{ backgroundColor: "white" }} {...params} />
              )}
            />
          </Form.Group>
        </Grid>
      </Grid>
      <Grid container spacing={1} paddingBottom={2}>
        {/* Laivan koko*/}
        <Grid item xs={4}>
          <InputLabel style={{ fontSize: 14 }} id={"boat.length"}>
            Pituus (m):
          </InputLabel>
          <Tooltip placement="right" arrow title={formik.errors?.boat?.length}>
            <span>
              <TextField
                id="boat.length"
                error={!!formik.errors?.boat?.length}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.1",
                }}
                type="number"
                value={length}
                onChange={(e) => {
                  setLength(String(e.target.value));
                  formik.setFieldValue("boat.length", Number(e.target.value));
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <InputLabel style={{ fontSize: 14 }} id={"boat.beam"}>
            Leveys (m):
          </InputLabel>
          <Tooltip placement="right" arrow title={formik.errors?.boat?.beam}>
            <span>
              <TextField
                id="boat.beam"
                error={!!formik.errors?.boat?.beam}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.1",
                }}
                type="number"
                value={beam}
                onChange={(e) => {
                  setBeam(String(e.target.value));
                  formik.setFieldValue("boat.beam", Number(e.target.value));
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <InputLabel style={{ fontSize: 14 }} id={"boat.draft"}>
            Syväys (m):
          </InputLabel>
          <Tooltip placement="right" arrow title={formik.errors?.boat?.draft}>
            <span>
              <TextField
                id="boat.draft"
                error={!!formik.errors?.boat?.draft}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{
                  step: "0.1",
                }}
                type="number"
                value={draft}
                onChange={(e) => {
                  setDraft(String(e.target.value));
                  formik.setFieldValue("boat.draft", Number(e.target.value));
                }}
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid paddingBottom={2}>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 275,
            verticalAlign: "middle",
          }}
          color="textSecondary"
          gutterBottom
        >
          Näytä aluksen lisätiedot
          <Switch
            size="small"
            checked={showOld}
            onChange={(e) => setShowOld(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Typography>
        {showOld ? (
          <Grid container spacing={1}>
            {/*Laivan tiedot*/}
            <Grid item xs={4}>
              <InputLabel style={{ fontSize: 14 }} id={"Väylän_tunnus"}>
                Väylän tunnus:
              </InputLabel>
              <TextField
                id="Väylän_tunnus"
                InputProps={{ sx: { height: 30 } }}
                value={selectedBoat?.["JNRO"] || ""}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel style={{ fontSize: 14 }} id={"Väylän_nimi"}>
                Väylän nimi:
              </InputLabel>
              <TextField
                id="Väylän_nimi"
                InputProps={{ sx: { height: 30 } }}
                value={selectedBoat?.["VAY_NIMISU"] || ""}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel style={{ fontSize: 14 }} id={"Selite"}>
                Selite:
              </InputLabel>
              <TextField
                id="Selite"
                InputProps={{ sx: { height: 30 } }}
                value={selectedBoat?.["SELITE"] || ""}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel style={{ fontSize: 14 }} id={"Koko"}>
                Koko:
              </InputLabel>
              <TextField
                id="Koko"
                InputProps={{ sx: { height: 30 } }}
                value={selectedBoat?.["KOKO"] || ""}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel style={{ fontSize: 14 }} id={"Runko_kerroin"}>
                Runko kerroin:
              </InputLabel>
              <TextField
                id="Runko_kerroin"
                InputProps={{ sx: { height: 30 } }}
                value={selectedBoat?.["RUNKO_TKERROIN"] || ""}
                disabled
              />
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}
