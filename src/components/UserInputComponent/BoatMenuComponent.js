import {
  Autocomplete,
  TextField,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import { Field } from "formik";
import { useContext, useEffect, useState } from "react";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import Form from "react-bootstrap/Form";
import SelectedBoatContext from "contexts/SelectedBoatContext";

export default function BoatMenuComponent(props) {
  const { formik } = props;
  const [defaultBoats, setDefaultBoats] = useState([]);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedBoat, setSelectedBoat } = useContext(SelectedBoatContext);
  const [boatInputString, setBoatInputString] = useState("");

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
    props.setChosenBoatFormikValue(newValue);
    setSelectedBoat(newValue);
    // Ternary operator needed since when the user clears the field, this is run and newValue is null
    setBoatInputString(newValue ? formatInputString(newValue) : "");
  }

  return (
    <>
      <Grid container spacing={1} paddingBottom={2}>
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
              sx={{ width: "99%" }}
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
        <Grid item xs={3}>
          <label htmlFor="boat.length">Pituus (m):</label>
        </Grid>
        <Grid item xs={9}>
          <Tooltip placement="right" arrow title={formik.errors?.boat?.length}>
            <span>
              <Field
                className={formik.errors?.boat?.length && "has-error"}
                component="input"
                name="boat.length"
                type="number"
                required
                style={{
                  width: 100,
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <label htmlFor="boat.beam">Leveys (m):</label>
        </Grid>
        <Grid item xs={9}>
          <Tooltip placement="right" arrow title={formik.errors?.boat?.beam}>
            <span>
              <Field
                className={formik.errors?.boat?.beam && "has-error"}
                component="input"
                name="boat.beam"
                type="number"
                required
                style={{
                  width: 100,
                }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <label htmlFor="boat.draft">Syväys (m):</label>
        </Grid>
        <Grid item xs={9}>
          <Tooltip placement="right" arrow title={formik.errors?.boat?.draft}>
            <span>
              <Field
                className={formik.errors?.boat?.draft && "has-error"}
                component="input"
                name="boat.draft"
                type="number"
                required
                style={{
                  width: 100,
                }}
              />
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {/*Laivan tiedot*/}
        <Grid item>
          <Typography style={{ fontSize: 14 }}>
            Väylän tunnus: {selectedBoat ? selectedBoat["JNRO"] : ""}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: 14 }}>
            Väylän nimi: {selectedBoat ? selectedBoat["VAY_NIMISU"] : ""}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: 14 }}>
            Koko: {selectedBoat ? selectedBoat["KOKO"] : ""}
          </Typography>
        </Grid>
        {/* <Grid item>     EI YHTÄÄN ARVOA TÄLLE?!
         *    <Typography style={{ fontSize: 14 }}>
         *      RUNKO_TKERROIN: {selectedBoat ? selectedBoat.RUNKO_TKERROIN}
         *        : ""
         *    </Typography>
         *  </Grid>
         */}
        <Grid item>
          <Typography style={{ fontSize: 14 }}>
            Selite: {selectedBoat ? selectedBoat["SELITE"] : ""}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
