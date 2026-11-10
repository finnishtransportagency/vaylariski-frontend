import { Change } from '../services/BrowserStorage/Change.ts';
import { BEND_CHANGES, BendSettings } from './BendSettings.ts';
import { BOAT_CHANGES, BoatSettings } from './BoatSettings.ts';
import { CalculationInterval } from './CalculationInterval.ts';
import { CHANNEL_CHANGES, ChannelSettings } from './ChannelSettings.ts';
import {
  ENVIRONMENT_CHANGES,
  EnvironmentSettings,
} from './EnvironmentSettings.ts';
import {
  MULTIPLIER_CHANGES,
  MultiplierSettings,
} from './MultiplierSettings.ts';

export type RiskSettings = {
  boat: BoatSettings;
  channel: ChannelSettings;
  environment: EnvironmentSettings;
  multipliers: MultiplierSettings;
  bend: BendSettings;
  useChannelMinimumWidth: boolean;
  calculationInterval: CalculationInterval;
};

export const RISK_CHANGES: Change[] = [
  { name: 'Rajaus lähimpään reunaan', value: (s) => s.useChannelMinimumWidth },
  { name: 'Laskentapisteiden väli', value: (s) => s.calculationInterval },
  ...BOAT_CHANGES,
  ...CHANNEL_CHANGES,
  ...ENVIRONMENT_CHANGES,
  ...MULTIPLIER_CHANGES,
  ...BEND_CHANGES,
];
