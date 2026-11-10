import { RiskSettings } from '../../types/RiskSettings.ts';

export type Change = {
  readonly name: string;
  readonly value: (settings: RiskSettings) => any;
};
