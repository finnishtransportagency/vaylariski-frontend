import { Grid } from '@mui/material';

import CustomSelect from '../../../../components/CustomSelect/CustomSelect.tsx';
import { useRiskSettings } from '../../../../contexts/RiskSettingsContext.tsx';
import {
  CrossCurrent,
  LongitudinalCurrent,
  WaveHeight,
  WindSpeed,
} from '../../../../types/EnvironmentSettings.ts';
import { ChannelType } from '../../../../types/ChannelSettings.ts';

export default function EnvironmentTab() {
  const { channel, environment } = useRiskSettings();

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CustomSelect<WindSpeed>
          id="wind-speed"
          label="Tuulen nopeusluokka"
          value={environment.wind_speed}
          onChange={() => {}}
          options={[
            {
              value: WindSpeed.MILD,
              label: 'Heikko (< 7 m/s)',
            },
            {
              value: WindSpeed.MODERATE,
              label: 'Keskiverto (7 -17 m/s)',
            },
            {
              value: WindSpeed.STRONG,
              label: 'Voimakas (> 17 m/s)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect<CrossCurrent>
          id="cross-current"
          label="Poikkivirtaus [solmu]"
          value={environment.cross_current}
          onChange={() => {}}
          options={
            // Sisäkanavalla ei voi olla voimakasta poikkivirtausta
            channel.type === ChannelType.INNER
              ? [
                  {
                    value: CrossCurrent.NEGLIGIBLE,
                    label: 'Olematon (0 ≤ v < 0.2 solmua)',
                  },
                  {
                    value: CrossCurrent.LOW,
                    label: 'Heikko (0.2 ≤ v < 0.5 solmua)',
                  },
                  {
                    value: CrossCurrent.MODERATE,
                    label: 'Keskiverto (0.5 ≤ v < 1.5 solmua)',
                  },
                ]
              : [
                  {
                    value: CrossCurrent.NEGLIGIBLE,
                    label: 'Olematon (0 ≤ v < 0.2 solmua)',
                  },
                  {
                    value: CrossCurrent.LOW,
                    label: 'Heikko (0.2 ≤ v < 0.5 solmua)',
                  },
                  {
                    value: CrossCurrent.MODERATE,
                    label: 'Keskiverto (0.5 ≤ v < 1.5 solmua)',
                  },
                  {
                    value: CrossCurrent.STRONG,
                    label: 'Voimakas (1.5 ≤ v < 2 solmua)',
                  },
                ]
          }
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect<LongitudinalCurrent>
          id="longitudinal-current"
          label="Pitkittäisvirtaus [solmu]"
          value={environment.longitudinal_current}
          onChange={() => {}}
          options={[
            {
              value: LongitudinalCurrent.NEGLIGIBLE,
              label: 'Olematon (0 ≤ v < 0.2 solmua)',
            },
            {
              value: LongitudinalCurrent.MODERATE,
              label: 'Keskiverto (0.2 ≤ v < 0.5 solmua)',
            },
            {
              value: LongitudinalCurrent.STRONG,
              label: 'Voimakas (v ≥ 3 solmua)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect<WaveHeight>
          id="wave-height"
          label="Aallon korkeus [m]"
          value={environment.wave_height}
          onChange={() => {}}
          options={[
            {
              value: WaveHeight.LOW,
              label: 'Matala (0 ≤ h < 1 metriä)',
            },
            {
              value: WaveHeight.MODERATE,
              label: 'Keskiverto (1 ≤ h < 3 metriä)',
            },
            {
              value: WaveHeight.HIGH,
              label: 'Korkea (h > 3 metriä)',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
