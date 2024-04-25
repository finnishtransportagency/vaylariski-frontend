import { useContext, useState } from "react";
import {
  Typography,
  Tooltip,
  Grid,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalculationIntervalContext from "../../contexts/CalculationIntervalContext";
import { setOneLastUsedParameter } from "utils/browserStorageHelpers";

export default function CalculationIntervalComponent(props) {
  const { formik } = props;
  const [open, setOpen] = useState(false);

  const { calculationInterval, setCalculationInterval } = useContext(
    CalculationIntervalContext
  );
  const calculationIntervalOptions = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 250, 500, 750, 1000,
  ];

  const handleChange = (event) => {
    setOneLastUsedParameter(
      formik.values,
      "calculation_interval",
      event.target.value
    );
    setCalculationInterval(event.target.value);
    formik.setFieldValue("calculation_interval", event.target.value);
  };

  const MenuOptions = () => {
    return calculationIntervalOptions.map((e) => (
      <MenuItem key={e} value={e}>
        {e}
      </MenuItem>
    ));
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  return (
    <Grid item xs={12}>
      <Typography
        id={"calculation_interval"}
        component="span"
        style={{
          fontSize: 14,
          verticalAlign: "middle",
        }}
        color="textSecondary"
      >
        Pisteiden väli (m)
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            placement="right"
            arrow
            title={
              <label style={{ fontSize: 14 }}>
                Valitse laskentapisteiden välinen etäisyys navigointilinjalla.
                Oletusarvo on 50 m.
              </label>
            }
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <IconButton onClick={handleTooltipOpen}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      </Typography>
      <Select
        required
        size={"small"}
        sx={{ width: "100%", height: 40 }}
        style={{ backgroundColor: "white" }}
        id={"calculation_interval"}
        value={calculationInterval}
        onChange={handleChange}
      >
        {MenuOptions()}
      </Select>
    </Grid>
  );
}
