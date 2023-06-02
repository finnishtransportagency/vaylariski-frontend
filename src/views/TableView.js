import {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import DataGrid from "react-data-grid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-data-grid/lib/styles.css";
import { Box, Modal, Button } from "@mui/material";
import { CSVLink } from "react-csv";
import RIVResultContext from "../contexts/RIVResult";
import NotificationContext from "contexts/NotificationContext";
import SelectedIndexContext from "contexts/SelectedIndexContext";
import { TableViewColumns as columns } from "constants/TableViewColumns";
import MapPointClickedContext from "contexts/MapPointClickedContext";
import TableRowClickedContext from "contexts/TableRowClickedContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflow: "scroll",
};

function TableView(props, { direction }) {
  const { tabValue, tabIndex, ...other } = props;
  const { RIVResults } = useContext(RIVResultContext);
  const [displayRowResults, setDisplayRowResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState([]);
  const [sortColumns, setSortColumns] = useState([]);
  const onSortColumnsChange = useCallback((sortColumns) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);
  const [open, setOpen] = useState(false);
  const { setNotificationStatus } = useContext(NotificationContext);
  const gridRef = useRef(null);
  // Index from clicked map point
  const { selectedRowIndex, setSelectedRowIndex } =
    useContext(SelectedIndexContext);
  const { mapPointClicked, setMapPointClicked } = useContext(
    MapPointClickedContext
  );
  const { setTableRowClicked } = useContext(TableRowClickedContext);

  // Open and close modal where columns are selected
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Columns that are selected visible in table
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((c) => c.key)
  );

  // Toggle selection for columns (in modal)
  const handleToggleColumn = (key) => {
    setVisibleColumns((visibleColumns) => {
      if (visibleColumns.includes(key)) {
        return visibleColumns.filter((c) => c !== key);
      } else {
        return [...visibleColumns, key];
      }
    });
  };

  // Visible rows and columns based on selected visibleColumn
  const visibleData = columns
    .filter((column) => visibleColumns.includes(column.key))
    .map((column) => ({
      ...column,
      header: column.name,
    }));

  // Handle so that all of the columns are selected
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
    if (sortColumns.length === 0) return displayRowResults;
    const { columnKey, direction } = sortColumns[0];

    let sortedRows = [...displayRowResults];

    switch (columnKey) {
      // case "GDO_GID":
      // case "RISK_INDEX_SUM":"RISK_INDEX_SUM"
      default:
        sortedRows = sortedRows.sort((a, b) => a[columnKey] - b[columnKey]);
        break;
    }
    return direction === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [displayRowResults, sortColumns]);

  // Open form where filters can be added
  const handleAddFilterClick = () => {
    setShowForm(true);
  };

  // Delete filter form
  const handleCancelClick = () => {
    setShowForm(false);
  };

  // Set added filter to table
  const handleFilterSubmit = (values, { setSubmitting }) => {
    setFilters([...filters, values]);
    setSubmitting(false);
    setShowForm(false);
  };

  // Delete created filter
  const handleRemoveFilterClick = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleCellClick = (cell) => {
    setTableRowClicked(true);
    setSelectedRowIndex(cell.row.point_index);
  };

  // Update rows based on added filters
  const filteredRows = sortedRows.filter((row) => {
    return filters.every((filter) => {
      const { filterConstant, filterOperator, filterValue } = filter;
      const rowValue = row[filterConstant];
      switch (filterOperator) {
        case "≤":
          return rowValue <= filterValue;
        case "≥":
          return rowValue >= filterValue;
        case "=":
          return rowValue == filterValue;
        default:
          return true;
      }
    });
  });

  // Create data constant to export table as csv
  const data = [
    visibleData.map((column) => column.header), // Add headers as first row
    ...filteredRows.map((row) =>
      visibleData.reduce((acc, column) => {
        acc[column.key] = row[column.key];
        return acc;
      }, {})
    ),
  ];

  // Formatting dataset before exporting
  const csvData = data.map((row) => {
    return Object.values(row).map((value) => {
      if (typeof value === "number") {
        // changing points to commas for excel
        return value.toString().replace(/\./g, ",");
      }
      if (value === null) {
        // empty cells to nan because of excel
        return (value = "nan");
      }
      return value;
    });
  });

  // Runs when a point in the map has been clicked, scrolls to the corresponding
  // row in the table
  useEffect(() => {
    if (gridRef.current && mapPointClicked) {
      gridRef.current.scrollToRow(selectedRowIndex);
      setMapPointClicked(false);
    }
  }, [selectedRowIndex]);

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      <div>
        {/* Export CSV */}
        <Button
          variant="contained"
          style={{ backgroundColor: "#ced6d8", margin: 1 }}
        >
          <CSVLink
            data={csvData}
            filename={"vaylakohtainen_riski.csv"}
            separator={";"}
          >
            Lataa CSV
          </CSVLink>
        </Button>
        {/* Select column */}
        <Button
          variant="contained"
          style={{ backgroundColor: "#ced6d8", color: "black", margin: 1 }}
          onClick={handleOpen}
        >
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
                <div key={column.key}>
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
        {/* Add filters */}
        <Button
          variant="contained"
          style={{ backgroundColor: "#ced6d8", color: "black", margin: 1 }}
          onClick={handleAddFilterClick}
        >
          Lisää filtteri
        </Button>
        {showForm && (
          <Formik
            initialValues={{
              filterConstant: "",
              filterOperator: "≤",
              filterValue: "",
            }}
            onSubmit={handleFilterSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="filterConstant">Parametri:</label>
                <Field
                  as="select"
                  id="filterConstant"
                  name="filterConstant"
                  required
                >
                  <option value="">Valitse parametri</option>
                  {columns.map((column) => (
                    <option key={column.key} value={column.key}>
                      {column.name}
                    </option>
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
                <Field
                  type="text"
                  id="filterValue"
                  name="filterValue"
                  required
                />
                <ErrorMessage name="filterValue" component="div" />

                <button type="submit" disabled={isSubmitting}>
                  Käytä
                </button>
                <button type="button" onClick={handleCancelClick}>
                  Poista
                </button>
              </Form>
            )}
          </Formik>
        )}
        {filters.length > 0 && (
          <div>
            {filters.map((filter, index) => (
              <div key={index}>
                <span>
                  {filter.filterConstant} {filter.filterOperator}{" "}
                  {filter.filterValue}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFilterClick(index)}
                >
                  Poista
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <DataGrid
        style={{
          height: "550px",
          width: "97%",
        }}
        ref={gridRef}
        columns={visibleData}
        rows={filteredRows}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
        direction={direction}
        onCellClick={(cell) => handleCellClick(cell)}
        rowClass={(row) =>
          row.point_index == selectedRowIndex ? "selected-row-bg-color" : ""
        }
      />
    </div>
  );
}

export default TableView;
