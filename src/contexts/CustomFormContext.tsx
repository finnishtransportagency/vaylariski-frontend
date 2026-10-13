import * as React from 'react';
import { FormikValues } from 'formik';

type Props = {
  readonly isSubmitting: boolean;
  readonly onChange: (value: any) => void;
  readonly values: FormikValues;
  readonly children: React.ReactNode;
};

type GenericContextType = {
  readonly isSubmitting: boolean;
  readonly onChange: (value: any) => void;
  readonly values: FormikValues;
};

export type UseProps<T, V> = {
  readonly isSubmitting: boolean;
  readonly onChange: (value: V) => void;
  readonly values: T;
};

const Context = React.createContext<GenericContextType | undefined>(undefined);

function CustomFormProvider({
  isSubmitting,
  onChange,
  values,
  children,
}: Props) {
  return (
    <Context.Provider
      value={{
        isSubmitting,
        onChange,
        values,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useCustomForm<T extends FormikValues, V>(): UseProps<T, V> {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      'useCustomForm must be used in a child component of CustomForm'
    );
  }
  return {
    isSubmitting: context.isSubmitting,
    onChange: context.onChange as (value: V) => void,
    values: context.values as T,
  };
}

export { CustomFormProvider, useCustomForm };
