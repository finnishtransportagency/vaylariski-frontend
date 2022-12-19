import { useContext, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserInputForm from "./UserInputComponent/UserInputForm";
import UserDefinedAngleParamsComponent from "./UserInputComponent/UserDefinedAngleParamsComponent";
import { useForm } from "react-hook-form";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import RIVResultContext from "contexts/RIVResult";
import NotificationContext from "contexts/NotificationContext";
import UserInputContext from "contexts/UserInput";
import apiClient from "http-common";
import { Button } from "@mui/material";
import { Formik } from "formik";
import { Form as FForm } from "formik";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ParameterTabsComponent() {
  const [value, setValue] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { spinnerVisible, setSpinnerVisible } = useContext(
    SpinnerVisibilityContext
  );
  const { userInput, setUserInput } = useContext(UserInputContext);
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchRiskValue = async (values) => {
    const path = "fairway/calculate_risk";
    console.log("You clicked me!" + JSON.stringify(values));
    // Set spinner
    setSpinnerVisible(true);
    // Empty previous results
    setRIVResults([]);
    try {
      const response = await apiClient.post(path, values);
      setRIVResults(response.data);
    } catch (err) {
      console.log(err);
      setNotificationStatus({
        severity: "error",
        message: err.message,
        visible: true,
      });
    } finally {
      setSpinnerVisible(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
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
        </Tabs>
      </Box>
      <Formik onSubmit={(values) => {fetchRiskValue(values)}} initialValues={userInput}>
        {(formik) => (
          <FForm onSubmit={formik.handleSubmit}>
            <UserInputForm tabValue={value} tabIndex={0} />
            <UserDefinedAngleParamsComponent
              tabValue={value}
              tabIndex={1}
            />
            <Button type="submit" variant="contained">Lähetä</Button>
          </FForm>
        )}
      </Formik>
    </Box>
  );
}