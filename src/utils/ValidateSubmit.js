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
        selectedWayareaWithNoGDOGID)) ||
    hasEmptyNavLineAngleParams(formik)
  );
};

const hasEmptyNavLineAngleParams = (formik) => {
  if (
    formik?.values?.navline_angle_params &&
    formik.values.navline_angle_params.length > 0
  ) {
    return (
      formik.values.navline_angle_params.filter((row) => row.GDO_GID === "")
        .length > 0
    );
  }
  return false;
};

export { isSubmitDisabled, hasEmptyNavLineAngleParams };
