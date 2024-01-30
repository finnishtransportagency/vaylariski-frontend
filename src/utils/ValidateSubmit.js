import { calculationTypeEnums } from "constants/enums";

const isSubmitDisabled = (
  formik,
  selectedCalculationType,
  selectedWayareaWithNoGDOGID
) => {
  return (
    selectedCalculationType == "" ||
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
        selectedWayareaWithNoGDOGID))
  );
};

export { isSubmitDisabled };
