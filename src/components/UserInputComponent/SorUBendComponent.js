import { Typography, Grid, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CustomNumber from "components/customInputs/CustomNumber";

/**
 * @param {{
 *  formik: any,
 *  type: "S" | "U"
 * }} props
 * @returns {JSX.Element}
 */
export default function SorUBendComponent({ formik, type }) {
  const [open, setOpen] = useState(false);

  const bendItems = [
    [
      `${type}_bend_multipliers.${type}_bend_multiplier_1`,
      `${type == "S" ? 6 : 5} ≤ x`,
    ],
    [
      `${type}_bend_multipliers.${type}_bend_multiplier_2`,
      `${type == "S" ? 5 : 4} ≤ x < ${type == "S" ? 6 : 5}`,
    ],
    [
      `${type}_bend_multipliers.${type}_bend_multiplier_3`,
      `${type == "S" ? 4 : 3} ≤ x < ${type == "S" ? 5 : 4}`,
    ],
    [
      `${type}_bend_multipliers.${type}_bend_multiplier_4`,
      `${type == "S" ? 3 : 2} ≤ x < ${type == "S" ? 4 : 3}`,
    ],
    [
      `${type}_bend_multipliers.${type}_bend_multiplier_5`,
      `0 ≤ x < ${type == "S" ? 3 : 2}`,
    ],
  ];

  const bendRow = (item, label) => {
    return (
      <Grid container spacing={1} paddingBottom={2} key={item}>
        <Grid item xs={3}>
          {label}
        </Grid>
        <Grid item xs={9}>
          <CustomNumber formik={formik} formikName={item} xs={12} step={1} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={1} paddingBottom={2}>
      <Grid item xs={12}>
        <Typography
          style={{ fontSize: 16, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
          component="span"
        >
          {type == "S" || type == "U" ? type : "??"}-mutkan kertoimet
          raja-arvoittain
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Tooltip
              placement="right"
              arrow
              title={
                <label style={{ fontSize: 14 }}>
                  {type == "S" || type == "U" ? type : "??"}-mutkan kertoimet
                  raja-arvoittain
                </label>
              }
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setOpen(false)}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton onClick={() => setOpen((prevValue) => !prevValue)}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {type == "S" || type == "U" ? (
          bendItems.map((e) => bendRow(e[0], e[1]))
        ) : (
          <div>Incorrect type passed, set type to either S or U!</div>
        )}
      </Grid>
    </Grid>
  );
}
