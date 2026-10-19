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
