import CustomRadio from "components/customInputs/CustomRadio";

export default function WaveHeightComponent(props) {
  const { formik } = props;

  const RadioButtonPropsArr = [
    {
      value: "low",
      label: "Matala",
      labelHelperText: "0 ≤ h < 1",
    },
    {
      value: "moderate",
      label: "Keskiverto",
      labelHelperText: "1 ≤ h < 3",
    },
    {
      value: "high",
      label: "Korkea",
      labelHelperText: "h > 3",
    },
  ];

  return (
    <CustomRadio
      formik={formik}
      formikName={"navline.calculation_params.operating_conditions.wave_height"}
      defaultValue={RadioButtonPropsArr[0].value}
      buttonPropsArr={RadioButtonPropsArr}
      formLabelText="Aallon korkeus [m]"
    />
  );
}
