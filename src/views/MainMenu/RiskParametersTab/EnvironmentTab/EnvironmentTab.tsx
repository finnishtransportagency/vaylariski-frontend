import { Grid } from '@mui/material';

import CustomSelect from '../../../../components/CustomSelect/CustomSelect.tsx';
import { useUserInput } from '../../../../contexts/UserInputContext.tsx';

export default function EnvironmentTab() {
  const { userInput } = useUserInput();

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CustomSelect
          id="wind-speed"
          label="Tuulen nopeusluokka"
          value={
            userInput.navline.calculation_params.operating_conditions.wind_speed
          }
          onChange={() => {}}
          options={[
            {
              value: 'mild',
              label: 'Heikko (< 7 m/s)',
            },
            {
              value: 'moderate',
              label: 'Keskiverto (7 -17 m/s)',
            },
            {
              value: 'strong',
              label: 'Voimakas (> 17 m/s)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect
          id="cross-current"
          label="Poikkivirtaus [solmu]"
          value={
            userInput.navline.calculation_params.operating_conditions
              .cross_current_speed
          }
          onChange={() => {}}
          options={
            // Sisäkanavalla ei voi olla voimakasta poikkivirtausta
            userInput.navline.calculation_params.type === 'inner'
              ? [
                  {
                    value: 'negligible',
                    label: 'Olematon (0 ≤ v < 0.2 solmua)',
                  },
                  {
                    value: 'low',
                    label: 'Heikko (0.2 ≤ v < 0.5 solmua)',
                  },
                  {
                    value: 'moderate',
                    label: 'Keskiverto (0.5 ≤ v < 1.5 solmua)',
                  },
                ]
              : [
                  {
                    value: 'negligible',
                    label: 'Olematon (0 ≤ v < 0.2 solmua)',
                  },
                  {
                    value: 'low',
                    label: 'Heikko (0.2 ≤ v < 0.5 solmua)',
                  },
                  {
                    value: 'moderate',
                    label: 'Keskiverto (0.5 ≤ v < 1.5 solmua)',
                  },
                  {
                    value: 'strong',
                    label: 'Voimakas (1.5 ≤ v < 2 solmua)',
                  },
                ]
          }
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect
          id="longitudinal-current"
          label="Pitkittäisvirtaus [solmu]"
          value={
            userInput.navline.calculation_params.operating_conditions
              .longitudinal_current_speed
          }
          onChange={() => {}}
          options={[
            {
              value: 'negligible',
              label: 'Olematon (0 ≤ v < 0.2 solmua)',
            },
            {
              value: 'moderate',
              label: 'Keskiverto (0.2 ≤ v < 0.5 solmua)',
            },
            {
              value: 'strong',
              label: 'Voimakas (v ≥ 3 solmua)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect
          id="wave-height"
          label="Aallon korkeus [m]"
          value={
            userInput.navline.calculation_params.operating_conditions
              .wave_height
          }
          onChange={() => {}}
          options={[
            {
              value: 'low',
              label: 'Matala (0 ≤ h < 1 metriä)',
            },
            {
              value: 'moderate',
              label: 'Keskiverto (1 ≤ h < 3 metriä)',
            },
            {
              value: 'high',
              label: 'Korkea (h > 3 metriä)',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
