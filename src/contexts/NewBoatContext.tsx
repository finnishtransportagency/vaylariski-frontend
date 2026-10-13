import { DefaultShip } from '../types/DefaultShip.ts';
import { DefaultShipContextData } from '../types/BoatContextData.ts';
import { createContext, ReactNode, useContext, useState } from 'react';

const DefaultShipGetContext = createContext<DefaultShipContextData>({
  defaultShips: [],
  selected: undefined,
  isLoaded: false,
});
const DefaultShipSetContext = createContext<
  (data: DefaultShipContextData) => void
>(() => {});

type Props = {
  readonly children: ReactNode;
};

function DefaultShipProvider({ children }: Props) {
  const [state, setState] = useState<DefaultShipContextData>({
    defaultShips: [],
    selected: undefined,
    isLoaded: false,
  });

  return (
    <DefaultShipGetContext.Provider value={state}>
      <DefaultShipSetContext value={setState}>{children}</DefaultShipSetContext>
    </DefaultShipGetContext.Provider>
  );
}

function useDefaultShip() {
  const state = useContext(DefaultShipGetContext);
  const setState = useContext(DefaultShipSetContext);

  function selectDefaultShip(selected?: DefaultShip) {
    if (selected === state.selected) return;
    if (state.defaultShips.length < 1) return;
    // We assume selected boat is one of the boats, if there are some
    setState({
      ...state,
      selected,
      isLoaded: false,
    });
  }

  function updateDefaultShips(defaultShips: DefaultShip[]) {
    // For now, if boat list changes, invalidate the selection
    // In the future, if we find the already selected boat in the list, keep it selected
    setState({
      defaultShips,
      selected: undefined,
      isLoaded: false,
    });
  }

  function setLoaded(isLoaded: boolean) {
    setState({
      ...state,
      isLoaded,
    });
  }

  return {
    selected: state.selected,
    defaultShips: state.defaultShips,
    isLoaded: state.isLoaded,
    selectDefaultShip,
    updateDefaultShips,
    setLoaded,
  };
}

export { DefaultShipProvider, useDefaultShip };
