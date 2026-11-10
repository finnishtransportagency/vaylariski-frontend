import { Change } from '../services/BrowserStorage/Change.ts';

export type BendSettings = {
  readonly bend_angle: BendMultipliers;
  readonly bend_angle_limits: BendLimits;
  readonly bend_radius: BendMultipliers;
  readonly bend_radius_limits: BendLimits;
  readonly S_bend: BendMultipliers;
  readonly U_bend: BendMultipliers;
};
export type BendLimits = {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
};
export type BendMultipliers = {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
  readonly 5: number;
};

export const BEND_CHANGES: Change[] = [
  { name: 'Mutkan jyrkkyyden kerroin 1', value: (s) => s.bend.bend_angle[1] },
  { name: 'Mutkan jyrkkyyden kerroin 2', value: (s) => s.bend.bend_angle[2] },
  { name: 'Mutkan jyrkkyyden kerroin 3', value: (s) => s.bend.bend_angle[3] },
  { name: 'Mutkan jyrkkyyden kerroin 4', value: (s) => s.bend.bend_angle[4] },
  { name: 'Mutkan jyrkkyyden kerroin 5', value: (s) => s.bend.bend_angle[5] },
  {
    name: 'Mutkan jyrkkyyden raja-arvo 1',
    value: (s) => s.bend.bend_angle_limits[1],
  },
  {
    name: 'Mutkan jyrkkyyden raja-arvo 2',
    value: (s) => s.bend.bend_angle_limits[2],
  },
  {
    name: 'Mutkan jyrkkyyden raja-arvo 3',
    value: (s) => s.bend.bend_angle_limits[3],
  },
  {
    name: 'Mutkan jyrkkyyden raja-arvo 4',
    value: (s) => s.bend.bend_angle_limits[4],
  },
  { name: 'Mutkan laajuuden kerroin 1', value: (s) => s.bend.bend_radius[1] },
  { name: 'Mutkan laajuuden kerroin 2', value: (s) => s.bend.bend_radius[2] },
  { name: 'Mutkan laajuuden kerroin 3', value: (s) => s.bend.bend_radius[3] },
  { name: 'Mutkan laajuuden kerroin 4', value: (s) => s.bend.bend_radius[4] },
  { name: 'Mutkan laajuuden kerroin 5', value: (s) => s.bend.bend_radius[5] },
  {
    name: 'Mutkan laajuuden raja-arvo 1',
    value: (s) => s.bend.bend_radius_limits[1],
  },
  {
    name: 'Mutkan laajuuden raja-arvo 2',
    value: (s) => s.bend.bend_radius_limits[2],
  },
  {
    name: 'Mutkan laajuuden raja-arvo 3',
    value: (s) => s.bend.bend_radius_limits[3],
  },
  {
    name: 'Mutkan laajuuden raja-arvo 4',
    value: (s) => s.bend.bend_radius_limits[4],
  },
  { name: 'S-mutkan kerroin 1', value: (s) => s.bend.S_bend[1] },
  { name: 'S-mutkan kerroin 2', value: (s) => s.bend.S_bend[2] },
  { name: 'S-mutkan kerroin 3', value: (s) => s.bend.S_bend[3] },
  { name: 'S-mutkan kerroin 4', value: (s) => s.bend.S_bend[4] },
  { name: 'S-mutkan kerroin 5', value: (s) => s.bend.S_bend[5] },
  { name: 'U-mutkan kerroin 1', value: (s) => s.bend.U_bend[1] },
  { name: 'U-mutkan kerroin 2', value: (s) => s.bend.U_bend[2] },
  { name: 'U-mutkan kerroin 3', value: (s) => s.bend.U_bend[3] },
  { name: 'U-mutkan kerroin 4', value: (s) => s.bend.U_bend[4] },
  { name: 'U-mutkan kerroin 5', value: (s) => s.bend.U_bend[5] },
];
