import { Grid } from "@mui/material";
import { useState } from "react";
import { table, headerAndTooltip } from "../../utils/PFBendParameterHelpers";

export default function PFBend2Component(props) {
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
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span> on
      painokerroin mutkan jyrkkyydelle suhteessa suuntakulmaan (α).
      <br />
      Kulman jyrkkyyden painokerroin lasketaan summasta PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend</span> = PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>+ PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
    </label>
  );
  const headerTitle = (
    <>
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span> ja sen
      raja-arvot
    </>
  );

  return (
    <>
      <Grid item xs={12}>
        {headerAndTooltip(
          headerTitle,
          tooltipTitle,
          open,
          handleTooltipClose,
          handleTooltipOpen
        )}
      </Grid>
      {table(5, formik, false)}
    </>
  );
}
