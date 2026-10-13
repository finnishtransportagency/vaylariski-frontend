export type DefaultShip = {
  readonly VAY_NIMISU: string;
  readonly JNRO: number;
  readonly PITUUS: number;
  readonly LEVEYS: number;
  readonly SYVAYS: number;
  readonly KOKO?: number;
  readonly SELITE?: string;
  readonly RUNKO_TKERROIN?: string;
};

export function defaultShipToString(boat?: DefaultShip): string {
  return boat
    ? `${boat.JNRO} - ${boat.VAY_NIMISU}, pituus: ${boat.PITUUS}, leveys: ${boat.LEVEYS},  syväys: ${boat.SYVAYS}`
    : '';
}
