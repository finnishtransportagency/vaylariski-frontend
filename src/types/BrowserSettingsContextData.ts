import { RiskSettings } from './RiskSettings.ts';

export type BrowserSettingsContextData = {
  readonly name: string;
  readonly inUse: boolean;
  readonly date?: Date;
  readonly settings: RiskSettings;
};
