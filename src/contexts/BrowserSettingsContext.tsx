import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import useBrowserStorage from '../services/BrowserStorage/useBrowserStorage.ts';
import { useRiskSettings } from './RiskSettingsContext.tsx';
import { BrowserSettingsContextData } from '../types/BrowserSettingsContextData.ts';

const BrowserSettingsGetContext = createContext<BrowserSettingsContextData[]>(
  []
);
const BrowserSettingsSetContext = createContext<
  (contents: BrowserSettingsContextData[]) => void
>(() => {});

type Props = {
  readonly children: ReactNode;
};

function BrowserSettingsRefresh({ children }: Props) {
  const { setRiskSettings } = useRiskSettings();
  const { contents, setContents } = useBrowserSettings();
  const { saveAllToBrowserStorage, loadAllFromBrowserStorage } =
    useBrowserStorage();

  useEffect(() => {
    // On first load
    const loadedContents = loadAllFromBrowserStorage();
    const currentSettings = loadedContents.find((content) => content.inUse);
    if (!!currentSettings) {
      setRiskSettings(currentSettings.settings);
    }
    setContents(loadedContents);
  }, []);

  useEffect(() => {
    saveAllToBrowserStorage(contents);
  }, [contents]);

  return <>{children}</>;
}

function BrowserSettingsProvider({ children }: Props) {
  const [state, setState] = useState<BrowserSettingsContextData[]>([]);

  return (
    <BrowserSettingsGetContext.Provider value={state}>
      <BrowserSettingsSetContext value={setState}>
        <BrowserSettingsRefresh>{children}</BrowserSettingsRefresh>
      </BrowserSettingsSetContext>
    </BrowserSettingsGetContext.Provider>
  );
}

function useBrowserSettings() {
  const state = useContext(BrowserSettingsGetContext);
  const setState = useContext(BrowserSettingsSetContext);

  return {
    contents: state,
    setContents: setState,
  };
}

export { BrowserSettingsProvider, useBrowserSettings };
