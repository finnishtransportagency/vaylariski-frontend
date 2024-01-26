import CustomRadio from "components/customInputs/CustomRadio";

export default function LongitudialCurrentComponent(props) {
  const { formik } = props;
  const RadioButtonPropsArr = [
    {
      value: "negligible",
      label: "Olematon",
      labelHelperText: "0 ≤ v < 0.2",
    },
    {
      value: "moderate",
      label: "Keskiverto",
      labelHelperText: "0.2 ≤ v < 0.5",
    },
    {
      value: "strong",
      label: "Voimakas",
      labelHelperText: "v ≥ 3",
    },
  ];

  return (
    <CustomRadio
      formik={formik}
      formikName={
        "navline.calculation_params.operating_conditions.longitudinal_current_speed"
      }
      defaultValue={RadioButtonPropsArr[0].value}
      buttonPropsArr={RadioButtonPropsArr}
      formLabelText="Pitkittäisvirtaus [solmu]"
    />
  );
}
