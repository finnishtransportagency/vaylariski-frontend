import { Grid } from "@mui/material";
import { useState } from "react";
import { table, headerAndTooltip } from "../../utils/PFBendParameterHelpers";

export default function PFBend2Component(props) {
  const { formik } = props;
  const [openPFBend, setOpenPFBend] = useState(false);
  const handleTooltipClosePFBend = () => {
    setOpenPFBend(false);
  };
  const handleTooltipOpenPFBend = () => {
    setOpenPFBend((prevValue) => !prevValue);
  };
  const [openAngle, setOpenAngle] = useState(false);
  const handleTooltipCloseAngle = () => {
    setOpenAngle(false);
  };
  const handleTooltipOpenAngle = () => {
    setOpenAngle((prevValue) => !prevValue);
  };
  const PFBendtooltipTitle = (
    <label style={{ fontSize: 14 }}>
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span> on
      painokerroin mutkan jyrkkyydelle suhteessa suuntakulmaan (α).
      <br />
    </label>
  );
  const PFBendTitle = (
    <>
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
    </>
  );
  const angleTooltipTitle = (
    <label style={{ fontSize: 14 }}>
      Kulman jyrkkyyden painokerroin lasketaan summasta PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend</span> = PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>+ PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend2</span>
    </label>
  );
  const angleTitle = <>Suuntakulma</>;

  return (
    <>
      <Grid item xs={12}>
        {headerAndTooltip(
          PFBendTitle,
          PFBendtooltipTitle,
          openPFBend,
          handleTooltipClosePFBend,
          handleTooltipOpenPFBend,
          angleTitle,
          angleTooltipTitle,
          openAngle,
          handleTooltipCloseAngle,
          handleTooltipOpenAngle
        )}
      </Grid>
      {table(5, formik, false)}
    </>
  );
}
