import { Box, Button, Grid, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { Field, FieldArray } from "formik";
import PropTypes from "prop-types";

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
                      type="float"
                    />
                    <Field
                      name={`navilinja_angle_params.${index}.SADE`}
                      placeholder="Säde"
                      type="float"
                    />
                    <Field
                      name={`navilinja_angle_params.${index}.BEND_ANGLE`}
                      placeholder="Kaarteen kulma"
                      type="float"
                    />
                    <Field
                      name={`navilinja_angle_params.${index}.S_BEND`}
                      placeholder="S-mutkan pituus"
                      type="float"
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
