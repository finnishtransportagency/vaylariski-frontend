import { useContext, useEffect, useState } from "react";
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
import InsertNewBulkBoatView from "../views/InsertNewBulkBoatView";
import WayareaPolygonContext from "contexts/WayareaPolygonContext";
import * as Yup from "yup";
import VaylatInputValueContext from "contexts/VaylatInputValueContext";

const validationSchema = Yup.object().shape({
  navline: Yup.object().shape({
    VAYLAT: Yup.number()
      .min(1, "VAYLAT id ei voi olla negatiivinen")
      .required("VAYLAT id vaaditaan"),
  }),
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ParameterTabsComponent() {
  const [value, setValue] = useState(0);
  const { spinnerVisible, setSpinnerVisible } = useContext(
    SpinnerVisibilityContext
  );
  const { userInput, setUserInput } = useContext(UserInputContext);
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);
  const [selectedWayarea, setSelectedWayarea] = useState({});
  const [defaultWayareaList, setDefaultWayareaList] = useState([]);
  const { vaylatInputValue, setVaylatInputValue } = useContext(
    VaylatInputValueContext
  );

  useEffect(() => {
    console.log("param tabs: vaylatInputValue", vaylatInputValue);
  }, [vaylatInputValue]);


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const { wayareaPolygons, setWayareaPolygons } = useContext(
    WayareaPolygonContext
  );

  const fetchRiskValue = async (values) => {
    const path = "fairway/calculate_risk";
    const path_wayarea = "wayarea";
    console.log("You clicked me!" + JSON.stringify(values));
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

  useEffect(() => {
    // Only need to fetch once
    if (defaultWayareaList.length > 0) return;
    const path = "wayarea_names";
    try {
      console.log('hakee vaylat nimet lista')
      apiClient.get(path).then((response) => setDefaultWayareaList(response.data));
    } catch (err) {
      console.log(err);
      setNotificationStatus({
        severity: "error",
        message: err.message,
        visible: true,
      });
    } finally {
    }
  }, []);

  // useEffect(() => {
  //   console.log('param tabs default ways',defaultWayareaList);
  // }, [defaultWayareaList]);

  return (
    <Box sx={{ width: "100%", margin: "5px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Parametrit" {...a11yProps(0)} />
          <Tab
            label="Navigointilinjojen valinnaiset parametrit"
            {...a11yProps(1)}
          />
          {/* <Tab label="Lisää uusi mitoitusalus kantaan" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <Formik
        onSubmit={(values) => {
          fetchRiskValue(values);
        }}
        initialValues={userInput}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <FForm>
            <UserInputForm
              tabValue={value}
              tabIndex={0}
              formik={formik}
              setSelectedWayarea={setSelectedWayarea}
              selectedWayarea={selectedWayarea}
              defaultWayareaList={defaultWayareaList}
              setDefaultWayareaList={setDefaultWayareaList}
              vaylatInputValue={vaylatInputValue}
              setVaylatInputValue={setVaylatInputValue}

            />
            <UserDefinedAngleParamsComponent
              tabValue={value}
              tabIndex={1}
              formik={formik}
              setSelectedWayarea={setSelectedWayarea}
              selectedWayarea={selectedWayarea}
              defaultWayareaList={defaultWayareaList}
              setDefaultWayareaList={setDefaultWayareaList}
              vaylatInputValue={vaylatInputValue}
              setVaylatInputValue={setVaylatInputValue}
            />
          </FForm>
        )}
      </Formik>
      {/* <InsertNewBulkBoatView tabValue={value} tabIndex={2} /> */}
    </Box>
  );
}
