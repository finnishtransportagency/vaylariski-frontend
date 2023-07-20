import {
  TextField,
  Typography,
  Grid,
  Tooltip,
  InputLabel,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const label = (number) => {
  return (
    <InputLabel style={{ fontSize: 14 }}>
      PF
      <span style={{ verticalAlign: "sub", fontSize: 12 }}>bend{number}</span>
    </InputLabel>
  );
};

const input = (id, formik) => {
  return (
    <Tooltip
      placement="right"
      arrow
      title={formik.errors?.PF_bend_parameters?.[id]}
    >
      <span>
        <TextField
          id={"PF_bend_parameters." + id}
          error={!!formik.errors?.PF_bend_parameters?.[id]}
          InputProps={{ sx: { height: 30 } }}
          fullWidth
          inputProps={{
            step: "0.1",
          }}
          type="number"
          value={formik.values.PF_bend_parameters[id]}
          onChange={(e) => {
            formik.setFieldValue("PF_bend_parameters." + id, e.target.value);
          }}
        />
      </span>
    </Tooltip>
  );
};

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
      <Grid item xs={2}>
        {label(isBend1 ? 1 : 2)}
      </Grid>
      <Grid item xs={2}>
        {input(`PF_bend_${bend}_${n}`, formik)}
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={2}>
        {n > 1 ? input(`bend_${lim}_lim_${n - 1}`, formik) : null}
      </Grid>
      <Grid item xs={2} paddingBottom={0.5}>
        {limText(n, symbol)}
      </Grid>
      <Grid item xs={2}>
        {n < 5 ? input(`bend_${lim}_lim_${n}`, formik) : null}
      </Grid>
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
  headerTitle,
  tooltipTitle,
  state,
  handleClose,
  handleOpen
) {
  return (
    <Typography
      style={{ fontSize: 14, fontWeight: 550 }}
      color="textSecondary"
      gutterBottom
      component="span"
    >
      {headerTitle}
      <ClickAwayListener onClickAway={handleClose}>
        <Tooltip
          placement="right"
          arrow
          title={tooltipTitle}
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleClose}
          open={state}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <IconButton onClick={handleOpen}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Typography>
  );
}
