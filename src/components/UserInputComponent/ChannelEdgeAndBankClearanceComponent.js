import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  ClickAwayListener,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";

import { table } from "utils/bankClearanceWFHelpers";

export default function ChannelEdgeAndBankClearanceComponent(props) {
  const { formik } = props;
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  const tooltipTitle = (
    <label style={{ fontSize: 14 }}>
      Riskiarvon laskentaan valitaan väylän reunan tyyppi. Alla on esitetty myös
      reunan painokertoimet joihin vaikuttaa reunan tyyppi sekä aluksen
      nopeusluokka. Painokerroin ja aluksen leveys kerrotaan laskennassa.
      Laskennassa voi käyttää oletusarvoja tai määrittää uudet painokertoimet.
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
      {table(formik)}
    </Grid>
  );
}
