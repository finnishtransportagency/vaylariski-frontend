
import { useContext, createContext, useReducer } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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

  const preProcessEditCellProps = async (params) => {
    const path = 'fairway/calculate_risk'
    const hasError = params.props.value < 0 ? true : false;
    const site_parameters = [{'site_speed': params.props.value, 'site_id': params.id }]
    const request = {
      'boat': boat,
      'site_parameters': site_parameters,
      'fairway': fairway
    }
    console.log(params, request);
    const response = await apiClient.post(path, request);
    const newRIVResultResponse = response.data.RIV;
    console.log("newRIVResultResponse",newRIVResultResponse);
    let oldRIVResults = [...RIVResults];

    const newRIVResults = oldRIVResults.map(x => {
      const item = newRIVResultResponse.find(({ id }) => id === x.id);
      return item ? item : x;
    });

    console.log(newRIVResults);
    setRIVResults(newRIVResults);
    return { ...params.props, error: hasError };
  };

  const columns = [
    { field: 'id', headerName: 'id', width: 70},
    { field: 'Site', headerName: 'Site', width: 70 },
    {
      field: 'RIV_SUM',
      headerName: 'RIV Sum',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'RIV_1',
      headerName: 'RIV Channel',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'RIV_2',
      headerName: 'RIV Bend',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'RIV_3',
      headerName: 'RIV S-bend',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'RIV_4',
      headerName: 'RIV Traffic',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'RIV_5',
      headerName: 'RIV Reduced visibility',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'RIV_6',
      headerName: 'RIV Light pollution',
      type: 'number',
      width: 150,
      editable: false,
    },
    
    {
      field: 'Speed',
      headerName: 'Speed',
      type: 'number',
      width: 150,
      editable: true,
      preProcessEditCellProps
    }
  ];

  const handleEvent = (
    params,  // GridCellEditStopParams
    event,   // MuiEvent<MuiBaseEvent>
    details, // GridCallbackDetails
  ) => {
    console.log(params, event, boat);
  }

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
