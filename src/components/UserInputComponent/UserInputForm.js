import { useContext } from "react";
import { Button, Divider, Grid, Tooltip } from "@mui/material";
import { AiOutlineInfoCircle } from "react-icons/ai";
import BoatMenuComponent from "./BoatMenuComponent";
import WayareaComponent from "./WayareaComponent";
import BoatManoeuvrabilityComponent from "./BoatManoeuvrabilityComponent";
import PropTypes from "prop-types";
import GDOGIDMenuComponent from "./GDOGIDMenuComponent";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";
import BoatSpeedComponent from "./BoatSpeedComponent";
import PFBendComponent from "./PFBend/PFBendComponent";
import WayareaParameterComponent from "./WayareaParameterComponent";
import WayareaDepthWFComponent from "./WayareaDepthWFComponent";
import WayareaConditionsComponent from "./WayareaConditionsComponent";
import WeightFactorsComponent from "./WeightFactorsComponent";
import TrafficFactorsComponent from "./TrafficFactorsComponent";
import ChannelEdgeAndBankClearanceComponent from "./ChannelEdgeAndBankClearanceComponent";

function UserInputForm(props) {
  const { tabValue, tabIndex, formik, ...other } = props;

  const { selectedWayareaWithNoGDOGID } = useContext(
    SelectedWayareaWithNoGDOGIDContext
  );

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <>
          <Grid container spacing={1} style={{ padding: 20 }}>
            <Grid item xs={3.99}>
              <Grid
                container
                spacing={1}
                paddingBottom={2}
                paddingRight={2}
                paddingLeft={2}
              >
                <WayareaComponent name="navline.VAYLAT" formik={formik} />
                <GDOGIDMenuComponent
                  formik={formik}
                  name="navline.starting_gdo_gid"
                />
                <BoatMenuComponent name="boat" formik={formik} />
                <BoatManoeuvrabilityComponent formik={formik} />
                <BoatSpeedComponent formik={formik} name="boat.speed" />
                <PFBendComponent formik={formik} />
              </Grid>
            </Grid>

            <Divider orientation="vertical" flexItem></Divider>
            <Grid item xs={3.99}>
              <Grid
                container
                spacing={1}
                paddingBottom={2}
                paddingRight={1}
                paddingLeft={2}
              >
                <WayareaParameterComponent formik={formik} />
                <WayareaDepthWFComponent formik={formik} />
                <ChannelEdgeAndBankClearanceComponent formik={formik} />
                <TrafficFactorsComponent formik={formik} />
                <WeightFactorsComponent formik={formik} />
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item xs={3.99}>
              <Grid
                container
                spacing={1}
                paddingBottom={2}
                paddingRight={1}
                paddingLeft={2}
              >
                <WayareaConditionsComponent formik={formik} />
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              placement="bottom"
              arrow
              id="submit-button-tooltip"
              title={
                !(formik.isValid && formik.dirty) ||
                selectedWayareaWithNoGDOGID ? (
                  <label style={{ fontSize: 14 }}>
                    <span data-cy-id="submit-button-tooltip-span">
                      Korjaa seuraavat asiat lähettääksesi arvot:
                      <br />
                      {!formik.dirty ? (
                        <>
                          - VAYLAT id vaaditaan
                          <br />
                        </>
                      ) : (
                        Object.values(formik.errors).map((obj) => {
                          let msg = null;
                          Object.values(obj).forEach((err_msg) => {
                            msg = (
                              <span key={err_msg}>
                                - {err_msg}
                                <br />
                              </span>
                            );
                          });
                          return msg;
                        })
                      )}
                      {selectedWayareaWithNoGDOGID && (
                        <>- Valitulle väylälle ei löydy navigointilinjoja</>
                      )}
                    </span>
                  </label>
                ) : null
              }
            >
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ minWidth: "1" }}
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
            </Tooltip>
          </Grid>
        </>
      )}
    </div>
  );
}

export default UserInputForm;
UserInputForm.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
  formik: PropTypes.object,
};
