import {
  CardContent,
  Box,
  Button,
  Tooltip,
  IconButton,
  Slider,
  Switch,
  TextField,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { CSSColorCode } from '../../types/CSSColorCode.ts';
import { useNotification } from '../../contexts/NotificationContext.tsx';
import { useRisk } from '../../contexts/NewRiskContext.tsx';
import { CustomText } from '../../components/CustomText/CustomText.tsx';
import { CustomGrid } from '../../components/CustomGrid/CustomGrid.tsx';
import { CustomGridItem } from '../../components/CustomGrid/CustomGridItem.tsx';

export default function RiskTrafficLights() {
  const { RIVTrafficLight, setRIVTrafficLight } = useRisk();
  const { setNotificationStatus } = useNotification();

  const [tempRIVTrafficLight, setTempRIVTrafficLight] =
    useState(RIVTrafficLight);
  const [open, setOpen] = useState<boolean>(false);
  const [showOld, setShowOld] = useState<boolean>(false);

  const minDistance = 0;
  const maxSliderValue = 50;

  const handleChange = (
    event: any,
    newValue: number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxSliderValue - minDistance);
        setTempRIVTrafficLight({
          green: clamped + minDistance,
          yellow: clamped,
          red: maxSliderValue,
        });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setTempRIVTrafficLight({
          green: clamped - minDistance,
          yellow: clamped,
          red: maxSliderValue,
        });
      }
    } else {
      setTempRIVTrafficLight({
        green: newValue[0],
        yellow: newValue[1],
        red: maxSliderValue,
      });
    }
  };

  return (
    <CardContent>
      <CustomText
        label="Riskiarvojen esitysvärien raja-arvot:"
        style="big"
        verticalAlign="middle"
      />
      <ClickAwayListener
        onClickAway={() => {
          setOpen(false);
        }}
      >
        <Tooltip
          placement="right"
          arrow
          title={
            <label style={{ fontSize: 14 }}>
              Piste esitetään harmaana, jos siltä puuttuu leveys tai syvyys,
              mikä vaikuttaa lopulliseen riskiarvoon.
            </label>
          }
          onClose={() => {
            setOpen(false);
          }}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <IconButton
            onClick={() => {
              setOpen((prevValue) => !prevValue);
            }}
          >
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
      <CustomText
        label="Näytä numeeriset inputit"
        style="medium"
        verticalAlign="middle"
      />
      <Switch
        size="small"
        checked={showOld}
        onChange={(e) => setShowOld(e.target.checked)}
      />
      {showOld ? (
        <CustomGrid>
          <CustomGridItem
          // justifyContent="space-evenly"
          // sx={{
          //   bgcolor: CSSColorCode.GREEN_100,
          //   color: 'success.contrastText',
          //   p: 1,
          // }}
          >
            <Box>
              <label>{'RIV <'}</label>
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  height: 30,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? 'white'
                      : 'red',
                }}
                type="number"
                value={tempRIVTrafficLight.green}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    green: Number(ev.target.value),
                  })
                }
              />
            </Box>
          </CustomGridItem>
          <CustomGridItem
          // container
          // justifyContent="space-evenly"
          // sx={{
          //   bgcolor: CSSColorCode.YELLOW_100,
          //   color: CSSColorCode.BLACK_100,
          //   p: 1,
          // }}
          >
            <Box>
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  height: 30,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? 'white'
                      : 'red',
                }}
                type="number"
                value={tempRIVTrafficLight.green}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    green: Number(ev.target.value),
                  })
                }
              />
              <label>{'≤ RIV <'}</label>
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  height: 30,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? 'white'
                      : 'red',
                }}
                type="number"
                value={tempRIVTrafficLight.yellow}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    yellow: Number(ev.target.value),
                  })
                }
              />
            </Box>
          </CustomGridItem>
          <CustomGridItem
          // container
          // justifyContent="space-evenly"
          // sx={{ bgcolor: CSSColorCode.RED_100, color: 'white', p: 1 }}
          >
            <Box>
              <TextField
                error={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
                sx={{
                  width: 100,
                  height: 30,
                  backgroundColor:
                    tempRIVTrafficLight.green <= tempRIVTrafficLight.yellow
                      ? 'white'
                      : 'red',
                }}
                type="number"
                value={tempRIVTrafficLight.yellow}
                onChange={(ev) =>
                  setTempRIVTrafficLight({
                    ...tempRIVTrafficLight,
                    yellow: Number(ev.target.value),
                  })
                }
              />
              <label>{'≤ RIV'}</label>
            </Box>
          </CustomGridItem>
        </CustomGrid>
      ) : (
        <Slider
          sx={{
            width: '100%',
            height: 10,
            '& .MuiSlider-rail': {
              background: `linear-gradient(90deg, ${
                CSSColorCode.GREEN_100
              } ${(tempRIVTrafficLight.green / maxSliderValue) * 100}%, ${
                CSSColorCode.RED_100
              } ${(tempRIVTrafficLight.green / maxSliderValue) * 100}%);`,
              opacity: 1,
            },
            '& .MuiSlider-track': {
              color: CSSColorCode.YELLOW_100,
            },
            '& .MuiSlider-thumb:nth-child(odd)': {
              color: CSSColorCode.YELLOW_100,
            },
            '& .MuiSlider-thumb:nth-child(even)': {
              color: CSSColorCode.RED_100,
            },
            '& .MuiSlider-mark': {
              color: CSSColorCode.BLACK_100,
            },
            '& .MuiSlider-markLabel': {
              color: CSSColorCode.BLACK_100,
            },
          }}
          valueLabelDisplay="auto"
          value={[tempRIVTrafficLight.green, tempRIVTrafficLight.yellow]}
          step={1}
          marks={Array.from(Array(Math.round(maxSliderValue / 10) + 1).keys())
            .map((e) => e * 10)
            .map((i) => ({
              label: i,
              value: i,
            }))}
          min={0}
          max={maxSliderValue}
          onChange={handleChange}
        />
      )}
      <Tooltip
        placement="right"
        arrow
        title={
          tempRIVTrafficLight.green > tempRIVTrafficLight.yellow ? (
            <label style={{ fontSize: 14 }}>raja-arvot ovat virheellisiä</label>
          ) : (
            ''
          )
        }
      >
        <span>
          <Button
            disabled={tempRIVTrafficLight.green > tempRIVTrafficLight.yellow}
            variant="contained"
            onClick={() => {
              setRIVTrafficLight(tempRIVTrafficLight);
              setNotificationStatus({
                severity: 'success',
                message: `Raja arvot asetettu`,
                visible: true,
              });
            }}
          >
            <span style={{ marginRight: '0.2em' }}>Aseta</span>
            {tempRIVTrafficLight.green > tempRIVTrafficLight.yellow ? (
              <AiOutlineInfoCircle />
            ) : null}
          </Button>
        </span>
      </Tooltip>
      {/* Tarkista onko syvyys tai leveys np.NaN jos on niin laita trafficlight vihreäksi*/}
    </CardContent>
  );
}
