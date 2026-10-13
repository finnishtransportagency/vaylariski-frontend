import { Grid } from '@mui/material';
import { useUserInput } from '../../../../contexts/UserInputContext.tsx';
import CustomNumber from '../../../../components/CustomNumber/CustomNumber.tsx';

import { Divider } from '@mui/material';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';
import { CustomTooltip } from '../../../../components/CustomTooltip/CustomTooltip.tsx';
import { CustomRangeMultiplier } from '../../../../components/CustomPrefix/CustomPrefix.tsx';

export default function MultipliersTab() {
  const { userInput } = useUserInput();

  const boatDraft = userInput.boat.draft;

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
          value={userInput.weightfactors.WF_channel}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-visibility"
          label={'Heikentynyt näkyvyys'}
          step={1}
          value={userInput.weightfactors.WF_reduced_visibility}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-light-pollution"
          label={'Taustavalon voimakkuus'}
          step={1}
          value={userInput.weightfactors.WF_light_pollution}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id={'weight-bend'}
          label={'Mutka'}
          step={1}
          value={userInput.weightfactors.WF_bend}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id={'weight-s-bend'}
          label={'S-mutka'}
          step={1}
          value={userInput.weightfactors.WF_s_bend}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-u-bend"
          label={'U-mutka'}
          step={1}
          value={userInput.weightfactors.WF_u_bend}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="weight-traffic-complexity"
          label={'Liikenteen monimutkaisuus'}
          step={1}
          value={userInput.weightfactors.WF_traffic_complexity}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      {userInput.navline.calculation_params.type === 'inner' && (
        <>
          <Grid size={10}>
            <CustomText
              label="Väylän sisäosan kertoimet"
              style="big"
              textAlign="center"
            />
          </Grid>
          <Grid size={2}>
            <CustomTooltip>
              Aluksen kölin läheisyys kanavan pohjaan vaikuttaa aluksen
              ohjailtavuuteen veden pohjavaikutuksen kautta.
              <br />
              Alla olevilla kertoimilla määritetään kuinka paljon merkitystä
              sille annetaan.
              <br />
              Laivan syväys {boatDraft} metriä on otettu huomioon alla olevissa
              raja-arvoissa.
              {/* <br />
              <CustomVariable variable="S" subscript="V" /> = väylän syvyys,{' '}
              <CustomVariable variable="S" subscript="L" /> = laivan syväys ={' '}
              {boatDraft} metriä */}
            </CustomTooltip>
          </Grid>
          <Grid size={12}>
            <CustomRangeMultiplier
              id="wf-channel-depth-deep-inner"
              value={userInput.channel_depth_wf.deep_inner_channel}
            >
              {'väylän syvyys ≥ '}
              {1.5 * boatDraft} metriä
              {/* <CustomVariable variable="S" subscript="V" />
              {' ≥ 1.5 × '}
              <CustomVariable variable="S" subscript="L" /> */}
            </CustomRangeMultiplier>
          </Grid>
          <Grid size={12}>
            <CustomRangeMultiplier
              id="wf-channel-depth-medium-inner"
              value={userInput.channel_depth_wf.medium_deep_inner_channel}
            >
              {'väylän syvyys < '}
              {1.5 * boatDraft} metriä
              {/* 1.15 × <CustomVariable variable="S" subscript="L" /> ≤{' '}
              <CustomVariable variable="S" subscript="V" /> {'<'} 1.5 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
            </CustomRangeMultiplier>
          </Grid>
          <Grid size={12}>
            <CustomRangeMultiplier
              id="wf-channel-depth-shallow-inner"
              value={userInput.channel_depth_wf.shallow_inner_channel}
            >
              {'väylän syvyys < '}
              {1.15 * boatDraft} metriä
              {/* <CustomVariable variable="S" subscript="V" /> {'<'} 1.15 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
            </CustomRangeMultiplier>
          </Grid>
        </>
      )}
      {userInput.navline.calculation_params.type === 'outer' && (
        <>
          <Grid size={10}>
            <CustomText
              label="Väylän ulko-osan kertoimet"
              style="big"
              textAlign="center"
            />
          </Grid>
          <Grid size={2}>
            <CustomTooltip>
              Aluksen kölin läheisyys kanavan pohjaan vaikuttaa aluksen
              ohjailtavuuteen veden pohjavaikutuksen kautta.
              <br />
              Alla olevilla kertoimilla määritetään kuinka paljon merkitystä
              sille annetaan.
              <br />
              Laivan syväys {boatDraft} metriä on otettu huomioon alla olevissa
              raja-arvoissa.
              {/* <CustomVariable variable="S" subscript="V" /> = väylän syvyys,{' '}
              <CustomVariable variable="S" subscript="L" /> = laivan syväys ={' '}
              {boatDraft} metriä */}
            </CustomTooltip>
          </Grid>
          <Grid size={12}>
            <CustomRangeMultiplier
              id="wf-channel-depth-deep-outer"
              value={userInput.channel_depth_wf.deep_outer_channel}
            >
              {'väylän syvyys ≥ '}
              {1.5 * boatDraft} metriä
              {/* <CustomVariable variable="S" subscript="V" />
              {' ≥ 1.5 × '}
              <CustomVariable variable="S" subscript="L" /> */}
            </CustomRangeMultiplier>
          </Grid>
          <Grid size={12}>
            <CustomRangeMultiplier
              id="wf-channel-depth-medium-outer"
              value={userInput.channel_depth_wf.medium_deep_outer_channel}
            >
              {'väylän syvyys < '}
              {1.5 * boatDraft} metriä
              {/* 1.25 × <CustomVariable variable="S" subscript="L" /> ≤{' '}
              <CustomVariable variable="S" subscript="V" /> {'<'} 1.5 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
            </CustomRangeMultiplier>
          </Grid>
          <Grid size={12}>
            <CustomRangeMultiplier
              id="wf-channel-depth-shallow-outer"
              value={userInput.channel_depth_wf.shallow_outer_channel}
            >
              {'väylän syvyys < '}
              {1.25 * boatDraft} metriä
              {/* <CustomVariable variable="S" subscript="V" /> {'<'} 1.25 ×{' '}
              <CustomVariable variable="S" subscript="L" /> */}
            </CustomRangeMultiplier>
          </Grid>
        </>
      )}
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

      {userInput.boat.speed === 'fast' &&
        userInput.navline.calculation_params.channel_edge ===
          'gentle_slope' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_gentle_fast`}
              label={`Nopea alus, loivat väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_gentle_fast}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'fast' &&
        userInput.navline.calculation_params.channel_edge ===
          'sloping_edges' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_sloping_fast`}
              label={`Nopea alus, viistot väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_sloping_fast}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'fast' &&
        userInput.navline.calculation_params.channel_edge ===
          'steep_and_hard' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_steep_fast`}
              label={`Nopea alus, jyrkät väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_steep_fast}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'moderate' &&
        userInput.navline.calculation_params.channel_edge ===
          'gentle_slope' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_gentle_moderate`}
              label={`Keskinopea alus, loivat väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_gentle_moderate}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'moderate' &&
        userInput.navline.calculation_params.channel_edge ===
          'sloping_edges' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_sloping_moderate`}
              label={`Keskinopea alus, viistot väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_sloping_moderate}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'moderate' &&
        userInput.navline.calculation_params.channel_edge ===
          'steep_and_hard' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_steep_moderate`}
              label={`Keskinopea alus, jyrkät väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_steep_moderate}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'slow' &&
        userInput.navline.calculation_params.channel_edge ===
          'gentle_slope' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_gentle_slow`}
              label={`Hidas alus, loiva väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_gentle_slow}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'slow' &&
        userInput.navline.calculation_params.channel_edge ===
          'sloping_edges' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_sloping_slow`}
              label={`Hidas alus, viistot väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_sloping_slow}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'slow' &&
        userInput.navline.calculation_params.channel_edge ===
          'steep_and_hard' && (
          <Grid size={12}>
            <CustomNumber
              id={`edge_category_steep_slow`}
              label={`Hidas alus, jyrkät väylän reunat`}
              value={userInput.bank_clearance_wf.edge_category_steep_slow}
            />
          </Grid>
        )}
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
      {userInput.boat.speed === 'fast' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'mild' && (
          <Grid size={12}>
            <CustomNumber
              id={`mild_wind_fast_vessel`}
              label={`Nopea alus, heikko tuuli`}
              value={userInput.wind_wf.mild_wind_fast_vessel}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'fast' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'moderate' && (
          <Grid size={12}>
            <CustomNumber
              id={`moderate_wind_fast_vessel`}
              label={`Nopea alus, keskiverto tuuli`}
              value={userInput.wind_wf.moderate_wind_fast_vessel}
            />
          </Grid>
        )}

      {userInput.boat.speed === 'fast' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'strong' && (
          <Grid size={12}>
            <CustomNumber
              id={`strong_wind_fast_vessel`}
              label={`Nopea alus, voimakas tuuli`}
              value={userInput.wind_wf.strong_wind_fast_vessel}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'moderate' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'mild' && (
          <Grid size={12}>
            <CustomNumber
              id={`mild_wind_moderate_vessel`}
              label={`Keskinopea alus, heikko tuuli`}
              value={userInput.wind_wf.mild_wind_moderate_vessel}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'moderate' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'moderate' && (
          <Grid size={12}>
            <CustomNumber
              id={`moderate_wind_moderate_vessel`}
              label={`Keskinopea alus, keskiverto tuuli`}
              value={userInput.wind_wf.moderate_wind_moderate_vessel}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'moderate' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'strong' && (
          <Grid size={12}>
            <CustomNumber
              id={`strong_wind_moderate_vessel`}
              label={`Keskinopea alus, voimakas tuuli`}
              value={userInput.wind_wf.strong_wind_moderate_vessel}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'slow' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'mild' && (
          <Grid size={12}>
            <CustomNumber
              id={`mild_wind_slow_vessel`}
              label={`Hidas alus, heikko tuuli`}
              value={userInput.wind_wf.mild_wind_slow_vessel}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'slow' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'moderate' && (
          <Grid size={12}>
            <CustomNumber
              id={`moderate_wind_slow_vessel`}
              label={`Hidas alus, keskiverto tuuli`}
              value={userInput.wind_wf.moderate_wind_slow_vessel}
            />
          </Grid>
        )}
      {userInput.boat.speed === 'slow' &&
        userInput.navline.calculation_params.operating_conditions.wind_speed ===
          'strong' && (
          <Grid size={12}>
            <CustomNumber
              id={`strong_wind_slow_vessel`}
              label={`Hidas alus, voimakas tuuli`}
              value={userInput.wind_wf.strong_wind_slow_vessel}
            />
          </Grid>
        )}
    </Grid>
  );
}
