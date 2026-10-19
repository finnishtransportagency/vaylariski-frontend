import { BendSettings } from '../types/BendSettings.ts';
import { BoatSettings, BoatSpeed } from '../types/BoatSettings.ts';
import { CalculationInterval } from '../types/CalculationInterval.ts';
import {
  ChannelAids,
  ChannelBottom,
  ChannelEdge,
  ChannelLanes,
  ChannelLightPollution,
  ChannelSettings,
  ChannelTrafficComplexity,
  ChannelTrafficVolume,
  ChannelType,
} from '../types/ChannelSettings.ts';
import {
  CrossCurrent,
  EnvironmentSettings,
  LongitudinalCurrent,
  WaveHeight,
  WindSpeed,
} from '../types/EnvironmentSettings.ts';
import { MultiplierSettings } from '../types/MultiplierSettings.ts';
import { RiskSettings } from '../types/RiskSettings.ts';

export const BOAT_SETTING_DEFAULTS: BoatSettings = {
  length: 210,
  beam: 30,
  draft: 3, // Originally 10 m
  speed: BoatSpeed.MODERATE,
  maneuverability_coefficient: 1.5,
  turning_radius_coefficient: 5,
};

export const CHANNEL_SETTING_DEFAULTS: ChannelSettings = {
  selected_channel: undefined,
  number_of_lanes: ChannelLanes.TWO_WAY,
  type: ChannelType.OUTER,
  bottom_surface: ChannelBottom.SMOOTH,
  channel_edge: ChannelEdge.GENTLE,
  aids_to_navigation: ChannelAids.EXCELLENT,
  visibility: 1852,
  light_pollution: ChannelLightPollution.NEGLIGIBLE,
  traffic_volume: ChannelTrafficVolume.LOW,
  traffic_complexity: ChannelTrafficComplexity.LOW,
};

export const ENVIRONMENT_SETTING_DEFAULTS: EnvironmentSettings = {
  wind_speed: WindSpeed.MODERATE,
  cross_current: CrossCurrent.NEGLIGIBLE,
  longitudinal_current: LongitudinalCurrent.NEGLIGIBLE,
  wave_height: WaveHeight.LOW,
};

export const MULTIPLIER_SETTING_DEFAULTS: MultiplierSettings = {
  weight_factors: {
    channel: 4,
    bend: 4,
    s_bend: 4,
    u_bend: 4,
    traffic_complexity: 4,
    reduced_visibility: 3,
    light_pollution: 2,
  },
  channel_edge: {
    [BoatSpeed.SLOW]: {
      [ChannelEdge.GENTLE]: 0.1,
      [ChannelEdge.SLOPING]: 0.3,
      [ChannelEdge.STEEP]: 0.5,
    },
    [BoatSpeed.MODERATE]: {
      [ChannelEdge.GENTLE]: 0.1,
      [ChannelEdge.SLOPING]: 0.5,
      [ChannelEdge.STEEP]: 1,
    },
    [BoatSpeed.FAST]: {
      [ChannelEdge.GENTLE]: 0.2,
      [ChannelEdge.SLOPING]: 0.7,
      [ChannelEdge.STEEP]: 1.3,
    },
  },
  channel_depth: {
    [ChannelType.INNER]: {
      deep: 0,
      medium: 0.2,
      shallow: 0.4,
    },
    [ChannelType.OUTER]: {
      deep: 0,
      medium: 0.1,
      shallow: 0.2,
    },
  },
  wind_speed: {
    [BoatSpeed.SLOW]: {
      [WindSpeed.MILD]: 0.3,
      [WindSpeed.MODERATE]: 0.6,
      [WindSpeed.STRONG]: 1.1,
    },
    [BoatSpeed.MODERATE]: {
      [WindSpeed.MILD]: 0.2,
      [WindSpeed.MODERATE]: 0.4,
      [WindSpeed.STRONG]: 0.7,
    },
    [BoatSpeed.FAST]: {
      [WindSpeed.MILD]: 0.1,
      [WindSpeed.MODERATE]: 0.3,
      [WindSpeed.STRONG]: 0.5,
    },
  },
};

export const BEND_SETTING_DEFAULTS: BendSettings = {
  bend_angle: {
    1: 0.0,
    2: 0.5,
    3: 1.0,
    4: 1.5,
    5: 2.0,
  },
  bend_angle_limits: {
    1: 30,
    2: 50,
    3: 60,
    4: 70,
  },
  bend_radius: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: 0,
  },
  bend_radius_limits: {
    1: 0.6,
    2: 1.0,
    3: 1.6,
    4: 2.0,
  },
  S_bend: {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
  },
  U_bend: {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
  },
};

export const USE_CHANNEL_MINIMUM_WIDTH_DEFAULT: boolean = false;
export const CALCULATION_INTERVAL_DEFAULT: CalculationInterval =
  CalculationInterval.INTERVAL_50;

export const RISK_SETTING_DEFAULTS: RiskSettings = {
  boat: BOAT_SETTING_DEFAULTS,
  channel: CHANNEL_SETTING_DEFAULTS,
  environment: ENVIRONMENT_SETTING_DEFAULTS,
  multipliers: MULTIPLIER_SETTING_DEFAULTS,
  bend: BEND_SETTING_DEFAULTS,
  useChannelMinimumWidth: USE_CHANNEL_MINIMUM_WIDTH_DEFAULT,
  calculationInterval: CALCULATION_INTERVAL_DEFAULT,
};
