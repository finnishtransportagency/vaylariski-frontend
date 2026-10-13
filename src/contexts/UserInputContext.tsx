import userInputDefault from '../constants/UserInputDefault.ts';
import { RiskParameters } from '../types/RiskParameters.ts';
import { createContext, ReactNode, useContext, useState } from 'react';

const UserInputGetContext = createContext<RiskParameters>(userInputDefault);
const UserInputSetContext = createContext<(data: RiskParameters) => void>(
  () => {}
);

type Props = {
  readonly children: ReactNode;
};

function UserInputProvider({ children }: Props) {
  const [state, setState] = useState<RiskParameters>(userInputDefault);

  return (
    <UserInputGetContext.Provider value={state}>
      <UserInputSetContext.Provider value={setState}>
        {children}
      </UserInputSetContext.Provider>
    </UserInputGetContext.Provider>
  );
}

function useUserInput() {
  const state = useContext(UserInputGetContext);
  const setState = useContext(UserInputSetContext);

  function setCalculationInterval(calculationInterval: number) {
    setState({ ...state, calculation_interval: calculationInterval });
  }

  return {
    userInput: state,
    calculationInterval: state.calculation_interval,
    setUserInput: setState,
    setCalculationInterval,
  };
}

export { UserInputProvider, useUserInput };
