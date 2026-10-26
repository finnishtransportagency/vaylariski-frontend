import { RivResult } from '../types/RivResult.ts';
import { RiskContextData } from '../types/RiskContextData.ts';
import { RIVTrafficLight } from '../types/RIVTrafficLight.ts';
import { createContext, ReactNode, useContext, useState } from 'react';
import { RivResultProperties } from '../types/RivResultProperties.ts';

const RiskGetContext = createContext<RiskContextData>({
  rivTrafficLight: { green: 10, yellow: 30, red: 80 },
});
const RiskSetContext = createContext<(data: RiskContextData) => void>(() => {});

type Props = {
  readonly children: ReactNode;
};

function RiskProvider({ children }: Props) {
  const [state, setState] = useState<RiskContextData>({
    rivTrafficLight: { green: 10, yellow: 30, red: 80 },
  });

  return (
    <RiskGetContext.Provider value={state}>
      <RiskSetContext.Provider value={setState}>
        {children}
      </RiskSetContext.Provider>
    </RiskGetContext.Provider>
  );
}

function useRisk() {
  const state = useContext(RiskGetContext);
  const setState = useContext(RiskSetContext);

  function setRIVResult(rivResult?: RivResult) {
    setState({
      ...state,
      RIVResult: rivResult,
    });
  }

  function setRIVTrafficLight(trafficLight: RIVTrafficLight) {
    setState({
      ...state,
      rivTrafficLight: trafficLight,
    });
  }

  const results: RivResultProperties[] =
    state.RIVResult?.features.map((el) => el.properties) ?? [];

  return {
    results,
    RIVResult: state.RIVResult,
    RIVTrafficLight: state.rivTrafficLight,
    setRIVResult,
    setRIVTrafficLight,
  };
}

export { RiskProvider, useRisk };
