import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FieldArray } from "formik";
import PropTypes from "prop-types";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";
import { useContext, useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SBendIcon from "icons/SBendIcon";
import SBendIconSelected from "icons/SBendIconSelected";
import BendRadiusIcon from "icons/BendRadiusIcon";
import BendRadiusIconSelected from "icons/BendRadiusIconSelected";
import BendAngleIcon from "icons/BendAngleIcon";
import BendAngleIconSelected from "icons/BendAngleIconSelected";
import SelectedWayareaContext from "contexts/SelectedWayareaContext";
import apiClient from "http-common";

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

  const { selectedWayarea } = useContext(SelectedWayareaContext);
  const [selectedGDO_GIDs, setSelectedGDO_GIDs] = useState([]);

  const [textFieldHasContent, setTextFieldHasContent] = useState([]);
  const { selectedWayareaWithNoGDOGID, setSelectedWayareaWithNoGDOGID } =
    useContext(SelectedWayareaWithNoGDOGIDContext);
  const [allGDOGIDs, setAllGDOGIDs] = useState([]);

  const handleMenuItemClick = (event, newValue, index) => {
    formik.setFieldValue(`navline_angle_params.${index}.GDO_GID`, newValue);
    setSelectedGDO_GIDs((prevSelectedGDO_GIDs) => {
      const updatedSelectedGDO_GIDs = [...prevSelectedGDO_GIDs];
      updatedSelectedGDO_GIDs[index] = newValue;
      return updatedSelectedGDO_GIDs;
    });
  };
  const handleRemoveRow = (index) => {
    formik.setFieldValue(`navline_angle_params.${index}.GDO_GID`, null); // Reset the GDO_GID value
    setSelectedGDO_GIDs((prevSelectedGDO_GIDs) => {
      const updatedSelectedGDO_GIDs = [...prevSelectedGDO_GIDs];
      updatedSelectedGDO_GIDs[index] = null;
      return updatedSelectedGDO_GIDs;
    });
    formik.values.navline_angle_params.splice(index, 1); // Remove the row from formik values
    formik.setFieldValue("navline_angle_params", [
      ...formik.values.navline_angle_params,
    ]); // Update formik values
  };
  useEffect(() => {
    if (selectedWayarea) {
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
          } else setSelectedWayareaWithNoGDOGID(false);
          setAllGDOGIDs(response.data.GDO_GID);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedWayarea]);

  useEffect(() => {
    // Initialize the state with an array of objects, each representing a TextField
    setTextFieldHasContent(
      formik.values.navline_angle_params.map((el) => ({
        SADE: el.SADE !== "",
        BEND_ANGLE: el.BEND_ANGLE !== "",
        S_BEND: el.S_BEND !== "",
      }))
    );
  }, [formik.values.navline_angle_params]);

  // Function to handle text changes in the TextField and update the icon state
  const handleTextFieldChange = (index, fieldName, value) => {
    setTextFieldHasContent((prevTextFieldHasContent) => {
      const updatedTextFieldHasContent = [...prevTextFieldHasContent];
      updatedTextFieldHasContent[index][fieldName] = value !== "";
      return updatedTextFieldHasContent;
    });
  };
  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
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
                style={{ fontSize: 16 }}
                color="textSecondary"
                gutterBottom
              >
                Voit muokata laskentaa varten navigointilinjojen mutkan sädettä,
                suuntakulmaa ja/tai S-mutkan pituutta. Tee valitulle
                navigointilinjalle (GDO_GID) kaikki haluamasi muutokset samalle
                riville.
              </Typography>
              {tabValue === tabIndex && (
                <FieldArray name="navline_angle_params">
                  {({ remove, push }) => (
                    <div>
                      {formik.values.navline_angle_params.length > 0 &&
                        formik.values.navline_angle_params.map((el, index) => (
                          <Stack
                            direction="row"
                            spacing={1}
                            key={index}
                            paddingBottom={1}
                          >
                            <Grid>
                              <InputLabel style={{ fontSize: 14 }}>
                                GDO_GID
                              </InputLabel>
                              <Autocomplete
                                fullWidth
                                id={`navline_angle_params.${index}.GDO_GID`}
                                options={allGDOGIDs}
                                getOptionLabel={(option) =>
                                  option.toString() ?? ""
                                }
                                value={selectedGDO_GIDs[index] || null}
                                onChange={(ev, newValue) =>
                                  handleMenuItemClick(ev, newValue, index)
                                }
                                size="small"
                                renderInput={(params) => (
                                  <TextField
                                    required
                                    style={{
                                      width: 220,
                                    }}
                                    {...params}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid>
                              <InputLabel style={{ fontSize: 14 }}>
                                Säde
                              </InputLabel>

                              <TextField
                                fullWidth
                                InputProps={{ sx: { height: 40 } }}
                                name={`navline_angle_params.${index}.SADE`}
                                value={
                                  formik.values.navline_angle_params[index]
                                    ?.SADE || ""
                                }
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  handleTextFieldChange(
                                    index,
                                    "SADE",
                                    e.target.value
                                  );
                                }}
                                type="float"
                              />
                            </Grid>
                            {textFieldHasContent[index]?.SADE ? (
                              <BendRadiusIconSelected />
                            ) : (
                              <BendRadiusIcon />
                            )}
                            <Grid paddingLeft={5}>
                              <InputLabel style={{ fontSize: 14 }}>
                                Suuntakulma
                              </InputLabel>

                              <TextField
                                fullWidth
                                InputProps={{ sx: { height: 40 } }}
                                name={`navline_angle_params.${index}.BEND_ANGLE`}
                                value={
                                  formik.values.navline_angle_params[index]
                                    ?.BEND_ANGLE || ""
                                }
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  handleTextFieldChange(
                                    index,
                                    "BEND_ANGLE",
                                    e.target.value
                                  );
                                }}
                                type="float"
                              />
                            </Grid>
                            {textFieldHasContent[index]?.BEND_ANGLE ? (
                              <BendAngleIconSelected />
                            ) : (
                              <BendAngleIcon />
                            )}
                            <Grid paddingLeft={5}>
                              <InputLabel style={{ fontSize: 14 }}>
                                S-mutkan pituus
                              </InputLabel>

                              <TextField
                                fullWidth
                                InputProps={{ sx: { height: 40 } }}
                                name={`navline_angle_params.${index}.S_BEND`}
                                value={
                                  formik.values.navline_angle_params[index]
                                    ?.S_BEND || ""
                                }
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  handleTextFieldChange(
                                    index,
                                    "S_BEND",
                                    e.target.value
                                  );
                                }}
                                type="float"
                              />
                            </Grid>
                            {textFieldHasContent[index]?.S_BEND ? (
                              <SBendIconSelected />
                            ) : (
                              <SBendIcon />
                            )}
                            <Button
                              onClick={() => {
                                remove(index);
                                handleRemoveRow(index);
                              }}
                              style={{ marginTop: 12 }}
                            >
                              <RemoveCircleOutlineIcon style={{ margin: 3 }} />
                              Poista
                            </Button>
                          </Stack>
                        ))}
                      <Button
                        variant="contained"
                        style={{ marginBottom: 10 }}
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
      )}
    </div>
  );
}

UserDefinedAngleParamsComponent.propTypes = {
  formik: PropTypes.object,
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
};
