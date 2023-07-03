import { Box } from "@mui/material";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DisplayRIVResultsDiagramView from "views/DisplayRIVResultsDiagramView";
import TableView from "views/TableView";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RIVResultsTabsComponent() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="RIV taulukko" {...a11yProps(0)} />
          <Tab label="RIV diagrammi" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TableView tabValue={value} tabIndex={0} />
      <DisplayRIVResultsDiagramView tabValue={value} tabIndex={1} />
    </Box>
  );
}
