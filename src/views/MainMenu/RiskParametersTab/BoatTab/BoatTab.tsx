import { Divider, Grid } from '@mui/material';

import CustomSelect from '../../../../components/CustomSelect/CustomSelect.tsx';
import CustomAutoComplete from '../../../../components/CustomAutoComplete/CustomAutoComplete.tsx';
import {
  defaultShipToString,
  DefaultShip,
} from '../../../../types/DefaultShip.ts';
import CustomNumber from '../../../../components/CustomNumber/CustomNumber.tsx';
import { CustomReadOnlyTextField } from '../../../../components/CustomForm/CustomReadOnlyTextField.tsx';
import { useDefaultShip } from '../../../../contexts/NewBoatContext.tsx';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';
import { useRiskSettings } from '../../../../contexts/RiskSettingsContext.tsx';
import { CustomReadOnlyNumber } from '../../../../components/CustomForm/CustomReadOnlyNumber.tsx';
import { CustomVariable } from '../../../../components/CustomVariable/CustomVariable.tsx';
import {
  BoatManeuverabilityCoefficient,
  BoatSpeed,
  BoatTurningRadiusCoefficient,
} from '../../../../types/BoatSettings.ts';

export default function BoatTab() {
  const { boat } = useRiskSettings();
  const { defaultShips, selected, selectDefaultShip } = useDefaultShip();

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      {defaultShips.length > 0 && (
        <Grid size={12}>
          <CustomAutoComplete<DefaultShip>
            id="boat"
            title="Valitse alus"
            options={defaultShips}
            selected={selected}
            getLabel={defaultShipToString}
            setSelected={selectDefaultShip}
          />
        </Grid>
      )}
      {selected && (
        <>
          <Grid size={12}>
            <Divider orientation="horizontal" />
          </Grid>
          <Grid size={12}>
            <CustomText
              label="Valinnan tiedot"
              style="big"
              textAlign="center"
            />
          </Grid>
          <Grid size={3}>
            <CustomReadOnlyNumber
              id="boat-jnro"
              label="Väylän tunnus"
              value={selected?.JNRO}
            />
          </Grid>
          <Grid size={9}>
            <CustomReadOnlyTextField
              id="boat-route"
              label={'Väylän nimi'}
              value={selected?.VAY_NIMISU}
            />
          </Grid>
          <Grid size={12}>
            <CustomReadOnlyTextField
              id="boat-label"
              label={'Selite'}
              value={selected?.SELITE}
            />
          </Grid>
          <Grid size={3}>
            <CustomReadOnlyNumber
              id="boat-size"
              label={'Koko'}
              value={selected?.KOKO}
            />
          </Grid>
          <Grid size={3}>
            <CustomReadOnlyTextField
              id="boat-hull"
              label={'Runko kerroin'}
              value={selected?.RUNKO_TKERROIN}
            />
          </Grid>
        </>
      )}
      <Grid size={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid size={12}>
        <CustomText label="Aluksen tiedot" style="big" textAlign="center" />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="boat-length"
          label="Pituus (m)"
          step={0.1}
          value={boat.length}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="boat-beam"
          label="Leveys (m)"
          step={0.1}
          value={boat.beam}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="boat-draft"
          label="Syväys (m)"
          step={0.1}
          value={boat.draft}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect<BoatSpeed>
          id="boat-speed"
          label="Nopeus"
          value={boat.speed}
          onChange={() => {}}
          options={[
            {
              value: BoatSpeed.SLOW,
              label: 'Hidas (5 ≤ v < 8 solmua)',
            },
            {
              value: BoatSpeed.MODERATE,
              label: 'Keskiverto (8 ≤ v < 12 solmua)',
            },
            {
              value: BoatSpeed.FAST,
              label: 'Nopea (v ≥ 12 solmua)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect<BoatManeuverabilityCoefficient>
          id="boat-c-maneuverability"
          label={
            <>
              Ohjailtavuusparametri{' '}
              <CustomVariable variable="C" subscript="M" />
            </>
          }
          value={boat.maneuverability_coefficient}
          onChange={() => {}}
          options={[
            {
              value: BoatManeuverabilityCoefficient.GOOD,
              label:
                '1.3 - (Hyvä) - (Twin-propeller ships, RoPax ships, and cruise ships)',
            },
            {
              value: BoatManeuverabilityCoefficient.AVERAGE,
              label:
                '1.5 - (Keskiverto) - (Container ships, car carriers, RoRo ships, LNG ships, and LPG ships)',
            },
            {
              value: BoatManeuverabilityCoefficient.WEAK,
              label: '1.8 - (Heikko) - (Tankers, bulk carriers)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect<BoatTurningRadiusCoefficient>
          id="boat-turning-radius"
          label={
            <>
              Kääntösäde parametri
              <CustomVariable variable="C" subscript="tr" />
            </>
          }
          value={boat.turning_radius_coefficient}
          onChange={() => {}}
          options={[
            {
              value: BoatTurningRadiusCoefficient.PASSENGER_SHIP,
              label: '4 - (LNG ships, passenger ships)',
            },
            {
              value: BoatTurningRadiusCoefficient.SMALL_BULK_CARRIER,
              label:
                '5 - (Cargo ships, small bulk carriers, VLCCs, small tankers, refrigerated cargo carriers, ferry boats)',
            },
            {
              value: BoatTurningRadiusCoefficient.LARGE_BULK_CARRIER,
              label:
                '6 - (Small cargo ships, Panamax container ships, very large bulk carriers, Panamax bulk carriers)',
            },
            {
              value: BoatTurningRadiusCoefficient.POST_PANAMAX,
              label: '7 - (Post-Panamax container ships)',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
