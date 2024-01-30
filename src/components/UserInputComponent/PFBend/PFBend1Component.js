import { Grid } from "@mui/material";
import { useState } from "react";
import { table, headerAndTooltip } from "../../../utils/PFBendParameterHelpers";

export default function PFBend1Component(props) {
  const { formik } = props;
  const [openPFBend, setOpenPFBend] = useState(false);
  const handleTooltipClosePFBend = () => {
    setOpenPFBend(false);
  };
  const handleTooltipOpenPFBend = () => {
    setOpenPFBend((prevValue) => !prevValue);
  };
  const [openBSI, setOpenBSI] = useState(false);
  const handleTooltipCloseBSI = () => {
    setOpenBSI(false);
  };
  const handleTooltipOpenBSI = () => {
    setOpenBSI((prevValue) => !prevValue);
  };
  const PFBendtooltipTitle = (
    <label style={{ fontSize: 14 }}>
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span> on
      kerroin mutkan jyrkkyydelle suhteessa mutkan säteeseen, aluksen
      kääntösäteeseen sekä aluksen pituuteen.
    </label>
  );
  const PFBendTitle = (
    <>
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span>
    </>
  );
  const BSITooltipTitle = (
    <label style={{ fontSize: 14 }}>
      BSI = R<span style={{ verticalAlign: "sub", fontSize: 12 }}>b</span> / C
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span> * L, kun R
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>b </span>
      on säde, C<span style={{ verticalAlign: "sub", fontSize: 12 }}>
        tr
      </span>{" "}
      on kerroin, joka ilmaisee aluksen kääntösäteen ja L on aluksen pituus.{" "}
    </label>
  );
  const BSITitle = <>BSI</>;

  return (
    <Grid item container>
      <Grid item xs={12}>
        {headerAndTooltip(
          PFBendTitle,
          PFBendtooltipTitle,
          openPFBend,
          handleTooltipClosePFBend,
          handleTooltipOpenPFBend,
          BSITitle,
          BSITooltipTitle,
          openBSI,
          handleTooltipCloseBSI,
          handleTooltipOpenBSI
        )}
      </Grid>
      {table(5, formik, true)}
    </Grid>
  );
}
