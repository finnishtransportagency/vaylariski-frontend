import CustomSelect from "components/customInputs/CustomSelect";

export default function ManoeuvrabilityComponent(props) {
  const { formik } = props;
  const options = [
    {
      value: 1.3,
      label:
        "1.3 - (Hyvä) - (Twin-propeller ships, RoPax ships, and cruise ships)",
    },
    {
      value: 1.5,
      label:
        "1.5 - (Keskiverto) - (Container ships, car carriers, RoRo ships, LNG ships, and LPG ships)",
    },
    {
      value: 1.8,
      label: "1.8 - (Heikko) - (Tankers, bulk carriers)",
    },
  ];

  return (
    <CustomSelect
      formik={formik}
      formikName={"boat.C_manoeuvrability"}
      label={
        <>
          Aluksen ohjailtavuusparametri C
          <span style={{ verticalAlign: "sub", fontSize: 12 }}>M</span>
        </>
      }
      options={options}
      xs={12}
    />
  );
}
