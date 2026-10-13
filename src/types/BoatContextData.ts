import { DefaultShip } from './DefaultShip.ts';

export type DefaultShipContextData = {
  readonly defaultShips: DefaultShip[];
  readonly selected?: DefaultShip;
  readonly isLoaded: boolean;
};
