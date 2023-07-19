import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import { table, headerAndTooltip } from "../../utils/PFBendParameterHelpers";

export default function PFBend1Component(props) {
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
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span> on
      painokerroin mutkan jyrkkyydelle suhteessa säteeseen, aluksen
      kääntösäteeseen ja alukseen pituuteen.
      <br />
      BSI = R<span style={{ verticalAlign: "sub", fontSize: 12 }}>b</span> / C
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span> * L, kun R
      on säde, C<span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span>{" "}
      on kerroin, joka ilmaisee aluksen kääntösäteen ja L on aluksen pituus.{" "}
    </label>
  );
  const headerTitle = (
    <>
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend1</span> ja sen
      raja-arvot
    </>
  );

  return (
    <>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
        >
          Mutkan painokertoimet
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {headerAndTooltip(
          headerTitle,
          tooltipTitle,
          open,
          handleTooltipClose,
          handleTooltipOpen
        )}
      </Grid>
      {table(5, formik, true)}
    </>
  );
}
