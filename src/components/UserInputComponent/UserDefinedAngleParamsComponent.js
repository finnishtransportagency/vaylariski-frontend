import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import CustomAutoCompleteSelectorComponent from "components/CustomAutoCompleteSelector";
import GDOGIDListContext from "contexts/GDOListContext";
import { Field, FieldArray } from "formik";
import PropTypes from "prop-types";
import { useContext } from "react";

{
  /* Käyttäjän voi halutessaan ylikirjottaa kannassa lasketut SADE, BEND_ANGLE, S_BEND arvot antamilleen navigointilinjoille (GDO_GID) */
}
export default function UserDefinedAngleParamsComponent(props) {
  const { children, tabValue, tabIndex, formik, ...other } = props;
  const { GDOList, setGDOList } = useContext(GDOGIDListContext);
  const newAngle = {
    GDO_GID: "",
    SADE: "",
    S_BEND: "",
    BEND_ANGLE: "",
  };

  function setStartingNavline(ev, navline, name) {
    console.log("setStartingNavline", ev, navline, name);
    if (navline) {
      formik.setFieldValue(name, navline);
    } else {
      formik.setFieldValue(name, "");
    }
  }

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      <Typography
        style={{ fontSize: 16, margin: 5 }}
        color="textSecondary"
        gutterBottom
      >
        Tee yhdelle navigointilinjalle (GDO_GID) kaikki haluamasi muutokset
        samaan kenttään. Tällä hetkellä ohjelma ei hyväksy tyhjien kenttien
        lähettämistä, joten kaikki tyhjät kentät pitää olla poistettu ennen
        laskennan lähettämistä.
      </Typography>
      <Typography
        style={{ fontSize: 16, fontWeight: 550 }}
        color="textSecondary"
        gutterBottom
      >
        Muutettavan navigointilinjan GDO_GID
      </Typography>
      {tabValue === tabIndex && (
        <FieldArray name="navline_angle_params">
          {({ insert, remove, push }) => (
            <div>
              {formik.values.navline_angle_params.length > 0 &&
                formik.values.navline_angle_params.map((el, index) => (
                  <Stack direction="row" spacing={1} key={index} mt={1}>
                    <CustomAutoCompleteSelectorComponent
                      name={`navline_angle_params.${index}.GDO_GID`}
                      handleMenuItemClick={setStartingNavline}
                      optionsList={GDOList}
                    />
                    <Field
                      style={{marginTop: 5}}
                      name={`navline_angle_params.${index}.SADE`}
                      placeholder="Säde"
                      type="float"
                    />
                    <Field
                      style={{marginTop: 5}}
                      name={`navline_angle_params.${index}.BEND_ANGLE`}
                      placeholder="Kaarteen kulma"
                      type="float"
                    />
                    <Field
                      style={{marginTop: 5}}
                      name={`navline_angle_params.${index}.S_BEND`}
                      placeholder="S-mutkan pituus"
                      type="float"
                    />
                    <Button onClick={() => remove(index)}>Poista</Button>
                  </Stack>
                ))}
              <Button variant="contained" onClick={() => push(newAngle)} style={{marginTop: 10, marginRight: 10}}>
                Lisää uusi kulmaparametri
              </Button>
              <Button type="submit" variant="contained" style={{marginTop: 10}}>
                Lähetä
              </Button>
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
