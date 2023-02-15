
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import RIVResultContext from "../contexts/RIVResult";

function DisplayRIVResults() {

  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const [ displayRowResults, setDisplayRowResults ] = useState([]);

  useEffect(() => {
    setDisplayRowResults([]);
    if (RIVResults.length === 0 ) return;

    let rowResults = [];
    RIVResults.features.map(el => {
      rowResults.push(el.properties)
    })
    setDisplayRowResults(rowResults);
  }, [RIVResults]);

  const columns = [
    {field: 'GDO_GID', width:100},
    {field: 'VAYLAT'},
    {field: 'RISK_INDEX_SUM', width:100},
    {field: 'RIV_1_channel', width:100},
    {field: 'RIV_2_bend', width:100},
    {field: 'RIV_3_s_bend', width:100},
    {field: 'RIV_4_traffic_complexity', width:100},
    {field: 'RIV_5_reduced_visibility', width:100},
    {field: 'RIV_6_light_pollution', width:100},
    {field: 'PF_1_channel'},
    {field: 'PF_2_bend'},
    {field: 'PF_3_s_bend'},
    {field: 'PF_4_traffic_complexity', width:100},
    {field: 'PF_5_reduced_visibility', width:100},
    {field: 'PF_6_light_pollution', width:100},
    {field: 'PF_6_light_pollution_value', width:100},
    {field: 'PF_traffic_complexity', width:100},
    {field: 'PF_traffic_value', width:100},
    {field: 'PF_traffic_volume', width:100},
    {field: 'W_atn', width:100},
    {field: 'W_bank_clearance', width:100},
    {field: 'W_bottom_surface', width:100},
    {field: 'W_channel', width:100},
    {field: 'W_channel_depth', width:100},
    {field: 'W_cross_current', width:100},
    {field: 'W_longitudinal_current', width:100},
    {field: 'W_manoeuvrability', width:100},
    {field: 'W_speed', width:100},
    {field: 'W_wave_height', width:100},
    {field: 'W_wind', width:100},
    {field: 'aids_to_navigation_category', width:100},
    {field: 'bend_S_length', width:100},
    {field: 'bend_angle', width:100},
    {field: 'bend_radius', width:100},
    {field: 'bottom_surface_category', width:100},
    {field: 'channel_depth_value', width:100},
    {field: 'channel_edge_type', width:100},
    {field: 'channel_type', width:100},
    {field: 'cross_current_category', width:100},
    {field: 'linestring_index', width:100},
    {field: 'longitudinal_current_category', width:100},
    {field: 'number_of_lanes', width:100},
    {field: 'point_index', width:100},
    {field: 'vessel_speed_category', width:100},
    {field: 'visibility', width:100},
    {field: 'wave_height_category', width:100},
    {field: 'wind_speed', width:100},
    {field: 'wind_speed_category', width:100},
    {field: 'COORD_X', width:100},
    {field: 'COORD_Y', width:100},
    {field: 'MID_POINT'},
  ];


    return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={displayRowResults}
        columns={columns}
        pageSize={100}
        getRowId={(row) => row.point_index}
        rowsPerPageOptions={[100]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{Toolbar: GridToolbar}}
      />
    </Box>
  );
}

export default DisplayRIVResults;
