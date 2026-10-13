import { Formik, Form, FormikValues } from 'formik';
import { ReactNode } from 'react';
import { CustomFormProvider } from '../../contexts/CustomFormContext.tsx';

type Props<T extends FormikValues> = {
  readonly initialValue: T;
  readonly onSubmit: (values: T) => void;
  readonly children: ReactNode;
};

export function CustomForm<T extends FormikValues>({
  initialValue,
  onSubmit,
  children,
}: Props<T>) {
  function handleSubmit(
    values: T,
    props: { setSubmitting: (isSubmitting: boolean) => void }
  ) {
    props.setSubmitting(false);
    onSubmit(values);
  }

  return (
    <Formik<T> initialValues={initialValue} onSubmit={handleSubmit}>
      {({ isSubmitting, handleChange, values }) => (
        <CustomFormProvider
          isSubmitting={isSubmitting}
          onChange={(value) => handleChange(value)}
          values={values}
        >
          <Form>{children}</Form>
        </CustomFormProvider>
      )}
    </Formik>
  );
}
