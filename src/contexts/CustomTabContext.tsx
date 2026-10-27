import { createContext, ReactNode, useContext, useState } from 'react';

const TabGetContext = createContext<number>(0);
const TabSetContext = createContext<(tab: number) => void>(() => {});

type Props = {
  readonly children: ReactNode;
};

function CustomTabProvider({ children }: Props) {
  const [state, setState] = useState<number>(0);

  return (
    <TabGetContext.Provider value={state}>
      <TabSetContext.Provider value={setState}>
        {children}
      </TabSetContext.Provider>
    </TabGetContext.Provider>
  );
}

function useCustomTab() {
  const state = useContext(TabGetContext);
  const setState = useContext(TabSetContext);

  return {
    mainTab: state,
    setMainTab: setState,
  };
}

export { CustomTabProvider, useCustomTab };
