import { BendSettings } from './BendSettings.ts';
import { BoatSettings } from './BoatSettings.ts';
import { CalculationInterval } from './CalculationInterval.ts';
import { ChannelSettings } from './ChannelSettings.ts';
import { EnvironmentSettings } from './EnvironmentSettings.ts';
import { MultiplierSettings } from './MultiplierSettings.ts';

export type RiskSettings = {
  boat: BoatSettings;
  channel: ChannelSettings;
  environment: EnvironmentSettings;
  multipliers: MultiplierSettings;
  bend: BendSettings;
  useChannelMinimumWidth: boolean;
  calculationInterval: CalculationInterval;
};
