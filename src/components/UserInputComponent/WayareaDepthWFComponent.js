import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import CustomNumber from "components/customInputs/CustomNumber";

export default function WayareaDepthWFComponent(props) {
  const { formik } = props;

  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen((prevValue) => !prevValue);
  };
  const boatDepth = (
    <em>
      S<span style={{ verticalAlign: "sub", fontSize: 12 }}>L</span>
    </em>
  );
  const wayareaDepth = (
    <em>
      S<span style={{ verticalAlign: "sub", fontSize: 12 }}>V</span>
    </em>
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
          Väylän syvyyden kerroin
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              placement="right"
              arrow
              title={
                <label style={{ fontSize: 14 }}>
                  Alla olevissa kentissä määritetään kertoimet, jotka
                  kerrottaessa aluksen leveydellä määrittävät syvyyden
                  vaikuttavuuden riskiarvoon. Kerroin eri navigointilinjan
                  osille määräytyy alla olevista vaihtoehdoista väylän tyypin,
                  väylän syvyyden ja aluksen syväyksen perusteella. Laskennassa
                  voi käyttää oletusarvoja tai määrittää uudet kertoimet
                  kenttiin.
                  <br />
                  <em>
                    S
                    <span style={{ verticalAlign: "sub", fontSize: 12 }}>
                      V
                    </span>{" "}
                    = väylän syvyys, {boatDepth} = laivan syväys
                  </em>
                </label>
              }
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
      <Grid item container spacing={1}>
        <Grid item xs={12}>
          <Typography color="textSecondary">Väylän sisäosa</Typography>
        </Grid>
        <CustomNumber
          formik={formik}
          formikName={"channel_depth_wf.deep_inner_channel"}
          label={
            <>
              {wayareaDepth}
              {" ≥ 1.5 × "}
              {boatDepth}
            </>
          }
        />
        <CustomNumber
          formik={formik}
          formikName={"channel_depth_wf.medium_deep_inner_channel"}
          label={
            <>
              1.15 × {boatDepth} ≤ {wayareaDepth} {"<"} 1.5 × {boatDepth}
            </>
          }
        />
        <CustomNumber
          formik={formik}
          formikName={"channel_depth_wf.shallow_inner_channel"}
          label={
            <>
              {wayareaDepth} {"<"} 1.15 × {boatDepth}
            </>
          }
        />
      </Grid>
      <Grid item container spacing={1}>
        <Grid item xs={12}>
          <Typography color="textSecondary">Väylän ulko-osa</Typography>
        </Grid>
        <CustomNumber
          formik={formik}
          formikName={"channel_depth_wf.deep_outer_channel"}
          label={
            <>
              {wayareaDepth}
              {" ≥ 1.5 × "}
              {boatDepth}
            </>
          }
        />
        <CustomNumber
          formik={formik}
          formikName={"channel_depth_wf.medium_deep_outer_channel"}
          label={
            <>
              1.25 × {boatDepth} ≤ {wayareaDepth} {"<"} 1.5 × {boatDepth}
            </>
          }
        />
        <CustomNumber
          formik={formik}
          formikName={"channel_depth_wf.shallow_outer_channel"}
          label={
            <>
              {wayareaDepth} {"<"} 1.25 × {boatDepth}
            </>
          }
        />
      </Grid>
    </Grid>
  );
}
