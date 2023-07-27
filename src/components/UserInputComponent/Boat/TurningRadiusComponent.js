import CustomSelect from "components/customInputs/CustomSelect";

export default function TurningRadiusComponent(props) {
  const { formik } = props;
  const options = [
    {
      value: 4,
      label: "4 - (LNG ships, passenger ships)",
    },
    {
      value: 5,
      label:
        "5 - (Cargo ships, small bulk carriers, VLCCs, small tankers, refrigerated cargo carriers, ferry boats)",
    },
    {
      value: 6,
      label:
        "6 - (Small cargo ships, Panamax container ships, very large bulk carriers, Panamax bulk carriers)",
    },
    {
      value: 7,
      label: "7 - (Post-Panamax container ships)",
    },
  ];

  return (
    <CustomSelect
      formik={formik}
      formikName={"boat.C_turning_radius"}
      label={
        <>
          Aluksen kääntösädettä kuvaava parametri C
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>tr</span>
        </>
      }
      options={options}
      xs={12}
    />
  );
}
