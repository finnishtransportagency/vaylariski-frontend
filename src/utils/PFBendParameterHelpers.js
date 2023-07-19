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
  let text;
  let whitespaceFront = false;
  let whitespaceEnd = false;
  if (n === 1) {
    text = `${symbol} <`;
    whitespaceFront = true;
  } else if (n === 5) {
    text = `≤ ${symbol}`;
    whitespaceEnd = true;
  } else {
    text = `≤ ${symbol} <`;
  }
  return (
    <Typography style={{ fontSize: 15, textAlign: "center" }}>
      {whitespaceFront ? <>&nbsp;&nbsp;</> : null}
      {text}
      {whitespaceEnd ? <>&nbsp;&nbsp;&nbsp;</> : null}
    </Typography>
  );
};

function row(n, formik, isBend1) {
  if (n < 1 || n > 5) {
    return null;
  }
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
      <Grid item xs={2} paddingBottom={0.5} justifySelf="center">
        {limText(n, symbol)}
      </Grid>
      <Grid item xs={2}>
        {n < 5 ? input(`bend_${lim}_lim_${n}`, formik) : null}
      </Grid>
    </Grid>
  );
}

export function table(n, formik, isBend1) {
  return (
    <Grid container item paddingBottom={2} spacing={1}>
      {Array.from(Array(n + 1).keys())
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
