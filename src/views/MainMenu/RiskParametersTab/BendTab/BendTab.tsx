import { Divider, Grid } from '@mui/material';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';
import { CustomRangeMultiplier } from '../../../../components/CustomPrefix/CustomPrefix.tsx';
import { useUserInput } from '../../../../contexts/UserInputContext.tsx';
import { CustomRangeSelect } from '../../../../components/CustomRangeSelect/CustomRangeSelect.tsx';
import { CustomTooltip } from '../../../../components/CustomTooltip/CustomTooltip.tsx';
import { CustomVariable } from '../../../../components/CustomVariable/CustomVariable.tsx';
import { ReactNode } from 'react';

export default function BendTab() {
  const { userInput } = useUserInput();

  // TODO: The input should be R_b limits directly, not some indirect BMI
  const boatLength = userInput.boat.length;
  const boatTurningRadiusCoefficient = userInput.boat.C_turning_radius;
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
          value={userInput.PF_bend_parameters.PF_bend_radius_1}
          upperLimit={userInput.PF_bend_parameters.bend_ratio_lim_1}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={userInput.PF_bend_parameters.bend_ratio_lim_1}
          value={userInput.PF_bend_parameters.PF_bend_radius_2}
          upperLimit={userInput.PF_bend_parameters.bend_ratio_lim_2}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={userInput.PF_bend_parameters.bend_ratio_lim_2}
          value={userInput.PF_bend_parameters.PF_bend_radius_3}
          upperLimit={userInput.PF_bend_parameters.bend_ratio_lim_3}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={userInput.PF_bend_parameters.bend_ratio_lim_3}
          value={userInput.PF_bend_parameters.PF_bend_radius_4}
          upperLimit={userInput.PF_bend_parameters.bend_ratio_lim_4}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit={BSI_unit}
          lowerLimit={userInput.PF_bend_parameters.bend_ratio_lim_4}
          value={userInput.PF_bend_parameters.PF_bend_radius_5}
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
          value={userInput.PF_bend_parameters.PF_bend_angle_1}
          upperLimit={userInput.PF_bend_parameters.bend_angle_lim_1}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={userInput.PF_bend_parameters.bend_angle_lim_1}
          value={userInput.PF_bend_parameters.PF_bend_angle_2}
          upperLimit={userInput.PF_bend_parameters.bend_angle_lim_2}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={userInput.PF_bend_parameters.bend_angle_lim_2}
          value={userInput.PF_bend_parameters.PF_bend_angle_3}
          upperLimit={userInput.PF_bend_parameters.bend_angle_lim_3}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={userInput.PF_bend_parameters.bend_angle_lim_3}
          value={userInput.PF_bend_parameters.PF_bend_angle_4}
          upperLimit={userInput.PF_bend_parameters.bend_angle_lim_4}
        />
      </Grid>
      <Grid size={12}>
        <CustomRangeSelect
          unit="α"
          lowerLimit={userInput.PF_bend_parameters.bend_angle_lim_4}
          value={userInput.PF_bend_parameters.PF_bend_angle_5}
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
        <CustomRangeMultiplier
          id="multipliers-sbend-1"
          value={userInput.S_bend_multipliers.S_bend_multiplier_1}
        >
          {'S-mutkan pituus ≥ '}
          {6 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-sbend-2"
          value={userInput.S_bend_multipliers.S_bend_multiplier_2}
        >
          {'S-mutkan pituus < '}
          {6 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-sbend-3"
          value={userInput.S_bend_multipliers.S_bend_multiplier_3}
        >
          {'S-mutkan pituus < '}
          {5 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-sbend-4"
          value={userInput.S_bend_multipliers.S_bend_multiplier_4}
        >
          {'S-mutkan pituus < '}
          {4 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-sbend-5"
          value={userInput.S_bend_multipliers.S_bend_multiplier_5}
        >
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
        <CustomRangeMultiplier
          id="multipliers-ubend-1"
          value={userInput.U_bend_multipliers.U_bend_multiplier_1}
        >
          {'U-mutkan pituus ≥ '}
          {5 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-ubend-2"
          value={userInput.U_bend_multipliers.U_bend_multiplier_2}
        >
          {'U-mutkan pituus < '}
          {5 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-ubend-3"
          value={userInput.U_bend_multipliers.U_bend_multiplier_3}
        >
          {'U-mutkan pituus < '}
          {4 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-ubend-4"
          value={userInput.U_bend_multipliers.U_bend_multiplier_4}
        >
          {'U-mutkan pituus < '}
          {3 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>

      <Grid size={12}>
        <CustomRangeMultiplier
          id="multipliers-ubend-5"
          value={userInput.U_bend_multipliers.U_bend_multiplier_5}
        >
          {'U-mutkan pituus < '}
          {2 * boatLength}
          {' metriä'}
        </CustomRangeMultiplier>
      </Grid>
    </Grid>
  );
}
