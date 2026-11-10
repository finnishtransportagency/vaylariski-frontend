import { Change } from '../services/BrowserStorage/Change.ts';

export type EnvironmentSettings = {
  readonly wind_speed: WindSpeed;
  readonly cross_current: CrossCurrent;
  readonly longitudinal_current: LongitudinalCurrent;
  readonly wave_height: WaveHeight;
};

export enum WindSpeed {
  MILD = 'mild',
  MODERATE = 'moderate',
  STRONG = 'strong',
}
export enum CrossCurrent {
  NEGLIGIBLE = 'negligible',
  LOW = 'low',
  MODERATE = 'moderate',
  STRONG = 'strong',
}
export enum LongitudinalCurrent {
  NEGLIGIBLE = 'negligible',
  MODERATE = 'moderate',
  STRONG = 'strong',
}
export enum WaveHeight {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
}

export const ENVIRONMENT_CHANGES: Change[] = [
  { name: 'Tuulen nopeusluokka', value: (s) => s.environment.wind_speed },
  { name: 'Poikkivirtaus', value: (s) => s.environment.cross_current },
  {
    name: 'Pitkittäisvirtaus',
    value: (s) => s.environment.longitudinal_current,
  },
  { name: 'Aallon korkeus', value: (s) => s.environment.wave_height },
];
