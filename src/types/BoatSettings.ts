export type BoatSettings = {
  readonly length: number;
  readonly beam: number;
  readonly draft: number;
  readonly speed: BoatSpeed;
  readonly maneuverability_coefficient: BoatManeuverabilityCoefficient;
  readonly turning_radius_coefficient: BoatTurningRadiusCoefficient;
};

export enum BoatSpeed {
  SLOW = 'slow',
  MODERATE = 'moderate',
  FAST = 'fast',
}
export enum BoatTurningRadiusCoefficient {
  PASSENGER_SHIP = 4,
  SMALL_BULK_CARRIER = 5,
  LARGE_BULK_CARRIER = 6,
  POST_PANAMAX = 7,
}
export enum BoatManeuverabilityCoefficient {
  GOOD = 1.3,
  AVERAGE = 1.5,
  WEAK = 1.8,
}
