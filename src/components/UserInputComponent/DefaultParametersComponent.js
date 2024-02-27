import {
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UserInputContext from "contexts/UserInput";
import { useContext, useState, useEffect } from "react";
import userInputDefault from "constants/UserInputDefault";
import { getDiff } from "recursive-diff";
import {
  setAllLastUsedParameters,
  saveParameterTemplate,
  getParameterTemplates,
} from "utils/browserStorageHelpers";

export default function DefaultParametersComponent(props) {
  const { tabValue, tabIndex, formik, ...other } = props;
  const { setUserInput } = useContext(UserInputContext);
  const [templates, setTemplates] = useState(getParameterTemplates());
  const [templateName, setTemplateName] = useState("");
  const [selectedLoadJSONString, setSelectedLoadJSONString] = useState("");
  const [diff, setDiff] = useState([]);

  const defaults = {
    name: "Oletus parametrit",
    parameters: userInputDefault,
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
      setDiff(d);
    } else {
      setDiff([]);
    }
  };

  const handleLoadParameters = (save) => {
    const parameters = JSON.parse(save).parameters;
    setUserInput(parameters);
    setAllLastUsedParameters(parameters);
    setSelectedLoadJSONString("");
  };

  const handleSave = (name) => {
    const parameters = formik.values;
    const t = saveParameterTemplate(parameters, name);
    setTemplates(t);
    setTemplateName("");
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
        <Grid
          container
          spacing={1}
          /*className="user-input-parameters"*/
        >
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Grid item xs={4}>
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
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          ></Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          ></Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          ></Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          ></Grid>

          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Grid item xs={4}>
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
                      {`${s.name} - ${
                        new Date(s.date).toLocaleString("fi-FI", {
                          timeZone: "Europe/Helsinki",
                        }) || ""
                      }`}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div>
              <ul>
                {diff.map((_) => (
                  <li key={JSON.stringify(_)}>
                    {_.path
                      ? `${_.path.join(".")}: ${_.path.reduce(
                          (o, i) => o[i],
                          formik.values
                        )} -> ${_.val} `
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Button
              disabled={selectedLoadJSONString === ""}
              variant="contained"
              onClick={() => {
                handleLoadParameters(selectedLoadJSONString);
              }}
            >
              Lataa parametrit
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
