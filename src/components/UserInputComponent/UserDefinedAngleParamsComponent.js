import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Field, FieldArray } from "formik";
import PropTypes from "prop-types";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";
import { useContext, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SBendIcon from "icons/SBendIcon";
import SBendIconSelected from "icons/SBendIconSelected";
import BendRadiusIcon from "icons/BendRadiusIcon";
import BendRadiusIconSelected from "icons/BendRadiusIconSelected";
import BendAngleIcon from "icons/BendAngleIcon";
import BendAngleIconSelected from "icons/BendAngleIconSelected";
// import BendAngleIconSelected from "icons/BendAngleIconSelected";

{
  /* Käyttäjän voi halutessaan ylikirjottaa kannassa lasketut SADE, BEND_ANGLE, S_BEND arvot antamilleen navigointilinjoille (GDO_GID) */
}
export default function UserDefinedAngleParamsComponent(props) {
  const { tabValue, tabIndex, formik, ...other } = props;
  const newAngle = {
    GDO_GID: "",
    SADE: "",
    S_BEND: "",
    BEND_ANGLE: "",
  };
  const { selectedWayareaWithNoGDOGID } = useContext(
    SelectedWayareaWithNoGDOGIDContext
  );

  const [isSelected, setIsSelected] = useState(false);
  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <Grid container spacing={1} style={{ padding: 20 }}>
      <Grid item xs={12}>
        <div
          role="TabPanelComponent"
          hidden={tabValue !== tabIndex}
          id={`simple-tabpanel-${tabIndex}`}
          aria-labelledby={`simple-tab-${tabIndex}`}
          {...other}
        >
          <Typography
            style={{ fontSize: 16, margin: 5 }}
            color="textSecondary"
            gutterBottom
          >
            Voit muokata laskentaa varten haluamasi navigointilinjan mutkan
            sädettä, suuntakulmaa ja/tai S-mutkan pituutta. Tee valitulle
            navigointilinjalle (GDO_GID) kaikki haluamasi muutokset samalle
            riville. Kaikkia kenttiä ei ole kuitenkaan pakko täyttää. Voit
            muokata useampaa navigointilinjaa, mutta tällä hetkellä ohjelma ei
            hyväksy tyhjiä rivejä, joten ne tulee poistaa ennen lähettämistä.
          </Typography>

          {/* <Button onClick={handleButtonClick}>
            <Typography
              style={{ fontSize: 14, margin: 5 }}
              color="textSecondary"
              gutterBottom
            >
              Säde
            </Typography>
            {isSelected ? <BendRadiusIconSelected /> : <BendRadiusIcon />}
          </Button>
          <Button onClick={handleButtonClick}>
            <Typography
              style={{ fontSize: 14, margin: 5 }}
              color="textSecondary"
              gutterBottom
            >
              Suuntakulma
            </Typography>
            {isSelected ? <BendAngleIconSelected /> : <BendAngleIcon />}
          </Button>
          <Button onClick={handleButtonClick}>
            <Typography
              style={{ fontSize: 14, margin: 5 }}
              color="textSecondary"
              gutterBottom
            >
              S-mutka
            </Typography>
            {isSelected ? <SBendIconSelected /> : <SBendIcon />}
          </Button> */}
          {tabValue === tabIndex && (
            <FieldArray name="navline_angle_params">
              {({ remove, push }) => (
                <div>
                  {formik.values.navline_angle_params.length > 0 &&
                    formik.values.navline_angle_params.map((el, index) => (
                      <Stack direction="row" spacing={1} key={index}>
                        <Grid>
                          <InputLabel
                            style={{ fontSize: 14 }}
                            // id={"boat.length"}
                          >
                            GDO_GID
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="navline_angle_params.${index}.GDO_GID"
                            required
                            type="float"
                            InputProps={{ sx: { height: 30 } }}
                            inputProps={{
                              step: "0.1",
                            }}
                            value={formik.values.navline_angle_params.GDO_GID}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "navline_angle_params.${index}.GDO_GID",
                                e.target.value
                              );
                            }}
                          />
                        </Grid>
                        <Grid>
                          <InputLabel
                            style={{ fontSize: 14 }}
                            // id={"boat.length"}
                          >
                            Säde
                          </InputLabel>

                          <TextField
                            id={`navline_angle_params.${index}.SADE`}
                            type="float"
                            InputProps={{ sx: { height: 30 } }}
                            inputProps={{
                              step: "0.1",
                            }}
                          />
                        </Grid>
                        <Grid>
                          <InputLabel
                            style={{ fontSize: 14 }}
                            // id={"boat.length"}
                          >
                            Suuntakulma
                          </InputLabel>

                          <TextField
                            id={`navline_angle_params.${index}.BEND_ANGLE`}
                            type="float"
                            InputProps={{ sx: { height: 30 } }}
                            inputProps={{
                              step: "0.1",
                            }}
                          />
                        </Grid>
                        <Grid>
                          <InputLabel
                            style={{ fontSize: 14 }}
                            // id={"boat.length"}
                          >
                            S-mutkan pituus
                          </InputLabel>

                          <TextField
                            id={`navline_angle_params.${index}.S_BEND`}
                            type="float"
                            InputProps={{ sx: { height: 30 } }}
                            inputProps={{
                              step: "0.1",
                            }}
                          />
                        </Grid>
                        <Button
                          onClick={() => remove(index)}
                          style={{ marginTop: 12 }}
                        >
                          <RemoveCircleOutlineIcon style={{ margin: 3 }} />
                          Poista
                        </Button>
                      </Stack>
                    ))}
                  <Button
                    variant="contained"
                    style={{ marginBottom: 3 }}
                    onClick={() => push(newAngle)}
                  >
                    <AddCircleOutlineIcon style={{ marginRight: 3 }} />
                    Lisää uusi mutkan parametri
                  </Button>
                  <span>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ minWidth: "1" }}
                      style={{ marginTop: 3 }}
                      disabled={
                        !(formik.isValid && formik.dirty) ||
                        selectedWayareaWithNoGDOGID
                      } //formik.dirty is needed to disable on initial load
                      data-cy-id="submit-button"
                    >
                      <span style={{ marginRight: "0.2em" }}>Lähetä</span>
                      {!(formik.isValid && formik.dirty) ||
                      selectedWayareaWithNoGDOGID ? (
                        <AiOutlineInfoCircle data-cy-id="submit-disable-icon" />
                      ) : null}
                    </Button>
                  </span>
                </div>
              )}
            </FieldArray>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

UserDefinedAngleParamsComponent.propTypes = {
  formik: PropTypes.object,
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
};
