import { useContext, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserInputForm from "./UserInputComponent/UserInputForm";
import UserDefinedAngleParamsComponent from "./UserInputComponent/UserDefinedAngleParamsComponent";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import RIVResultContext from "contexts/RIVResult";
import NotificationContext from "contexts/NotificationContext";
import UserInputContext from "contexts/UserInput";
import apiClient from "http-common";
import { Formik } from "formik";
import { Form as FForm } from "formik";
import WayareaPolygonContext from "contexts/WayareaPolygonContext";
import parametersValidationSchema from "constants/ParametersValidationSchema";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ParameterTabsComponent() {
  const [value, setValue] = useState(0);
  const { setSpinnerVisible } = useContext(SpinnerVisibilityContext);
  const { userInput } = useContext(UserInputContext);
  const { setRIVResults } = useContext(RIVResultContext);
  const { setNotificationStatus } = useContext(NotificationContext);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setWayareaPolygons } = useContext(WayareaPolygonContext);

  const fetchRiskValue = async (values) => {
    const path = `fairway/calculate_risk?VAYLAT=${values.navline.VAYLAT}`;
    const path_wayarea = "wayarea";
    // Set spinner
    setSpinnerVisible(true);
    // Empty previous results
    setRIVResults([]);
    setWayareaPolygons([]);
    try {
      const [response, response_wayarea] = await Promise.all([
        apiClient.post(path, values),
        apiClient.get(path_wayarea, {
          params: { VAYLAT: values.navline.VAYLAT },
        }),
      ]);
      setRIVResults(response.data);
      setWayareaPolygons(response_wayarea.data);
    } catch (err) {
      console.log(err);
      setNotificationStatus({
        severity: "error",
        message: err.response.data.detail,
        visible: true,
      });
    } finally {
      setSpinnerVisible(false);
    }
  };

  return (
    <Box className="main-tab-wrapper">
      <Box
        style={{
          paddingBottom: 0,
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          className="main-tabs"
          sx={{
            ".Mui-selected": {
              color: "var(--color-tab-text) !important",
              fontWeight: "bold !important",
            },
          }}
          TabIndicatorProps={{
            style: { background: "var(--color-container)" },
          }}
          variant="scrollable"
        >
          <Tab
            label="Parametrit"
            {...a11yProps(0)}
            className={`main-tab ${value === 0 ? "main-tab-active" : ""}`}
          />
          <Tab
            label="Navigointilinjojen valinnaiset parametrit"
            {...a11yProps(1)}
            className={`main-tab ${value === 1 ? "main-tab-active" : ""}`}
          />
        </Tabs>
        {/* <Tab label="Lisää uusi mitoitusalus kantaan" {...a11yProps(2)} /> */}
      </Box>
      <Formik
        onSubmit={(values) => {
          fetchRiskValue(values);
        }}
        initialValues={userInput}
        validationSchema={parametersValidationSchema}
      >
        {(formik) => (
          <FForm className="main-tab-formik">
            <div className="main-tab-container">
              <div className="main-tab-content">
                <UserInputForm tabValue={value} tabIndex={0} formik={formik} />
                <UserDefinedAngleParamsComponent
                  tabValue={value}
                  tabIndex={1}
                  formik={formik}
                />
              </div>
            </div>
          </FForm>
        )}
      </Formik>
      {/* <InsertNewBulkBoatView tabValue={value} tabIndex={2} /> */}
    </Box>
  );
}
