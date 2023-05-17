import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import DataGrid from 'react-data-grid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'react-data-grid/lib/styles.css';
import {
  Box,
  Modal,
  Button
} from "@mui/material";
import { CSVLink } from 'react-csv';
import RIVResultContext from "../contexts/RIVResult";
import NotificationContext from "contexts/NotificationContext";
import SelectedIndexContext from "contexts/SelectedIndexContext";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: "80%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflow: 'scroll'
};


function TableView(props, { direction }) {
  const { children, tabValue, tabIndex, formik, ...other } = props;
  const { RIVResults, setRIVResults } = useContext(RIVResultContext);
  const [displayRowResults, setDisplayRowResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormCol, setShowFormCol] = useState(false);
  const [filters, setFilters] = useState([]);
  const [sortColumns, setSortColumns] = useState([])
  const onSortColumnsChange = useCallback(sortColumns => { setSortColumns(sortColumns.slice(-1)) }, [])
  const [open, setOpen] = useState(false);
  const { notificationStatus, setNotificationStatus } =
    useContext(NotificationContext);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { selectedRowIndex, setSelectedRowIndex } = useContext(
    SelectedIndexContext
  );

  // Set columns
  const columns = useMemo(() => {
    return [
      {
        key: "point_index",
        name: 'index',
        resizable: true,
        sortable: true
      },
      {
        key: "GDO_GID",
        name: 'GDO_GID',
        resizable: true,
        sortable: true
      },
      {
        key: "VAYLAT",
        name: 'VAYLAT',
        resizable: true,
        sortable: true
      },
      {
        key: "RISK_INDEX_SUM",
        name: 'RIV_SUM',
        resizable: true,
        sortable: true
      },
      {
        key: "RIV_1_channel",
        name: 'RIV_1_channel',
        resizable: true,
        sortable: true
      },
      {
        key: "RIV_2_bend",
        name: 'RIV_2_bend',
        resizable: true,
        sortable: true
      },
      {
        key: "RIV_3_s_bend",
        name: 'RIV_3_s_bend',
        resizable: true,
        sortable: true
      },
      {
        key: "RIV_4_traffic_complexity",
        name: 'RIV_4_traffic_complexity',
        resizable: true,
        sortable: true
      },
      {
        key: "RIV_5_reduced_visibility",
        name: 'RIV_5_reduced_visibility',
        resizable: true,
        sortable: true
      },
      {
        key: "RIV_6_light_pollution",
        name: 'RIV_6_light_pollution',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_1_channel",
        name: 'PF_1_channel',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_2_bend",
        name: 'PF_2_bend',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_bend1",
        name: 'PF_bend1',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_bend2",
        name: 'PF_bend2',
        resizable: true,
        sortable: true
      },
      {
        key: "BSI",
        name: 'BSI',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_3_s_bend",
        name: 'PF_3_s_bend',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_4_traffic_complexity",
        name: 'PF_4_traffic_complexity',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_5_reduced_visibility",
        name: 'PF_5_reduced_visibility',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_6_light_pollution",
        name: 'PF_6_light_pollution',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_6_light_pollution_value",
        name: 'PF_6_light_pollution_value',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_traffic_complexity",
        name: 'PF_traffic_complexity',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_traffic_value",
        name: 'PF_traffic_value',
        resizable: true,
        sortable: true
      },
      {
        key: "PF_traffic_volume",
        name: 'PF_traffic_volume',
        resizable: true,
        sortable: true
      },
      {
        key: "W_atn",
        name: 'W_atn',
        resizable: true,
        sortable: true
      },
      {
        key: "W_bank_clearance",
        name: 'W_bank_clearance',
        resizable: true,
        sortable: true
      },
      {
        key: "W_bottom_surface",
        name: 'W_bottom_surface',
        resizable: true,
        sortable: true
      },
      {
        key: "W_channel",
        name: 'W_channel',
        resizable: true,
        sortable: true
      },
      {
        key: "W_channel_depth",
        name: 'W_channel_depth',
        resizable: true,
        sortable: true
      },
      {
        key: "W_cross_current",
        name: 'W_cross_current',
        resizable: true,
        sortable: true
      },
      {
        key: "W_longitudinal_current",
        name: 'W_longitudinal_current',
        resizable: true,
        sortable: true
      },
      {
        key: "W_manoeuvrability",
        name: 'W_manoeuvrability',
        resizable: true,
        sortable: true
      },
      {
        key: "W_speed",
        name: 'W_speed',
        resizable: true,
        sortable: true
      },
      {
        key: "W_wave_height",
        name: 'W_wave_height',
        resizable: true,
        sortable: true
      },
      {
        key: "W_wind",
        name: 'W_wind',
        resizable: true,
        sortable: true
      },
      {
        key: "aids_to_navigation_category",
        name: 'ATN',
        resizable: true,
        sortable: true
      },
      {
        key: "bend_S_length",
        name: 'S_bend_length',
        resizable: true,
        sortable: true
      },
      {
        key: "bend_angle",
        name: 'bend_angle',
        resizable: true,
        sortable: true
      },
      {
        key: "bend_radius",
        name: 'bend_radius',
        resizable: true,
        sortable: true
      },
      {
        key: "bottom_surface_category",
        name: 'bottom_surface_category',
        resizable: true,
        sortable: true
      },
      {
        key: "channel_depth_value",
        name: 'channel_depth_value',
        resizable: true,
        sortable: true
      },
      {
        key: "channel_edge_type",
        name: 'channel_edge_type',
        resizable: true,
        sortable: true
      },
      {
        key: "channel_type",
        name: 'channel_type',
        resizable: true,
        sortable: true
      },
      {
        key: "cross_current_category",
        name: 'cross_current_category',
        resizable: true,
        sortable: true
      },
      {
        key: "longitudinal_current_category",
        name: 'longitudinal_current_category',
        resizable: true,
        sortable: true
      },
      {
        key: "number_of_lanes",
        name: 'number_of_lanes',
        resizable: true,
        sortable: true
      },
      {
        key: "point_index",
        name: 'point_index',
        resizable: true,
        sortable: true
      },
      {
        key: "vessel_speed_category",
        name: 'vessel_speed_category',
        resizable: true,
        sortable: true
      },
      {
        key: "visibility",
        name: 'visibility',
        resizable: true,
        sortable: true
      },
      {
        key: "wave_height_category",
        name: 'wave_height_category',
        resizable: true,
        sortable: true
      },
      {
        key: "wind_speed_category",
        name: 'wind_speed_category',
        resizable: true,
        sortable: true
      },
      {
        key: "MID_POINT",
        name: 'point_coordinate',
        resizable: true,
        sortable: true
      },
    ]
  }, [])

  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => c.key));
  const handleToggleColumn = (key) => {
    setVisibleColumns((visibleColumns) => {
      if (visibleColumns.includes(key)) {
        return visibleColumns.filter((c) => c !== key);
      } else {
        return [...visibleColumns, key];
      }
    });
  };

  const visibleColumnsMetadata = columns.filter((column) =>
    visibleColumns.includes(column.key)).map((column) => ({
      ...column,
      header: column.name
    }));

  const handleSelectAllColumns = (event) => {
    if (event.target.checked) {
      setVisibleColumns(columns.map((c) => c.key));
    } else {
      setVisibleColumns([]);
    }
  };

  // Set rows
  useEffect(() => {
    setDisplayRowResults([]);
    if (RIVResults.length === 0) return;

    let rowResults = [];
    RIVResults.features.map((el) => {
      let props = el.properties;
      const lon = el.geometry.coordinates[0];
      const lat = el.geometry.coordinates[1];
      props = { ...props, MID_POINT: `POINT (${lon} ${lat})` };

      rowResults.push(props);
    });
    if (rowResults[0].draft_is_greater_than_depth) {
      setNotificationStatus({
        severity: "warning",
        message: "Laivan syväys on suurempi kuin väylän syvyys!",
        visible: true,
      });
    }
    setDisplayRowResults(rowResults);
  }, [RIVResults]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0)
      return displayRowResults
    const { columnKey, direction } = sortColumns[0]

    let sortedRows = [...displayRowResults]

    switch (columnKey) {
      // case "GDO_GID":
      // case "RISK_INDEX_SUM":"RISK_INDEX_SUM"
      default:
        sortedRows = sortedRows.sort((a, b) => a[columnKey] - b[columnKey])
        break
    }
    return direction === "DESC" ? sortedRows.reverse() : sortedRows
  }, [displayRowResults, sortColumns])

  const handleAddFilterClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleFilterSubmit = (values, { setSubmitting }) => {
    // Add your filter logic here using values.filterConstant, values.filterValue, and values.filterOperator
    console.log(values.filterConstant, values.filterOperator, values.filterValue);
    setFilters([...filters, values]);
    setSubmitting(false);
    setShowForm(false);
  };

  const handleRemoveFilterClick = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const filteredRows = sortedRows.filter((row) => {
    return filters.every((filter) => {
      const { filterConstant, filterOperator, filterValue } = filter;
      const rowValue = row[filterConstant];
      switch (filterOperator) {
        case '≤':
          return rowValue <= filterValue;
        case '≥':
          return rowValue >= filterValue;
        case '=':
          return rowValue == filterValue;
        default:
          return true;
      }
    });
  });

  const data = [
    visibleColumnsMetadata.map((column) => column.header), // Add headers as first row
    ...filteredRows.map((row) =>
      visibleColumnsMetadata.reduce((acc, column) => {
        acc[column.key] = row[column.key];
        return acc;
      }, {})
    ),
  ];

  const csvData = data.map((row) => {
    return Object.values(row).map((value) => {
      if (typeof value === 'number') {                      // changing points to commas for excel
        return value.toString().replace(/\./g, ',');
      }
      if (value === null) {                                 // empty cells to nan because of excel
        return value = 'nan';
      }
      return value;
    });
  });

  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && selectedRowIndex !== null) {
      const rowIndex = filteredRows.findIndex(row => row.point_index === selectedRowIndex);
      if (rowIndex !== -1) {
        const updatedRows = filteredRows.map((row, index) => ({
          ...row,
          isSelected: index === rowIndex,
        }));
        gridRef.current.scrollToRow(rowIndex);
      }
    }
  }, [filteredRows, selectedRowIndex]);


  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      <div>
        <Button variant="contained" style={{ backgroundColor: "#ced6d8", margin: 1 }} >
          <CSVLink
            data={csvData}
            filename={'vaylakohtainen_riski.csv'}
            separator={';'}
          >
            Lataa CSV
          </CSVLink>
        </Button>
        <Button variant="contained" style={{ backgroundColor: "#ced6d8", color: "black", margin: 1 }} onClick={handleOpen}>
          Valitse sarakkeet
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          disableScrollLock={true}
        >

          <Box sx={{ ...style }}>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={visibleColumns.length === columns.length}
                  onChange={handleSelectAllColumns}
                />
                Valitse kaikki
              </label>
              {columns.map((column) => (
                <div>
                  <label key={column.key}>
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(column.key)}
                      onChange={() => handleToggleColumn(column.key)}
                    />
                    {column.name}
                  </label>
                </div>
              ))}
            </div>
          </Box>
        </Modal>
        <Button variant="contained" style={{ backgroundColor: "#ced6d8", color: "black", margin: 1 }} onClick={handleAddFilterClick}>Lisää filtteri</Button>
        {showForm && (
          <Formik
            initialValues={{
              filterConstant: '',
              filterOperator: '≤',
              filterValue: '',
            }}
            onSubmit={handleFilterSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="filterConstant">Parametri:</label>
                <Field as="select" id="filterConstant" name="filterConstant" required>
                  <option value="">Valitse parametri</option>
                  {columns.map(column => (
                    <option key={column.key} value={column.key}>{column.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="filterConstant" component="div" />

                <label htmlFor="filterOperator"></label>
                <Field as="select" id="filterOperator" name="filterOperator">
                  <option value="≤">≤</option>
                  <option value="≥">≥</option>
                  <option value="=">=</option>
                </Field>
                <ErrorMessage name="filterOperator" component="div" />

                <label htmlFor="filterValue">Arvo:</label>
                <Field type="text" id="filterValue" name="filterValue" required/>
                <ErrorMessage name="filterValue" component="div" />

                <button type="submit" disabled={isSubmitting}>Käytä</button>
                <button type="button" onClick={handleCancelClick}>Poista</button>
              </Form>
            )}
          </Formik>
        )}
        {filters.length > 0 && (
          <div>
            {filters.map((filter, index) => (
              <div key={index}>
                <span>{filter.filterConstant} {filter.filterOperator} {filter.filterValue}</span>
                <button type="button" onClick={() => handleRemoveFilterClick(index)}>Poista</button>
              </div>
            ))}
          </div>
        )}

      </div>
      <DataGrid
        style={{
          height: "550px",
          width: "97%"
        }}
        ref={gridRef}
        columns={visibleColumnsMetadata}
        rows={filteredRows}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
        direction={direction}

      />
    </div>
  );
}

export default TableView;
