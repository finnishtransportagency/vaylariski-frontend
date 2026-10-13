import { useState } from 'react';
import { FormikName } from './FormikName.ts';

export default function useFormik() {
  const [formik, setFormik] = useState<any>();

  function setFormikCalculationInterval(calculationInterval: number) {
    setFormikValue(FormikName.CalculationInterval, calculationInterval);
  }

  function setFormikValue(name: FormikName, value?: string | number | boolean) {
    formik.setFieldValue(name.valueOf(), value);
  }

  function getFormikValue(
    name: FormikName
  ): string | number | boolean | undefined {
    return name
      .valueOf()
      .split('.')
      .reduce((a, b) => a[b], formik.values);
  }

  function reset() {
    formik.handleReset();
  }

  function getFormikErrors(name: FormikName): string | undefined {
    return name.split('.').reduce((a, b) => a?.[b], formik.errors);
  }

  return {
    setFormik,
    setFormikCalculationInterval,
    setFormikValue,
    getFormikValue,
    getFormikErrors,
    reset,
  };
}
