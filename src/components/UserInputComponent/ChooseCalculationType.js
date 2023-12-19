import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ReittiviivaComponent from "./ReittiviivaComponent";
import WayareaComponent from "./WayareaComponent";
import GDOGIDMenuComponent from "./GDOGIDMenuComponent";
import { Button, Divider, Grid, Tooltip } from "@mui/material";

const ChooseCalculationType = (props) => {
  const { formik } = props;
  const [choice, setChoice] = useState("reittiviiva");

  const handleChoiceChange = (event, newChoice) => {
    setChoice(newChoice);
  };

  return (
    <Grid>
      <ToggleButtonGroup
        value={choice}
        exclusive
        onChange={handleChoiceChange}
        aria-label="Choose an option"
      >
        <ToggleButton value="navigationline">Navigointilinja</ToggleButton>
        <ToggleButton value="reittiviiva">Reittiviiva</ToggleButton>
      </ToggleButtonGroup>

      {choice === "navigationline" && (
        <div>
          {/* <WayareaComponent name="vaylat" formik={formik} /> */}
          {/* <GDOGIDMenuComponent
            formik={formik}
            name="navline.starting_gdo_gid"
          /> */}
        </div>
      )}

      {choice === "reittiviiva" && (
        <div>
          {/* Another component specific to option 2 */}
          {/* <ReittiviivaComponent name="reittiviiva.name" formik={formik} /> */}
        </div>
      )}
    </Grid>
  );
};

export default ChooseCalculationType;
