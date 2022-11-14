
import { useContext, createContext, useReducer } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from "../http-common";

import RIVResultContext from "../contexts/RIVResult";
import BoatContext from '../contexts/Boat';
import FairwayContext from '../contexts/Fairway';


function reducer(state, item) {
  return [...state, item]
};

function DisplayRIVResults() {
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const { boat } = useContext(BoatContext);
  const [ siteParameters, setSiteParameters ] = useReducer(reducer, []);
  const { fairway } = useContext(FairwayContext);

  const columns = [
    {field: 'COORD_X'},
    {field: 'COORD_Y'},
    {field: 'GDO_GID'},
    {field: 'MID_POINT'},
    {field: 'PF_1_channel'},
    {field: 'PF_2_bend'},
    {field: 'PF_3_s_bend'},
    {field: 'PF_4_traffic_complexity'},
    {field: 'PF_5_reduced_visibility'},
    {field: 'PF_6_light_pollution'},
    {field: 'PF_6_light_pollution_value'},
    {field: 'PF_traffic_complexity'},
    {field: 'PF_traffic_value'},
    {field: 'PF_traffic_volume'},
    {field: 'RISK_INDEX_SUM'},
    {field: 'RIV_1_channel'},
    {field: 'RIV_2_bend'},
    {field: 'RIV_3_s_bend'},
    {field: 'RIV_4_traffic_complexity'},
    {field: 'RIV_5_reduced_visibility'},
    {field: 'RIV_6_light_pollution'},
    {field: 'VAYLAT'},
    {field: 'W_atn'},
    {field: 'W_bank_clearance'},
    {field: 'W_bottom_surface'},
    {field: 'W_channel'},
    {field: 'W_channel_depth'},
    {field: 'W_cross_current'},
    {field: 'W_longitudinal_current'},
    {field: 'W_manoeuvrability'},
    {field: 'W_speed'},
    {field: 'W_wave_height'},
    {field: 'W_wind'},
    {field: 'aids_to_navigation_category'},
    {field: 'bend_S_length'},
    {field: 'bend_angle'},
    {field: 'bend_radius'},
    {field: 'bottom_surface_category'},
    {field: 'channel_depth_value'},
    {field: 'channel_edge_type'},
    {field: 'channel_type'},
    {field: 'cross_current_category'},
    {field: 'linestring_index'},
    {field: 'longitudinal_current_category'},
    {field: 'number_of_lanes'},
    {field: 'point_index'},
    {field: 'vessel_speed_category'},
    {field: 'visibility'},
    {field: 'wave_height_category'},
    {field: 'wind_speed'},
    {field: 'wind_speed_category'},
  ];


    return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={RIVResults}
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
