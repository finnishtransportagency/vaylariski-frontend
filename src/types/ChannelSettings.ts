import { Change } from '../services/BrowserStorage/Change.ts';
import { WayareaName } from './WayareaName.ts';

export type ChannelSettings = {
  readonly selected_channel?: WayareaName;
  readonly number_of_lanes: ChannelLanes;
  readonly type: ChannelType;
  readonly bottom_surface: ChannelBottom;
  readonly channel_edge: ChannelEdge;
  readonly aids_to_navigation: ChannelAids;
  readonly visibility: number;
  readonly light_pollution: ChannelLightPollution;
  readonly traffic_volume: ChannelTrafficVolume;
  readonly traffic_complexity: ChannelTrafficComplexity;
};

export enum ChannelLanes {
  ONE_WAY = 1,
  TWO_WAY = 2,
}
export enum ChannelType {
  INNER = 'inner',
  OUTER = 'outer',
}
export enum ChannelBottom {
  SMOOTH = 'smooth_and_soft',
  ROUGH = 'rough_and_hard',
}
export enum ChannelEdge {
  GENTLE = 'gentle_slope',
  SLOPING = 'sloping_edges',
  STEEP = 'steep_and_hard',
}
export enum ChannelAids {
  MODERATE = 'moderate',
  GOOD = 'good',
  EXCELLENT = 'excellent',
}
export enum ChannelLightPollution {
  NEGLIGIBLE = 'negligible',
  LOW = 'low',
  MODERATE = 'moderate',
  HEAVY = 'heavy',
  VERY_HEAVY = 'very_heavy',
}
export enum ChannelTrafficVolume {
  NEGLIGIBLE = 'negligible',
  LOW = 'low',
  MODERATE = 'moderate',
  HEAVY = 'heavy',
  VERY_HEAVY = 'very_heavy',
}
export enum ChannelTrafficComplexity {
  NEGLIGIBLE = 'negligible',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export const CHANNEL_CHANGES: Change[] = [
  { name: 'Valittu väylä', value: (s) => s.channel.selected_channel?.NIMIFI },
  { name: 'Väylän kaistat', value: (s) => s.channel.number_of_lanes },
  { name: 'Väylän tyyppi', value: (s) => s.channel.type },
  { name: 'Väylän pohja', value: (s) => s.channel.bottom_surface },
  { name: 'Väylän reuna', value: (s) => s.channel.channel_edge },
  { name: 'Turvalaitteet (ATN)', value: (s) => s.channel.aids_to_navigation },
  { name: 'Näkyvyys [m]', value: (s) => s.channel.visibility },
  { name: 'Taustavalon voimakkuus', value: (s) => s.channel.light_pollution },
  { name: 'Liikenteen määrä', value: (s) => s.channel.traffic_volume },
  {
    name: 'Liikenteen monimutkaisuus',
    value: (s) => s.channel.traffic_complexity,
  },
];
