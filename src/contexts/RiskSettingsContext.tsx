import { RISK_SETTING_DEFAULTS } from '../constants/defaults.ts';
import { createContext, ReactNode, useContext, useState } from 'react';
import { RiskSettings } from '../types/RiskSettings.ts';
import { BendSettings } from '../types/BendSettings.ts';
import { BoatSettings } from '../types/BoatSettings.ts';
import { ChannelSettings } from '../types/ChannelSettings.ts';
import { EnvironmentSettings } from '../types/EnvironmentSettings.ts';
import { CalculationInterval } from '../types/CalculationInterval.ts';
import { MultiplierSettings } from '../types/MultiplierSettings.ts';

const SettingsGetContext = createContext<RiskSettings>(RISK_SETTING_DEFAULTS);
const SettingsSetContext = createContext<(data: RiskSettings) => void>(
  () => {}
);

type Props = {
  readonly children: ReactNode;
};

function RiskSettingProvider({ children }: Props) {
  const [state, setState] = useState<RiskSettings>(RISK_SETTING_DEFAULTS);

  return (
    <SettingsGetContext.Provider value={state}>
      <SettingsSetContext.Provider value={setState}>
        {children}
      </SettingsSetContext.Provider>
    </SettingsGetContext.Provider>
  );
}

function useRiskSettings() {
  const state = useContext(SettingsGetContext);
  const setState = useContext(SettingsSetContext);

  function setRiskSettings(riskSettings: RiskSettings) {
    setState(riskSettings);
  }

  function setUseChannelMinimumWidth(useChannelMinimumWidth: boolean) {
    setState({
      ...state,
      useChannelMinimumWidth,
    });
  }

  function setCalculationInterval(calculationInterval: CalculationInterval) {
    setState({
      ...state,
      calculationInterval,
    });
  }

  function setBendSettings(bend: BendSettings) {
    setState({
      ...state,
      bend,
    });
  }

  function setBoatSettings(boat: BoatSettings) {
    setState({
      ...state,
      boat,
    });
  }

  function setChannelSettings(channel: ChannelSettings) {
    setState({
      ...state,
      channel,
    });
  }

  function setEnvironmentSettings(environment: EnvironmentSettings) {
    setState({
      ...state,
      environment,
    });
  }

  function setMultiplierSettings(multipliers: MultiplierSettings) {
    setState({
      ...state,
      multipliers,
    });
  }

  return {
    riskSettings: state,
    boat: state.boat,
    channel: state.channel,
    environment: state.environment,
    multipliers: state.multipliers,
    bend: state.bend,
    useChannelMinimumWidth: state.useChannelMinimumWidth,
    calculationInterval: state.calculationInterval,
    setRiskSettings,
    setUseChannelMinimumWidth,
    setCalculationInterval,
    setBendSettings,
    setBoatSettings,
    setChannelSettings,
    setEnvironmentSettings,
    setMultiplierSettings,
  };
}

export { RiskSettingProvider, useRiskSettings };
