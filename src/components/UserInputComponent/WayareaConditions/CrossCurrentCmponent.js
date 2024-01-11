import CustomRadio from "components/customInputs/CustomRadio";

export default function CrossCurrentCmponent(props) {
  const { formik } = props;
  const RadioButtonPropsArr = [
    {
      value: "negligible",
      label: "Olematon",
      labelHelperText: "0 ≤ v < 0.2",
    },
    {
      value: "low",
      label: "Heikko",
      labelHelperText: "0.2 ≤ v < 0.5",
    },
    {
      value: "moderate",
      label: "Keskiverto",
      labelHelperText: "0.5 ≤ v < 1.5",
    },
    {
      value: "strong",
      label: "Voimakas",
      labelHelperText: "1.5 ≤ v < 2",
      disabled: formik.values.navline.calculation_params.type == "inner",
      tooltip:
        formik.values.navline.calculation_params.type == "inner"
          ? "Voimakasta poikkivirtausta ei voi valita, jos väylän tyypi on asetettu arvolla 'Väylän sisäosa'"
          : null,
    },
  ];

  return (
    <CustomRadio
      formik={formik}
      formikName={
        "navline.calculation_params.operating_conditions.cross_current_speed"
      }
      defaultValue={RadioButtonPropsArr[0].value}
      buttonPropsArr={RadioButtonPropsArr}
      formLabelText="Poikkivirtaus (v [solmu])"
    />
  );
}
