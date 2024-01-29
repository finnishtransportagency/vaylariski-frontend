import React, { useContext } from "react";
import RoutelineComponent from "./RoutelineComponent";
import WayareaComponent from "./WayareaComponent";
import GDOGIDMenuComponent from "./GDOGIDMenuComponent";
import SelectedCalculationTypeContext from "contexts/SelectedCalculationTypeContext";
import FairwayWidth from "./FairwayWidth";
import CalculationIntervalComponent from "./CalculationIntervalComponent";
import { calculationTypeEnums } from "constants/enums";

import { InputLabel, Grid, Select, MenuItem, Typography } from "@mui/material";

const SelectCalculationType = (props) => {
  const { formik } = props;
  const { selectedCalculationType, setSelectedCalculationType } = useContext(
    SelectedCalculationTypeContext
  );

  const handleSelectChange = (event) => {
    setSelectedCalculationType(event.target.value);
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
        data-cy-id="calculation-type-dropdown"
      >
        <MenuItem
          value={calculationTypeEnums.NAVIGATIONLINE}
          data-cy-id={`calculation-type-${calculationTypeEnums.NAVIGATIONLINE}`}
        >
          Navigointilinja
        </MenuItem>
        <MenuItem
          value={calculationTypeEnums.ROUTELINE}
          data-cy-id={`calculation-type-${calculationTypeEnums.ROUTELINE}`}
        >
          Reittiviiva
        </MenuItem>
        <MenuItem
          value={calculationTypeEnums.COMPARE}
          data-cy-id={`calculation-type-${calculationTypeEnums.COMPARE}`}
        >
          Vertaa navigointilinjaa ja reittiviivaa
        </MenuItem>
      </Select>
      {selectedCalculationType === calculationTypeEnums.NAVIGATIONLINE && (
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

      {selectedCalculationType === calculationTypeEnums.ROUTELINE && (
        <div>
          <RoutelineComponent name="routeline.name" formik={formik} />
          <CalculationIntervalComponent formik={formik} />
          <FairwayWidth formik={formik} />
        </div>
      )}

      {selectedCalculationType === calculationTypeEnums.COMPARE && (
        <div>
          <WayareaComponent name="vaylat" formik={formik} />
          <GDOGIDMenuComponent
            formik={formik}
            name="navline.starting_gdo_gid"
          />
          <RoutelineComponent name="routeline.name" formik={formik} />
          <CalculationIntervalComponent formik={formik} />
          <FairwayWidth formik={formik} />
        </div>
      )}
    </Grid>
  );
};

export default SelectCalculationType;
