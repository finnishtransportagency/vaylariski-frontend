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

import { table, simpleInput } from "utils/bankClearanceWFHelpers";
import CustomRadio from "components/customInputs/CustomRadio";

export default function ChannelEdgeAndBankClearanceComponent(props) {
  const { formik } = props;
  const [open, setOpen] = useState(false);
  const [showOld, setShowOld] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  const tooltipTitle = (
    <label style={{ fontSize: 14 }}>
      Riskiarvon laskentaan valitaan väylän reunan tyyppi. Alla määritetään myös
      reunan painokerroin johon vaikuttaa reunan tyyppi sekä aluksen
      nopeusluokka. Painokerroin ja aluksen leveys kerrotaan laskennassa.
      Laskennassa voi käyttää oletusarvoja tai määrittää uudet painokertoimet.
      Klikkaamalla Näytä kaikki voi tarkastella ja muokata kertoimia eri
      nopeusluokka ja reunan tyyppi yhdistelmille.
    </label>
  );

  const RadioButtonPropsArr = [
    {
      value: "gentle_slope",
      label: "Loiva kaltevuus",
    },
    {
      value: "sloping_edges",
      label: "Viistot reunat",
    },
    {
      value: "steep_and_hard",
      label: "Jyrkkä ja kova",
    },
  ];

  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          component="span"
          style={{
            fontSize: 16,
            fontWeight: 550,
            verticalAlign: "middle",
          }}
          color="textSecondary"
          gutterBottom
        >
          Väylän reuna ja reunan painokerroin
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
        formikName={"navline.calculation_params.channel_edge"}
        formLabelText="Reunan tyyppi"
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
