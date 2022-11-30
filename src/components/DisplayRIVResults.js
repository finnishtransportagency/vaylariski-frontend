
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import RIVResultContext from "../contexts/RIVResult";

function DisplayRIVResults() {

  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const [ displayRowResults, setDisplayRowResults ] = useState([]);

  useEffect(() => {
    if (RIVResults.length === 0 ) return;
    let rowResults = [];
    RIVResults.features.map(el => {
      rowResults.push(el.properties)
    })
    setDisplayRowResults(rowResults);
  }, [RIVResults]);

  const columns = [
    {field: 'GDO_GID', width:150},
    {field: 'VAYLAT'},
    {field: 'MID_POINT'},
    {field: 'PF_1_channel'},
    {field: 'PF_2_bend'},
    {field: 'PF_3_s_bend'},
    {field: 'PF_4_traffic_complexity', width:200},
    {field: 'PF_5_reduced_visibility', width:200},
    {field: 'PF_6_light_pollution', width:200},
    {field: 'PF_6_light_pollution_value', width:200},
    {field: 'PF_traffic_complexity', width:200},
    {field: 'PF_traffic_value', width:200},
    {field: 'PF_traffic_volume', width:200},
    {field: 'RIV_1_channel', width:200},
    {field: 'RIV_2_bend', width:200},
    {field: 'RIV_3_s_bend', width:200},
    {field: 'RIV_4_traffic_complexity', width:200},
    {field: 'RIV_5_reduced_visibility', width:200},
    {field: 'RIV_6_light_pollution', width:200},
    {field: 'RISK_INDEX_SUM', width:200},
    {field: 'W_atn', width:200},
    {field: 'W_bank_clearance', width:200},
    {field: 'W_bottom_surface', width:200},
    {field: 'W_channel', width:200},
    {field: 'W_channel_depth', width:200},
    {field: 'W_cross_current', width:200},
    {field: 'W_longitudinal_current', width:200},
    {field: 'W_manoeuvrability', width:200},
    {field: 'W_speed', width:200},
    {field: 'W_wave_height', width:200},
    {field: 'W_wind', width:200},
    {field: 'aids_to_navigation_category', width:200},
    {field: 'bend_S_length', width:200},
    {field: 'bend_angle', width:200},
    {field: 'bend_radius', width:200},
    {field: 'bottom_surface_category', width:200},
    {field: 'channel_depth_value', width:200},
    {field: 'channel_edge_type', width:200},
    {field: 'channel_type', width:200},
    {field: 'cross_current_category', width:200},
    {field: 'linestring_index', width:200},
    {field: 'longitudinal_current_category', width:200},
    {field: 'number_of_lanes', width:200},
    {field: 'point_index', width:200},
    {field: 'vessel_speed_category', width:200},
    {field: 'visibility', width:200},
    {field: 'wave_height_category', width:200},
    {field: 'wind_speed', width:200},
    {field: 'wind_speed_category', width:200},
    {field: 'COORD_X', width:200},
    {field: 'COORD_Y', width:200},
  ];


    return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={displayRowResults}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.point_index}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{Toolbar: GridToolbar}}
      />
    </Box>
  );
}

export default DisplayRIVResults;
