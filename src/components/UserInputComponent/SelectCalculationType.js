import React, { useState, useContext } from "react";
import ReittiviivaComponent from "./ReittiviivaComponent";
import WayareaComponent from "./WayareaComponent";
import GDOGIDMenuComponent from "./GDOGIDMenuComponent";
import SelectedCalculationTypeContext from "contexts/SelectedCalculationTypeContext";
import FairwayWidth from "./FairwayWidth";
import CalculationIntervalComponent from "./CalculationIntervalComponent";

import { InputLabel, Grid, Select, MenuItem, Typography } from "@mui/material";

const SelectCalculationType = (props) => {
  const { formik } = props;
  const { selectedCalculationType, setSelectedCalculationType } = useContext(
    SelectedCalculationTypeContext
  );

  const handleSelectChange = (event) => {
    setSelectedCalculationType(event.target.value);
    console.log(formik.values);
  };

  return (
    <Grid item xs={12}>
      <Typography
        style={{ fontSize: 16, fontWeight: 550 }}
        color="textSecondary"
        gutterBottom
      >
        Valitse riskin laskentatapa
      </Typography>
      <InputLabel style={{ fontSize: 14 }}>
        {"Valitse millaiselle reitille haluat laskea riskin"}
      </InputLabel>
      <Select
        required
        size={"small"}
        sx={{ width: "100%", height: 40 }}
        value={selectedCalculationType || ""}
        onChange={handleSelectChange}
      >
        <MenuItem value="navigationline">Navigointilinja</MenuItem>
        <MenuItem value="reittiviiva">Reittiviiva</MenuItem>
        <MenuItem value="compare">
          Vertaa navigointilinjaa ja reittiviivaa
        </MenuItem>
      </Select>
      {selectedCalculationType === "navigationline" && (
        <div>
          <WayareaComponent name="vaylat" formik={formik} />
          <GDOGIDMenuComponent
            formik={formik}
            name="navline.starting_gdo_gid"
          />
          <CalculationIntervalComponent formik={formik} />
          <FairwayWidth formik={formik} />
        </div>
      )}

      {selectedCalculationType === "reittiviiva" && (
        <div>
          <ReittiviivaComponent name="reittiviiva.name" formik={formik} />
          <CalculationIntervalComponent formik={formik} />
          <FairwayWidth formik={formik} />
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
          <CalculationIntervalComponent formik={formik} />
          <FairwayWidth formik={formik} />
        </div>
      )}
    </Grid>
  );
};

export default SelectCalculationType;
