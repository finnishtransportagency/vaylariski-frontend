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
import { useUserInput } from '../../../../contexts/UserInputContext.tsx';
import { CustomReadOnlyNumber } from '../../../../components/CustomForm/CustomReadOnlyNumber.tsx';
import { CustomVariable } from '../../../../components/CustomVariable/CustomVariable.tsx';

export default function BoatTab() {
  const { userInput } = useUserInput();
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
          value={userInput.boat.length}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="boat-beam"
          label="Leveys (m)"
          step={0.1}
          value={userInput.boat.beam}
        />
      </Grid>
      <Grid size={4}>
        <CustomNumber
          id="boat-draft"
          label="Syväys (m)"
          step={0.1}
          value={userInput.boat.draft}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect
          id="boat-speed"
          label="Nopeus"
          value={userInput.boat.speed}
          onChange={() => {}}
          options={[
            {
              value: 'slow',
              label: 'Hidas (5 ≤ v < 8 solmua)',
            },
            {
              value: 'moderate',
              label: 'Keskiverto (8 ≤ v < 12 solmua)',
            },
            {
              value: 'fast',
              label: 'Nopea (v ≥ 12 solmua)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect
          id="boat-c-maneuverability"
          label={
            <>
              Ohjailtavuusparametri{' '}
              <CustomVariable variable="C" subscript="M" />
            </>
          }
          value={userInput.boat.C_manoeuvrability}
          onChange={() => {}}
          options={[
            {
              value: 1.3,
              label:
                '1.3 - (Hyvä) - (Twin-propeller ships, RoPax ships, and cruise ships)',
            },
            {
              value: 1.5,
              label:
                '1.5 - (Keskiverto) - (Container ships, car carriers, RoRo ships, LNG ships, and LPG ships)',
            },
            {
              value: 1.8,
              label: '1.8 - (Heikko) - (Tankers, bulk carriers)',
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <CustomSelect
          id="boat-turning-radius"
          label={
            <>
              Kääntösäde parametri
              <CustomVariable variable="C" subscript="tr" />
            </>
          }
          value={userInput.boat.C_turning_radius}
          onChange={() => {}}
          options={[
            {
              value: 4,
              label: '4 - (LNG ships, passenger ships)',
            },
            {
              value: 5,
              label:
                '5 - (Cargo ships, small bulk carriers, VLCCs, small tankers, refrigerated cargo carriers, ferry boats)',
            },
            {
              value: 6,
              label:
                '6 - (Small cargo ships, Panamax container ships, very large bulk carriers, Panamax bulk carriers)',
            },
            {
              value: 7,
              label: '7 - (Post-Panamax container ships)',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
