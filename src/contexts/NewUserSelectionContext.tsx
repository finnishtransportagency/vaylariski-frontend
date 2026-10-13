import { UserSelectionContextData } from '../types/UserSelectionContextData.ts';
import { createContext, ReactNode, useContext, useState } from 'react';

const UserSelectionGetContext = createContext<UserSelectionContextData>({
  diagramPointClicked: false,
  mapPointClicked: false,
  selectedRowId: undefined,
  tableRowClicked: false,
});
const UserSelectionSetContext = createContext<
  (data: UserSelectionContextData) => void
>(() => {});

type Props = {
  readonly children: ReactNode;
};

function UserSelectionProvider({ children }: Props) {
  const [state, setState] = useState<UserSelectionContextData>({
    diagramPointClicked: false,
    mapPointClicked: false,
    selectedRowId: undefined,
    tableRowClicked: false,
  });

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

  function setDiagramPointClicked(isClicked: boolean) {
    setState({ ...state, diagramPointClicked: isClicked });
  }
  function setMapPointClicked(isClicked: boolean) {
    setState({ ...state, mapPointClicked: isClicked });
  }
  function setSelectedRowIndex(index: string | undefined) {
    setState({ ...state, selectedRowId: index });
  }
  function setTableRowClicked(isClicked: boolean) {
    setState({ ...state, tableRowClicked: isClicked });
  }

  return {
    selectedRowId: state.selectedRowId,
    mapPointClicked: state.mapPointClicked,
    diagramPointClicked: state.diagramPointClicked,
    tableRowClicked: state.tableRowClicked,
    setSelectedRowId: setSelectedRowIndex,
    setMapPointClicked,
    setDiagramPointClicked,
    setTableRowClicked,
  };
}

export { UserSelectionProvider, useUserSelection };
