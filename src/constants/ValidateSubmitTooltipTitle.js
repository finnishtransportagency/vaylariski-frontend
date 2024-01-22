import { calculationTypeEnums } from "constants/enums";

const validateSubmitTooltip = (
  formik,
  selectedCalculationType,
  selectedWayareaWithNoGDOGID
) => {
  return selectedCalculationType == "" ||
    (selectedCalculationType == calculationTypeEnums.NAVIGATIONLINE &&
      (formik.values.vaylat == null ||
        formik.values.vaylat == "" ||
        selectedWayareaWithNoGDOGID)) ||
    (selectedCalculationType == calculationTypeEnums.ROUTELINE &&
      formik.values.routename == "") ||
    (selectedCalculationType == calculationTypeEnums.COMPARE &&
      (formik.values.routename == "" ||
        formik.values.vaylat == null ||
        formik.values.vaylat == "" ||
        selectedWayareaWithNoGDOGID)) ? (
    <label style={{ fontSize: 14 }}>
      <span data-cy-id="submit-button-tooltip-span">
        Korjaa seuraavat asiat lähettääksesi arvot:
        <br />
        {/* When calculation type is not selected */}
        {selectedCalculationType == "" && <>- Laskentatapa täytyy valita</>}
        {/* When calculation type is routeline and routeline is not selected*/}
        {selectedCalculationType == calculationTypeEnums.ROUTELINE &&
          formik.values.routename == "" && <>- Valitse reitti</>}
        {/* When calculation type is navigationline and navigationline is no selected  */}
        {selectedCalculationType == calculationTypeEnums.NAVIGATIONLINE &&
          (formik.values.vaylat == null || formik.values.vaylat == "") && (
            <>- Valitse navigointilinja</>
          )}
        {/* When calculationtype is navigationline and navigationline is selected BUT there is no GDOGIDS for that navigation line */}
        {selectedCalculationType == calculationTypeEnums.NAVIGATIONLINE &&
          formik.values.vaylat !== null &&
          formik.values.vaylat !== "" &&
          selectedWayareaWithNoGDOGID && (
            <>- Valitulle väylälle ei löydy navigointilinjoja</>
          )}
        {/* When calculation type is compare and either route name or routeline is not selected */}
        {selectedCalculationType == calculationTypeEnums.COMPARE &&
          (formik.values.routename == "" ||
            formik.values.vaylat == null ||
            formik.values.vaylat == "") && (
            <>- Valitse navigointilinja ja reitti</>
          )}
        {/* When calculationtype is compare and navigationline is selected BUT there is no GDOGIDS for that navigation line */}
        {selectedCalculationType == calculationTypeEnums.COMPARE &&
          formik.values.vaylat !== null &&
          formik.values.vaylat !== "" &&
          selectedWayareaWithNoGDOGID && (
            <>- Valitulle väylälle ei löydy navigointilinjoja</>
          )}
      </span>
    </label>
  ) : null;
};
export { validateSubmitTooltip };
