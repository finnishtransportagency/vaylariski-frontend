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
    <Box sx={{ width: "100%" }} className="riv-tabs-box">
      <Box>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          className="riv-tabs"
          sx={{
            ".Mui-selected": {
              color: "var(--color-tab-text) !important",
              fontWeight: "bold !important",
            },
          }}
          TabIndicatorProps={{
            style: { background: "var(--color-background-white)" },
          }}
        >
          <Tab
            label="RIV taulukko"
            {...a11yProps(0)}
            className={`riv-tab ${value === 0 ? "riv-tab-active" : ""}`}
          />
          <Tab
            label="RIV diagrammi"
            {...a11yProps(1)}
            className={`riv-tab ${value === 1 ? "riv-tab-active" : ""}`}
          />
        </Tabs>
      </Box>
      <div className="riv-tab-container">
        <div className="riv-tab-content">
          <TableView tabValue={value} tabIndex={0} />
          <DisplayRIVResultsDiagramView tabValue={value} tabIndex={1} />
        </div>
      </div>
    </Box>
  );
}
