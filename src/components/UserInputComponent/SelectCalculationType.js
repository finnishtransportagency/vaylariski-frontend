import React, { useState, useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ReittiviivaComponent from "./ReittiviivaComponent";
import WayareaComponent from "./WayareaComponent";
import GDOGIDMenuComponent from "./GDOGIDMenuComponent";
import SelectedCalculationTypeContext from "contexts/SelectedCalculationTypeContext";
import { Button, Divider, Grid, Tooltip } from "@mui/material";

const SelectCalculationType = (props) => {
  const { formik } = props;
  const { selectedCalculationType, setSelectedCalculationType } = useContext(
    SelectedCalculationTypeContext
  );

  const handleChoiceChange = (event, newChoice) => {
    setSelectedCalculationType(newChoice === null ? null : newChoice);
  };

  return (
    <Grid item xs={12}>
      <ToggleButtonGroup
        value={selectedCalculationType}
        exclusive
        onChange={handleChoiceChange}
        aria-label="Choose an option"
        orientation="vertical"
      >
        <ToggleButton value="navigationline">Navigointilinja</ToggleButton>
        <ToggleButton value="reittiviiva">Reittiviiva</ToggleButton>
        <ToggleButton value="compare">Vertaa</ToggleButton>
      </ToggleButtonGroup>

      {selectedCalculationType === "navigationline" && (
        <div>
          <WayareaComponent name="vaylat" formik={formik} />
          <GDOGIDMenuComponent
            formik={formik}
            name="navline.starting_gdo_gid"
          />
        </div>
      )}

      {selectedCalculationType === "reittiviiva" && (
        <div>
          <ReittiviivaComponent name="reittiviiva.name" formik={formik} />
        </div>
      )}

      {selectedCalculationType === "compare" && (
        <div>
          <WayareaComponent name="vaylat" formik={formik} />
          <GDOGIDMenuComponent
            formik={formik}
            name="navline.starting_gdo_gid"
          />
          <ReittiviivaComponent name="reittiviiva.name" formik={formik} />
        </div>
      )}
    </Grid>
  );
};

export default SelectCalculationType;
