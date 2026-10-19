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
import { useRiskSettings } from '../../../../contexts/RiskSettingsContext.tsx';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';
import { CalculationInterval } from '../../../../types/CalculationInterval.ts';
import {
  ChannelAids,
  ChannelBottom,
  ChannelEdge,
  ChannelLanes,
  ChannelLightPollution,
  ChannelTrafficComplexity,
  ChannelTrafficVolume,
  ChannelType,
} from '../../../../types/ChannelSettings.ts';

export default function ChannelTab() {
  const { wayareaNames } = useWayarea();
  const {
    calculationInterval,
    useChannelMinimumWidth,
    channel,
    setChannelSettings,
    setUseChannelMinimumWidth,
    setCalculationInterval,
  } = useRiskSettings();

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
          selected={channel.selected_channel}
          getLabel={wayareaNameToString}
          setSelected={(item) =>
            setChannelSettings({ ...channel, selected_channel: item })
          }
          toolTip={channel.selected_channel ? '' : 'Väylä tarvitaan laskentaan'}
        />
      </Grid>
      <Grid size={6} sx={{ padding: 1 }}>
        <CustomSelect<CalculationInterval>
          id="calculation_interval"
          label="Laskentapisteiden väli"
          value={calculationInterval}
          onChange={(interval) => {
            if (!interval) return;
            setCalculationInterval(interval);
          }}
          options={Object.values(CalculationInterval)
            .filter((value) => typeof value === 'number')
            .map((interval: number) => ({
              label: `${interval} m`,
              value: interval,
            }))}
        />
      </Grid>
      <Grid size={12} sx={{ padding: 1 }}>
        <CustomSwitch
          id="use-min-width"
          label="Rajaa väylän leveys sen lähimpään reunaan"
          checked={useChannelMinimumWidth}
          onChange={setUseChannelMinimumWidth}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={12}>
        <CustomText label="Väylän rakenne" style="big" textAlign="center" />
      </Grid>
      <Grid size={6}>
        <CustomSelect<ChannelLanes>
          id="channel-lanes"
          label={'Kaistat'}
          value={channel.number_of_lanes}
          onChange={(selected) => {
            if (!selected) return;
            setChannelSettings({
              ...channel,
              number_of_lanes: selected as number,
            });
          }}
          options={[
            {
              value: ChannelLanes.TWO_WAY,
              label: 'Kaksisuuntainen väylä',
            },
            {
              value: ChannelLanes.ONE_WAY,
              label: 'Yksisuuntainen väylä',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect<ChannelType>
          id="channel-type"
          label="Tyyppi"
          value={channel.type}
          onChange={() => {}}
          options={[
            {
              value: ChannelType.INNER,
              label: 'Väylän sisäosa',
            },
            {
              value: ChannelType.OUTER,
              label: 'Väylän ulko-osa',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect<ChannelBottom>
          id="channel-bottom"
          label="Pohja"
          value={channel.bottom_surface}
          onChange={() => {}}
          options={[
            {
              value: ChannelBottom.SMOOTH,
              label: 'Sileä ja pehmeä',
            },
            {
              value: ChannelBottom.ROUGH,
              label: 'Epätasainen ja kova',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect<ChannelEdge>
          id="channel-edge"
          label="Reunan tyyppi"
          value={channel.channel_edge}
          onChange={() => {}}
          options={[
            {
              value: ChannelEdge.GENTLE,
              label: 'Loiva kaltevuus',
            },
            {
              value: ChannelEdge.SLOPING,
              label: 'Viistot reunat',
            },
            {
              value: ChannelEdge.STEEP,
              label: 'Jyrkkä ja kova',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect<ChannelAids>
          id="navigation-aids"
          label="Turvalaitteet (ATN)"
          value={channel.aids_to_navigation}
          onChange={() => {}}
          options={[
            {
              value: ChannelAids.EXCELLENT,
              label: 'Erinomainen',
            },
            {
              value: ChannelAids.GOOD,
              label: 'Hyvä',
            },
            {
              value: ChannelAids.MODERATE,
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
          value={channel.visibility}
          setValue={(visibility) => {
            if (!visibility) return;
            setChannelSettings({
              ...channel,
              visibility,
            });
          }}
          step={0.1}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect<ChannelLightPollution>
          id="light-pollution"
          label="Taustavalon voimakkuus"
          value={channel.light_pollution}
          onChange={() => {}}
          options={[
            {
              value: ChannelLightPollution.NEGLIGIBLE,
              label: 'Olematon',
            },
            {
              value: ChannelLightPollution.LOW,
              label: 'Heikko',
            },
            {
              value: ChannelLightPollution.MODERATE,
              label: 'Keskiverto',
            },
            {
              value: ChannelLightPollution.HEAVY,
              label: 'Voimakas',
            },
            {
              value: ChannelLightPollution.VERY_HEAVY,
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
        <CustomSelect<ChannelTrafficVolume>
          id="traffic-volume"
          label="Liikenteen määrä"
          value={channel.traffic_volume}
          onChange={() => {}}
          options={[
            {
              value: ChannelTrafficVolume.NEGLIGIBLE,
              label: 'Olematon',
            },
            {
              value: ChannelTrafficVolume.LOW,
              label: 'Matala',
            },
            {
              value: ChannelTrafficVolume.MODERATE,
              label: 'Keskiverto',
            },
            {
              value: ChannelTrafficVolume.HEAVY,
              label: 'Runsas',
            },
            {
              value: ChannelTrafficVolume.VERY_HEAVY,
              label: 'Todella runsas',
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CustomSelect<ChannelTrafficComplexity>
          id="traffic-complexity"
          label="Liikenteen monimutkaisuus"
          value={channel.traffic_complexity}
          onChange={() => {}}
          options={[
            {
              value: ChannelTrafficComplexity.NEGLIGIBLE,
              label: 'Olematon',
            },
            {
              value: ChannelTrafficComplexity.LOW,
              label: 'Matala',
            },
            {
              value: ChannelTrafficComplexity.MODERATE,
              label: 'Keskiverto',
            },
            {
              value: ChannelTrafficComplexity.HIGH,
              label: 'Monimutkainen',
            },
            {
              value: ChannelTrafficComplexity.VERY_HIGH,
              label: 'Erittäin monimutkainen',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
