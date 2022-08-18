
import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import apiClient from "../http-common";

import RIVResultContext from "./RIVResult";


const columns = [
  { field: 'id', headerName: 'id', width: 90},
  { field: 'Site', headerName: 'Site', width: 90 },
  {
    field: 'RIV_1',
    headerName: 'RIV_1',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'RIV_2',
    headerName: 'RIV_2',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'RIV_3',
    headerName: 'RIV_3',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'RIV_4',
    headerName: 'RIV_4',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'RIV_5',
    headerName: 'RIV_5',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'RIV_6',
    headerName: 'RIV_6',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'RIV_SUM',
    headerName: 'RIV_SUM',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'Speed',
    headerName: 'Speed',
    type: 'number',
    width: 90,
    editable: true,
    preProcessEditCellProps : async (params) => {
      const path = 'fairway/calculate_risk'
      const hasError = params.props.value < 0 ? true : false;
      console.log(params);
      const data = params.row

//      const response = await apiClient.post(path, data)
      return { ...params.props, error: hasError };
    }
  }
];

const handleEvent = (
  params,  // GridCellEditStopParams
  event,   // MuiEvent<MuiBaseEvent>
  details, // GridCallbackDetails
) => {
  console.log(params, event);
}

function DisplayRIVResults() {
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={RIVResults}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onCellEditCommit={handleEvent}
      />
    </Box>
  );
}

export default DisplayRIVResults;
