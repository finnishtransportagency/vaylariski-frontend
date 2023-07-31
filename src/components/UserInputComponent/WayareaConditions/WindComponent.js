import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  ClickAwayListener,
  Switch,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import CustomRadio from "components/customInputs/CustomRadio";

import { table, simpleInput } from "utils/WindHelpers";

export default function WindComponent(props) {
  const { formik } = props;
  const [showOld, setShowOld] = useState(false);
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  const tooltipTitle = (
    <label style={{ fontSize: 14 }}>
      Riskiarvon laskentaan valitaan tuulen nopeusluokka. Alla on esitetty myös
      tuulen painokertoimet joihin vaikuttaa tuulen nopeusluokka sekä aluksen
      nopeusluokka. Painokerroin ja aluksen leveys kerrotaan laskennassa.
      Laskennassa voi käyttää oletusarvoja tai määrittää uudet painokertoimet.
      Klikkaamalla Näytä kaikki voi tarkastella ja muokata kertoimia eri tuulen
      ja aluksen nopeusluokka yhdistelmille.
    </label>
  );
  const RadioButtonPropsArr = [
    {
      value: "mild",
      label: "Heikko",
      labelHelperText: "< 7 m/s",
    },
    {
      value: "moderate",
      label: "Keskiverto",
      labelHelperText: "7 -17 m/s",
    },
    {
      value: "strong",
      label: "Voimakas",
      labelHelperText: "> 17 m/s",
    },
  ];

  return (
    <Grid item container spacing={1} paddingBottom={1}>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 16,
            verticalAlign: "middle",
          }}
          color="textSecondary"
          gutterBottom
          component="span"
        >
          Tuulen nopeusluokka
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              arrow
              placement="right"
              title={tooltipTitle}
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
      </Grid>
      <CustomRadio
        formik={formik}
        formikName={
          "navline.calculation_params.operating_conditions.wind_speed"
        }
        defaultValue={RadioButtonPropsArr[1].value}
        buttonPropsArr={RadioButtonPropsArr}
      />
      {simpleInput(formik)}
      <Grid
        item
        xs={4}
        justifyContent="center"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 275,
          }}
          color="textSecondary"
          gutterBottom
        >
          Näytä kaikki
          <Switch
            size="small"
            checked={showOld}
            onChange={(e) => setShowOld(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Typography>
      </Grid>
      {showOld ? table(formik) : null}
    </Grid>
  );
}
