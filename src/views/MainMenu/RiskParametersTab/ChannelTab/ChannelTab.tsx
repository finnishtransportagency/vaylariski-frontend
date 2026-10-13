import { Divider, Grid } from '@mui/material';
import { useWayarea } from '../../../../contexts/NewWayareaContext.tsx';
import {
  WayareaName,
  wayareaNameToString,
} from '../../../../types/WayareaName.ts';
import CustomAutoComplete from '../../../../components/CustomAutoComplete/CustomAutoComplete.tsx';
import CustomNumber from '../../../../components/CustomNumber/CustomNumber.tsx';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect.tsx';
import { CustomSwitch } from '../../../../components/CustomSwitch/CustomSwitch.tsx';
import { useUserInput } from '../../../../contexts/UserInputContext.tsx';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';

export default function ChannelTab() {
  const { wayareaNames, selected, selectWayareaName } = useWayarea();
  const { userInput } = useUserInput();

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={6}>
        <CustomAutoComplete<WayareaName>
          id="vayla"
          title="Väylä"
          options={wayareaNames}
          selected={selected}
          getLabel={wayareaNameToString}
          setSelected={selectWayareaName}
          toolTip={selected ? '' : 'Väylä tarvitaan laskentaan'}
        />
      </Grid>
      <Grid size={6} sx={{ padding: 1 }}>
        <CustomSelect
          id="calculation_interval"
          label="Laskentapisteiden väli"
          value={userInput.calculation_interval}
          onChange={() => {}}
          options={[
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 250, 500, 750, 1000,
          ].map((interval: number) => ({
            label: `${interval} m`,
            value: interval,
          }))}
        />
      </Grid>
      <Grid size={12} sx={{ padding: 1 }}>
        <CustomSwitch
          id="use-min-width"
          label="Rajaa väylän leveys sen lähimpään reunaan"
          checked={
            userInput.navline.calculation_params.use_new_width_calculation
          }
          onChange={(checked: boolean) => {
            console.error(`TODO: Checked: ${checked}`);
          }}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={12}>
        <CustomText label="Väylän rakenne" style="big" textAlign="center" />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="channel-lanes"
          label={'Kaistat'}
          value={userInput.navline.calculation_params.number_of_lanes}
          onChange={() => {}}
          options={[
            {
              value: 2,
              label: 'Kaksisuuntainen väylä',
            },
            {
              value: 1,
              label: 'Yksisuuntainen väylä',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="channel-type"
          label="Tyyppi"
          value={userInput.navline.calculation_params.type}
          onChange={() => {}}
          options={[
            {
              value: 'inner',
              label: 'Väylän sisäosa',
            },
            {
              value: 'outer',
              label: 'Väylän ulko-osa',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="channel-bottom"
          label="Pohja"
          value={userInput.navline.calculation_params.bottom_surface}
          onChange={() => {}}
          options={[
            {
              value: 'smooth_and_soft',
              label: 'Sileä ja pehmeä',
            },
            {
              value: 'rough_and_hard',
              label: 'Epätasainen ja kova',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="channel-edge"
          label="Reunan tyyppi"
          value={userInput.navline.calculation_params.channel_edge}
          onChange={() => {}}
          options={[
            {
              value: 'gentle_slope',
              label: 'Loiva kaltevuus',
            },
            {
              value: 'sloping_edges',
              label: 'Viistot reunat',
            },
            {
              value: 'steep_and_hard',
              label: 'Jyrkkä ja kova',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="navigation-aids"
          label="Turvalaitteet (ATN)"
          value={userInput.navline.calculation_params.aids_to_navigation}
          onChange={() => {}}
          options={[
            {
              value: 'excellent',
              label: 'Erinomainen',
            },
            {
              value: 'good',
              label: 'Hyvä',
            },
            {
              value: 'moderate',
              label: 'Keskiverto',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={12}>
        <CustomText label="Väylän näkyvyys" style="big" textAlign="center" />
      </Grid>
      <Grid size={6}>
        <CustomNumber
          id="navline-visibility"
          label="Näkyvyys (m)"
          value={userInput.navline.calculation_params.other.visibility}
          step={0.1}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="light-pollution"
          label="Taustavalon voimakkuus"
          value={userInput.navline.calculation_params.other.light_pollution}
          onChange={() => {}}
          options={[
            {
              value: 'negligible',
              label: 'Olematon',
            },
            {
              value: 'low',
              label: 'Heikko',
            },
            {
              value: 'moderate',
              label: 'Keskiverto',
            },
            {
              value: 'heavy',
              label: 'Voimakas',
            },
            {
              value: 'very_heavy',
              label: 'Todella voimakas',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={12}>
        <CustomText label="Väylän liikenne" style="big" textAlign="center" />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="traffic-volume"
          label="Liikenteen määrä"
          value={userInput.navline.calculation_params.other.traffic_volume}
          onChange={() => {}}
          options={[
            {
              value: 'negligible',
              label: 'Olematon',
            },
            {
              value: 'low',
              label: 'Matala',
            },
            {
              value: 'moderate',
              label: 'Keskiverto',
            },
            {
              value: 'heavy',
              label: 'Runsas',
            },
            {
              value: 'very_heavy',
              label: 'Todella runsas',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect
          id="traffic-complexity"
          label="Liikenteen monimutkaisuus"
          value={userInput.navline.calculation_params.other.traffic_complexity}
          onChange={() => {}}
          options={[
            {
              value: 'negligible',
              label: 'Olematon',
            },
            {
              value: 'low',
              label: 'Matala',
            },
            {
              value: 'moderate',
              label: 'Keskiverto',
            },
            {
              value: 'high',
              label: 'Monimutkainen',
            },
            {
              value: 'very_high',
              label: 'Erittäin monimutkainen',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
