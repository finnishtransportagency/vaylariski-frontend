import {
  Autocomplete,
  TextField,
  Typography,
  Grid,
  Switch,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import Form from "react-bootstrap/Form";
import SelectedBoatContext from "contexts/SelectedBoatContext";
import userInputDefault from "constants/UserInputDefault";
import CustomNumber from "components/customInputs/CustomNumber";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";
import SelectedBoatLoadedContext from "contexts/SelectedBoatLoadedContext";

export default function BoatMenuComponent(props) {
  const formatInputString = (boat) =>
    boat
      ? `${boat.JNRO} - ${boat.VAY_NIMISU}, pituus: ${boat.PITUUS}, leveys: ${boat.LEVEYS},  syväys: ${boat.SYVAYS}`
      : "";

  const { formik } = props;
  const [defaultBoats, setDefaultBoats] = useState([]);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedBoat, setSelectedBoat } = useContext(SelectedBoatContext);
  const [boatInputString, setBoatInputString] = useState(
    formatInputString(selectedBoat)
  );
  const [showOld, setShowOld] = useState(false);
  const { selectedBoatLoaded, setSelectedBoatLoaded } = useContext(
    SelectedBoatLoadedContext
  );

  const loadBoat = (data) => {
    if (selectedBoatLoaded) {
      const sameBoat = (b) => {
        return (
          b.PITUUS === formik.values.boat.length &&
          b.LEVEYS === formik.values.boat.beam &&
          b.SYVAYS === formik.values.boat.draft
        );
      };
      const v = data.find((b) => sameBoat(b));
      setBoatInputString(formatInputString(v));
      setChosenBoatFormikValue(v);
      setSelectedBoat(v);
      // done
      setSelectedBoatLoaded(false);
    }
  };

  useEffect(() => {
    const path = "get_all_default_ships";
    apiClient
      .get(path)
      .then((response) => {
        setDefaultBoats(response.data);
        loadBoat(response.data);
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

  function handleMenuItemClick(event, newValue) {
    setChosenBoatFormikValue(newValue);
    setSelectedBoat(newValue);

    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setBoatInputString(newValue ? formatInputString(newValue) : "");
  }

  function setChosenBoatFormikValue(newBoat) {
    let boat;
    if (newBoat) {
      boat = {
        ...formik.values.boat,
        length: newBoat.PITUUS ? newBoat.PITUUS : "",
        beam: newBoat.LEVEYS ? newBoat.LEVEYS : "",
        draft: newBoat.SYVAYS ? newBoat.SYVAYS : "",
      };
    } else {
      boat = {
        ...formik.values.boat,
        length: userInputDefault.boat.length,
        beam: userInputDefault.boat.beam,
        draft: userInputDefault.boat.draft,
      };
    }
    formik.setValues({
      ...formik.values,
      boat,
    });
    setOneLastUsedParameter(formik.values, "boat", boat);
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
          <Form.Group>
            <Typography
              style={{ fontSize: 14 }}
              color="textSecondary"
              gutterBottom
            >
              Alus
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
        <CustomNumber
          formik={formik}
          formikName={"boat.length"}
          label={"Pituus (m)"}
          step={0.1}
        />
        <CustomNumber
          formik={formik}
          formikName={"boat.beam"}
          label={"Leveys (m)"}
          step={0.1}
        />
        <CustomNumber
          formik={formik}
          formikName={"boat.draft"}
          label={"Syväys (m)"}
          step={0.1}
        />
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
            <CustomNumber
              formik={formik}
              formikName="test"
              label={"Väylän tunnus"}
              value={selectedBoat?.["JNRO"] || ""}
              disabled={true}
            />
            <CustomNumber
              formik={formik}
              formikName="test"
              label={"Väylän nimi"}
              value={selectedBoat?.["VAY_NIMISU"] || ""}
              disabled={true}
            />
            <CustomNumber
              formik={formik}
              formikName="test"
              label={"Selite"}
              value={selectedBoat?.["SELITE"] || ""}
              disabled={true}
            />
            <CustomNumber
              formik={formik}
              formikName="test"
              label={"Koko"}
              value={selectedBoat?.["KOKO"] || ""}
              disabled={true}
            />
            <CustomNumber
              formik={formik}
              formikName="test"
              label={"Runko kerroin"}
              value={selectedBoat?.["RUNKO_TKERROIN"] || ""}
              disabled={true}
            />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}
