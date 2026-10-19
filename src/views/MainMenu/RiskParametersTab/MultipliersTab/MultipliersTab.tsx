import { Grid } from '@mui/material';
import { useRiskSettings } from '../../../../contexts/RiskSettingsContext.tsx';
import CustomNumber from '../../../../components/CustomNumber/CustomNumber.tsx';

import { Divider } from '@mui/material';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';
import { CustomTooltip } from '../../../../components/CustomTooltip/CustomTooltip.tsx';
import { CustomRangeMultiplier } from '../../../../components/CustomPrefix/CustomPrefix.tsx';
import { ChannelEdge, ChannelType } from '../../../../types/ChannelSettings.ts';
import { BoatSpeed } from '../../../../types/BoatSettings.ts';
import { WindSpeed } from '../../../../types/EnvironmentSettings.ts';
import { ReactNode } from 'react';

export default function MultipliersTab() {
  const { channel, environment, boat, multipliers } = useRiskSettings();

  let shipSpeedLabel;
  switch (boat.speed) {
    case BoatSpeed.SLOW:
      shipSpeedLabel = 'Hidas alus';
      break;
    case BoatSpeed.MODERATE:
      shipSpeedLabel = 'Keskinopea alus';
      break;
    case BoatSpeed.FAST:
      shipSpeedLabel = 'Nopea alus';
      break;
  }

  let channelEdgeLabel;
  switch (channel.channel_edge) {
    case ChannelEdge.GENTLE:
      channelEdgeLabel = `${shipSpeedLabel}, loivat väylän reunat`;
      break;
    case ChannelEdge.SLOPING:
      channelEdgeLabel = `${shipSpeedLabel}, viistot väylän reunat`;
      break;
    case ChannelEdge.STEEP:
      channelEdgeLabel = `${shipSpeedLabel}, jyrkät väylän reunat`;
      break;
  }

  let windSpeedLabel;
  switch (environment.wind_speed) {
    case WindSpeed.MILD:
      windSpeedLabel = `${shipSpeedLabel}, heikko tuuli`;
      break;
    case WindSpeed.MODERATE:
      windSpeedLabel = `${shipSpeedLabel}, keskiverto tuuli`;
      break;
    case WindSpeed.STRONG:
      windSpeedLabel = `${shipSpeedLabel}, voimakas tuuli`;
      break;
  }

  let channelDepthHeader: string;
  let channelDepthDeepLabel: ReactNode;
  let channelDepthMediumLabel: ReactNode;
  let channelDepthShallowLabel: ReactNode;
  switch (channel.type) {
    case ChannelType.INNER:
      channelDepthHeader = 'Väylän sisäosan kertoimet';
      channelDepthDeepLabel = (
        <>
          {'väylän syvyys ≥ '}
          {1.5 * boat.draft} metriä
          {/* <CustomVariable variable="S" subscript="V" />
              {' ≥ 1.5 × '}
              <CustomVariable variable="S" subscript="L" /> */}
        </>
      );
      channelDepthMediumLabel = (
        <>
          {' '}
          {'väylän syvyys < '}
          {1.5 * boat.draft} metriä
          {/* 1.15 × <CustomVariable variable="S" subscript="L" /> ≤{' '}
              <CustomVariable variable="S" subscript="V" /> {'<'} 1.5 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
        </>
      );
      channelDepthShallowLabel = (
        <>
          {' '}
          {'väylän syvyys < '}
          {1.15 * boat.draft} metriä
          {/* <CustomVariable variable="S" subscript="V" /> {'<'} 1.15 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
        </>
      );
      break;
    case ChannelType.OUTER:
      channelDepthHeader = 'Väylän ulko-osan kertoimet';
      channelDepthDeepLabel = (
        <>
          {' '}
          {'väylän syvyys ≥ '}
          {1.5 * boat.draft} metriä
          {/* <CustomVariable variable="S" subscript="V" />
              {' ≥ 1.5 × '}
              <CustomVariable variable="S" subscript="L" /> */}
        </>
      );
      channelDepthMediumLabel = (
        <>
          {' '}
          {'väylän syvyys < '}
          {1.5 * boat.draft} metriä
          {/* 1.25 × <CustomVariable variable="S" subscript="L" /> ≤{' '}
              <CustomVariable variable="S" subscript="V" /> {'<'} 1.5 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
        </>
      );
      channelDepthShallowLabel = (
        <>
          {' '}
          {'väylän syvyys < '}
          {1.25 * boat.draft} metriä
          {/* <CustomVariable variable="S" subscript="V" /> {'<'} 1.25 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
        </>
      );
      break;
  }

  return (
    <Grid container size={10}>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={12}>
        <CustomText
          label="Riskiarvojen painokertoimet"
          style="big"
          textAlign="center"
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id={'weight-channel'}
          label={'Väylä'}
          step={1}
          value={multipliers.weight_factors.channel}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-visibility"
          label={'Heikentynyt näkyvyys'}
          step={1}
          value={multipliers.weight_factors.reduced_visibility}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-light-pollution"
          label={'Taustavalon voimakkuus'}
          step={1}
          value={multipliers.weight_factors.light_pollution}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id={'weight-bend'}
          label={'Mutka'}
          step={1}
          value={multipliers.weight_factors.bend}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id={'weight-s-bend'}
          label={'S-mutka'}
          step={1}
          value={multipliers.weight_factors.s_bend}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-u-bend"
          label={'U-mutka'}
          step={1}
          value={multipliers.weight_factors.u_bend}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-traffic-complexity"
          label={'Liikenteen monimutkaisuus'}
          step={1}
          value={multipliers.weight_factors.traffic_complexity}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>

      <Grid size={10}>
        <CustomText label={channelDepthHeader} style="big" textAlign="center" />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          Aluksen kölin läheisyys kanavan pohjaan vaikuttaa aluksen
          ohjailtavuuteen veden pohjavaikutuksen kautta.
          <br />
          Alla olevilla kertoimilla määritetään kuinka paljon merkitystä sille
          annetaan.
          <br />
          Laivan syväys {boat.draft} metriä on otettu huomioon alla olevissa
          raja-arvoissa.
          {/* <br />
              <CustomVariable variable="S" subscript="V" /> = väylän syvyys,{' '}
              <CustomVariable variable="S" subscript="L" /> = laivan syväys ={' '}
              {boatDraft} metriä */}
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier
          id={`channel-depth-deep-${channel.type}`}
          value={multipliers.channel_depth[channel.type].deep}
        >
          {channelDepthDeepLabel}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier
          id={`channel-depth-medium-${channel.type}`}
          value={multipliers.channel_depth[channel.type].medium}
        >
          {channelDepthMediumLabel}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier
          id={`channel-depth-shallow-${channel.type}`}
          value={multipliers.channel_depth[channel.type].shallow}
        >
          {channelDepthShallowLabel}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={10}>
        <CustomText
          style="big"
          label="Väylän reunan kerroin"
          textAlign="center"
        />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          Kanavan reunojen muoto ja jyrkkyys vaikuttavat aluksen syrjäyttämän
          veden käyttäytymiseen ja siten aluksen ohjailtavuuteen.
          <br />
          Mitä nopeammin alus kulkee, sitä enemmän vettä se syrjäyttää.
          <br />
          Alla oleva kerroin määrittää kuinka paljon merkitystä sille annetaan.
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <CustomNumber
          id={`edge_${boat.speed}_${channel.channel_edge}`}
          label={channelEdgeLabel}
          value={multipliers.channel_edge[boat.speed][channel.channel_edge]}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={10}>
        <CustomText
          label="Tuulen nopeuden kerroin"
          style="big"
          textAlign="center"
        />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          Kovan tuulen osuminen alukseen vaikuttaa aluksen ohjailtavuuteen.
          <br />
          Mitä nopeammin alus kulkee, sitä suurempi suhteellinen tuuli vaikuttaa
          alukseen.
          <br />
          Alla oleva kerroin määrittää kuinka paljon merkitystä sille annetaan.
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <CustomNumber
          id={`wind_${boat.speed}_${environment.wind_speed}`}
          label={windSpeedLabel}
          value={multipliers.wind_speed[boat.speed][environment.wind_speed]}
        />
      </Grid>
    </Grid>
  );
}
