import CustomSelect from "./CustomSelect";
/**
 *
 * @param {{
 *  formik: any,
 *  xs?: number,
 *  selectProps: {
 *    formikName: string,
 *    label: string,
 *    options: {value: string | number, label: string}[]
 *  }[],
 *  }} props
 * @returns {JSX.Element}
 */
export default function CustomMultipleSelect({ formik, xs = 6, selectProps }) {
  return (
    <>
      {selectProps.map((p) => {
        return (
          <CustomSelect
            key={p.formikName}
            formik={formik}
            formikName={p.formikName}
            label={p.label}
            options={p.options}
            xs={xs}
          />
        );
      })}
    </>
  );
}
