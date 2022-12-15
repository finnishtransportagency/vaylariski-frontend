import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserInputForm from './UserInputComponent/UserInputForm';
import UserDefinedAngleParamsComponent from './UserInputComponent/UserDefinedAngleParamsComponent';


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ParameterTabsComponent() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Parametrit" {...a11yProps(0)} />
          <Tab label="Navigointilinjojen valinnaiset parametrit" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <UserInputForm tabValue={value} tabIndex={0} />
      <UserDefinedAngleParamsComponent tabValue={value} tabIndex={1} />
    </Box>
  );
};
