import { Typography, Grid, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CustomNumber from "components/customInputs/CustomNumber";

const limText = (n, symbol) => {
  let whitespaceFront = false;
  let whitespaceEnd = false;
  if (n === 1) {
    whitespaceFront = true;
  } else if (n === 5) {
    whitespaceEnd = true;
  }
  return (
    <Grid item container>
      <Grid item sx={{ width: "33.3%" }}>
        {whitespaceFront ? null : (
          <Typography style={{ fontSize: 15, textAlign: "center" }}>
            {"≤"}
          </Typography>
        )}
      </Grid>
      <Grid item sx={{ width: "33.3%" }}>
        <Typography style={{ fontSize: 15, textAlign: "center" }}>
          {symbol}
        </Typography>
      </Grid>

      <Grid item sx={{ width: "33.3%" }}>
        {whitespaceEnd ? null : (
          <Typography style={{ fontSize: 15, textAlign: "center" }}>
            {"<"}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

function row(n, formik, isBend1) {
  const symbol = isBend1 ? "BSI" : "α";
  const bend = isBend1 ? "radius" : "angle";
  const lim = isBend1 ? "ratio" : "angle";
  return (
    <Grid container item alignItems="flex-end" spacing={1} key={n}>
      <CustomNumber
        formik={formik}
        formikName={`PF_bend_parameters.PF_bend_${bend}_${n}`}
        xs={3}
        step={0.1}
      />
      {/* <Grid item xs={1} /> */}
      {n > 1 ? (
        <CustomNumber
          formik={formik}
          formikName={`PF_bend_parameters.bend_${lim}_lim_${n - 1}`}
          xs={3}
          step={0.1}
        />
      ) : (
        <Grid item xs={3} />
      )}
      <Grid item xs={3} paddingBottom={0.5} paddingLeft={"0 !important"}>
        {limText(n, symbol)}
      </Grid>
      {n < 5 ? (
        <CustomNumber
          formik={formik}
          formikName={`PF_bend_parameters.bend_${lim}_lim_${n}`}
          xs={3}
          step={0.1}
        />
      ) : (
        <Grid item xs={3} />
      )}
    </Grid>
  );
}

export function table(numberOfRows, formik, isBend1) {
  return (
    <Grid container item paddingBottom={2} spacing={1}>
      {Array.from(Array(numberOfRows + 1).keys())
        .slice(1)
        .map((n) => row(n, formik, isBend1))}
    </Grid>
  );
}
export function headerAndTooltip(
  headerTitle1,
  tooltipTitle1,
  state1,
  handleClose1,
  handleOpen1,
  headerTitle2,
  tooltipTitle2 = null,
  state2 = null,
  handleClose2 = null,
  handleOpen2 = null
) {
  return (
    <Grid item xs={12} container alignItems="center">
      <Grid item xs={4}>
        <Typography
          style={{ fontSize: 14, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
          component="div"
        >
          {headerTitle1}
          <ClickAwayListener onClickAway={handleClose1}>
            <Tooltip
              placement="right"
              arrow
              title={tooltipTitle1}
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleClose1}
              open={state1}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton onClick={handleOpen1}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{ fontSize: 14, fontWeight: 550 }}
          color="textSecondary"
          gutterBottom
          component="div"
        >
          {headerTitle2}
          {tooltipTitle2 ? (
            <ClickAwayListener onClickAway={handleClose2}>
              <Tooltip
                placement="right"
                arrow
                title={tooltipTitle2}
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleClose2}
                open={state2}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <IconButton onClick={handleOpen2}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          ) : null}
        </Typography>
      </Grid>
    </Grid>
  );
}
