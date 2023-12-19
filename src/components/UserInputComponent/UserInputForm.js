import { useContext, useState } from "react";
import { Button, Divider, Grid, Tooltip } from "@mui/material";
import { AiOutlineInfoCircle } from "react-icons/ai";
import BoatMenuComponent from "./Boat/BoatMenuComponent";
import WayareaComponent from "./WayareaComponent";
import BoatManoeuvrabilityComponent from "./Boat/BoatManoeuvrabilityComponent";
import PropTypes from "prop-types";
import GDOGIDMenuComponent from "./GDOGIDMenuComponent";
import SelectedWayareaWithNoGDOGIDContext from "contexts/SelectedWayareaWithNoGDOGIDContext";
import BoatSpeedComponent from "./Boat/BoatSpeedComponent";
import PFBendComponent from "./PFBend/PFBendComponent";
import WayareaParameterComponent from "./WayareaParameterComponent";
import WayareaDepthWFComponent from "./WayareaDepthWFComponent";
import WayareaConditionsComponent from "./WayareaConditions/WayareaConditionsComponent";
import WeightFactorsComponent from "./WeightFactorsComponent";
import TrafficFactorsComponent from "./TrafficFactorsComponent";
import ChannelEdgeAndBankClearanceComponent from "./ChannelEdgeAndBankClearanceComponent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RIVResultContext from "contexts/RIVResult";
import PreviousRIVResultsContext from "contexts/PreviousRIVResultsContext";
import ReittiviivaComponent from "./ReittiviivaComponent";
import FairwayWidth from "./FairwayWidth";
import ChooseCalculationType from "./ChooseCalculationType";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserInputForm(props) {
  const { tabValue, tabIndex, formik, ...other } = props;
  const [innerTabValue, setInnerTabValue] = useState(0);

  const { selectedWayareaWithNoGDOGID } = useContext(
    SelectedWayareaWithNoGDOGIDContext
  );
  const { RIVResults } = useContext(RIVResultContext);
  const { setPreviousRIVResults } = useContext(PreviousRIVResultsContext);

  const submitButtonClicked = () => {
    setPreviousRIVResults(RIVResults);
  };

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
      className="user-input-wrapper"
    >
      {tabValue === tabIndex && (
        <>
          <Tabs
            value={innerTabValue}
            onChange={(e, value) => setInnerTabValue(value)}
            aria-label="basic tabs example inner"
            className="inner-tabs"
            sx={{
              ".Mui-selected": {
                color: "var(--color-tab-text) !important",
                fontWeight: "bold !important",
              },
            }}
            TabIndicatorProps={{
              style: { background: "var(--color-background-white)" },
            }}
          >
            <Tab
              label="Väylä"
              {...a11yProps(0)}
              className={`inner-tab ${
                innerTabValue === 0 ? "inner-tab-active" : ""
              }`}
            />
            <Tab
              label="Alus"
              {...a11yProps(1)}
              className={`inner-tab ${
                innerTabValue === 1 ? "inner-tab-active" : ""
              }`}
            />
            <Tab
              label="Olosuhteet ja vaikuttavat tekijät"
              {...a11yProps(2)}
              className={`inner-tab ${
                innerTabValue === 2 ? "inner-tab-active" : ""
              }`}
            />
            <Tab
              label="Painokertoimet"
              {...a11yProps(3)}
              className={`inner-tab ${
                innerTabValue === 3 ? "inner-tab-active" : ""
              }`}
            />
          </Tabs>
          <Grid container spacing={1} className="user-input-grid">
            {innerTabValue === 0 && (
              <Grid item xs={12} className="user-input-grid-inner">
                <Grid xs={6} item>
                  <Grid
                    container
                    spacing={1}
                    paddingBottom={2}
                    paddingRight={2}
                    paddingLeft={2}
                  >
                    <ChooseCalculationType />
                    <WayareaComponent name="navline.VAYLAT" formik={formik} />
                    <GDOGIDMenuComponent
                      formik={formik}
                      name="navline.starting_gdo_gid"
                    />
                    <ReittiviivaComponent
                      name="routename"
                      formik={formik}
                    />
                    <FairwayWidth formik={formik} />
                  </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid xs={6} item>
                  <Grid
                    container
                    spacing={1}
                    paddingBottom={2}
                    paddingRight={2}
                    paddingLeft={2}
                  >
                    <WayareaParameterComponent formik={formik} />
                  </Grid>
                </Grid>
              </Grid>
            )}
            {innerTabValue === 1 && (
              <Grid item xs={12} className="user-input-grid-inner">
                <Grid xs={6} item>
                  <Grid
                    container
                    spacing={1}
                    paddingBottom={2}
                    paddingRight={1}
                    paddingLeft={2}
                  >
                    <BoatMenuComponent name="boat" formik={formik} />
                  </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid xs={6} item>
                  <Grid
                    container
                    spacing={1}
                    paddingBottom={2}
                    paddingRight={1}
                    paddingLeft={2}
                  >
                    <BoatManoeuvrabilityComponent formik={formik} />
                    <BoatSpeedComponent formik={formik} name="boat.speed" />
                  </Grid>
                </Grid>
              </Grid>
            )}
            {innerTabValue === 2 && (
              <Grid item xs={12} className="user-input-grid-inner">
                <Grid xs={6} item>
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
                <Divider orientation="vertical" flexItem />
                <Grid xs={6} item>
                  <Grid
                    container
                    spacing={1}
                    paddingBottom={2}
                    paddingRight={1}
                    paddingLeft={2}
                  >
                    <TrafficFactorsComponent formik={formik} />
                  </Grid>
                </Grid>
              </Grid>
            )}
            {innerTabValue === 3 && (
              <Grid item xs={12} className="user-input-grid-inner">
                <Grid xs={6} item>
                  <Grid
                    container
                    spacing={1}
                    paddingBottom={2}
                    paddingRight={1}
                    paddingLeft={2}
                  >
                    <WayareaDepthWFComponent formik={formik} />
                    <ChannelEdgeAndBankClearanceComponent formik={formik} />
                    <WeightFactorsComponent formik={formik} />
                  </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid xs={6} item>
                  <Grid
                    container
                    spacing={1}
                    paddingBottom={2}
                    paddingRight={1}
                    paddingLeft={2}
                  >
                    <PFBendComponent formik={formik} />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              placement="bottom"
              arrow
              id="submit-button-tooltip"
              // title={
              //   !(formik.isValid && formik.dirty) ||
              //   selectedWayareaWithNoGDOGID ? (
              //     <label style={{ fontSize: 14 }}>
              //       <span data-cy-id="submit-button-tooltip-span">
              //         Korjaa seuraavat asiat lähettääksesi arvot:
              //         <br />
              //         {!formik.dirty ? (
              //           <>
              //             - VAYLAT id vaaditaan
              //             <br />
              //           </>
              //         ) : (
              //           Object.values(formik.errors).map((obj) => {
              //             let msg = null;
              //             Object.values(obj).forEach((err_msg) => {
              //               msg = (
              //                 <span key={err_msg}>
              //                   - {err_msg}
              //                   <br />
              //                 </span>
              //               );
              //             });
              //             return msg;
              //           })
              //         )}
              //         {selectedWayareaWithNoGDOGID && (
              //           <>- Valitulle väylälle ei löydy navigointilinjoja</>
              //         )}
              //       </span>
              //     </label>
              //   ) : null
              // }
            >
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ minWidth: "1" }}
                  // disabled={
                  //   !(formik.isValid && formik.dirty) ||
                  //   selectedWayareaWithNoGDOGID
                  // } //formik.dirty is needed to disable on initial load
                  data-cy-id="submit-button"
                  onClick={submitButtonClicked}
                >
                  <span style={{ marginRight: "0.2em" }}>Lähetä</span>
                  {/* {!(formik.isValid && formik.dirty) ||
                  selectedWayareaWithNoGDOGID ? (
                    <AiOutlineInfoCircle data-cy-id="submit-disable-icon" />
                  ) : null} */}
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
