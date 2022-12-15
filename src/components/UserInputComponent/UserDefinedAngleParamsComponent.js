import { Box, TextField } from "@mui/material";
import PropTypes from "prop-types";

{/* Käyttäjän voi halutessaan ylikirjottaa kannassa lasketut SADE, BEND_ANGLE, S_BEND arvot antamilleen navigointilinjoille (GDO_GID) */}
export default function UserDefinedAngleParamsComponent(props) {
  const { children, tabValue, tabIndex, ...other } = props;

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <Box component="form" noValidate autoComplete="off">
          <div>
            <TextField required id="GDO_GID" label="GDO_GID" type="number" />
            <TextField id="SADE" label="Säde" type="number" />
            <TextField id="BEND_ANGLE" label="Kaarteen kulma" type="number" />
            <TextField id="S_BEND" label="S-mutkan pituus" type="number" />
          </div>
        </Box>
      )}
    </div>
  );
}

UserDefinedAngleParamsComponent.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
};
