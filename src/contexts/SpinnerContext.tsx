import { createContext, ReactNode, useContext, useState } from 'react';

const SpinnerGetContext = createContext<boolean>(false);
const SpinnerSetContext = createContext<(data: boolean) => void>(() => {});

type Props = {
  readonly children: ReactNode;
};

function SpinnerProvider({ children }: Props) {
  const [state, setState] = useState<boolean>(false);
  return (
    <SpinnerGetContext.Provider value={state}>
      <SpinnerSetContext.Provider value={setState}>
        {children}
      </SpinnerSetContext.Provider>
    </SpinnerGetContext.Provider>
  );
}

function useSpinner() {
  const state = useContext(SpinnerGetContext);
  const setState = useContext(SpinnerSetContext);

  return {
    spinnerVisibility: state,
    setSpinnerVisibility: setState,
  };
}

export { SpinnerProvider, useSpinner };
