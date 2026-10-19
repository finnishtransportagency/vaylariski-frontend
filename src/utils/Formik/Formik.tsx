import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Button, Tooltip } from '@mui/material';
import { Formik, Form as FForm } from 'formik';
import { ReactNode } from 'react';
import { ValidateSubmitTooltip } from '../../components/ValidateSubmitTooltip/ValidateSubmitTooltip.tsx';
import parametersValidationSchema from '../../views/MainMenu/RiskParametersTab/ParametersValidationSchema.ts';
import { RiskParameters } from '../../types/RiskParameters.ts';
import { useRisk } from '../../contexts/NewRiskContext.tsx';
import { useWayarea } from '../../contexts/NewWayareaContext.tsx';
import { useChannel } from '../../contexts/NewChannelContext.tsx';
import { useRiskSettings } from '../../contexts/RiskSettingsContext.tsx';
import userInputDefault from '../../constants/UserInputDefault.ts';

function isSubmitDisabled(
  formik: object,
  selectedWayareaWithNoGDOGID: boolean
) {
  return false;
  // return (
  //   formik.values.vaylat == null ||
  //   formik.values.vaylat == '' ||
  //   selectedWayareaWithNoGDOGID ||
  //   ((formik: object) => {
  //     if (
  //       formik?.values?.navline_angle_params &&
  //       formik.values.navline_angle_params.length > 0
  //     ) {
  //       return (
  //         formik.values.navline_angle_params.filter((row) => !row.GDO_GID)
  //           .length > 0
  //       );
  //     }
  //     return false;
  //   })(formik)
  // );
}

type Props = {
  readonly children: ReactNode;
};

export function CustomFormik({ children }: Props) {
  const {} = useRiskSettings();
  const { selected: selectedWayarea } = useWayarea();
  const { setRIVResult: setRIVResults } = useRisk();
  const { setChannelArea: setWayareaPolygon } = useChannel();

  const { isNoGdoGid } = useWayarea();
  const { previousRIVResult, setPreviousRIVResult } = useRisk();
  const submitButtonClicked = () => setPreviousRIVResult(previousRIVResult);

  return (
    <Formik
      enableReinitialize={true} //Default is false. Control whether Formik should reset the form if initialValues changes (using deep equality).
      onSubmit={(values: RiskParameters) => {
        if (selectedWayarea) {
          // fetchNavigationlineChannel(selectedWayarea.VAYLAT).then(
          //   setWayareaPolygon
          // );
          // fetchNavigationlineRisk(selectedWayarea.VAYLAT, values).then(
          //   setRIVResults
          // );
        }
      }}
      initialValues={userInputDefault}
      validationSchema={parametersValidationSchema}
    >
      {(formik) => (
        <FForm className="main-tab-formik">
          <div className="main-tab-container">
            <div className="main-tab-content">
              <div
                role="TabPanelComponent"
                id={`simple-tabpanel-0`}
                aria-labelledby={`simple-tab-0`}
                className="user-input-wrapper"
              >
                {children}
                <Tooltip
                  placement="bottom"
                  arrow
                  id="submit-button-tooltip"
                  title={ValidateSubmitTooltip(isNoGdoGid)}
                >
                  <span>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ minWidth: '1' }}
                      disabled={isSubmitDisabled(formik, isNoGdoGid)} //formik.dirty is needed to disable on initial load
                      data-cy-id="submit-button"
                      onClick={submitButtonClicked}
                    >
                      <span style={{ marginRight: '0.2em' }}>Lähetä</span>
                      {isSubmitDisabled(formik, isNoGdoGid) ? (
                        <AiOutlineInfoCircle data-cy-id="submit-disable-icon" />
                      ) : null}
                    </Button>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </FForm>
      )}
    </Formik>
  );
}
