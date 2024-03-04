import {
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import UserInputContext from "contexts/UserInput";
import { useContext, useState, useEffect } from "react";
import userInputDefault from "constants/UserInputDefault";
import { getDiff } from "recursive-diff";
import {
  setAllLastUsedParameters,
  saveParameterTemplate,
  getParameterTemplates,
} from "utils/browserStorageHelpers";
import SelectedWayareaLoadedContext from "contexts/SelectedWayareaLoadedContext";
import SelectedRoutelineLoadedContext from "contexts/SelectedRoutelineLoadedContext";
import SelectedBoatLoadedContext from "contexts/SelectedBoatLoadedContext";

export default function DefaultParametersComponent(props) {
  const { tabValue, tabIndex, formik, ...other } = props;
  const { setUserInput } = useContext(UserInputContext);
  const [templates, setTemplates] = useState(getParameterTemplates());
  const [templateName, setTemplateName] = useState("");
  const [selectedLoadJSONString, setSelectedLoadJSONString] = useState("");
  const [diff, setDiff] = useState([]);
  const { setSelectedWayareaLoaded } = useContext(SelectedWayareaLoadedContext);
  const { setSelectedRoutelineLoaded } = useContext(
    SelectedRoutelineLoadedContext
  );
  const { setSelectedBoatLoaded } = useContext(SelectedBoatLoadedContext);
  const defaults = {
    name: "Oletus parametrit",
    parameters: { ...userInputDefault },
  };

  useEffect(() => {
    const saves = getParameterTemplates();
    setTemplates(saves);
    updateDiff();
  }, [selectedLoadJSONString, props.tabValue]);

  const updateDiff = () => {
    if (selectedLoadJSONString && selectedLoadJSONString !== "") {
      const d = getDiff(
        formik.values,
        JSON.parse(selectedLoadJSONString).parameters
      );
      const dd = d.map((_) => {
        if (_.path) {
          const key = _.path.join("."); //can be replaced with something better
          const parameterValueNow = _.path.reduce(
            (o, i) => o[i],
            formik.values
          );
          const parameterValueTooBeLoaded = _.val;
          return { key, parameterValueNow, parameterValueTooBeLoaded };
        } else {
          return null;
        }
      });
      setDiff(dd);
    } else {
      setDiff([]);
    }
  };

  const handleLoadParameters = (parameters) => {
    setUserInput(JSON.parse(JSON.stringify(parameters)));
    setAllLastUsedParameters(parameters);
    setSelectedWayareaLoaded(1);
    setSelectedRoutelineLoaded(true);
    setSelectedBoatLoaded(true);
    setSelectedLoadJSONString("");
  };

  const handleSave = (name) => {
    const parameters = formik.values;
    const t = saveParameterTemplate(parameters, name);
    setTemplates(t);
    setTemplateName("");
  };

  const table = (rows) => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nimi</TableCell>
              <TableCell align="right">Tämänhetkinen arvo</TableCell>
              <TableCell align="right">Parametri kokoelman arvo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell align="right">{row.parameterValueNow}</TableCell>
                <TableCell align="right">
                  {row.parameterValueTooBeLoaded}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
      className="user-input-wrapper"
    >
      {tabValue === tabIndex && (
        <Grid item xs={12}>
          <Grid
            container
            spacing={1}
            paddingBottom={2}
            paddingRight={1}
            paddingLeft={2}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Grid item xs={4}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 550 }}
                  color="textSecondary"
                  gutterBottom
                >
                  Parametri kokoelmien tallentaminen
                </Typography>
                <InputLabel
                  style={{ fontSize: 14 }}
                  id={"default-parameter-name"}
                >
                  Anna parametri kokoelmalle nimi
                </InputLabel>
                <TextField
                  id="default-parameter-name"
                  size="small"
                  value={templateName}
                  fullWidth
                  onChange={(e) => {
                    setTemplateName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={3}>
                <Button
                  disabled={templateName.length < 1}
                  variant="contained"
                  onClick={() => {
                    handleSave(templateName);
                  }}
                >
                  Tallenna parametri kokoelma
                </Button>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Grid item xs={4}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 550 }}
                  color="textSecondary"
                  gutterBottom
                >
                  Parametri kokoelmien lataaminen
                </Typography>
                <InputLabel
                  style={{ fontSize: 14 }}
                  id={"default-parameter-load-name"}
                >
                  Valitse parametri kokoelma
                </InputLabel>
                <Select
                  labelId="default-parameter-load-name"
                  id="default-parameter-load-name"
                  size="small"
                  sx={{ width: "100%", height: 40 }}
                  style={{ fontSize: 14 }}
                  fullWidth
                  value={selectedLoadJSONString || ""}
                  defaultValue={""}
                  onChange={(e) => {
                    setSelectedLoadJSONString(e.target.value);
                  }}
                >
                  <MenuItem
                    key={`${defaults.name}`}
                    value={JSON.stringify(defaults)}
                  >
                    {`${defaults.name}`}
                  </MenuItem>
                  {templates.map((s) => {
                    return (
                      <MenuItem
                        key={`saves-${s.name}-${s.date}`}
                        value={JSON.stringify(s)}
                      >
                        {`${s.name} (${
                          new Date(s.date).toLocaleString("fi-FI", {
                            timeZone: "Europe/Helsinki",
                          }) || ""
                        })`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={1} />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div>{diff.length !== 0 ? table(diff) : null}</div>
            </Grid>
            <Grid item xs={3}>
              <Button
                disabled={selectedLoadJSONString === ""}
                variant="contained"
                onClick={() => {
                  handleLoadParameters(
                    JSON.parse(selectedLoadJSONString).parameters
                  );
                }}
              >
                Lataa parametrit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
