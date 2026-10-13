import { Button, InputLabel, TextField } from '@mui/material';

import { Stack } from '@mui/system';
import { FieldArray } from 'formik';
import { useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlined';

import BendAngleIcon from '../../../../components/BendAngleIcon/BendAngleIcon.tsx';
import BendAngleIconSelected from '../../../../components/BendAngleIcon/BendAngleIconSelected.tsx';
import BendRadiusIcon from '../../../../components/BendRadiusIcon/BendRadiusIcon.tsx';
import BendRadiusIconSelected from '../../../../components/BendRadiusIcon/BendRadiusIconSelected.tsx';
import SBendIcon from '../../../../components/SBendIcon/SBendIcon.tsx';
import SBendIconSelected from '../../../../components/SBendIcon/SBendIconSelected.tsx';
import useOverrideTab from './useOverrideTab.ts';
import CustomAutoComplete from '../../../../components/CustomAutoComplete/CustomAutoComplete.tsx';
import { CustomText } from '../../../../components/CustomText/CustomText.tsx';
import { RiskParameters } from '../../../../types/RiskParameters.ts';

type Props = {
  readonly values: RiskParameters;
  // formik.handleChange(e);
  readonly onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

{
  /* Käyttäjän voi halutessaan ylikirjottaa kannassa lasketut SADE, BEND_ANGLE, S_BEND arvot antamilleen navigointilinjoille (GDO_GID) */
}
export default function OverrideTab({ values, onChange }: Props) {
  const {
    newAngle,
    allGDOGIDs,
    selectedWayarea,
    selectedGDO_GIDs,
    textFieldHasContent,
    handleMenuItemClick,
    handleRemoveRow,
    updateSelectedWayarea,
    updateNavlineParameters,
    handleTextFieldChange,
  } = useOverrideTab();

  useEffect(() => {
    updateSelectedWayarea();
  }, [selectedWayarea]);

  useEffect(() => {
    updateNavlineParameters();
  }, [values.navline_angle_params]);

  return (
    <div className="user-input-grid">
      <div className="user-input-parameters">
        <div className="user-input-new-parameters">
          <CustomText
            label="Voit muokata laskentaa varten navigointilinjojen mutkan sädettä,
            suuntakulmaa ja/tai S-mutkan pituutta. Tee valitulle
            navigointilinjalle (GDO_GID) kaikki haluamasi muutokset samalle
            riville."
            style="big"
          />
          <FieldArray name="navline_angle_params">
            {({ push }) => (
              <div>
                {values.navline_angle_params.length > 0 &&
                  values.navline_angle_params.map((el, index) => (
                    <Stack direction="row" spacing={1} key={index}>
                      <CustomAutoComplete<number>
                        id={`navline_angle_params.${index}.GDO_GID`}
                        title="GDO_GID"
                        options={allGDOGIDs}
                        selected={selectedGDO_GIDs[index] ?? undefined}
                        getLabel={(opt?: number) => opt?.toString() ?? ''}
                        setSelected={(item?: number) =>
                          handleMenuItemClick(item, index)
                        }
                        toolTip={
                          selectedGDO_GIDs[index] ? '' : 'GDO_GID vaaditaan'
                        }
                      ></CustomAutoComplete>

                      <InputLabel style={{ fontSize: 14 }}>Säde</InputLabel>

                      <TextField
                        fullWidth
                        sx={{ height: 40 }}
                        name={`navline_angle_params.${index}.SADE`}
                        value={values.navline_angle_params[index]?.SADE || ''}
                        onChange={(e) => {
                          onChange(e);
                          handleTextFieldChange(index, 'SADE', e.target.value);
                        }}
                        type="float"
                      />

                      {textFieldHasContent[index]?.bend_radius ? (
                        <BendRadiusIconSelected />
                      ) : (
                        <BendRadiusIcon />
                      )}

                      <InputLabel style={{ fontSize: 14 }}>
                        Suuntakulma
                      </InputLabel>

                      <TextField
                        fullWidth
                        sx={{ height: 40 }}
                        name={`navline_angle_params.${index}.BEND_ANGLE`}
                        value={
                          values.navline_angle_params[index]?.BEND_ANGLE || ''
                        }
                        onChange={(e) => {
                          onChange(e);
                          handleTextFieldChange(
                            index,
                            'BEND_ANGLE',
                            e.target.value
                          );
                        }}
                        type="float"
                      />

                      {textFieldHasContent[index]?.bend_angle ? (
                        <BendAngleIconSelected />
                      ) : (
                        <BendAngleIcon />
                      )}

                      <InputLabel style={{ fontSize: 14 }}>
                        S-mutkan pituus
                      </InputLabel>

                      <TextField
                        fullWidth
                        sx={{ height: 40 }}
                        name={`navline_angle_params.${index}.S_BEND`}
                        value={values.navline_angle_params[index]?.S_BEND || ''}
                        onChange={(e) => {
                          onChange(e);
                          handleTextFieldChange(
                            index,
                            'S_BEND',
                            e.target.value
                          );
                        }}
                        type="float"
                      />

                      {textFieldHasContent[index]?.bend_S_length ? (
                        <SBendIconSelected />
                      ) : (
                        <SBendIcon />
                      )}
                      <Button
                        onClick={() => {
                          handleRemoveRow(index);
                        }}
                        style={{ marginTop: 12 }}
                      >
                        <RemoveCircleOutlineIcon style={{ margin: 3 }} />
                        Poista
                      </Button>
                    </Stack>
                  ))}
                <Button
                  variant="contained"
                  style={{ marginBottom: 10 }}
                  onClick={() => push(newAngle)}
                >
                  <AddCircleOutlineIcon style={{ marginRight: 3 }} />
                  Lisää uusi mutkan parametri
                </Button>
              </div>
            )}
          </FieldArray>
        </div>
      </div>
    </div>
  );
}
