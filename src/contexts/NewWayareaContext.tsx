import { WayareaName } from '../types/WayareaName.ts';
import { WayareaContextData } from '../types/WayareaContextData.ts';
import { createContext, ReactNode, useContext, useState } from 'react';

const WayareaGetContext = createContext<WayareaContextData>({
  wayareaNames: [],
  selected: undefined,
  isChanged: false,
  isNoGdoGid: true,
  isLoaded: 0,
});
const WayareaSetContext = createContext<(data: WayareaContextData) => void>(
  () => {}
);

type Props = {
  readonly children: ReactNode;
};

function WayareaProvider({ children }: Props) {
  const [state, setState] = useState<WayareaContextData>({
    wayareaNames: [],
    selected: undefined,
    isChanged: false,
    isNoGdoGid: true,
    isLoaded: 0,
  });

  return (
    <WayareaGetContext.Provider value={state}>
      <WayareaSetContext.Provider value={setState}>
        {children}
      </WayareaSetContext.Provider>
    </WayareaGetContext.Provider>
  );
}

function useWayarea() {
  const state = useContext(WayareaGetContext);
  const setState = useContext(WayareaSetContext);

  function updateWayareaNames(wayareaNames: WayareaName[]) {
    // For now, if wayarea list changes, invalidate the selection
    // In the future, if we find the already selected wayarea in the list, keep it selected
    setState({
      ...state,
      wayareaNames,
      isChanged: false,
      isLoaded: 0,
      isNoGdoGid: true,
      selected: undefined,
    });
  }

  function setChanged(isChanged: boolean) {
    setState({
      ...state,
      isChanged,
    });
  }

  function selectWayareaName(selected?: WayareaName) {
    if (selected === state.selected) return;
    if (state.wayareaNames.length < 1) return;
    // We assume selected wayarea is one of the wayareas, if there are some
    setState({
      ...state,
      selected,
      isLoaded: 0,
    });
  }

  function setLoaded(isLoaded: number) {
    setState({
      ...state,
      isLoaded,
    });
  }

  function setNoGDOGID(isNoGdoGid: boolean) {
    setState({
      ...state,
      isNoGdoGid,
    });
  }

  return {
    wayareaNames: state.wayareaNames,
    isChanged: state.isChanged,
    isNoGdoGid: state.isNoGdoGid,
    isLoaded: state.isLoaded,
    selected: state.selected,
    updateWayareaNames,
    setChanged,
    selectWayareaName,
    setLoaded,
    setNoGDOGID,
  };
}

export { WayareaProvider, useWayarea };
