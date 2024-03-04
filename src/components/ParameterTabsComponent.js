import { useContext, useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserInputForm from "./UserInputComponent/UserInputForm";
import SelectedRoutelineContext from "contexts/SelectedRoutelineContext";
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
import SelectedCalculationTypeContext from "contexts/SelectedCalculationTypeContext";
import { calculationTypeEnums } from "constants/enums";
import DefaultParametersComponent from "./UserInputComponent/DefaultParametersComponent";
import {
  getLastUsedParameters,
  setAllLastUsedParameters,
} from "utils/browserStorageHelpers";
import userInputDefault from "constants/UserInputDefault";
import SelectedWayareaLoadedContext from "contexts/SelectedWayareaLoadedContext";
import SelectedRoutelineLoadedContext from "contexts/SelectedRoutelineLoadedContext";
import SelectedBoatLoadedContext from "contexts/SelectedBoatLoadedContext";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ParameterTabsComponent() {
  const [value, setValue] = useState(0);
  const { setSpinnerVisible } = useContext(SpinnerVisibilityContext);
  const { userInput, setUserInput } = useContext(UserInputContext);
  const { setRIVResults } = useContext(RIVResultContext);
  const { setNotificationStatus } = useContext(NotificationContext);
  const { selectedRouteline } = useContext(SelectedRoutelineContext);
  const { setSelectedWayareaLoaded } = useContext(SelectedWayareaLoadedContext);
  const { setSelectedRoutelineLoaded } = useContext(
    SelectedRoutelineLoadedContext
  );
  const { setSelectedBoatLoaded } = useContext(SelectedBoatLoadedContext);

  useEffect(() => {
    const lastUsedParameters = getLastUsedParameters();
    if (lastUsedParameters) {
      if (window.confirm("Ladataanko viimeiseksi käytetyt parametrit?")) {
        setUserInput(lastUsedParameters);
        setSelectedWayareaLoaded(1);
        setSelectedRoutelineLoaded(true);
        setSelectedBoatLoaded(true);
      } else {
        setAllLastUsedParameters(JSON.parse(JSON.stringify(userInputDefault)));
      }
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setWayareaPolygons } = useContext(WayareaPolygonContext);
  const { selectedCalculationType } = useContext(
    SelectedCalculationTypeContext
  );
  const generatePaths = async (
    values,
    selectedCalculationType,
    selectedRouteline
  ) => {
    let paths = {
      path: "",
      path_wayarea: "",
      path_navigationline: "",
      path_wayarea_navigationline: "",
      path_routeline: "",
      path_wayarea_routeline: "",
    };

    if (selectedCalculationType == calculationTypeEnums.ROUTELINE) {
      paths.path = `routeline/calculate_risk?routename=${encodeURIComponent(
        selectedRouteline
      )}`;
      paths.path_wayarea = `routeline/wayarea_polygons?routename=${encodeURIComponent(
        selectedRouteline
      )}`;
    } else if (selectedCalculationType == calculationTypeEnums.NAVIGATIONLINE) {
      paths.path = `fairway/calculate_risk?vaylat=${encodeURIComponent(
        values.vaylat
      )}`;
      paths.path_wayarea = `wayarea?vaylat=${encodeURIComponent(
        values.vaylat
      )}`;
    } else if (selectedCalculationType == calculationTypeEnums.COMPARE) {
      paths.path_navigationline = `fairway/calculate_risk?vaylat=${encodeURIComponent(
        values.vaylat
      )}`;
      paths.path_wayarea_navigationline = `wayarea?vaylat=${encodeURIComponent(
        values.vaylat
      )}`;
      paths.path_routeline = `routeline/calculate_risk?routename=${encodeURIComponent(
        selectedRouteline
      )}`;
      paths.path_wayarea_routeline = `routeline/wayarea_polygons?routename=${encodeURIComponent(
        selectedRouteline
      )}`;
    }
    return paths;
  };
  const fetchRiskValue = async (values) => {
    const paths = await generatePaths(
      values,
      selectedCalculationType,
      selectedRouteline
    );

    // Set spinner
    setSpinnerVisible(true);
    // Empty previous results
    setRIVResults([]);
    setWayareaPolygons([]);
    try {
      if (selectedCalculationType == calculationTypeEnums.COMPARE) {
        const [
          response_navigationline,
          response_wayarea_navigationline,
          response_routeline,
          response_wayarea_routeline,
        ] = await Promise.all([
          apiClient.post(paths.path_navigationline, values),
          apiClient.get(paths.path_wayarea_navigationline),
          apiClient.post(paths.path_routeline, values),
          apiClient.get(paths.path_wayarea_routeline),
        ]);

        // Do not change the order the concat is made! As the map zoom in MapView is dependent on it.
        const concated_response = {
          features: response_navigationline.data.features.concat(
            response_routeline.data.features
          ),
        };
        const concated_wayarea_response = {
          features: response_wayarea_navigationline.data.features.concat(
            response_wayarea_routeline.data.features
          ),
        };

        setRIVResults(concated_response);
        setWayareaPolygons(concated_wayarea_response);
      } else {
        const [response, response_wayarea] = await Promise.all([
          apiClient.post(paths.path, values),
          apiClient.get(paths.path_wayarea),
        ]);
        setRIVResults(response.data);
        setWayareaPolygons(response_wayarea.data);
      }
    } catch (err) {
      console.log(err);
      setNotificationStatus({
        severity: "error",
        message: JSON.stringify(err.response.data.detail),
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
          <Tab
            label="Parametri kokoelmat"
            {...a11yProps(2)}
            className={`main-tab ${value === 2 ? "main-tab-active" : ""}`}
          />
        </Tabs>
        {/* <Tab label="Lisää uusi mitoitusalus kantaan" {...a11yProps(2)} /> */}
      </Box>
      <Formik
        enableReinitialize={true} //Default is false. Control whether Formik should reset the form if initialValues changes (using deep equality).
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
                <DefaultParametersComponent
                  tabValue={value}
                  tabIndex={2}
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
