import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  ClickAwayListener,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Switch,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";

import { table, simpleInput } from "utils/bankClearanceWFHelpers";

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
      <Grid item xs={12}>
        <FormLabel id={`navline.calculation_params.channel_edge-group-label`}>
          Reunan tyyppi
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby={`navline.calculation_params.channel_edge-group-label`}
          name={"navline.calculation_params.channel_edge"}
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
          value={formik.values.navline.calculation_params.channel_edge}
          defaultValue="gentle_slope"
          onChange={(e) => {
            formik.setFieldValue(
              "navline.calculation_params.channel_edge",
              e.target.value
            );
          }}
        >
          <FormControlLabel
            value="gentle_slope"
            control={<Radio />}
            label={"Loiva kaltevuus"}
          />
          <FormControlLabel
            value="sloping_edges"
            control={<Radio />}
            label={" Viistot reunat"}
          />
          <FormControlLabel
            value="steep_and_hard"
            control={<Radio />}
            label={"Jyrkkä ja kova"}
          />
        </RadioGroup>
      </Grid>
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
