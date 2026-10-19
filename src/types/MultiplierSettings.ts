import { BoatSpeed } from './BoatSettings.ts';
import { ChannelEdge, ChannelType } from './ChannelSettings.ts';
import { WindSpeed } from './EnvironmentSettings.ts';

export type MultiplierSettings = {
  readonly weight_factors: WeightFactors;
  readonly channel_edge: ChannelEdgeMultipliers;
  readonly channel_depth: ChannelDepthMultipliers;
  readonly wind_speed: WindSpeedMultiplier;
};
export type WeightFactors = {
  readonly channel: number;
  readonly bend: number;
  readonly s_bend: number;
  readonly u_bend: number;
  readonly traffic_complexity: number;
  readonly reduced_visibility: number;
  readonly light_pollution: number;
};
export type ChannelDepthMultipliers = Record<
  ChannelType,
  {
    readonly deep: number;
    readonly medium: number;
    readonly shallow: number;
  }
>;
export type ChannelEdgeMultipliers = Record<
  BoatSpeed,
  Record<ChannelEdge, number>
>;
export type WindSpeedMultiplier = Record<BoatSpeed, Record<WindSpeed, number>>;
