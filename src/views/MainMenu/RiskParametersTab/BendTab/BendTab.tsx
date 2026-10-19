import { Divider, Grid } from '@mui/material';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';
import { CustomRangeMultiplier } from '../../../../components/CustomPrefix/CustomPrefix.tsx';
import { useRiskSettings } from '../../../../contexts/RiskSettingsContext.tsx';
import { CustomRangeSelect } from '../../../../components/CustomRangeSelect/CustomRangeSelect.tsx';
import { CustomTooltip } from '../../../../components/CustomTooltip/CustomTooltip.tsx';
import { CustomVariable } from '../../../../components/CustomVariable/CustomVariable.tsx';
import { ReactNode } from 'react';

export default function BendTab() {
  const { boat, bend } = useRiskSettings();

  // TODO: The input should be R_b limits directly, not some indirect BMI
  const boatLength = boat.length;
  const boatTurningRadiusCoefficient = boat.turning_radius_coefficient;
  const boatTurningRadius = boatLength * boatTurningRadiusCoefficient;
  const BSI_unit: ReactNode = (
    <>
      <CustomVariable variable="R" subscript="b" /> / {boatTurningRadius} m
    </>
  );

  return (
    <Grid container size={12}>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={10}>
        <CustomText
          label={
            <>
              Mutkan kertoimet raja-arvoittain
              <br />
              {'('}
              <CustomVariable variable="PF" subscript="bend" />
              {')'}
            </>
          }
          style="big"
          textAlign="center"
        />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          Mutkan toistuvuus (PF) lasketaan summasta:
          <br />
          <CustomVariable variable="PF" subscript="bend" /> ={' '}
          <CustomVariable variable="PF" subscript="bend1" /> +{' '}
          <CustomVariable variable="PF" subscript="bend2" />
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={10}>
        <CustomText
          label={
            <>
              Mutkan laajuus
              <br />
              {'('}
              <CustomVariable variable="PF" subscript="bend1" />
              {')'}
            </>
          }
          style="medium"
          textAlign="center"
        />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          <CustomVariable variable="PF" subscript="bend1" /> on kerroin aluksen
          tekemän käännöksen laajuudelle.
          <br />
          Käännöksen laajuutta arvioidaan BSI:llä, joka vertaa mutkan sädettä
          aluksen kääntösäteeseen:
          <br />
          BSI = <CustomVariable variable="R" subscript="b" /> /{' ('}
          <CustomVariable variable="C" subscript="tr" /> *{' '}
          <CustomVariable variable="L" />
          {') = '}
          {BSI_unit}, kun
          <br />
          <CustomVariable variable="R" subscript="b" /> on kanavan käännöksen
          säde metreissä,
          <br />
          <CustomVariable variable="C" subscript="tr" /> on aluksen kääntösäteen
          kerroin {boatTurningRadiusCoefficient} ja
          <br />
          <CustomVariable variable="L" /> on aluksen pituus {boatLength} metriä.
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          value={bend.bend_radius[1]}
          upperLimit={bend.bend_radius_limits[1]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={bend.bend_radius_limits[1]}
          value={bend.bend_radius[2]}
          upperLimit={bend.bend_radius_limits[2]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={bend.bend_radius_limits[2]}
          value={bend.bend_radius[3]}
          upperLimit={bend.bend_radius_limits[3]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={bend.bend_radius_limits[3]}
          value={bend.bend_radius[4]}
          upperLimit={bend.bend_radius_limits[4]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={bend.bend_radius_limits[4]}
          value={bend.bend_radius[5]}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={10}>
        <CustomText
          label={
            <>
              Mutkan jyrkkyys
              <br />
              {'('}
              <CustomVariable variable="PF" subscript="bend2" />
              {')'}
            </>
          }
          style="medium"
          textAlign="center"
        />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          <CustomVariable variable="PF" subscript="bend2" /> on kerroin mutkan
          jyrkkyydelle suhteessa käännöksen suuntakulmaan (α).
          <br />
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          value={bend.bend_angle[1]}
          upperLimit={bend.bend_angle_limits[1]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={bend.bend_angle_limits[1]}
          value={bend.bend_angle[2]}
          upperLimit={bend.bend_angle_limits[2]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={bend.bend_angle_limits[2]}
          value={bend.bend_angle[3]}
          upperLimit={bend.bend_angle_limits[3]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={bend.bend_angle_limits[3]}
          value={bend.bend_angle[4]}
          upperLimit={bend.bend_angle_limits[4]}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={bend.bend_angle_limits[4]}
          value={bend.bend_angle[5]}
        />
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={10}>
        <CustomText
          label="S-mutkan kertoimet raja-arvoittain"
          style="big"
          textAlign="center"
        />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          S-mutkan riski määräytyy siitä kuinka pian sen aloittamisesta aluksen
          pitää siitä poistua.
          <br />
          Mitä pidempi alus on, sitä pidempi S-mutkan pitää olla jotta
          käännökseen ehditään reagoida.
          <br />
          Alla olevissa raja-arvoissa on jo otettu huomioon aluksen pituus{' '}
          {boatLength} metriä.
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-sbend-1" value={bend.S_bend[1]}>
          {'S-mutkan pituus ≥ '}
          {6 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-sbend-2" value={bend.S_bend[2]}>
          {'S-mutkan pituus < '}
          {6 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-sbend-3" value={bend.S_bend[3]}>
          {'S-mutkan pituus < '}
          {5 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-sbend-4" value={bend.S_bend[4]}>
          {'S-mutkan pituus < '}
          {4 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-sbend-5" value={bend.S_bend[5]}>
          {'S-mutkan pituus < '}
          {3 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={10}>
        <CustomText
          label="U-mutkan kertoimet raja-arvoittain"
          style="big"
          textAlign="center"
        />
      </Grid>
      <Grid size={2}>
        <CustomTooltip>
          U-mutkan riski määräytyy siitä kuinka pian sen aloittamisesta aluksen
          pitää siitä poistua.
          <br />
          Mitä pidempi alus on, sitä pidempi U-mutkan pitää olla jotta
          käännökseen ehditään reagoida.
          <br />
          Alla olevissa raja-arvoissa on jo otettu huomioon aluksen pituus{' '}
          {boatLength} metriä.
        </CustomTooltip>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-ubend-1" value={bend.U_bend[1]}>
          {'U-mutkan pituus ≥ '}
          {5 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-ubend-2" value={bend.U_bend[2]}>
          {'U-mutkan pituus < '}
          {5 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-ubend-3" value={bend.U_bend[3]}>
          {'U-mutkan pituus < '}
          {4 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-ubend-4" value={bend.U_bend[4]}>
          {'U-mutkan pituus < '}
          {3 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier id="multipliers-ubend-5" value={bend.U_bend[5]}>
          {'U-mutkan pituus < '}
          {2 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
    </Grid>
  );
}
