import { RivResult } from './RivResult.ts';
import { RIVTrafficLight } from './RIVTrafficLight.ts';

export type RiskContextData = {
  readonly RIVResult?: RivResult;
  readonly rivTrafficLight: RIVTrafficLight;
  readonly previousRIVResult?: RivResult;
};
