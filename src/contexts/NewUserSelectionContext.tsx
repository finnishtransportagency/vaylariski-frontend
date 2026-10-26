import { createContext, ReactNode, useContext, useState } from 'react';

const UserSelectionGetContext = createContext<number | undefined>(undefined);
const UserSelectionSetContext = createContext<(data?: number) => void>(
  () => {}
);

type Props = {
  readonly children: ReactNode;
};

function UserSelectionProvider({ children }: Props) {
  const [state, setState] = useState<number | undefined>(undefined);

  return (
    <UserSelectionGetContext.Provider value={state}>
      <UserSelectionSetContext.Provider value={setState}>
        {children}
      </UserSelectionSetContext.Provider>
    </UserSelectionGetContext.Provider>
  );
}

function useUserSelection() {
  const state = useContext(UserSelectionGetContext);
  const setState = useContext(UserSelectionSetContext);

  return {
    selectedRiskPointIndex: state,
    selectRiskPointIndex: setState,
  };
}

export { UserSelectionProvider, useUserSelection };
