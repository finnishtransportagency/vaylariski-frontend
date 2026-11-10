import { Change } from '../services/BrowserStorage/Change.ts';
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

export const MULTIPLIER_CHANGES: Change[] = [
  {
    name: 'Riskin painokerroin: Väylä',
    value: (s) => s.multipliers.weight_factors.channel,
  },
  {
    name: 'Riskin painokerroin: Mutka',
    value: (s) => s.multipliers.weight_factors.bend,
  },
  {
    name: 'Riskin painokerroin: S mutka',
    value: (s) => s.multipliers.weight_factors.s_bend,
  },
  {
    name: 'Riskin painokerroin: U mutka',
    value: (s) => s.multipliers.weight_factors.u_bend,
  },
  {
    name: 'Riskin painokerroin: Liikenteen monimutkaisuus',
    value: (s) => s.multipliers.weight_factors.traffic_complexity,
  },
  {
    name: 'Riskin painokerroin: Heikentynyt näkyvyys',
    value: (s) => s.multipliers.weight_factors.reduced_visibility,
  },
  {
    name: 'Riskin painokerroin: Taustavalon voimakkuus',
    value: (s) => s.multipliers.weight_factors.light_pollution,
  },
  {
    name: 'Väylän reunan kerroin: Hidas alus, loivat väylän reunat',
    value: (s) => s.multipliers.channel_edge.slow.gentle_slope,
  },
  {
    name: 'Väylän reunan kerroin: Keskinopea alus, loivat väylän reunat',
    value: (s) => s.multipliers.channel_edge.moderate.gentle_slope,
  },
  {
    name: 'Väylän reunan kerroin: Nopea alus, loivat väylän reunat',
    value: (s) => s.multipliers.channel_edge.fast.gentle_slope,
  },
  {
    name: 'Väylän reunan kerroin: Hidas alus, viistot väylän reunat',
    value: (s) => s.multipliers.channel_edge.slow.sloping_edges,
  },
  {
    name: 'Väylän reunan kerroin: Keskinopea alus, viistot väylän reunat',
    value: (s) => s.multipliers.channel_edge.moderate.sloping_edges,
  },
  {
    name: 'Väylän reunan kerroin: Nopea alus, viistot väylän reunat',
    value: (s) => s.multipliers.channel_edge.fast.sloping_edges,
  },
  {
    name: 'Väylän reunan kerroin: Hidas alus, jyrkät väylän reunat',
    value: (s) => s.multipliers.channel_edge.slow.steep_and_hard,
  },
  {
    name: 'Väylän reunan kerroin: Keskinopea alus, jyrkät väylän reunat',
    value: (s) => s.multipliers.channel_edge.moderate.steep_and_hard,
  },
  {
    name: 'Väylän reunan kerroin: Nopea alus, jyrkät väylän reunat',
    value: (s) => s.multipliers.channel_edge.fast.steep_and_hard,
  },
  {
    name: 'Väylän syvyyden kerroin: Syvä väylän sisäosa',
    value: (s) => s.multipliers.channel_depth.inner.deep,
  },
  {
    name: 'Väylän syvyyden kerroin: Melko syvä väylän sisäosa',
    value: (s) => s.multipliers.channel_depth.inner.medium,
  },
  {
    name: 'Väylän syvyyden kerroin: Matala väylän sisäosa',
    value: (s) => s.multipliers.channel_depth.inner.shallow,
  },
  {
    name: 'Väylän syvyyden kerroin: Syvä väylän ulko-osa',
    value: (s) => s.multipliers.channel_depth.outer.deep,
  },
  {
    name: 'Väylän syvyyden kerroin: Melko syvä väylän ulko-osa',
    value: (s) => s.multipliers.channel_depth.outer.medium,
  },
  {
    name: 'Väylän syvyyden kerroin: Matala väylän ulko-osa',
    value: (s) => s.multipliers.channel_depth.outer.shallow,
  },
  {
    name: 'Tuulen nopeuden kerroin: Hidas alus, heikko tuuli',
    value: (s) => s.multipliers.wind_speed.slow.mild,
  },
  {
    name: 'Tuulen nopeuden kerroin: Keskinopea alus, heikko tuuli',
    value: (s) => s.multipliers.wind_speed.moderate.mild,
  },
  {
    name: 'Tuulen nopeuden kerroin: Nopea alus, heikko tuuli',
    value: (s) => s.multipliers.wind_speed.fast.mild,
  },
  {
    name: 'Tuulen nopeuden kerroin: Hidas alus, keskiverto tuuli',
    value: (s) => s.multipliers.wind_speed.slow.moderate,
  },
  {
    name: 'Tuulen nopeuden kerroin: Keskinopea alus, keskiverto tuuli',
    value: (s) => s.multipliers.wind_speed.moderate.moderate,
  },
  {
    name: 'Tuulen nopeuden kerroin: Nopea alus, keskiverto tuuli',
    value: (s) => s.multipliers.wind_speed.fast.moderate,
  },
  {
    name: 'Tuulen nopeuden kerroin: Hidas alus, voimakas tuuli',
    value: (s) => s.multipliers.wind_speed.slow.strong,
  },
  {
    name: 'Tuulen nopeuden kerroin: Keskinopea alus, voimakas tuuli',
    value: (s) => s.multipliers.wind_speed.moderate.strong,
  },
  {
    name: 'Tuulen nopeuden kerroin: Nopea alus, voimakas tuuli',
    value: (s) => s.multipliers.wind_speed.fast.strong,
  },
];
