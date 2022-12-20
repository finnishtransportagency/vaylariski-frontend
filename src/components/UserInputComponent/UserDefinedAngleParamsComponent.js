import { Box, Button, Grid, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import ParameterTabsComponent from "components/ParameterTabsComponent";
import UserInputContext from "contexts/UserInput";
import { Field, FieldArray } from "formik";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

{
  /* Käyttäjän voi halutessaan ylikirjottaa kannassa lasketut SADE, BEND_ANGLE, S_BEND arvot antamilleen navigointilinjoille (GDO_GID) */
}
export default function UserDefinedAngleParamsComponent(props) {
  const { children, tabValue, tabIndex, formik, ...other } = props;
  const newAngle = {
    GDO_GID: "",
    SADE: "",
    S_BEND: "",
    BEND_ANGLE: "",
  };

  console.log("vlues", formik);

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <FieldArray name="navilinja_angle_params">
          {({ insert, remove, push }) => (
            <div>
              {formik.values.navilinja_angle_params.length > 0 &&
                formik.values.navilinja_angle_params.map((el, index) => (
                  <Stack direction="row" spacing={1} key={index}>
                    <Field
                      name={`navilinja_angle_params.${index}.GDO_GID`}
                      required
                      placeholder="GDO_GID"
                      type="number"
                    />
                    <Field
                      name={`navlinja_angle_params.${index}.SADE`}
                      placeholder="Säde"
                      type="number"
                    />
                    <Field
                      name={`navlinja_angle_params.${index}.BEND_ANGLE`}
                      placeholder="Kaarteen kulma"
                      type="number"
                    />
                    <Field
                      name={`navlinja_angle_params.${index}.S_BEND`}
                      placeholder="S-mutkan pituus"
                      type="number"
                    />
                    <Button onClick={() => remove(index)}>Poista</Button>
                  </Stack>
                ))}
              <Button variant="contained" onClick={() => push(newAngle)}>Lisää uusi kulmaparametri</Button>
            </div>
          )}
        </FieldArray>
      )}
    </div>
  );
}

UserDefinedAngleParamsComponent.propTypes = {
  formik: PropTypes.object,
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
};
